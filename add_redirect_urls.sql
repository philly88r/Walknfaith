-- SQL script to add redirect URLs to Supabase auth settings
-- This assumes you're connecting to your Supabase PostgreSQL database

-- First, check if the auth settings table exists
DO $$
BEGIN
    -- Check current redirect URLs
    IF EXISTS (
        SELECT 1 FROM auth.config WHERE redirect_urls IS NOT NULL
    ) THEN
        -- Update redirect URLs if they exist but don't contain our URLs
        UPDATE auth.config
        SET redirect_urls = array_append(redirect_urls, 'https://walknfaith.vercel.app')
        WHERE NOT 'https://walknfaith.vercel.app' = ANY(redirect_urls);
        
        UPDATE auth.config
        SET redirect_urls = array_append(redirect_urls, 'https://walknfaith.vercel.app/reset-password')
        WHERE NOT 'https://walknfaith.vercel.app/reset-password' = ANY(redirect_urls);
    ELSE
        -- Insert new redirect URLs if none exist
        UPDATE auth.config
        SET redirect_urls = ARRAY['https://walknfaith.vercel.app', 'https://walknfaith.vercel.app/reset-password'];
    END IF;
    
    -- Set the site URL if it's not already set
    UPDATE auth.config
    SET site_url = 'https://walknfaith.vercel.app'
    WHERE site_url IS NULL OR site_url != 'https://walknfaith.vercel.app';
    
    RAISE NOTICE 'Redirect URLs and site URL have been updated successfully.';
END;
$$;
