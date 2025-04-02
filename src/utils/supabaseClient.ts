import { createClient } from '@supabase/supabase-js';

// Supabase URL and anon key
const supabaseUrl = 'https://tmkwjwbjihhpgphfzvve.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRta3dqd2JqaWhocGdwaGZ6dnZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MjgwMDgsImV4cCI6MjA1OTAwNDAwOH0.mHeVJe7rz42nB9NPBMloEEx6hMMOSCr8wLcaEiiFFx8';

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
