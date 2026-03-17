# Supabase Backend Setup Instructions

## Step 1: Create Users Table in Supabase

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project: **wnjfqbkwkxhvpzdmivyx**
3. Navigate to **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy and paste the entire contents of `SUPABASE_SETUP.sql`
6. Click **Run** (or press Ctrl+Enter)
7. You should see: "Query successful"

## Step 2: Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Find **Email** provider
3. Toggle **Email** to **ON**
4. Click **Save**

## Step 3: Verify Table Creation

1. Go to **Table Editor** (left sidebar)
2. You should see the `users` table listed
3. Check the columns: `id`, `full_name`, `email`, `role`, `is_verified`, `created_at`, `updated_at`, `preferences`

## Step 4: Test Registration

1. Start the backend: Make sure dev server is running on `http://localhost:3000`
2. Open your browser and navigate to `http://localhost:3000/auth`
3. Enter test details:
   - Full Name: John Doe
   - Email: john@example.com
   - Password: Test123456 (minimum 8 characters)
   - Role: Select any role (Citizen/NGO/Admin)
4. Click **Register**

### Expected Result:
- See success message: "Digital identity provisioned"
- In Supabase → Table Editor → users table: New row with your data

## Step 5: Test Login

1. Navigate to `http://localhost:3000/auth`
2. Click **Login**
3. Use the same email and password from registration
4. Click **Login**

### Expected Result:
- Successfully logged in
- User dashboard loads

## Troubleshooting

**Error: "Could not find the 'createdAt' column"**
- The SQL script wasn't run. Go back to Step 1 and run SUPABASE_SETUP.sql

**Error: "Email already registered"**
- Use a different email address for testing

**Error: "Password must be 8+ characters"**
- Password is too short. Use at least 8 characters

**Error: "Invalid email or password"**
- Check that email and password are correct
- Make sure user was successfully registered first

## Environment Variables

Your `.env.local` contains:
```
NEXT_PUBLIC_SUPABASE_URL=https://wnjfqbkwkxhvpzdmivyx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduamZxYmt3a3hodHB6ZG1pdngiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc3Mzc1NDkyMiwiZXhwIjoyMDg5MzMwOTIyfQ.Snj_akAQAKaiXfofuMKBXoLXnYhD_meps0aaNg88Kfc
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduamZxYmt3a3hodHB6ZG1pdngiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNzczNzU0OTIyLCJleHAiOjIwODkzMzA5MjJ9.WklLxw3vp3EQnc9ZVP_oG1LfIvBBTcbwWFdONOVGbhg
```

These are already configured correctly.
