import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { getUserProfile, updateUserProfile, UserProfile as SupabaseUserProfile } from '../utils/userProfile';
import { supabase } from '../utils/supabaseClient';

// Client-side UserProfile interface
export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  userPurpose?: 'career_help' | 'patient';
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  notifications: boolean;
  emailUpdates: boolean;
}

interface ProfileContextType {
  profile: UserProfile | null;
  updateProfile: (profile: UserProfile) => Promise<void>;
  clearProfile: () => void;
  isProfileComplete: boolean;
  isLoading: boolean;
}

const defaultProfile: UserProfile = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  userPurpose: undefined,
  address: '',
  emergencyContact: '',
  emergencyPhone: '',
  notifications: true,
  emailUpdates: true,
};

const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  updateProfile: async () => {},
  clearProfile: () => {},
  isProfileComplete: false,
  isLoading: false,
});

export const useProfile = () => useContext(ProfileContext);

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Load profile from Supabase when user changes
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setProfile(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const { data, error } = await getUserProfile(user.id);
        
        if (error) {
          console.error('Error loading profile:', error);
          setProfile(null);
        } else if (data) {
          // Map Supabase profile data to our app's UserProfile format
          // Use default values for fields that don't exist in the database
          setProfile({
            firstName: data.first_name || '',
            lastName: data.last_name || '',
            email: user?.email || '', // Use user email from auth context
            phone: data.phone || '',
            userPurpose: data.user_purpose as 'career_help' | 'patient' | undefined,
            // Default values for fields that don't exist in the database
            address: '',
            emergencyContact: '',
            emergencyPhone: '',
            notifications: true,
            emailUpdates: true,
          });
          
          // Check if profile is complete - must have name, email and user purpose
          setIsProfileComplete(!!data.first_name && !!data.last_name && !!data.email && !!data.user_purpose);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
        setProfile(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();

    // Set up subscription to profile changes
    let profileSubscription: { unsubscribe: () => void } | null = null;
    
    if (user) {
      profileSubscription = supabase
        .channel('profile-changes')
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'user_profiles',
            filter: `id=eq.${user.id}` 
          }, 
          () => {
            loadProfile();
          }
        )
        .subscribe();
    }

    // Clean up subscription
    return () => {
      if (profileSubscription) {
        profileSubscription.unsubscribe();
      }
    };
  }, [user]);

  // Update profile in Supabase
  const updateProfile = async (updatedProfile: UserProfile) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      // Convert from client UserProfile to Supabase format
      // Only include fields that actually exist in the user_profiles table
      const supabaseProfileData: Partial<SupabaseUserProfile> = {
        first_name: updatedProfile.firstName,
        last_name: updatedProfile.lastName,
        phone: updatedProfile.phone,
        user_purpose: updatedProfile.userPurpose,
        // These fields don't exist in the database table, so we don't include them
        // Commented out to prevent database errors
        // email: updatedProfile.email,
        // address: updatedProfile.address,
        // emergency_contact: updatedProfile.emergencyContact,
        // emergency_phone: updatedProfile.emergencyPhone,
        // notifications: updatedProfile.notifications,
        // email_updates: updatedProfile.emailUpdates,
      };

      const { error } = await updateUserProfile(user.id, supabaseProfileData);
      
      if (error) {
        throw error;
      }
      
      setProfile(updatedProfile);
      setIsProfileComplete(!!updatedProfile.firstName && !!updatedProfile.lastName && !!updatedProfile.email && !!updatedProfile.userPurpose);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const clearProfile = () => {
    setProfile(null);
    setIsProfileComplete(false);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        clearProfile,
        isProfileComplete,
        isLoading,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
