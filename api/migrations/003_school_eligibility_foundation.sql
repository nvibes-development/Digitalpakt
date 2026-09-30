CREATE TABLE schools (
  id uuid PRIMARY KEY,
  name text,
  federal_state text,
  education_type text,
  school_type text,
  sponsorship_type text,
  recognition_status text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT schools_federal_state_check CHECK (federal_state IS NULL OR federal_state IN ('BW', 'BY', 'BE', 'BB', 'HB', 'HH', 'HE', 'MV', 'NI', 'NW', 'RP', 'SL', 'SN', 'ST', 'SH', 'TH')),
  CONSTRAINT schools_education_type_check CHECK (education_type IS NULL OR education_type IN ('general', 'vocational')),
  CONSTRAINT schools_sponsorship_type_check CHECK (sponsorship_type IS NULL OR sponsorship_type IN ('public', 'private')),
  CONSTRAINT schools_recognition_status_check CHECK (recognition_status IS NULL OR recognition_status IN ('state_recognized', 'state_approved', 'not_specified')),
  CONSTRAINT schools_recognition_for_private_check CHECK (sponsorship_type = 'private' OR recognition_status IS NULL)
);

CREATE TABLE school_memberships (
  school_id uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('school_admin')),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (school_id, user_id)
);
CREATE INDEX school_memberships_user_idx ON school_memberships (user_id, created_at);

CREATE TABLE school_eligibility_checks (
  id uuid PRIMARY KEY,
  school_id uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  created_by uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  status text NOT NULL CHECK (status IN ('needs_information', 'eligible', 'not_eligible')),
  rule_version text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX school_eligibility_checks_school_idx ON school_eligibility_checks (school_id, created_at DESC);
