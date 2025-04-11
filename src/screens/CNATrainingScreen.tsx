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
  const handleVideoQuizzes = () => {
    navigation.navigate('VideoQuizzes');
  };

  const handleSkillsVideo = () => {
    // Open the skills video link in a new window/tab
    window.open('https://videos.hartmanonline.com/', '_blank');
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
              patient care to individuals who are unable to do so for themselves. We offer this course for 6 - 8 weeks at $1250.00.
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
              <Text style={styles.detailText}>Course Cost: $1250.00</Text>
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
                onPress={handleVideoQuizzes}
              >
                <MaterialIcons name="assignment" size={24} color="white" />
                <Text style={styles.buttonText}>Video Quizzes</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.actionButton, styles.videoButton]}
                onPress={handleSkillsVideo}
              >
                <MaterialIcons name="video-library" size={24} color="white" />
                <Text style={styles.buttonText}>Skills Video</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Additional Training Programs section removed as requested */}
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
