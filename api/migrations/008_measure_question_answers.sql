CREATE TABLE measure_question_answers (
  measure_id uuid NOT NULL REFERENCES measures(id) ON DELETE CASCADE,
  question_number smallint NOT NULL CHECK (question_number BETWEEN 1 AND 9),
  answer text NOT NULL CHECK (answer IN ('yes', 'no', 'unknown')),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (measure_id, question_number)
);