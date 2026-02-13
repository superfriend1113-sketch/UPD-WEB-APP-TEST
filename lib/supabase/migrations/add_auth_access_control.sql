-- Migration: Add Authentication and Access Control Features
-- Description: Adds rejection tracking, password reset tokens, and retailer status management

-- Add rejection tracking columns to user_profiles
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
ADD COLUMN IF NOT EXISTS rejection_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS retailer_status VARCHAR(20) DEFAULT 'pending' 
  CHECK (retailer_status IN ('pending', 'approved', 'rejected'));

-- Create password reset tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_retailer_status ON user_profiles(retailer_status);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_expires_at ON password_reset_tokens(expires_at);

-- RLS Policies for password_reset_tokens
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- Users can only view their own reset tokens
CREATE POLICY "Users can view own reset tokens"
  ON password_reset_tokens
  FOR SELECT
  USING (auth.uid() = user_id);

-- Only service role can insert/update reset tokens
CREATE POLICY "Service role can manage reset tokens"
  ON password_reset_tokens
  FOR ALL
  USING (auth.role() = 'service_role');

-- Update user_profiles RLS to allow users to view their rejection status
CREATE POLICY "Users can view own rejection status"
  ON user_profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Function to clean up expired tokens
CREATE OR REPLACE FUNCTION cleanup_expired_reset_tokens()
RETURNS void AS $$
BEGIN
  DELETE FROM password_reset_tokens
  WHERE expires_at < NOW() AND used_at IS NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comment on tables and columns
COMMENT ON COLUMN user_profiles.rejection_reason IS 'Reason provided by admin when rejecting retailer application';
COMMENT ON COLUMN user_profiles.rejection_date IS 'Timestamp when retailer was rejected';
COMMENT ON COLUMN user_profiles.retailer_status IS 'Status of retailer application: pending, approved, or rejected';
COMMENT ON TABLE password_reset_tokens IS 'Stores secure tokens for password reset functionality';
