-- ============================================
-- FIX: Confirm all existing test users
-- ============================================
-- Run this in Supabase → SQL Editor if you have old unconfirmed test users

-- Confirm all users in auth.users table
UPDATE auth.users 
SET email_confirmed_at = now()
WHERE email_confirmed_at IS NULL;

-- Verify the fix
SELECT id, email, email_confirmed_at FROM auth.users ORDER BY created_at DESC LIMIT 10;
