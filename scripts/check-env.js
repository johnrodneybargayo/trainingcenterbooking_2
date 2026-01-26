
require('dotenv').config({ path: '.env.local' });
console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Found' : 'Missing');
console.log('Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Found' : 'Missing');
console.log('Service Role:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Found' : 'Missing');
