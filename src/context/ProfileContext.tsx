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
          setProfile({
            firstName: data.first_name || '',
            lastName: data.last_name || '',
            email: data.email || '',
            phone: data.phone || '',
            address: data.address || '',
            emergencyContact: data.emergency_contact || '',
            emergencyPhone: data.emergency_phone || '',
            notifications: data.notifications !== undefined ? data.notifications : true,
            emailUpdates: data.email_updates !== undefined ? data.email_updates : true,
          });
          
          // Check if profile is complete
          setIsProfileComplete(!!data.first_name && !!data.last_name && !!data.email);
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
            table: 'profiles',
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
      const supabaseProfileData: Partial<SupabaseUserProfile> = {
        first_name: updatedProfile.firstName,
        last_name: updatedProfile.lastName,
        email: updatedProfile.email,
        phone: updatedProfile.phone,
        address: updatedProfile.address,
        emergency_contact: updatedProfile.emergencyContact,
        emergency_phone: updatedProfile.emergencyPhone,
        notifications: updatedProfile.notifications,
        email_updates: updatedProfile.emailUpdates,
      };

      const { error } = await updateUserProfile(user.id, supabaseProfileData);
      
      if (error) {
        throw error;
      }
      
      setProfile(updatedProfile);
      setIsProfileComplete(!!updatedProfile.firstName && !!updatedProfile.lastName && !!updatedProfile.email);
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
