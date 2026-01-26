# Refund Policy Management Guide

## Overview

MarineHub includes a comprehensive refund policy system that automatically calculates refunds based on cancellation dates. Each training center can have its own customized refund policy.

## Default Refund Policy

All demo training centers use the standard refund policy:

| Days Before Training | Refund Percentage | Example |
|---------------------|------------------|---------|
| 30+ days            | 100%             | $1,500 full refund |
| 15-29 days          | 50%              | $1,500 → $750 refund |
| 7-14 days           | 25%              | $1,500 → $375 refund |
| < 7 days            | 0%               | No refund |

**Convenience Fee**: 2% is deducted from all bookings/refunds

## How It Works

### 1. Policy Display
Students see the refund policy on the training center detail page:
```
app/training-center/[id]/page.tsx → RefundPolicyCard component
```

The card clearly shows:
- Days before training requirement
- Refund percentage
- Example amounts
- Convenience fee disclosure

### 2. Database Storage
Refund policies are stored in the `refund_policies` table:

```sql
CREATE TABLE refund_policies (
  id UUID PRIMARY KEY,
  training_center_id UUID NOT NULL,
  days_before_training INTEGER,     -- 30, 29, 14, 6
  refund_percentage INTEGER,        -- 100, 50, 25, 0
  description TEXT                  -- Display text
)
```

Example records:
```
training_center_id: 550e8400-e29b-41d4-a716-446655440001
days_before_training: 30, refund_percentage: 100
days_before_training: 29, refund_percentage: 50
days_before_training: 14, refund_percentage: 25
days_before_training: 6,  refund_percentage: 0
```

### 3. Booking with Refund Tracking
The `bookings` table tracks:
```typescript
{
  price_cents: 150000,           // Original price
  convenience_fee_cents: 3000,   // 2% fee
  refund_amount_cents: 0,        // Calculated when cancelled
  status: 'pending'              // pending/confirmed/completed/cancelled
  cancelled_at: null             // Set when cancelled
}
```

## Refund Calculation Example

**Scenario**: Student books 30-day training for $1,500

**Day 1 (30+ days before)**
- Original: $1,500
- Convenience fee: $30 (2%)
- Total paid: $1,530
- If cancelled: 100% refund = $1,500

**Day 20 (15-29 days before)**
- If cancelled: 50% refund = $750

**Day 10 (7-14 days before)**
- If cancelled: 25% refund = $375

**Day 5 (< 7 days before)**
- If cancelled: 0% refund = $0

## Customizing Refund Policies

### Option 1: Direct Database Update
1. Go to Supabase → refund_policies table
2. Update `refund_percentage` for specific policies
3. Changes apply immediately

### Option 2: Via SQL Script
Update `scripts/002_insert_demo_data.sql` before inserting:

```sql
INSERT INTO refund_policies 
  (training_center_id, days_before_training, refund_percentage, description)
VALUES
  ('center-id', 30, 100, '30+ days - Full refund'),
  ('center-id', 29, 50, '15-29 days - 50% refund');
```

### Option 3: Admin UI (Future Feature)
Future implementation can add an admin page to customize policies via UI.

## Retrieving Policies in Code

```typescript
// On training center detail page
const { data: policiesData } = await supabase
  .from("refund_policies")
  .select("*")
  .eq("training_center_id", centerid)
  .order("days_before_training", { ascending: false })

// Sort and display
const sortedPolicies = policies.sort((a, b) => 
  b.days_before_training - a.days_before_training
)
```

## UI Component: RefundPolicyCard

Location: `components/refund-policy-card.tsx`

```typescript
<RefundPolicyCard 
  policies={refundPolicies}
  convenienceFeePercent={2}
/>
```

Features:
- ✅ Sorted by days (highest to lowest)
- ✅ Color-coded badges (Red = No refund, Green = Full refund)
- ✅ Clear descriptions
- ✅ Convenience fee disclaimer
- ✅ Responsive layout

## Student View

When viewing a training center, students see:

