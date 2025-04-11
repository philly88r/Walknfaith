import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { View, Text } from 'react-native-web';
import { ProfileProvider } from './src/context/ProfileContext';
import { AuthProvider } from './src/context/AuthContext';
import MainNavigator from './src/navigation/MainNavigator';
import runDatabaseSetup from './src/utils/setupDatabase';

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

export default function App() {
  // Log that the app is rendering
  console.log('App is rendering');
  
  // Run database setup when the app starts
  useEffect(() => {
    console.log('Running database setup...');
    runDatabaseSetup();
  }, []);
  
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ProfileProvider>
          <NavigationContainer>
            <SafeAreaProvider>
              <StatusBar style="light" />
              <MainNavigator />
            </SafeAreaProvider>
          </NavigationContainer>
        </ProfileProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
