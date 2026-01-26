
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read .env.local manually
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    env[key.trim()] = value.trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('Seeding database...');
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

    console.log('Inserting training centers...');
    const { error: centersError } = await supabase
      .from('training_centers')
      .upsert(trainingCenters)

    if (centersError) {
      console.error('Error inserting training centers:', centersError)
      return;
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

    console.log('Inserting refund policies...');
    const centerIds = trainingCenters.map(c => c.id)
    await supabase.from('refund_policies').delete().in('training_center_id', centerIds)
    
    const { error: refundError } = await supabase
      .from('refund_policies')
      .insert(refundPolicies)

    if (refundError) {
      console.error('Error inserting refund policies:', refundError)
      return;
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

    console.log('Inserting requirements...');
    const { error: requirementsError } = await supabase
      .from('requirements')
      .upsert(requirements)

    if (requirementsError) {
      console.error('Error inserting requirements:', requirementsError)
      return;
    }

    console.log('Database seeded successfully with training centers, refund policies, and requirements');
  } catch (error) {
    console.error('Seeding error:', error)
  }
}

seed();
