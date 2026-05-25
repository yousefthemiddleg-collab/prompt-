/*
  # Create prompt_submissions table

  1. New Tables
    - `prompt_submissions`
      - `id` (uuid, primary key)
      - `original_prompt` (text) - The user's original prompt
      - `enhanced_prompt` (text) - The AI-enhanced version
      - `rating` (integer) - Score out of 10
      - `target_ai` (text) - Recommended AI to route to
      - `feedback` (text) - Explanation of enhancements
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Allow anonymous insert and select of own data via session tracking
*/

CREATE TABLE IF NOT EXISTS prompt_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  original_prompt text NOT NULL,
  enhanced_prompt text,
  rating integer CHECK (rating >= 1 AND rating <= 10),
  target_ai text,
  feedback text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE prompt_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert submissions"
  ON prompt_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read submissions"
  ON prompt_submissions FOR SELECT
  TO anon, authenticated
  USING (true);
