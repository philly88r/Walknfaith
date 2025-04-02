import { createClient } from '@supabase/supabase-js';

// Supabase URL and anon key
const supabaseUrl = 'https://lfonyjxjrvrshsiepovq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxmb255anhqcnZyc2hzaWVwb3ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MTQ2MjgsImV4cCI6MjA1NTM5MDYyOH0.pq-pu2QfN5HLzlhNhEVkCxV7bAYiwvHYpyCDWLeAkcQ';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: { 'x-application-name': 'walknfaith' },
  },
});

export default supabase;
