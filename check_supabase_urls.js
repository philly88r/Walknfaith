// Script to check Supabase URL configurations
// Run with: node check_supabase_urls.js

const { createClient } = require('@supabase/supabase-js');

// Your Supabase URL - this should match what's in your application
const supabaseUrl = 'https://tmkwjwbjihhpgphfzvve.supabase.co';

// Get the API key from environment variable for security
// DO NOT hardcode your password or API key in scripts
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseKey) {
  console.error('Error: SUPABASE_KEY environment variable is not set.');
  console.log('Run this script with: SUPABASE_KEY=your_key node check_supabase_urls.js');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkConfiguration() {
  console.log('Checking Supabase configuration...');
  console.log('Supabase URL:', supabaseUrl);
  
  try {
    // Check if we can connect to Supabase
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error connecting to Supabase:', error.message);
    } else {
      console.log('Successfully connected to Supabase!');
      
      // Check redirect URLs in your code
      console.log('\nRedirect URLs that should be configured in Supabase dashboard:');
      console.log('1. https://walknfaith.vercel.app');
      console.log('2. https://walknfaith.vercel.app/reset-password');
      
      // Check if your app is using the correct URLs
      console.log('\nVerify that your AuthContext.tsx file contains these URLs:');
      console.log('- For signUp: https://walknfaith.vercel.app');
      console.log('- For resetPassword: https://walknfaith.vercel.app/reset-password');
      
      console.log('\nMake sure these URLs are also added to the Redirect URLs in your Supabase dashboard.');
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

checkConfiguration();
