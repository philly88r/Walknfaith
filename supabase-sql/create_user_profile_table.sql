-- Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_purpose TEXT NOT NULL CHECK (user_purpose IN ('career_help', 'patient')),
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  profile_completed BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create a function to check if a user has completed their profile
CREATE OR REPLACE FUNCTION public.is_profile_completed(user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  is_completed BOOLEAN;
BEGIN
  SELECT profile_completed INTO is_completed
  FROM public.user_profiles
  WHERE id = user_id;
  
  RETURN COALESCE(is_completed, FALSE);
END;
$$;

-- Create a function to update a user's profile
CREATE OR REPLACE FUNCTION public.update_user_profile(
  user_id UUID,
  p_user_purpose TEXT,
  p_first_name TEXT DEFAULT NULL,
  p_last_name TEXT DEFAULT NULL,
  p_phone TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Insert or update the user profile
  INSERT INTO public.user_profiles (
    id, 
    user_purpose, 
    first_name, 
    last_name, 
    phone,
    profile_completed,
    updated_at
  )
  VALUES (
    user_id,
    p_user_purpose,
    p_first_name,
    p_last_name,
    p_phone,
    TRUE,
    NOW()
  )
  ON CONFLICT (id) 
  DO UPDATE SET
    user_purpose = p_user_purpose,
    first_name = COALESCE(p_first_name, user_profiles.first_name),
    last_name = COALESCE(p_last_name, user_profiles.last_name),
    phone = COALESCE(p_phone, user_profiles.phone),
    profile_completed = TRUE,
    updated_at = NOW();
    
  -- Return the updated profile
  SELECT jsonb_build_object(
    'id', id,
    'user_purpose', user_purpose,
    'first_name', first_name,
    'last_name', last_name,
    'phone', phone,
    'profile_completed', profile_completed,
    'updated_at', updated_at
  ) INTO result
  FROM public.user_profiles
  WHERE id = user_id;
  
  RETURN result;
END;
$$;

-- Set up row-level security for the user_profiles table
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows users to read only their own profile
CREATE POLICY "Users can read their own profile" 
  ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Create a policy that allows users to update only their own profile
CREATE POLICY "Users can update their own profile" 
  ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Create a policy that allows users to insert only their own profile
CREATE POLICY "Users can insert their own profile" 
  ON public.user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Grant access to the functions
GRANT EXECUTE ON FUNCTION public.is_profile_completed(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_user_profile(UUID, TEXT, TEXT, TEXT, TEXT) TO authenticated;
