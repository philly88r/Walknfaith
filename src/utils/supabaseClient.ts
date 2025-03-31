import { createClient } from '@supabase/supabase-js';

// Direct connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.tmkwjwbjihhpgphfzvve.supabase.co:5432/postgres';

// Create Supabase client using direct connection
export const supabase = createClient(
  'https://tmkwjwbjihhpgphfzvve.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRta3dqd2JqaWhocGdwaGZ6dnZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NjY3NDYsImV4cCI6MjAzMjA0Mjc0Nn0.VUNgUNFgPmHYHT_Ym9lUdKzBiTEhJF_KbgeH-jkYJYQ',
  {
    db: {
      schema: 'public',
    },
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      headers: { 'x-application-name': 'walknfaith' },
    },
  }
);

// Export the connection string for direct database operations if needed
export const dbConnectionString = connectionString;

export default supabase;
