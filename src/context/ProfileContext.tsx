import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  notifications: boolean;
  emailUpdates: boolean;
}

interface ProfileContextType {
  profile: UserProfile | null;
  updateProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
  isProfileComplete: boolean;
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
  updateProfile: () => {},
  clearProfile: () => {},
  isProfileComplete: false,
});

export const useProfile = () => useContext(ProfileContext);

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  // Load profile from storage on initial render
  useEffect(() => {
    const loadProfile = async () => {
      try {
        // In a real app, this would load from AsyncStorage or similar
        // For now, we'll just use a simulated empty profile
        // const savedProfile = await AsyncStorage.getItem('userProfile');
        // if (savedProfile) {
        //   setProfile(JSON.parse(savedProfile));
        // }
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };

    loadProfile();
  }, []);

  // Check if profile is complete whenever it changes
  useEffect(() => {
    if (profile) {
      const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
      const hasRequiredFields = requiredFields.every(field => 
        profile[field as keyof UserProfile] && 
        String(profile[field as keyof UserProfile]).trim() !== ''
      );
      setIsProfileComplete(hasRequiredFields);
    } else {
      setIsProfileComplete(false);
    }
  }, [profile]);

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    // In a real app, save to AsyncStorage or similar
    // AsyncStorage.setItem('userProfile', JSON.stringify(newProfile));
  };

  const clearProfile = () => {
    setProfile(null);
    // In a real app, remove from AsyncStorage or similar
    // AsyncStorage.removeItem('userProfile');
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, clearProfile, isProfileComplete }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
