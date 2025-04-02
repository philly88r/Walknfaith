import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';
import LoadingScreen from '../components/LoadingScreen';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import ProfileFormScreen from '../screens/ProfileFormScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { isProfileComplete, isLoading: profileLoading } = useProfile();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for auth and profile checks to complete
    if (!authLoading && !profileLoading) {
      setIsLoading(false);
    }
  }, [authLoading, profileLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {!user ? (
        <AuthNavigator />
      ) : !isProfileComplete ? (
        <Stack.Navigator 
          screenOptions={{ 
            headerShown: false,
            contentStyle: { backgroundColor: colors.white }
          }}
        >
          <Stack.Screen name="ProfileForm" component={ProfileFormScreen} />
        </Stack.Navigator>
      ) : (
        <AppNavigator />
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;
