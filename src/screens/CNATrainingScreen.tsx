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

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerNumber}>01</Text>
          <Text style={styles.headerTitle}>CNA Training Program</Text>
          <Text style={styles.headerSubtitle}>Certified Nursing Assistant (CNA) Course</Text>
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
          </View>

          {/* Action Buttons */}
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
    padding: 20,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  headerNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.2)',
    position: 'absolute',
    top: 10,
    right: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  contentContainer: {
    padding: 20,
  },
  descriptionSection: {
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  roleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  rolesList: {
    marginBottom: 20,
  },
  roleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
  },
  roleTitle: {
    marginLeft: 15,
    fontSize: 16,
  },
  courseDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
  detailsCard: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtons: {
    gap: 15,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  videoButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  additionalPrograms: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  programCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  programHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  programInfo: {
    marginLeft: 15,
    flex: 1,
  },
  programTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  programDescription: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  readMore: {
    fontSize: 16,
    color: "#007AFF",
    marginRight: 8,
  },
  comingSoonProgram: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  comingSoonText: {
    fontSize: 14,
    color: '#e74c3c',
    fontStyle: 'italic',
  },
  firstAidSection: {
    marginTop: 30,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
  },
  firstAidCourseDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
    marginBottom: 15,
  },
  priceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginVertical: 10,
  },
  signupButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 15,
  },
  signupText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  refresherSection: {
    marginTop: 30,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  refresherCourseDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
    marginBottom: 15,
  },
});

export default CNATrainingScreen;
