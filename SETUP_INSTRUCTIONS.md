# MarineHub Training Center Booking - Setup Instructions

## Quick Start (5 Minutes)

This guide will help you get MarineHub up and running with your database and payment processing.

### Prerequisites
- Supabase account connected (✓ Already done in v0)
- Stripe account connected (✓ Already done in v0)
- Node.js 18+ installed

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Environment Variables
Your environment variables are already configured in Vercel. Make sure you have:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Step 3: Create Database Tables
The database schema is defined in `/scripts/001_create_tables.sql`

**Option A: Using Supabase Dashboard (Recommended)**
1. Go to your Supabase project
2. Click "SQL Editor" in the sidebar
3. Create a new query
4. Copy and paste the contents of `/scripts/001_create_tables.sql`
5. Click "Run"

**Option B: Using Supabase CLI**
```bash
supabase db push
```

### Step 4: Seed Demo Data
Once tables are created, add demo data:

1. Go to SQL Editor in Supabase
2. Create a new query
3. Copy and paste the contents of `/scripts/002_insert_demo_data.sql`
4. Click "Run"

### Step 5: Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your app!

### Step 6: Create Your First Account
1. Click "Sign Up" on the homepage
2. Enter your email and password
3. You'll be directed to a confirmation page

### Step 7: Test a Booking
1. Click "Browse Courses" or go back to home
2. Click on any training center card to view details
3. Click "Login to Book" (if not logged in) or "Book Now"
4. Check off mandatory documents
5. Click "Proceed to Payment"
6. Use test card: `4242 4242 4242 4242`
7. Expiry: Any future date
8. CVC: Any 3 digits

## Features Included

✓ **Homepage with Modern Grid** - Browse 6 demo training centers with advanced filters
✓ **Training Center Details Modal** - View minimal info and requirements with one click
✓ **Professional Auth** - Email/password signup and login with modern UI
✓ **Booking Flow** - Check off mandatory documents before payment
✓ **Requirements Upload** - Upload documents after booking confirmation
✓ **Payment Integration** - Stripe payment processing with Supabase webhooks
✓ **User Dashboard** - View all bookings with status tracking
✓ **Refund Policy System** - 4-tier cancellation policy implemented
✓ **Responsive Design** - Fully mobile-responsive on all devices

## Database Schema

### Tables Created
- **profiles** - User information
- **training_centers** - 6 demo centers with details
- **requirements** - 23 documents for various courses
- **refund_policies** - Standard cancellation policies
- **bookings** - User booking records
- **booking_requirements** - Document upload tracking

### Row-Level Security (RLS)
All tables are protected with RLS policies. Users can only:
- View all training centers (SELECT)
- Create/view/update their own bookings (INSERT, SELECT, UPDATE)
- Upload their own documents

## Testing Credentials

**Test Card**
- Number: `4242 4242 4242 4242`
- Expiry: `12/25` (any future date)
- CVC: `123` (any 3 digits)

**Test Email**
- Any valid email address
- Create a test account with `password123`

## Customization

### Add Your Own Training Centers
1. Go to Supabase SQL Editor
2. Run:
```sql
INSERT INTO public.training_centers (name, description, location, image_url, price_cents, duration_days, rating, reviews_count, capacity)
VALUES (
  'Your Center Name',
  'Description',
  'City, Country',
  'https://image-url.com/image.jpg',
  150000,  -- Price in cents ($1500.00)
  30,      -- Duration in days
  4.8,     -- Rating
  50,      -- Review count
  25       -- Capacity
);
```

### Add Requirements for a Center
```sql
INSERT INTO public.requirements (training_center_id, requirement_name, requirement_type, is_mandatory)
VALUES (
  'center-id-here',
  'Document Name',
  'document',
  true  -- true for mandatory, false for optional
);
```

### Change Refund Policy
Update the refund_policies table for any center:
```sql
UPDATE public.refund_policies
SET refund_percentage = 75  -- New percentage
WHERE training_center_id = 'center-id-here'
AND days_before_training = 30;
```

## Troubleshooting

### Database Tables Not Found
- Check that SQL scripts have been executed
- Verify database is connected in Supabase
- Check table names are lowercase

### Payment Not Working
- Verify Stripe keys in environment variables
- Check webhook is configured in Stripe dashboard
- Ensure test mode is enabled

### Can't Login After Signup
- Check email confirmation (may need to set `auto_confirm = true` in Supabase auth settings)
- Verify database user profiles table has RLS disabled for inserts initially

### Modal Not Opening
- Clear browser cache
- Try incognito/private window
- Check browser console for errors

## Deployment

### Deploy to Vercel
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Vercel auto-detects Next.js
4. Add environment variables in Vercel settings
5. Deploy!

```bash
git add .
git commit -m "Initial MarineHub deployment"
git push origin main
```

## Support

For issues:
1. Check browser console (F12)
2. Review Supabase logs in dashboard
3. Check Stripe webhook logs
4. Verify all environment variables are set

## Next Steps

After setup:
1. **Customize** - Update training centers with real data
2. **Brand** - Change colors in globals.css and navbar
3. **Content** - Add actual course descriptions and images
4. **Testing** - Test complete booking flow with real data
5. **Go Live** - Update Stripe keys to production mode

---

**Your MarineHub platform is now ready to use!** 🚀
