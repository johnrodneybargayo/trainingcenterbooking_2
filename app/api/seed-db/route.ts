
import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables")
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    // 1. Insert Training Centers
    const trainingCenters = [
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Global Maritime Academy',
        description: 'Advanced Marine Engineering certification program for experienced seafarers. Comprehensive training in vessel propulsion, electrical systems, and engine management.',
        location: 'Singapore',
        image_url: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80',
        price_cents: 150000,
        duration_days: 30,
        rating: 4.8,
        reviews_count: 234,
        capacity: 25
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        name: 'Blue Horizon Training Center',
        description: 'Comprehensive Nautical Science and Navigation course covering international waters and modern navigation systems.',
        location: 'Malta',
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
        price_cents: 120000,
        duration_days: 21,
        rating: 4.6,
        reviews_count: 156,
        capacity: 30
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        name: 'Advanced Maritime Institute',
        description: 'STCW certification and safety training for all maritime professionals. IMO approved training facility.',
        location: 'Dubai',
        image_url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
        price_cents: 99000,
        duration_days: 14,
        rating: 4.7,
        reviews_count: 189,
        capacity: 28
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440004',
        name: 'Pacific Naval Academy',
        description: 'Specialist training in ship operations and management. Accredited program for marine officers.',
        location: 'Philippines',
        image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
        price_cents: 110000,
        duration_days: 21,
        rating: 4.5,
        reviews_count: 92,
        capacity: 25
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440005',
        name: 'European Maritime College',
        description: 'Captain and Chief Engineer development program. Elite training for senior maritime professionals.',
        location: 'Rotterdam',
        image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
        price_cents: 180000,
        duration_days: 35,
        rating: 4.9,
        reviews_count: 267,
        capacity: 20
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440006',
        name: 'Ocean Safety Institute',
        description: 'Basic safety training and emergency procedures for marine crew. Entry-level certification program.',
        location: 'Mumbai',
        image_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
        price_cents: 45000,
        duration_days: 7,
        rating: 4.4,
        reviews_count: 78,
        capacity: 40
      }
    ]

    const { error: centersError } = await supabase
      .from('training_centers')
      .upsert(trainingCenters)

    if (centersError) {
      console.error('Error inserting training centers:', centersError)
      return NextResponse.json({ error: centersError.message }, { status: 500 })
    }

    // 2. Insert Refund Policies
    const refundPolicies = [
      // Global Maritime Academy
      { training_center_id: '550e8400-e29b-41d4-a716-446655440001', days_before_training: 30, refund_percentage: 100, description: '30+ days before training - Full refund' },
      { training_center_id: '550e8400-e29b-41d4-a716-446655440001', days_before_training: 29, refund_percentage: 50, description: '15-29 days before training - 50% refund' },
      { training_center_id: '550e8400-e29b-41d4-a716-446655440001', days_before_training: 14, refund_percentage: 25, description: '7-14 days before training - 25% refund' },
      { training_center_id: '550e8400-e29b-41d4-a716-446655440001', days_before_training: 6, refund_percentage: 0, description: 'Less than 7 days - No refund' },
      // Blue Horizon
      { training_center_id: '550e8400-e29b-41d4-a716-446655440002', days_before_training: 30, refund_percentage: 100, description: '30+ days before training - Full refund' },
      { training_center_id: '550e8400-e29b-41d4-a716-446655440002', days_before_training: 29, refund_percentage: 50, description: '15-29 days before training - 50% refund' },
      { training_center_id: '550e8400-e29b-41d4-a716-446655440002', days_before_training: 14, refund_percentage: 25, description: '7-14 days before training - 25% refund' },
      { training_center_id: '550e8400-e29b-41d4-a716-446655440002', days_before_training: 6, refund_percentage: 0, description: 'Less than 7 days - No refund' },
      // Advanced Maritime
      { training_center_id: '550e8400-e29b-41d4-a716-446655440003', days_before_training: 30, refund_percentage: 100, description: '30+ days before training - Full refund' },
      { training_center_id: '550e8400-e29b-41d4-a716-446655440003', days_before_training: 29, refund_percentage: 50, description: '15-29 days before training - 50% refund' },
      { training_center_id: '550e8400-e29b-41d4-a716-446655440003', days_before_training: 14, refund_percentage: 25, description: '7-14 days before training - 25% refund' },
      { training_center_id: '550e8400-e29b-41d4-a716-446655440003', days_before_training: 6, refund_percentage: 0, description: 'Less than 7 days - No refund' },
      // Pacific Naval
      { training_center_id: '550e8400-e29b-41d4-a716-446655440004', days_before_training: 30, refund_percentage: 100, description: '30+ days before training - Full refund' },
      { training_center_id: '550e8400-e29b-41d4-a716-446655440004', days_before_training: 29, refund_percentage: 50, description: '15-29 days before training - 50% refund' },
      { training_center_id: '550e8400-e29b-41d4-a716-446655440004', days_before_training: 14, refund_percentage: 25, description: '7-14 days before training - 25% refund' },
      { training_center_id: '550e8400-e29b-41d4-a716-446655440004', days_before_training: 6, refund_percentage: 0, description: 'Less than 7 days - No refund' },
      // European Maritime
      { training_center_id: '550e8400-e29b-41d4-a716-446655440005', days_before_training: 30, refund_percentage: 100, description: '30+ days before training - Full refund' },
      { training_center_id: '550e8400-e29b-41d4-a716-446655440005', days_before_training: 29, refund_percentage: 50, description: '15-29 days before training - 50% refund' },
      { training_center_id: '550e8400-e29b-41d4-a716-446655440005', days_before_training: 14, refund_percentage: 25, description: '7-14 days before training - 25% refund' },
      { training_center_id: '550e8400-e29b-41d4-a716-446655440005', days_before_training: 6, refund_percentage: 0, description: 'Less than 7 days - No refund' },
      // Ocean Safety
      { training_center_id: '550e8400-e29b-41d4-a716-446655440006', days_before_training: 30, refund_percentage: 100, description: '30+ days before training - Full refund' },
      { training_center_id: '550e8400-e29b-41d4-a716-446655440006', days_before_training: 29, refund_percentage: 50, description: '15-29 days before training - 50% refund' },
      { training_center_id: '550e8400-e29b-41d4-a716-446655440006', days_before_training: 14, refund_percentage: 25, description: '7-14 days before training - 25% refund' },
      { training_center_id: '550e8400-e29b-41d4-a716-446655440006', days_before_training: 6, refund_percentage: 0, description: 'Less than 7 days - No refund' }
    ]

    // Note: Refund policies table might not have constraints on unique combinations, but let's assume simple insert is safer if we don't have IDs
    // But upsert requires a primary key or unique constraint. 
    // The SQL didn't provide IDs for refund policies? 
    // Wait, the SQL provided: INSERT INTO ... VALUES (..., ..., ...). 
    // Ah, line 12: INSERT INTO public.refund_policies (training_center_id, ...)
    // It did NOT provide IDs. The table has default uuid generation.
    // If I run this multiple times, it will duplicate data.
    // I should delete existing policies for these centers first?
    // Or just insert and accept duplication for now (it's a seed script).
    // Better: Delete where training_center_id is in our list.
    
    const centerIds = trainingCenters.map(c => c.id)
    await supabase.from('refund_policies').delete().in('training_center_id', centerIds)
    
    const { error: refundError } = await supabase
      .from('refund_policies')
      .insert(refundPolicies)

    if (refundError) {
      console.error('Error inserting refund policies:', refundError)
      return NextResponse.json({ error: refundError.message }, { status: 500 })
    }

    // 3. Insert Requirements
    const requirements = [
      // Global Maritime Academy
      { id: '650e8400-e29b-41d4-a716-446655440001', training_center_id: '550e8400-e29b-41d4-a716-446655440001', requirement_name: 'Valid Passport', requirement_type: 'document', is_mandatory: true },
      { id: '650e8400-e29b-41d4-a716-446655440002', training_center_id: '550e8400-e29b-41d4-a716-446655440001', requirement_name: 'Marine Engineering Degree', requirement_type: 'document', is_mandatory: true },
      { id: '650e8400-e29b-41d4-a716-446655440003', training_center_id: '550e8400-e29b-41d4-a716-446655440001', requirement_name: 'Medical Certificate (Form 5)', requirement_type: 'document', is_mandatory: true },
      { id: '650e8400-e29b-41d4-a716-446655440004', training_center_id: '550e8400-e29b-41d4-a716-446655440001', requirement_name: 'Sea Service Certificate (2+ years)', requirement_type: 'document', is_mandatory: true },
      { id: '650e8400-e29b-41d4-a716-446655440005', training_center_id: '550e8400-e29b-41d4-a716-446655440001', requirement_name: 'Training Certificate (optional)', requirement_type: 'document', is_mandatory: false },
      // Blue Horizon
      { id: '650e8400-e29b-41d4-a716-446655440006', training_center_id: '550e8400-e29b-41d4-a716-446655440002', requirement_name: 'Valid Passport', requirement_type: 'document', is_mandatory: true },
      { id: '650e8400-e29b-41d4-a716-446655440007', training_center_id: '550e8400-e29b-41d4-a716-446655440002', requirement_name: 'Navigation Qualification', requirement_type: 'document', is_mandatory: true },
      { id: '650e8400-e29b-41d4-a716-446655440008', training_center_id: '550e8400-e29b-41d4-a716-446655440002', requirement_name: 'Medical Clearance', requirement_type: 'document', is_mandatory: true },
      { id: '650e8400-e29b-41d4-a716-446655440009', training_center_id: '550e8400-e29b-41d4-a716-446655440002', requirement_name: 'Bridge Team Management Certificate (optional)', requirement_type: 'document', is_mandatory: false },
      // Advanced Maritime
      { id: '650e8400-e29b-41d4-a716-446655440010', training_center_id: '550e8400-e29b-41d4-a716-446655440003', requirement_name: 'Valid Passport', requirement_type: 'document', is_mandatory: true },
      { id: '650e8400-e29b-41d4-a716-446655440011', training_center_id: '550e8400-e29b-41d4-a716-446655440003', requirement_name: 'STCW Convention Certificate', requirement_type: 'document', is_mandatory: true },
      { id: '650e8400-e29b-41d4-a716-446655440012', training_center_id: '550e8400-e29b-41d4-a716-446655440003', requirement_name: 'Medical Fitness Certificate', requirement_type: 'document', is_mandatory: true },
      { id: '650e8400-e29b-41d4-a716-446655440013', training_center_id: '550e8400-e29b-41d4-a716-446655440003', requirement_name: 'Personal Safety Training Certificate (optional)', requirement_type: 'document', is_mandatory: false },
      // Pacific Naval
      { id: '650e8400-e29b-41d4-a716-446655440014', training_center_id: '550e8400-e29b-41d4-a716-446655440004', requirement_name: 'Valid Passport', requirement_type: 'document', is_mandatory: true },
      { id: '650e8400-e29b-41d4-a716-446655440015', training_center_id: '550e8400-e29b-41d4-a716-446655440004', requirement_name: 'Ship Operations License', requirement_type: 'document', is_mandatory: true },
      { id: '650e8400-e29b-41d4-a716-446655440016', training_center_id: '550e8400-e29b-41d4-a716-446655440004', requirement_name: 'Medical Certificate', requirement_type: 'document', is_mandatory: true },
      // European Maritime
      { id: '650e8400-e29b-41d4-a716-446655440017', training_center_id: '550e8400-e29b-41d4-a716-446655440005', requirement_name: 'Valid Passport', requirement_type: 'document', is_mandatory: true },
      { id: '650e8400-e29b-41d4-a716-446655440018', training_center_id: '550e8400-e29b-41d4-a716-446655440005', requirement_name: 'Master/Chief Engineer License', requirement_type: 'document', is_mandatory: true },
      { id: '650e8400-e29b-41d4-a716-446655440019', training_center_id: '550e8400-e29b-41d4-a716-446655440005', requirement_name: 'Medical Fitness Certificate', requirement_type: 'document', is_mandatory: true },
      { id: '650e8400-e29b-41d4-a716-446655440020', training_center_id: '550e8400-e29b-41d4-a716-446655440005', requirement_name: 'Command Experience Certificate (5+ years)', requirement_type: 'document', is_mandatory: true },
      // Ocean Safety
      { id: '650e8400-e29b-41d4-a716-446655440021', training_center_id: '550e8400-e29b-41d4-a716-446655440006', requirement_name: 'Valid Passport', requirement_type: 'document', is_mandatory: true },
      { id: '650e8400-e29b-41d4-a716-446655440022', training_center_id: '550e8400-e29b-41d4-a716-446655440006', requirement_name: 'Seaman Book', requirement_type: 'document', is_mandatory: true },
      { id: '650e8400-e29b-41d4-a716-446655440023', training_center_id: '550e8400-e29b-41d4-a716-446655440006', requirement_name: 'Medical Certificate (basic)', requirement_type: 'document', is_mandatory: true }
    ]

    const { error: requirementsError } = await supabase
      .from('requirements')
      .upsert(requirements)

    if (requirementsError) {
      console.error('Error inserting requirements:', requirementsError)
      return NextResponse.json({ error: requirementsError.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Database seeded successfully with training centers, refund policies, and requirements' })
  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
