CREATE TABLE IF NOT EXISTS application_metadata (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO application_metadata (key, value)
VALUES ('platform_schema_version', 'phase-1')
ON CONFLICT (key) DO NOTHING;
