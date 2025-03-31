import { supabase } from './supabaseClient';

// Interface for user profile data
export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  emergency_contact?: string;
  emergency_phone?: string;
  notifications?: boolean;
  email_updates?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Create a new user profile
export const createUserProfile = async (
  userId: string,
  firstName: string,
  lastName: string,
  email: string
): Promise<{ data: any; error: any }> => {
  const { data, error } = await supabase
    .from('profiles')
    .insert([
      {
        id: userId,
        first_name: firstName,
        last_name: lastName,
        email: email,
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
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select();

  return { data, error };
};
