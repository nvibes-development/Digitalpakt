ALTER TABLE measures ADD COLUMN submitted_at timestamptz;
ALTER TABLE measures ADD COLUMN review_reference text UNIQUE;
ALTER TABLE measures ADD CONSTRAINT measures_submission_pair CHECK ((submitted_at IS NULL) = (review_reference IS NULL));