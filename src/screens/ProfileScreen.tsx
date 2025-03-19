import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native-web';
import { useProfile, UserProfile } from '../context/ProfileContext';
import { colors } from '../theme/colors';

export default function ProfileScreen() {
  const { profile: savedProfile, updateProfile } = useProfile();
  const [profile, setProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    notifications: true,
    emailUpdates: true,
  });

  // Load saved profile when component mounts
  useEffect(() => {
    if (savedProfile) {
      setProfile(savedProfile);
    }
  }, [savedProfile]);

  const handleChange = (name: keyof UserProfile, value: string | boolean) => {
    setProfile(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Validate required fields
    if (!profile.firstName || !profile.lastName || !profile.email) {
      Alert.alert('Missing Information', 'Please fill in all required fields (First Name, Last Name, Email)');
      return;
    }

    // Save profile
    updateProfile(profile);
    Alert.alert('Success', 'Profile updated successfully');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Profile</Text>
        <Text style={styles.subHeaderText}>Update your personal information and preferences</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>First Name <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            value={profile.firstName}
            onChangeText={(text: string) => handleChange('firstName', text)}
            placeholder="Enter your first name"
          />
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Last Name <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            value={profile.lastName}
            onChangeText={(text: string) => handleChange('lastName', text)}
            placeholder="Enter your last name"
          />
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            value={profile.email}
            onChangeText={(text: string) => handleChange('email', text)}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={profile.phone}
            onChangeText={(text: string) => handleChange('phone', text)}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={profile.address}
            onChangeText={(text: string) => handleChange('address', text)}
            placeholder="Enter your address"
            multiline
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contact</Text>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Emergency Contact Name</Text>
          <TextInput
            style={styles.input}
            value={profile.emergencyContact}
            onChangeText={(text: string) => handleChange('emergencyContact', text)}
            placeholder="Enter emergency contact name"
          />
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Emergency Contact Phone</Text>
          <TextInput
            style={styles.input}
            value={profile.emergencyPhone}
            onChangeText={(text: string) => handleChange('emergencyPhone', text)}
            placeholder="Enter emergency contact phone"
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Enable Notifications</Text>
          <Switch
            value={profile.notifications}
            onValueChange={(value: boolean) => handleChange('notifications', value)}
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={profile.notifications ? colors.secondary : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Receive Email Updates</Text>
          <Switch
            value={profile.emailUpdates}
            onValueChange={(value: boolean) => handleChange('emailUpdates', value)}
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={profile.emailUpdates ? colors.secondary : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.requiredNote}><Text style={styles.required}>*</Text> Required fields</Text>
      </View>
    </ScrollView>
  );
}

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
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.8,
  },
  section: {
    padding: 20,
    backgroundColor: colors.white,
    marginBottom: 15,
    borderRadius: 5,
    ...Platform.select({
      web: {
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.05)',
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.secondary,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.text,
  },
  required: {
    color: colors.error,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: colors.surface,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  switchLabel: {
    fontSize: 16,
    color: colors.text,
  },
  buttonContainer: {
    padding: 20,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    paddingTop: 0,
  },
  requiredNote: {
    fontSize: 14,
    color: colors.textLight,
  },
});
