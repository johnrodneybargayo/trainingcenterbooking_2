# MarineHub - Supabase Setup Guide

## Status: Ready to Connect

Your v0 project is fully configured and connected to Supabase. All environment variables are properly set. Now you need to initialize the database schema.

## Quick Setup (5 minutes)

### Step 1: Go to Supabase Dashboard
1. Visit [https://supabase.com](https://supabase.com)
2. Log in to your account
3. Select your MarineHub project
4. Click on **SQL Editor** in the left sidebar

### Step 2: Create Database Tables
1. Click **New Query** button
2. Copy and paste the entire content from `/scripts/001_create_tables.sql` file
3. Click **Run** button
4. Wait for "Query executed successfully" message

### Step 3: Insert Demo Data
1. Click **New Query** again
2. Copy and paste the entire content from `/scripts/002_insert_demo_data.sql` file
3. Click **Run** button
4. Wait for "Query executed successfully" message

### Step 4: Verify Database
1. Click **Table Editor** in left sidebar
2. You should see 6 tables:
   - ✅ profiles
   - ✅ training_centers
   - ✅ requirements
   - ✅ refund_policies
   - ✅ bookings
   - ✅ booking_requirements

3. Click on `training_centers` table
4. You should see 6 demo training centers with full details

## What Gets Created

### Tables (6 total):
- **profiles** - User information with roles (student, admin, training_center_admin)
- **training_centers** - 6 demo maritime training centers worldwide
- **requirements** - 23 course requirements (documents needed)
- **refund_policies** - 4-tier refund system for each center
- **bookings** - User booking records with payment status
- **booking_requirements** - Document upload tracking per booking

### Demo Data Included:
- 6 training centers (Singapore, Malta, Dubai, Philippines, Rotterdam, Mumbai)
- 23 requirement documents (passports, certificates, licenses, medical clearance, etc.)
- Refund policies: 100% (30+ days), 50% (15-29 days), 25% (7-14 days), 0% (<7 days)
- Row-level security on all tables for user privacy

## Environment Variables Already Set

All these are configured in Vercel:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
POSTGRES_URL
POSTGRES_PRISMA_URL
SUPABASE_JWT_SECRET
```

## Test the Connection

After running the SQL scripts:

1. Go to your app homepage: `http://localhost:3000`
2. You should see **6 real training center cards** (not mock data)
3. Try the filters: location, duration, price, rating
4. Click a card to see details
5. Click "Login to Book" button
6. Sign up with email/password
7. Complete booking flow

## If You See Mock Data Instead

If the page still shows mock data, it means the database tables weren't created successfully:

**Check:**
1. Confirm all SQL scripts ran without errors in Supabase
2. Check **Table Editor** to see if tables exist
3. Refresh your app page (Cmd+R or Ctrl+R)
4. Check browser console for any errors (F12)

**If still not working:**
1. Delete the tables (SQL Editor → `DROP TABLE IF EXISTS booking_requirements CASCADE;` etc.)
2. Run the scripts again more carefully
3. Ensure you run both scripts in order (001 first, then 002)

## What Happens Next

Once database is connected:
- ✅ Homepage shows real training centers from Supabase
- ✅ Filters work on real data
- ✅ Login creates users in Supabase Auth
- ✅ Bookings are saved to database
- ✅ Requirements can be uploaded and tracked
- ✅ Admin can see all bookings and revenue
- ✅ Full production app is live

## Support

If you encounter issues:
1. Check Supabase dashboard for any error messages
2. Verify Row-Level Security (RLS) policies were created
3. Make sure both SQL scripts ran completely
4. Refresh the app after database setup

Your MarineHub platform is ready to go live once these steps are complete!
