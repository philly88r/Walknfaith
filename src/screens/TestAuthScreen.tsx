import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native-web';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';
import { colors } from '../theme/colors';
import { supabase } from '../utils/supabaseClient';

const TestAuthScreen = () => {
  const { user, signOut } = useAuth();
  const { profile, isLoading } = useProfile();
  const [testResult, setTestResult] = useState<string>('');
  const [isTestRunning, setIsTestRunning] = useState(false);

  const runAuthTest = async () => {
    setIsTestRunning(true);
    setTestResult('');
    
    try {
      // Test Supabase connection
      const { data, error } = await supabase.from('profiles').select('count').single();
      
      if (error) {
        setTestResult(`❌ Supabase connection failed: ${error.message}`);
        return;
      }
      
      // Check user authentication
      if (!user) {
        setTestResult('❌ User not authenticated');
        return;
      }
      
      // Check profile data
      if (!profile) {
        setTestResult('❌ User profile not loaded');
        return;
      }
      
      // All tests passed
      setTestResult(`✅ Authentication system working correctly!
      
User ID: ${user.id}
Email: ${user.email}
Profile: ${profile.firstName} ${profile.lastName}
Database connection: OK`);
      
    } catch (error) {
      setTestResult(`❌ Test failed with error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsTestRunning(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Authentication Test Page</Text>
        <Text style={styles.subHeaderText}>Use this page to verify Supabase authentication</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Current Authentication State</Text>
        
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Authenticated:</Text>
              <Text style={styles.infoValue}>{user ? 'Yes' : 'No'}</Text>
            </View>
            
            {user && (
              <>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>User ID:</Text>
                  <Text style={styles.infoValue}>{user.id}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Email:</Text>
                  <Text style={styles.infoValue}>{user.email}</Text>
                </View>
              </>
            )}
            
            {profile && (
              <>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Name:</Text>
                  <Text style={styles.infoValue}>{profile.firstName} {profile.lastName}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Profile Complete:</Text>
                  <Text style={styles.infoValue}>{profile.firstName && profile.lastName && profile.email ? 'Yes' : 'No'}</Text>
                </View>
              </>
            )}
          </>
        )}
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.testButton} 
          onPress={runAuthTest}
          disabled={isTestRunning}
        >
          {isTestRunning ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Run Authentication Test</Text>
          )}
        </TouchableOpacity>
        
        {user && (
          <TouchableOpacity 
            style={styles.signOutButton} 
            onPress={signOut}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {testResult !== '' && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Test Results</Text>
          <Text style={styles.resultText}>{testResult}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: colors.primary,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  subHeaderText: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.8,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: colors.white,
    margin: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.text,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  infoLabel: {
    flex: 1,
    fontWeight: 'bold',
    color: colors.text,
  },
  infoValue: {
    flex: 2,
    color: colors.text,
  },
  actionsContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  testButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: colors.error,
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultContainer: {
    padding: 20,
    backgroundColor: colors.white,
    margin: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text,
  },
  resultText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: colors.text,
    backgroundColor: colors.lightGray,
    padding: 10,
    borderRadius: 5,
    whiteSpace: 'pre-wrap',
  },
});

export default TestAuthScreen;
