# Quick Start Guide - MarineHub Training Center Booking

Get MarineHub running in 5 minutes!

## Step 1: Install Dependencies (2 min)
```bash
npm install
```

## Step 2: Setup Environment Variables (1 min)
Create `.env.local` in your project root:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
```

Get these from:
- **Supabase**: Project Settings → API
- **Stripe**: Developers → API Keys

## Step 3: Setup Database (2 min)
1. Go to your Supabase project dashboard
2. Open **SQL Editor** 
3. Create new query
4. Copy-paste entire contents of `scripts/001_create_tables.sql`
5. Click **Run**
6. Create another query
7. Copy-paste entire contents of `scripts/002_insert_demo_data.sql`
8. Click **Run**

Done! Your database now has 6 training centers with demo data.

## Step 4: Start Development Server
```bash
npm run dev
```

Open http://localhost:3000

## Step 5: Test the Platform

### As a Student:
1. Click **Sign Up**
2. Enter any email and password
3. Wait for email verification (check Supabase Auth)
4. Click **Login**
5. Browse training centers
6. Click any card to view details and refund policy
7. Click **Book Now**
8. Check off required documents
9. Click **Proceed to Payment**
10. Use test card: `4242 4242 4242 4242`
11. View booking in **Dashboard**

### As an Admin:
1. After signing up, ask your team to update your user_type to 'admin' in Supabase
   - Go to Supabase → profiles table
   - Find your user ID
   - Change `user_type` from 'student' to 'admin'
2. Navigate to `/admin/dashboard`
3. View all bookings
4. Click **View** on any booking
5. Change status and save

## Database Demo Data

**6 Training Centers:**
1. Global Maritime Academy - Singapore ($1,500, 30 days)
2. Blue Horizon Training - Malta ($1,200, 21 days)
3. Advanced Maritime Institute - Dubai ($990, 14 days)
4. Pacific Naval Academy - Philippines ($1,100, 21 days)
5. European Maritime College - Rotterdam ($1,800, 35 days)
6. Ocean Safety Institute - Mumbai ($450, 7 days)

Each center has:
- 3-5 mandatory requirements (passport, certifications, etc.)
- 1-2 optional requirements
- Standard refund policy (100%/50%/25%/0% based on days)

## Key Files Modified

- `app/layout.tsx` - Root layout
- `app/page.tsx` - Homepage with filters
- `app/training-center/[id]/page.tsx` - Details + refund policy
- `app/booking/[id]/page.tsx` - Requirements checklist
- `app/payment/[bookingId]/page.tsx` - Stripe checkout
- `app/dashboard/page.tsx` - User bookings
- `app/admin/dashboard/page.tsx` - Admin panel
- `lib/products.ts` - Updated interfaces with refund policy
- `components/refund-policy-card.tsx` - NEW: Shows refund policy
- `components/navbar.tsx` - Updated with account dropdown
- `scripts/001_create_tables.sql` - NEW: Database schema
- `scripts/002_insert_demo_data.sql` - NEW: Demo data

## Troubleshooting

**"Table not found" error?**
- Run both SQL scripts in correct order
- Make sure scripts completed without error

**Payment not working?**
- Check Stripe keys are correct in `.env.local`
- Use test card: 4242 4242 4242 4242
- Check Stripe dashboard for test events

**Login not working?**
- Verify Supabase URL and ANON_KEY
- Check Supabase project has Auth enabled

**Database showing old data?**
- Clear browser cache
- Hard refresh with Ctrl+Shift+R

## Next Steps

1. **Customize demo data** - Edit `scripts/002_insert_demo_data.sql`
2. **Add your branding** - Update navbar, colors in `globals.css`
3. **Setup email verification** - Configure in Supabase Auth
4. **Deploy to Vercel** - `npm install -g vercel && vercel`
5. **Setup production Stripe** - Swap test keys for live keys

## Learn More

- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

## Support

For detailed database schema: See `DATABASE_SETUP.md`
For full feature overview: See `README.md`
