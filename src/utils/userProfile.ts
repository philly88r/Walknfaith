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
    .from('profiles')
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
    .from('profiles')
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
  // If user_purpose is being set, mark profile as completed
  const updatedData = {
    ...updates,
    updated_at: new Date().toISOString(),
  };
  
  // If user purpose is being set, mark profile as completed
  if (updates.user_purpose) {
    updatedData.profile_completed = true;
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(updatedData)
    .eq('id', userId)
    .select();

  return { data, error };
};

// Check if user has completed their profile
export const isProfileCompleted = async (userId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('profile_completed')
    .eq('id', userId)
    .single();
  
  if (error || !data) {
    return false;
  }
  
  return !!data.profile_completed;
};
