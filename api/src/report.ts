import { createReadStream, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import PDFDocument from 'pdfkit';

export type ReportData = {
  caseNumber: string; submissionNumber: number; submittedAt: string; status: 'ELIGIBLE'|'NOT_ELIGIBLE'; decision: 'ELIGIBLE'|'NOT_ELIGIBLE'; decisionAt: string; publicReason: string | null;
  caseWorker: { firstName: string | null; lastName: string | null; role: string | null };
  applicant: Record<string, unknown>; school: Record<string, unknown>; measure: Record<string, unknown>;
  answers: { questionNumber: number; answer: string }[]; documents: { filename?: string; uploadedAt?: string; mimeType?: string }[];
};

const areas: Record<string,string>={infrastructure_network_wlan:'IT-Infrastruktur, Netzwerk und WLAN',digital_devices:'Digitale Endgeräte',educational_software_platforms:'Bildungssoftware und digitale Lernplattformen'};
const values: Record<string,string>={school_admin:'Schuladministrator',case_worker:'Sachbearbeiter',case_worker_admin:'Sachbearbeitung (Administration)',general:'Allgemeinbildende Schule',vocational:'Berufsbildende Schule',public:'Öffentlich',private:'Privat',planned:'Geplant',started:'Begonnen',completed:'Abgeschlossen'};
const questions=['Steht die geplante Maßnahme in einem konkreten Zusammenhang mit der digitalen Bildung?','Ist der pädagogische Einsatzzweck der Endgeräte beschrieben?','Wurde der vorhandene Gerätebestand bei der Bedarfsermittlung berücksichtigt?','Sind Wartung, IT-Support und zukünftiger Betrieb der Geräte sichergestellt?','Wurde mit der Umsetzung der Maßnahme bereits begonnen?','Wurde die Maßnahme bereits über ein anderes Förderprogramm beantragt oder finanziert?','Wurde der bestehende technische Zustand der Infrastruktur erfasst?','Liegt eine technische Planung bzw. ein Netzwerkkonzept vor?','Werden Anforderungen an IT-Sicherheit und Zugriffsschutz berücksichtigt?'];
const formatDate=(value:unknown,withTime=false)=>value?new Intl.DateTimeFormat('de-DE',withTime?{dateStyle:'medium',timeStyle:'short'}:{dateStyle:'medium'}).format(new Date(String(value))):'';
const label=(value:unknown)=>values[String(value)]??String(value);
const present=(value:unknown)=>value!==null&&value!==undefined&&String(value).trim()!=='';

export function reportFilename(caseNumber:string, measureName:unknown) { const clean=(value:string)=>value.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9_-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,60)||'Massnahme'; return `KLARFOERDERN_Pruefbericht_${clean(caseNumber)}_${clean(String(measureName??''))}.pdf`; }

