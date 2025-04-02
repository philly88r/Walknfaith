import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native-web';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'CNATraining'>;

const CNATrainingScreen: React.FC<Props> = ({ navigation }) => {
  const handleUploadAssignment = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
      });

      if (!result.canceled) {
        // Handle the uploaded file
        console.log('Document:', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error uploading assignment:', error);
    }
  };

  const handleAddSkillsVideo = async () => {
    try {
      const permissionResult = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });

      if (!permissionResult.canceled) {
        // Handle the selected video
        console.log('Video selected:', permissionResult.assets[0].uri);
        // Add your video upload logic here
      }
    } catch (error) {
      console.error('Error selecting video:', error);
    }
  };

  const handleApplyNow = () => {
    navigation.navigate('CNAApplication');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerNumber}>01</Text>
          <Text style={styles.headerTitle}>Certified Nursing Assistant (CNA) Course</Text>
        </View>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          {/* Course Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionText}>
              Are you thinking about going into the field of nursing? As a certified nursing assistant (CNA), 
              you will have a fulfilling career that puts you directly on the front lines.
            </Text>
            
            <Text style={styles.roleText}>
              Depending on the environment you choose to work in, you may also be referred to as:
            </Text>
            
            <View style={styles.rolesList}>
              <View style={styles.roleItem}>
                <MaterialIcons name="medical-services" size={24} color="#007AFF" />
                <Text style={styles.roleTitle}>Patient Care Technician</Text>
              </View>
              <View style={styles.roleItem}>
                <FontAwesome5 name="hand-holding-medical" size={24} color="#007AFF" />
                <Text style={styles.roleTitle}>Nurse's Aide</Text>
              </View>
              <View style={styles.roleItem}>
                <FontAwesome5 name="house-user" size={24} color="#007AFF" />
                <Text style={styles.roleTitle}>Home Health Aide</Text>
              </View>
            </View>

            <Text style={styles.courseDescription}>
              With this course, you will learn how to use your skills and compassion to provide excellent 
              patient care to individuals who are unable to do so for themselves.
            </Text>
          </View>

          {/* Course Details */}
          <View style={styles.detailsCard}>
            <View style={styles.detailItem}>
              <MaterialIcons name="schedule" size={24} color="#007AFF" />
              <Text style={styles.detailText}>Duration: 6-8 weeks</Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialIcons name="attach-money" size={24} color="#007AFF" />
              <Text style={styles.detailText}>Cost: $1,250.00</Text>
            </View>
            <TouchableOpacity 
              style={styles.applyButton}
              onPress={handleApplyNow}
            >
              <Text style={styles.applyButtonText}>APPLY NOW</Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons for Current Students */}
          <View style={styles.studentSection}>
            <Text style={styles.sectionTitle}>Current Student Resources</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={handleUploadAssignment}
              >
                <MaterialIcons name="upload-file" size={24} color="white" />
                <Text style={styles.buttonText}>Upload Assignments</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.actionButton, styles.videoButton]}
                onPress={handleAddSkillsVideo}
              >
                <MaterialIcons name="video-library" size={24} color="white" />
                <Text style={styles.buttonText}>Add Skills Video</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Additional Training Programs */}
          <View style={styles.additionalPrograms}>
            <Text style={styles.sectionTitle}>Additional Training Programs</Text>
            
            <TouchableOpacity 
              style={styles.programCard}
              onPress={() => navigation.navigate('PhysicianMentorProgram')}
            >
              <View style={styles.programHeader}>
                <FontAwesome5 name="user-md" size={24} color="#007AFF" />
                <View style={styles.programInfo}>
                  <Text style={styles.programTitle}>Physician Mentor Program</Text>
                  <Text style={styles.programDescription}>
                    Provides local high school and college students the opportunity to witness and understand the importance of professions in the medical field.
                  </Text>
                </View>
              </View>
              <View style={styles.readMoreContainer}>
                <Text style={styles.readMore}>Learn More</Text>
                <MaterialIcons name="arrow-forward" size={20} color="#007AFF" />
              </View>
            </TouchableOpacity>
            
            <View style={styles.comingSoonProgram}>
              <FontAwesome5 name="user-nurse" size={24} color="#007AFF" />
              <View style={styles.programInfo}>
                <Text style={styles.programTitle}>Nurse Mentorship Program</Text>
                <Text style={styles.comingSoonText}>Coming Soon</Text>
              </View>
            </View>
            
            <View style={styles.comingSoonProgram}>
              <FontAwesome5 name="heartbeat" size={24} color="#007AFF" />
              <View style={styles.programInfo}>
                <Text style={styles.programTitle}>LPN Program</Text>
                <Text style={styles.comingSoonText}>Coming Soon</Text>
              </View>
            </View>
            
            <View style={styles.comingSoonProgram}>
              <FontAwesome5 name="medkit" size={24} color="#007AFF" />
              <View style={styles.programInfo}>
                <Text style={styles.programTitle}>CMT Program</Text>
                <Text style={styles.comingSoonText}>Coming Soon</Text>
              </View>
            </View>
          </View>
          
          {/* First Aid/CPR Section */}
          <View style={styles.firstAidSection}>
            <Text style={styles.sectionTitle}>Adult, Child and Baby First Aid/CPR/AED Online</Text>
            <Text style={styles.firstAidCourseDescription}>
              The Adult, Child and Baby First Aid/CPR/AED Online course equips students to recognize and care for a variety of first aid, breathing, and cardiac emergencies involving adults, children and babies. This course is taught in-person only. This course meets OSHA compliant and meets other workplace and regulatory requirements.
            </Text>
            <Text style={styles.priceText}>$75.00</Text>
            <TouchableOpacity style={styles.signupButton}>
              <Text style={styles.signupText}>SIGN ME UP</Text>
            </TouchableOpacity>
            <Text style={styles.noteText}>
              Contact Customer Service to sign up additional students for classes provided by the Purpose Tech Institute & Staffing.
            </Text>
          </View>
          
          {/* CNA Refresher */}
          <View style={styles.refresherSection}>
            <Text style={styles.sectionTitle}>CNA Refresher Skills Course</Text>
            <Text style={styles.priceText}>$100 out of pocket.</Text>
            <Text style={styles.refresherCourseDescription}>
              This course provides NA graduates a 4-6 hour skills refresher to ensure they pass their skills exam. Please contact our office for scheduling.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  contentContainer: {
    padding: 20,
  },
  descriptionSection: {
    marginBottom: 30,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
  },
  roleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  rolesList: {
    marginBottom: 20,
  },
  roleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
  },
  roleTitle: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  courseDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  detailsCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  applyButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  studentSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  videoButton: {
    backgroundColor: '#4CD964',
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  additionalPrograms: {
    marginBottom: 30,
  },
  programCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  programHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  programInfo: {
    marginLeft: 15,
    flex: 1,
  },
  programTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  programDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  readMore: {
    color: '#007AFF',
    marginRight: 5,
    fontSize: 14,
  },
  comingSoonProgram: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  comingSoonText: {
    color: '#FF9500',
    fontSize: 14,
    fontStyle: 'italic',
  },
  firstAidSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 20,
    marginBottom: 30,
  },
  firstAidCourseDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
    marginBottom: 15,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  signupButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  signupText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  refresherSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 20,
  },
  refresherCourseDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
});

export default CNATrainingScreen;
