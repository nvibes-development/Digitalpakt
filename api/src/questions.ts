import { Pool } from 'pg';
import { z } from 'zod';
import { SafeUser } from './auth.js';
const pool=new Pool({connectionString:process.env.DATABASE_URL});
export const questionSchema=z.object({answers:z.array(z.object({questionNumber:z.number().int().min(1).max(9),answer:z.enum(['yes','no','unknown'])})).length(9).refine(items=>new Set(items.map(item=>item.questionNumber)).size===9)});
async function own(user:SafeUser,measureId:string){return !!(await pool.query('SELECT 1 FROM measures m JOIN school_memberships sm ON sm.school_id=m.school_id WHERE m.id=$1 AND sm.user_id=$2',[measureId,user.id])).rows[0]}
export async function getAnswers(user:SafeUser,measureId:string){if(!await own(user,measureId))return null;return (await pool.query('SELECT question_number AS "questionNumber",answer FROM measure_question_answers WHERE measure_id=$1 ORDER BY question_number',[measureId])).rows}
export async function saveAnswers(user:SafeUser,measureId:string,answers:z.infer<typeof questionSchema>['answers']){if(!await own(user,measureId))return null;await pool.query('BEGIN');try{for(const item of answers)await pool.query('INSERT INTO measure_question_answers(measure_id,question_number,answer,updated_at) VALUES($1,$2,$3,now()) ON CONFLICT(measure_id,question_number) DO UPDATE SET answer=excluded.answer,updated_at=now()',[measureId,item.questionNumber,item.answer]);await pool.query('COMMIT');return true}catch(error){await pool.query('ROLLBACK');throw error}}
