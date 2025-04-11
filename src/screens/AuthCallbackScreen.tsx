import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native-web';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabaseClient';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type AuthCallbackScreenProps = NativeStackNavigationProp<RootStackParamList>;

const AuthCallbackScreen: React.FC = () => {
  const navigation = useNavigation<AuthCallbackScreenProps>();
  const [message, setMessage] = useState<string>('Processing authentication...');
  const [error, setError] = useState<string | null>(null);
  const { getSession } = useAuth() as any; // Add getSession to your AuthContext if not already there

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the URL hash parameters
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        
        // Check if this is an auth callback
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        const type = params.get('type');
        
        console.log('Auth callback detected, type:', type);
        
        if (accessToken && refreshToken) {
          // Handle the auth session
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          
          if (error) {
            console.error('Error setting session:', error);
            setError('Failed to authenticate. Please try again.');
          } else {
            console.log('Authentication successful');
            setMessage('Authentication successful! Redirecting...');
            
            // Refresh the session in your auth context
            if (getSession) {
              await getSession();
            }
            
            // Navigate to the home screen or profile page
            setTimeout(() => {
              navigation.navigate('Home');
            }, 1500);
          }
        } else if (type === 'recovery') {
          // Handle password reset
          setMessage('Password reset link detected. Please set your new password.');
          setTimeout(() => {
            navigation.navigate('ResetPassword');
          }, 1500);
        } else {
          // Not an auth callback or missing tokens
          setMessage('No authentication data found. Redirecting to home...');
          setTimeout(() => {
            navigation.navigate('Home');
          }, 1500);
        }
      } catch (err) {
        console.error('Error in auth callback:', err);
        setError('An unexpected error occurred. Please try again.');
      }
    };

    handleAuthCallback();
  }, [navigation, getSession]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} style={styles.spinner} />
      <Text style={styles.message}>{error || message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  spinner: {
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default AuthCallbackScreen;
