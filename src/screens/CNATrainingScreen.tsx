import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native-web';
import { SafeAreaView } from 'react-native-safe-area-context';3
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

      if (result.type === 'success') {
        // Handle the uploaded file
        console.log('Document:', result.uri);
      }
    } catch (error) {
      console.error('Error uploading assignment:', error);
    }
  };

  const handleAddSkillsVideo = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }

      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        // Handle the selected video
        console.log('Video selected:', result.assets[0].uri);
        // Add your video upload logic here
      }
    } catch (error) {
      console.error('Error selecting video:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
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
});

export default CNATrainingScreen;
