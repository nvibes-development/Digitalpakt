ALTER TABLE users DROP CONSTRAINT users_role_check;
ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ('school_admin', 'case_worker', 'case_worker_admin'));

ALTER TABLE measures ADD COLUMN review_status text NOT NULL DEFAULT 'DRAFT' CHECK (review_status IN ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'NEEDS_CHANGES', 'IN_REVISION', 'RESUBMITTED', 'ELIGIBLE', 'NOT_ELIGIBLE'));
ALTER TABLE measures ADD COLUMN assigned_case_worker_id uuid REFERENCES users(id) ON DELETE RESTRICT;
ALTER TABLE measures ADD COLUMN assigned_at timestamptz;
CREATE INDEX measures_review_status_idx ON measures (review_status, submitted_at);
CREATE INDEX measures_assigned_case_worker_idx ON measures (assigned_case_worker_id, review_status);

CREATE TABLE measure_submissions (
  id uuid PRIMARY KEY,
  measure_id uuid NOT NULL REFERENCES measures(id) ON DELETE CASCADE,
  submission_number integer NOT NULL CHECK (submission_number > 0),
  submitted_by_user_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  submitted_at timestamptz NOT NULL,
  status text NOT NULL CHECK (status IN ('SUBMITTED', 'UNDER_REVIEW', 'NEEDS_CHANGES', 'RESUBMITTED', 'ELIGIBLE', 'NOT_ELIGIBLE')),
  case_number text NOT NULL,
  school_snapshot jsonb NOT NULL,
  applicant_snapshot jsonb NOT NULL,
  measure_snapshot jsonb NOT NULL,
  answers_snapshot jsonb NOT NULL,
  documents_snapshot jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (measure_id, submission_number),
  UNIQUE (case_number)
);
CREATE INDEX measure_submissions_inbox_idx ON measure_submissions (status, submitted_at);

CREATE TABLE case_decisions (
  id uuid PRIMARY KEY,
  submission_id uuid NOT NULL REFERENCES measure_submissions(id) ON DELETE RESTRICT,
  case_worker_user_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  decision text NOT NULL CHECK (decision IN ('ELIGIBLE', 'NEEDS_CHANGES', 'NOT_ELIGIBLE')),
  public_reason text,
  internal_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK ((decision = 'ELIGIBLE') OR nullif(btrim(public_reason), '') IS NOT NULL)
);
CREATE INDEX case_decisions_submission_idx ON case_decisions (submission_id, created_at DESC);

CREATE TABLE case_requests (
  id uuid PRIMARY KEY,
  submission_id uuid NOT NULL REFERENCES measure_submissions(id) ON DELETE RESTRICT,
  case_worker_user_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  message text NOT NULL CHECK (length(btrim(message)) > 0),
  requires_school_data boolean NOT NULL DEFAULT false,
  requires_measure_data boolean NOT NULL DEFAULT false,
  requires_answers boolean NOT NULL DEFAULT false,
  requires_documents boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz
);
CREATE INDEX case_requests_submission_idx ON case_requests (submission_id, created_at DESC);

CREATE TABLE audit_events (
  id uuid PRIMARY KEY,
  case_id uuid NOT NULL REFERENCES measures(id) ON DELETE RESTRICT,
  submission_id uuid REFERENCES measure_submissions(id) ON DELETE RESTRICT,
  actor_user_id uuid REFERENCES users(id) ON DELETE RESTRICT,
  actor_role text,
  event_type text NOT NULL,
  event_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX audit_events_case_idx ON audit_events (case_id, created_at);

UPDATE measures SET review_status = CASE WHEN submitted_at IS NULL THEN 'DRAFT' ELSE 'SUBMITTED' END;

INSERT INTO measure_submissions (id, measure_id, submission_number, submitted_by_user_id, submitted_at, status, case_number, school_snapshot, applicant_snapshot, measure_snapshot, answers_snapshot, documents_snapshot)
SELECT (substr(md5(m.id::text || ':submission:1'), 1, 8) || '-' || substr(md5(m.id::text || ':submission:1'), 9, 4) || '-' || substr(md5(m.id::text || ':submission:1'), 13, 4) || '-' || substr(md5(m.id::text || ':submission:1'), 17, 4) || '-' || substr(md5(m.id::text || ':submission:1'), 21, 12))::uuid, m.id, 1, m.created_by, m.submitted_at, 'SUBMITTED', m.review_reference,
  jsonb_build_object('id', s.id, 'name', s.name, 'location', s.location, 'federalState', s.federal_state, 'educationType', s.education_type, 'schoolType', s.school_type, 'sponsorshipType', s.sponsorship_type, 'recognitionStatus', s.recognition_status),
  jsonb_build_object('id', u.id, 'firstName', u.first_name, 'lastName', u.last_name, 'email', u.email, 'role', u.role, 'phoneNumber', p.phone_number, 'mobileNumber', p.mobile_number),
  jsonb_build_object('id', m.id, 'name', m.name, 'description', m.description, 'affectedAreaSqm', m.affected_area_sqm, 'studentCount', m.student_count, 'teacherCount', m.teacher_count, 'existingEquipment', m.existing_equipment, 'previousDigitalisationMeasures', m.previous_digitalisation_measures, 'receivedFunding', m.received_funding, 'implementationStartDate', m.implementation_start_date, 'implementationEndDate', m.implementation_end_date, 'estimatedCostEur', m.estimated_cost_eur, 'implementationStatus', m.implementation_status, 'fundingArea', m.funding_area),
  COALESCE((SELECT jsonb_agg(jsonb_build_object('questionNumber', a.question_number, 'answer', a.answer) ORDER BY a.question_number) FROM measure_question_answers a WHERE a.measure_id = m.id), '[]'::jsonb),
  COALESCE((SELECT jsonb_agg(jsonb_build_object('documentId', d.id, 'filename', d.original_name, 'blobPath', d.blob_name, 'uploadedAt', d.uploaded_at, 'fileSize', d.size_bytes, 'mimeType', d.mime_type) ORDER BY d.uploaded_at) FROM measure_documents d WHERE d.measure_id = m.id), '[]'::jsonb)
FROM measures m JOIN schools s ON s.id = m.school_id JOIN users u ON u.id = m.created_by LEFT JOIN user_profiles p ON p.user_id = u.id
WHERE m.submitted_at IS NOT NULL AND NOT EXISTS (SELECT 1 FROM measure_submissions ms WHERE ms.measure_id = m.id);
