CREATE TABLE user_profiles (
  user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  street text,
  house_number text,
  postal_code text,
  city text,
  phone_number text,
  mobile_number text,
  updated_at timestamptz NOT NULL DEFAULT now()
);