# Database Initialization Guide

## Current Status
Your MarineHub app is now showing **mock data** (6 training centers) while we set up the real database. This allows you to test the UI immediately.

## Step 1: Create Tables in Supabase

1. **Log in to [Supabase Dashboard](https://supabase.com/dashboard)**
2. **Select your project** that's connected to v0
3. **Go to SQL Editor** (left sidebar)
4. **Click "New Query"**
5. **Copy and paste** the entire contents of `/scripts/001_create_tables.sql`
6. **Click "Run"** (green button)
7. **Wait for completion** (should show "Success")

## Step 2: Insert Demo Data

1. **In SQL Editor, click "New Query"** again
2. **Copy and paste** the entire contents of `/scripts/002_insert_demo_data.sql`
3. **Click "Run"**
4. **Wait for completion**

## Step 3: Verify Database Setup

1. **Go to Supabase Dashboard → Tables**
2. **You should see these tables:**
   - `profiles` - User information
   - `training_centers` - 6 demo centers loaded
   - `requirements` - 23 course requirements
   - `refund_policies` - Refund rules
   - `bookings` - User bookings
   - `booking_requirements` - Requirement tracking

3. **Click on `training_centers`** → You should see 6 rows with data

## Step 4: Test Your App

1. **Go back to v0**
2. **Hard refresh** (Ctrl+Shift+R or Cmd+Shift+R)
3. **Homepage should now load real database data** instead of mock data
4. **All filters and search should work**

## Troubleshooting

### Still Seeing Mock Data?
- Make sure tables were created successfully in Supabase
- Check that demo data was inserted (rows in `training_centers` table)
- Hard refresh the page (Ctrl+Shift+R)
- Check browser console for errors (F12)

### Getting Database Errors?
- Verify your Supabase project is connected in v0 Settings
- Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Make sure Row Level Security (RLS) policies were created (they're in the SQL script)

### Can't See SQL Editor?
- Make sure you're on the correct Supabase project
- Try refreshing the Supabase dashboard
- Check if your Supabase project is active (not paused)

## Database Schema Overview

### training_centers (6 demo records)
- Global Maritime Academy (Singapore) - $3,500
- Blue Horizon Training Institute (Malta) - $4,500
- Advanced Maritime Institute (Dubai) - $5,500
- Pacific Naval Academy (Philippines) - $2,800
- European Maritime College (Rotterdam) - $5,200
- Ocean Safety Institute (Mumbai) - $2,200

### requirements (23 documents per center)
Examples include:
- Passport copy
- Marine license
- Medical certificate
- Safety training certificate
- English proficiency test
- And more...

## Next Steps

After database is initialized:

1. **Test Booking Flow:**
   - Click a training center card
   - View requirements checklist
   - Click "Book Now"
   - If not logged in, you'll be redirected to login

2. **Test Login:**
   - Click any "Book Now" button
   - Create new account or login
   - After login, return to booking page
   - Check off requirements
   - Proceed to payment

3. **Test Dashboard:**
   - After booking, view your dashboard
   - See your booking status
   - Upload documents
   - Track refund status

## Important Notes

- Mock data is **temporary** and only for UI testing
- Once real database is set up, the app will use live data from Supabase
- All user authentication and bookings are stored in the real database
- RLS policies ensure users only see their own data

For questions about the database setup, check the SQL scripts or contact your database administrator.
