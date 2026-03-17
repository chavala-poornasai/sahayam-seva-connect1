-- ============================================
-- FIX: RLS POLICIES FOR USER REGISTRATION
-- ============================================
-- Run this in Supabase → SQL Editor if registration still fails

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read their own profile" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;
DROP POLICY IF EXISTS "Anyone can create a profile during signup" ON users;
DROP POLICY IF EXISTS "Anyone can read missions" ON missions;
DROP POLICY IF EXISTS "Authenticated users can create missions" ON missions;

-- Re-create RLS policies with correct configurations
-- Allow anyone to insert (for signup)
CREATE POLICY "Allow signup insert" ON users
  FOR INSERT 
  WITH CHECK (true);

-- Allow users to read their own profile
CREATE POLICY "Allow read own profile" ON users
  FOR SELECT 
  USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Allow update own profile" ON users
  FOR UPDATE 
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- For missions table
CREATE POLICY "Allow anyone read missions" ON missions
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow authenticated create missions" ON missions
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Optional: Verify policies are applied
SELECT schemaname, tablename, policyname, permissive, roles, qual, with_check
FROM pg_policies 
WHERE tablename IN ('users', 'missions')
ORDER BY tablename, policyname;
