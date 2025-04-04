import { supabase } from './supabaseClient';

// User purpose type
export type UserPurpose = 'career_help' | 'patient';

// Interface for user profile data
export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  user_purpose?: UserPurpose;
  address?: string;
  emergency_contact?: string;
  emergency_phone?: string;
  notifications?: boolean;
  email_updates?: boolean;
  profile_completed?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Create a new user profile
export const createUserProfile = async (
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
  userPurpose?: UserPurpose
): Promise<{ data: any; error: any }> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert([
      {
        id: userId,
        first_name: firstName,
        last_name: lastName,
        email: email,
        user_purpose: userPurpose,
        profile_completed: !!userPurpose,
        created_at: new Date().toISOString(),
      },
    ])
    .select();

  return { data, error };
};

// Get user profile by user ID
export const getUserProfile = async (userId: string): Promise<{ data: UserProfile | null; error: any }> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  return { data, error };
};

// Update user profile
export const updateUserProfile = async (
  userId: string,
  updates: Partial<UserProfile>
): Promise<{ data: any; error: any }> => {
  console.log('updateUserProfile called with:', { userId, updates });
  
  // If user_purpose is being set, mark profile as completed
  const updatedData = {
    ...updates,
    updated_at: new Date().toISOString(),
  };
  
  // If user purpose is being set, mark profile as completed
  if (updates.user_purpose) {
    updatedData.profile_completed = true;
    console.log('Setting profile_completed to true');
  }

  try {
    console.log('Sending update to Supabase:', updatedData);
    
    // First check if the profile exists
    const { data: existingProfile, error: checkError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    console.log('Existing profile check:', { existingProfile, checkError });
    
    let result;
    
    if (checkError || !existingProfile) {
      // Profile doesn't exist, create it
      console.log('Profile not found, creating new profile');
      result = await supabase
        .from('user_profiles')
        .insert({
          id: userId,
          ...updatedData
        })
        .select();
    } else {
      // Profile exists, update it
      console.log('Profile found, updating existing profile');
      result = await supabase
        .from('user_profiles')
        .update(updatedData)
        .eq('id', userId)
        .select();
    }
    
    console.log('Supabase update result:', result);
    return result;
  } catch (err) {
    console.error('Error in updateUserProfile:', err);
    return { data: null, error: err };
  }
};

// Check if user has completed their profile
export const isProfileCompleted = async (userId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('profile_completed')
    .eq('id', userId)
    .single();
  
  if (error || !data) {
    return false;
  }
  
  return !!data.profile_completed;
};
