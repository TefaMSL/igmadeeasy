// ==========================================
// Supabase Configuration (Placeholder)
// ==========================================
// TODO: Replace these with your actual Supabase Project URL and Anon Key
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-anon-key-here...';

// Create a single supabase client for interacting with your database
// We use window.supabase to access the CDN object and avoid naming conflicts
const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