```
┌─ REFUND & CANCELLATION POLICY ───────────────────┐
│                                                   │
│ 30+ days before training - Full refund           │
│ [GREEN BADGE: 100% Refund]                       │
│                                                   │
│ 15-29 days before training - 50% refund          │
│ [YELLOW BADGE: 50% Refund]                       │
│                                                   │
│ 7-14 days before training - 25% refund           │
│ [ORANGE BADGE: 25% Refund]                       │
│                                                   │
│ Less than 7 days - No refund                     │
│ [RED BADGE: No Refund]                           │
│                                                   │
│ A 2% convenience fee will be added to your       │
│ booking                                          │
│                                                   │
└───────────────────────────────────────────────────┘
```

## Admin Features

### View Booking with Refund Info
Admin can view booking details showing:
- Original price
- Convenience fee deducted
- Current refund amount (if cancelled)
- Days remaining until training
- Applicable refund policy tier

### Cancel Booking (Future)
When implementing cancellation:
```typescript
// Calculate refund
const daysBefore = (trainingStartDate - now) / (1000 * 60 * 60 * 24)
const policy = refundPolicies.find(p => 
  daysBefore >= p.days_before_training
)
const refundPercent = policy.refund_percentage
const refundAmount = (booking.price_cents * refundPercent) / 100
```

## Convenience Fee Explanation

The 2% convenience fee covers:
- Payment processing costs (Stripe: ~2.9%)
- Platform operational costs
- Booking management and support

Fee is calculated as: `price_cents * 0.02`

## Analytics & Reporting

Admins can query refund data:

```sql
-- Total refunds by policy tier
SELECT 
  refund_percentage,
  COUNT(*) as cancellations,
  SUM(refund_amount_cents) as total_refunded
FROM bookings b
JOIN refund_policies rp ON rp.training_center_id = b.training_center_id
WHERE b.status = 'cancelled'
GROUP BY rp.refund_percentage;

-- Average refund by training center
SELECT 
  tc.name,
  AVG(b.refund_amount_cents) as avg_refund,
  COUNT(*) as total_cancellations
FROM bookings b
JOIN training_centers tc ON b.training_center_id = tc.id
WHERE b.status = 'cancelled'
GROUP BY tc.id, tc.name;
```

## Best Practices

1. **Clear Communication**
   - Display policy prominently before booking
   - Show policy in booking confirmation
   - Include in email confirmations (future)

2. **Fair Policies**
   - Allow adequate time for high refund rates
   - Reduce fee as start date approaches
   - Consider market standards

3. **Policy Updates**
   - Test changes before applying
   - Notify users of policy changes
   - Grandfather existing bookings

4. **Documentation**
   - Keep descriptions clear and concise
   - Use same language for consistency
   - Include examples where helpful

## Troubleshooting

**Policy not showing?**
- Verify refund_policies table has records for that training center
- Check training_center_id matches

**Wrong refund percentage?**
- Check days_before_training boundaries
- Verify refund_percentage values (0-100)
- Test calculation manually

**Convenience fee not applied?**
- Verify 2% in RefundPolicyCard component
- Check price calculation logic

## Future Enhancements

1. **Dynamic Policies**
   - Admin UI to create custom policies per training center
   - Seasonal variations
   - Time-limited promotions

2. **Refund Management**
   - Auto-refund on cancellation via Stripe
   - Refund disputes handling
   - Partial refunds

3. **Student Communication**
   - Email notification with refund policy
   - Refund tracker showing countdown
   - SMS reminders at policy thresholds

4. **Analytics**
   - Refund rate by training center
   - Revenue impact analysis
   - Cancellation trends

---

## Quick Reference

**Standard Policy (all demo centers):**
```
30+ days  → 100%
15-29 days → 50%
7-14 days  → 25%
<7 days    → 0%
```

**Convenience Fee:** 2% of total booking amount

**Key Files:**
- `scripts/002_insert_demo_data.sql` - Policy data
- `components/refund-policy-card.tsx` - Display component
- `app/training-center/[id]/page.tsx` - Integration point
- `DATABASE_SETUP.md` - Schema details
