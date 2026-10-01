CREATE TABLE measure_documents (
 id uuid PRIMARY KEY, measure_id uuid NOT NULL REFERENCES measures(id) ON DELETE CASCADE, uploaded_by uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
 original_name text NOT NULL, blob_name text NOT NULL UNIQUE, mime_type text NOT NULL, size_bytes integer NOT NULL CHECK(size_bytes > 0 AND size_bytes <= 10485760), uploaded_at timestamptz NOT NULL DEFAULT now(), verified_at timestamptz
);
CREATE INDEX measure_documents_measure_idx ON measure_documents (measure_id, uploaded_at);