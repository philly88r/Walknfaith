-- First, create the health_check table
CREATE TABLE IF NOT EXISTS public.health_check (
  id SERIAL PRIMARY KEY,
  status TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  details JSONB
);

-- Insert an initial record if the table is empty
INSERT INTO public.health_check (status, details)
SELECT 'active', '{"created_by": "system", "purpose": "connectivity_test"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM public.health_check LIMIT 1);

-- Function to create the health_check table
CREATE OR REPLACE FUNCTION public.create_health_check_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Create the health_check table if it doesn't exist
  CREATE TABLE IF NOT EXISTS public.health_check (
    id SERIAL PRIMARY KEY,
    status TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    details JSONB
  );
  
  -- Insert an initial record if the table is empty
  INSERT INTO public.health_check (status, details)
  SELECT 'active', '{"created_by": "system", "purpose": "connectivity_test"}'::jsonb
  WHERE NOT EXISTS (SELECT 1 FROM public.health_check LIMIT 1);
END;
$$;

-- Function to execute arbitrary SQL (use with caution, only for admin purposes)
CREATE OR REPLACE FUNCTION public.exec_sql(sql text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE sql;
END;
$$;

-- Grant access to the anonymous role
GRANT EXECUTE ON FUNCTION public.create_health_check_table() TO anon;
GRANT EXECUTE ON FUNCTION public.exec_sql(text) TO anon;

-- Set up row-level security for the health_check table
ALTER TABLE public.health_check ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read the health_check table
CREATE POLICY "Allow public read access to health_check" 
  ON public.health_check
  FOR SELECT
  TO anon
  USING (true);

-- Create a policy that allows authenticated users to insert into health_check
CREATE POLICY "Allow authenticated users to insert into health_check" 
  ON public.health_check
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
