import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native-web';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';
import { colors } from '../theme/colors';
import { updateUserProfile, UserPurpose } from '../utils/userProfile';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileForm'>;

const ProfileFormScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const { updateProfile } = useProfile();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [userPurpose, setUserPurpose] = useState<UserPurpose | ''>('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async () => {
    console.log('Submit button clicked');
    if (!firstName || !lastName || !userPurpose) {
      setErrorMessage('Please fill out all required fields');
      return;
    }

    if (!user) {
      setErrorMessage('User not authenticated');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');
      setSuccessMessage('');
      console.log('Updating profile for user:', user.id);
      console.log('Form data:', { firstName, lastName, phone, userPurpose });

      // First update the profile in Supabase
      const { data, error } = await updateUserProfile(user.id, {
        first_name: firstName,
        last_name: lastName,
        phone,
        user_purpose: userPurpose as UserPurpose,
      });

      console.log('Update response:', { data, error });

      if (error) {
        console.error('Profile update error:', error);
        setErrorMessage(error.message);
      } else {
        // Then update the profile in the context
        console.log('Profile updated in database, updating context...');
        
        // Use the ProfileContext to update the profile
        await updateProfile({
          firstName,
          lastName,
          email: user.email || '',
          phone,
          userPurpose: userPurpose as UserPurpose,
          address: '',
          emergencyContact: '',
          emergencyPhone: '',
          notifications: true,
          emailUpdates: true
        });
        
        console.log('Profile updated successfully in context');
        setSuccessMessage('Profile updated successfully! Loading your dashboard...');
      }
    } catch (error: any) {
      console.error('Exception during profile update:', error);
      setErrorMessage(error.message || 'An error occurred while updating your profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>
            Please provide the following information to complete your profile
          </Text>
        </View>

        {errorMessage ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}
        
        {successMessage ? (
          <View style={[styles.errorContainer, styles.successContainer]}>
            <Text style={styles.successText}>{successMessage}</Text>
          </View>
        ) : null}

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your first name"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your last name"
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              What is your main purpose for using the app? <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.purposeContainer}>
              <TouchableOpacity
                style={[
                  styles.purposeOption,
                  userPurpose === 'career_help' && styles.purposeOptionSelected,
                ]}
                onPress={() => setUserPurpose('career_help')}
              >
                <Text
                  style={[
                    styles.purposeText,
                    userPurpose === 'career_help' && styles.purposeTextSelected,
                  ]}
                >
                  Career Help
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.purposeOption,
                  userPurpose === 'patient' && styles.purposeOptionSelected,
                ]}
                onPress={() => setUserPurpose('patient')}
              >
                <Text
                  style={[
                    styles.purposeText,
                    userPurpose === 'patient' && styles.purposeTextSelected,
                  ]}
                >
                  Patient
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Complete Profile</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
  },
  successContainer: {
    backgroundColor: '#e8f5e9',
  },
  successText: {
    color: '#2e7d32',
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  required: {
    color: '#d32f2f',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  purposeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  purposeOption: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  purposeOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10', // 10% opacity
  },
  purposeText: {
    fontSize: 16,
    color: '#333',
  },
  purposeTextSelected: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileFormScreen;
