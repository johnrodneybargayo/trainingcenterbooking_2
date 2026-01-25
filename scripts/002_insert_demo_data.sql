-- Insert demo training centers
INSERT INTO public.training_centers (id, name, description, location, image_url, price_cents, duration_days, rating, reviews_count, capacity) 
VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Global Maritime Academy', 'Advanced Marine Engineering certification program for experienced seafarers. Comprehensive training in vessel propulsion, electrical systems, and engine management.', 'Singapore', 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80', 150000, 30, 4.8, 234, 25),
  ('550e8400-e29b-41d4-a716-446655440002', 'Blue Horizon Training Center', 'Comprehensive Nautical Science and Navigation course covering international waters and modern navigation systems.', 'Malta', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', 120000, 21, 4.6, 156, 30),
  ('550e8400-e29b-41d4-a716-446655440003', 'Advanced Maritime Institute', 'STCW certification and safety training for all maritime professionals. IMO approved training facility.', 'Dubai', 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80', 99000, 14, 4.7, 189, 28),
  ('550e8400-e29b-41d4-a716-446655440004', 'Pacific Naval Academy', 'Specialist training in ship operations and management. Accredited program for marine officers.', 'Philippines', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80', 110000, 21, 4.5, 92, 25),
  ('550e8400-e29b-41d4-a716-446655440005', 'European Maritime College', 'Captain and Chief Engineer development program. Elite training for senior maritime professionals.', 'Rotterdam', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', 180000, 35, 4.9, 267, 20),
  ('550e8400-e29b-41d4-a716-446655440006', 'Ocean Safety Institute', 'Basic safety training and emergency procedures for marine crew. Entry-level certification program.', 'Mumbai', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80', 45000, 7, 4.4, 78, 40);

-- Insert refund policies for each training center (standard policies)
INSERT INTO public.refund_policies (training_center_id, days_before_training, refund_percentage, description)
VALUES
  -- Global Maritime Academy
  ('550e8400-e29b-41d4-a716-446655440001', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440001', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440001', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440001', 6, 0, 'Less than 7 days - No refund'),
  
  -- Blue Horizon Training Center
  ('550e8400-e29b-41d4-a716-446655440002', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440002', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440002', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440002', 6, 0, 'Less than 7 days - No refund'),
  
  -- Advanced Maritime Institute
  ('550e8400-e29b-41d4-a716-446655440003', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440003', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440003', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440003', 6, 0, 'Less than 7 days - No refund'),
  
  -- Pacific Naval Academy
  ('550e8400-e29b-41d4-a716-446655440004', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440004', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440004', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440004', 6, 0, 'Less than 7 days - No refund'),
  
  -- European Maritime College
  ('550e8400-e29b-41d4-a716-446655440005', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440005', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440005', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440005', 6, 0, 'Less than 7 days - No refund'),
  
  -- Ocean Safety Institute
  ('550e8400-e29b-41d4-a716-446655440006', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440006', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440006', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440006', 6, 0, 'Less than 7 days - No refund');

-- Insert requirements for each training center
INSERT INTO public.requirements (id, training_center_id, requirement_name, requirement_type, is_mandatory)
VALUES
  -- Global Maritime Academy requirements (5 total)
  ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Valid Passport', 'document', true),
  ('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Marine Engineering Degree', 'document', true),
  ('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Medical Certificate (Form 5)', 'document', true),
  ('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'Sea Service Certificate (2+ years)', 'document', true),
  ('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001', 'Training Certificate (optional)', 'document', false),
  
  -- Blue Horizon Training Center requirements (4 total)
  ('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440002', 'Valid Passport', 'document', true),
  ('650e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440002', 'Navigation Qualification', 'document', true),
  ('650e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440002', 'Medical Clearance', 'document', true),
  ('650e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440002', 'Bridge Team Management Certificate (optional)', 'document', false),
  
  -- Advanced Maritime Institute requirements (4 total)
  ('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440003', 'Valid Passport', 'document', true),
  ('650e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440003', 'STCW Convention Certificate', 'document', true),
  ('650e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440003', 'Medical Fitness Certificate', 'document', true),
  ('650e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440003', 'Personal Safety Training Certificate (optional)', 'document', false),
  
  -- Pacific Naval Academy requirements (3 total)
  ('650e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440004', 'Valid Passport', 'document', true),
  ('650e8400-e29b-41d4-a716-446655440015', '550e8400-e29b-41d4-a716-446655440004', 'Ship Operations License', 'document', true),
  ('650e8400-e29b-41d4-a716-446655440016', '550e8400-e29b-41d4-a716-446655440004', 'Medical Certificate', 'document', true),
  
  -- European Maritime College requirements (4 total)
  ('650e8400-e29b-41d4-a716-446655440017', '550e8400-e29b-41d4-a716-446655440005', 'Valid Passport', 'document', true),
  ('650e8400-e29b-41d4-a716-446655440018', '550e8400-e29b-41d4-a716-446655440005', 'Master/Chief Engineer License', 'document', true),
  ('650e8400-e29b-41d4-a716-446655440019', '550e8400-e29b-41d4-a716-446655440005', 'Medical Fitness Certificate', 'document', true),
  ('650e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440005', 'Command Experience Certificate (5+ years)', 'document', true),
  
  -- Ocean Safety Institute requirements (3 total)
  ('650e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440006', 'Valid Passport', 'document', true),
  ('650e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440006', 'Seaman Book', 'document', true),
  ('650e8400-e29b-41d4-a716-446655440023', '550e8400-e29b-41d4-a716-446655440006', 'Medical Certificate (basic)', 'document', true);
