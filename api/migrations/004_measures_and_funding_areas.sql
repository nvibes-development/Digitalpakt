ALTER TABLE schools ADD COLUMN location text;

CREATE TABLE measures (
  id uuid PRIMARY KEY,
  school_id uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  created_by uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  name text,
  description text,
  affected_area_sqm numeric(12,2),
  student_count integer,
  teacher_count integer,
  existing_equipment text,
  previous_digitalisation_measures text,
  received_funding text,
  implementation_period text,
  estimated_cost_eur numeric(14,2),
  implementation_status text,
  funding_area text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT measures_affected_area_check CHECK (affected_area_sqm IS NULL OR affected_area_sqm >= 0),
  CONSTRAINT measures_student_count_check CHECK (student_count IS NULL OR student_count >= 0),
  CONSTRAINT measures_teacher_count_check CHECK (teacher_count IS NULL OR teacher_count >= 0),
  CONSTRAINT measures_estimated_cost_check CHECK (estimated_cost_eur IS NULL OR estimated_cost_eur >= 0),
  CONSTRAINT measures_implementation_status_check CHECK (implementation_status IS NULL OR implementation_status IN ('planned', 'started', 'completed')),
  CONSTRAINT measures_funding_area_check CHECK (funding_area IS NULL OR funding_area IN ('infrastructure_network_wlan', 'digital_devices', 'educational_software_platforms'))
);
CREATE INDEX measures_school_updated_idx ON measures (school_id, updated_at DESC);
