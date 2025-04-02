import { createClient } from '@supabase/supabase-js';

// Supabase URL and anon key
const supabaseUrl = 'https://tmkwjwbjihhpgphfzvve.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRta3dqd2JqaWhocGdwaGZ6dnZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NjY3NDYsImV4cCI6MjAzMjA0Mjc0Nn0.VUNgUNFgPmHYHT_Ym9lUdKzBiTEhJF_KbgeH-jkYJYQ';

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
