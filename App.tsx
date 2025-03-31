import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import { View, Text, ActivityIndicator } from 'react-native-web';
import { ProfileProvider } from './src/context/ProfileContext';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { colors } from './src/theme/colors';

// Enable screens for better performance
enableScreens();

class ErrorBoundary extends React.Component<any, { hasError: boolean, error: Error | null }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Something went wrong.</Text>
          <Text>{this.state.error?.toString()}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

// Main app container that checks auth state
const AppContainer = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ProfileProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <StatusBar style="light" />
          {user ? <AppNavigator /> : <AuthNavigator />}
        </SafeAreaProvider>
      </NavigationContainer>
    </ProfileProvider>
  );
};

export default function App() {
  // Log that the app is rendering
  console.log('App is rendering');
  
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContainer />
      </AuthProvider>
    </ErrorBoundary>
  );
}