export async function createReportPdf(data:ReportData):Promise<Buffer>{
  const doc=new PDFDocument({size:'A4',margin:52,info:{Title:`Prüfbericht ${data.caseNumber}`,Author:'KLARFÖRDERN'},compress:false}); const chunks:Buffer[]=[];
  const done=new Promise<Buffer>((resolve,reject)=>{doc.on('data',(chunk:Buffer)=>chunks.push(chunk));doc.on('end',()=>resolve(Buffer.concat(chunks)));doc.on('error',reject);});
  const bottom=()=>doc.page.height-doc.page.margins.bottom;
  const room=(height:number)=>{if(doc.y+height>bottom())doc.addPage();};
  const heading=(text:string)=>{room(40);doc.fillColor('#105B5C').font('Helvetica-Bold').fontSize(15).text(text);doc.moveDown(.45);};
  const text=(value:unknown, options:PDFKit.Mixins.TextOptions={})=>{doc.fillColor('#173f42').font('Helvetica').fontSize(10).text(String(value),options);};
  const field=(name:string,value:unknown)=>{if(!present(value))return;const line=String(label(value));room(doc.heightOfString(`${name}: ${line}`,{width:490})+8);doc.font('Helvetica-Bold').fillColor('#105B5C').fontSize(10).text(`${name}: `,{continued:true});doc.font('Helvetica').fillColor('#173f42').text(line);doc.moveDown(.2);};
  const fields=(entries:[string,unknown][])=>entries.forEach(([name,value])=>field(name,value));
  const logo=resolve(process.cwd(),'public','digitalpakt-check-icon-192.png'); if(existsSync(logo))doc.image(logo,52,45,{fit:[42,42]});
  doc.fillColor('#105B5C').font('Helvetica-Bold').fontSize(22).text('KLARFÖRDERN',106,49);doc.fontSize(16).text('Prüfbericht zur Digitalisierungsmaßnahme',52,105);doc.moveDown(.5);
  doc.roundedRect(52,doc.y,491,92,7).fill('#E9F9F5'); const box=doc.y+13;doc.fillColor('#105B5C').font('Helvetica-Bold').fontSize(13).text(data.status==='ELIGIBLE'?'Grundsätzlich förderfähig':'Derzeit nicht förderfähig',68,box);doc.font('Helvetica').fontSize(10).text(`Vorgangsnummer: ${data.caseNumber}\nSubmission-Version: ${data.submissionNumber}\nGeprüft am: ${formatDate(data.decisionAt,true)}\nPDF erstellt am: ${formatDate(new Date(),true)}`,68,box+23);doc.y+=105;
  heading('Öffentliche Anmerkungen der Sachbearbeitung');text(data.publicReason??'Keine öffentlichen Anmerkungen hinterlegt.',{lineGap:2});doc.moveDown();
  heading('Sachbearbeitung');fields([['Name',[data.caseWorker.firstName,data.caseWorker.lastName].filter(Boolean).join(' ')||'Nicht hinterlegt'],['Rolle',data.caseWorker.role]]);
  heading('Antragsteller');fields([['Vorname',data.applicant.firstName],['Nachname',data.applicant.lastName],['E-Mail-Adresse',data.applicant.email],['Telefon',data.applicant.phoneNumber],['Mobiltelefon',data.applicant.mobileNumber],['Rolle',data.applicant.role]]);
  heading('Schuldaten');fields([['Schulname',data.school.name],['Standort',data.school.location],['Bundesland',data.school.federalState],['Schulform',data.school.educationType],['Schulart',data.school.schoolType],['Trägerschaft',data.school.sponsorshipType],['Anerkennungsstatus',data.school.recognitionStatus]]);
  heading('Maßnahmendaten');fields([['Bezeichnung',data.measure.name],['Kurzbeschreibung',data.measure.description],['Förderbereich',areas[String(data.measure.fundingArea)]??data.measure.fundingArea],['Umsetzungsstatus',data.measure.implementationStatus],['Umsetzungsbeginn',formatDate(data.measure.implementationStartDate)],['Umsetzungsende',formatDate(data.measure.implementationEndDate)],['Voraussichtliche Kosten',present(data.measure.estimatedCostEur)?`${data.measure.estimatedCostEur} EUR`:null],['Betroffene Fläche',present(data.measure.affectedAreaSqm)?`${data.measure.affectedAreaSqm} m²`:null],['Anzahl Schülerinnen und Schüler',data.measure.studentCount],['Anzahl Lehrkräfte',data.measure.teacherCount],['Vorhandene technische Ausstattung',data.measure.existingEquipment],['Frühere Digitalisierungsmaßnahmen',data.measure.previousDigitalisationMeasures],['Bereits erhaltene Fördermittel',data.measure.receivedFunding]]);
  heading('Förderfragen');for(let number=1;number<=9;number++){const answer=data.answers.find(item=>item.questionNumber===number)?.answer;const response=answer==='yes'?'+ Ja':answer==='no'?'- Nein':'? Nicht bekannt';room(42);doc.font('Helvetica-Bold').fillColor('#105B5C').fontSize(10).text(`${number}. ${questions[number-1]}`);doc.font('Helvetica').fillColor('#173f42').text(`Antwort: ${response}`);doc.moveDown(.35);}
  heading('Eingereichte Unterlagen');if(!data.documents.length)text('Keine Dokumente hinterlegt.');else data.documents.forEach((item,index)=>{room(24);text(`${index+1}. ${item.filename??'Unbenanntes Dokument'}${item.uploadedAt?` · hochgeladen am ${formatDate(item.uploadedAt)}`:''}${item.mimeType?` · ${item.mimeType}`:''}`);});
  heading('Prüfverfahren');text('Menschliche Sachbearbeiterprüfung / Human-in-the-Loop. Keine automatische Förderentscheidung.');doc.moveDown();heading('Hinweis zur Unverbindlichkeit');text('Das Ergebnis ist eine unverbindliche Ersteinschätzung. Es stellt keine Förderzusage, keinen Bewilligungsbescheid und keine rechtsverbindliche Entscheidung der zuständigen Förderstelle dar.',{lineGap:2});
  doc.end();return done;
}
