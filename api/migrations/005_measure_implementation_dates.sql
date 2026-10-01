ALTER TABLE measures
  ADD COLUMN implementation_start_date date,
  ADD COLUMN implementation_end_date date,
  ADD CONSTRAINT measures_implementation_date_order_check CHECK (
    implementation_start_date IS NULL
    OR implementation_end_date IS NULL
    OR implementation_end_date >= implementation_start_date
  );
