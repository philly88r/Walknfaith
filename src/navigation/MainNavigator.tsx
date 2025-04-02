import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native-web';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import ProfileFormScreen from '../screens/ProfileFormScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Simple loading component
const LoadingView = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={colors.primary} />
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
);

const MainNavigator = () => {
  const { user, loading: authLoading } = useAuth();
  const { isProfileComplete, isLoading: profileLoading } = useProfile();
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);

  useEffect(() => {
    if (!authLoading && !profileLoading) {
      if (user) {
        if (isProfileComplete) {
          setInitialRoute('Home');
        } else {
          setInitialRoute('ProfileForm');
        }
      } else {
        setInitialRoute('Login');
      }
    }
  }, [user, authLoading, isProfileComplete, profileLoading]);

  if (authLoading || profileLoading || !initialRoute) {
    return <LoadingView />;
  }

  return (
    <NavigationContainer>
      {!user ? (
        <AuthNavigator />
      ) : !isProfileComplete ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="ProfileForm" component={ProfileFormScreen} />
        </Stack.Navigator>
      ) : (
        <AppNavigator />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.primary,
  },
});

export default MainNavigator;
