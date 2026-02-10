-- Disable email confirmation for development
-- This allows users to sign in immediately after signing up

-- Auto-confirm all existing users
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;

-- Note: To disable email confirmation completely, go to:
-- Supabase Dashboard -> Authentication -> Providers -> Email
-- Uncheck "Enable email confirmations"
