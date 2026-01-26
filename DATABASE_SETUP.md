# MarineHub Database Setup Guide

## Overview
This guide explains how to set up the MarineHub training center booking platform database in Supabase.

## Database Tables

### 1. **profiles** - User Profiles
- Stores user information linked to Supabase Auth
- Fields: first_name, last_name, email, phone, company, user_type, training_center_id
- User types: 'student', 'admin', 'training_center_admin'
- Row Level Security: Users can only see/edit their own profile

### 2. **training_centers** - Training Center Listings
- Stores marine training center information
- Fields: name, description, location, image_url, price_cents, duration_days, rating, reviews_count, capacity, admin_id
- Row Level Security: Publicly readable, admins can edit their own centers

### 3. **requirements** - Course Requirements
- Lists documents/certifications needed for each training center
- Fields: training_center_id, requirement_name, requirement_type, is_mandatory
- Links to: training_centers (one-to-many)

### 4. **refund_policies** - Cancellation & Refund Policies
- Defines refund percentages based on days before training
- Fields: training_center_id, days_before_training, refund_percentage, description
- Standard policy:
  - 30+ days: 100% refund
  - 15-29 days: 50% refund
  - 7-14 days: 25% refund
  - < 7 days: 0% refund

### 5. **bookings** - User Bookings
- Tracks all training center bookings
- Fields: user_id, training_center_id, booking_date, training_start_date, status, payment_id, price_cents, convenience_fee_cents, refund_amount_cents
- Status: 'pending', 'confirmed', 'completed', 'cancelled'
- Row Level Security: Users can only see/edit their own bookings

### 6. **booking_requirements** - Booking Documentation Tracking
- Tracks which documents are completed for each booking
- Fields: booking_id, requirement_id, is_completed, document_url
- Junction table linking bookings to requirements

## Setup Instructions

### Step 1: Execute Database Schema
1. Go to your Supabase project dashboard
2. Open the **SQL Editor**
3. Copy the entire contents of `scripts/001_create_tables.sql`
4. Paste into the SQL Editor
5. Click **Run**

### Step 2: Insert Demo Data
1. In the SQL Editor, copy the entire contents of `scripts/002_insert_demo_data.sql`
2. Paste into the SQL Editor
3. Click **Run**

This will create:
- 6 demo training centers (Singapore, Malta, Dubai, Philippines, Rotterdam, Mumbai)
- Refund policies for each center
- 23 course requirements across all centers

## Demo Training Centers

1. **Global Maritime Academy** - $1,500 (30 days) - Singapore
2. **Blue Horizon Training Center** - $1,200 (21 days) - Malta
3. **Advanced Maritime Institute** - $990 (14 days) - Dubai
4. **Pacific Naval Academy** - $1,100 (21 days) - Philippines
5. **European Maritime College** - $1,800 (35 days) - Rotterdam
6. **Ocean Safety Institute** - $450 (7 days) - Mumbai

## User Roles & Permissions

### Student
- Can browse training centers
- Can create bookings
- Can upload required documents
- Can view their own bookings and payment history
- Can request cancellation (subject to refund policy)

### Training Center Admin
- Can manage their assigned training center
- Can view all bookings for their center
- Can update booking status
- Can view refund policy details

### Platform Admin
- Full access to all bookings across all training centers
- Can manage refund policies
- Can view platform-wide statistics and revenue

## Key Features

### Refund Calculation
The system automatically calculates refunds based on:
1. Days remaining until training start date
2. Applicable refund percentage from refund_policies table
3. Convenience fee deduction (2%)

### Convenience Fee
- 2% convenience fee is applied to all bookings
- Fee is split between platform and training center
- Clearly displayed during checkout

### Row Level Security (RLS)
All tables have RLS enabled to ensure:
- Users can only access their own data
- Training center admins can only manage their center
- Platform admins have full access via appropriate policies

## Testing

To test the system:

1. **Sign up** as a student at `/auth/sign-up`
2. **Browse** training centers on the homepage
3. **Click** a training center card to view details
4. **View** refund policy information
5. **Click** "Book Now" and select required documents
6. **Proceed** to payment with Stripe test card: `4242 4242 4242 4242`
7. **View** booking in dashboard at `/dashboard`

## Environment Variables Required

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Troubleshooting

### "Table not found" error
- Ensure you've executed both SQL scripts in order
- Check that tables were created successfully in Supabase SQL Editor

### Authentication errors
- Verify Supabase URL and Keys are correct
- Check that your Supabase project has Auth enabled

### Payment issues
- Verify Stripe keys are correct
- Use test card numbers in development
- Check Stripe webhook configuration (optional for MVP)
