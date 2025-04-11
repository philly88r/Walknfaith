import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Modal,
} from 'react-native-web';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'PhysicianMentorProgram'>;

const PhysicianMentorProgramScreen: React.FC<Props> = ({ navigation }) => {
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);

  const handleEmailContact = () => {
    // Redirect to contact form
    navigation.navigate('Contact');
  };

  const handleApplicationLink = (programType: string) => {
    // Redirect to contact form
    navigation.navigate('Contact');
  };
  
  const toggleLearnMoreModal = () => {
    setShowLearnMoreModal(!showLearnMoreModal);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Physician Mentor Program</Text>
          <Text style={styles.headerSubtitle}>Medical Career Exploration Opportunity</Text>
        </View>

        {/* Application Notice */}
        <View style={styles.noticeContainer}>
          <MaterialIcons name="announcement" size={24} color="#ff6b6b" />
          <Text style={styles.noticeText}>
            <Text style={styles.noticeHighlight}>Applications are only accepted March 27, 2023 through April 24, 2023.</Text> Please DO NOT submit the application until March 27th.
          </Text>
        </View>

        {/* Program Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Program Overview</Text>
          <Text style={styles.paragraphText}>
            The Purpose Tech Physician Mentoring Program provides local high school and college students the opportunity to witness and understand the importance of professions in the medical field, from evaluation and treatment for follow-up care.
          </Text>
          <Text style={styles.paragraphText}>
            Doctors from a variety of specialties volunteer their time, leading students in the office setting, on their hospital rounds, in the emergency department, and even in the operating room. The Purpose Tech Physician Mentoring Program is offered at both WalkNFaith outpatient clinic and St. Luke's Hospital.
          </Text>
          <Text style={styles.paragraphText}>
            The Program is offered for six to eight weeks between June and August. Student participation for the program requires a three to five day per week commitment. Each week, participating students work with a different medical professional in a different specialty. This rotation introduces the participating students to the many multidisciplinary facets of medicine. By exposing the students to many specialties, participants have a more complete understanding of the diversity of medical career opportunities.
          </Text>
        </View>

        {/* Forms Section removed as requested */}

        {/* Application Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Application Link</Text>
          <View style={styles.noticeContainer}>
            <MaterialIcons name="announcement" size={24} color="#ff6b6b" />
            <Text style={styles.noticeText}>
              <Text style={styles.noticeHighlight}>Applications are only accepted March 27, 2023 through April 24, 2023.</Text> Please DO NOT submit the application until March 27th.
            </Text>
          </View>
          
          <Text style={styles.paragraphText}>
            We will be having both a Physician Mentorship Program and a Nurse Mentorship Program. Please click the appropriate link for which program you would like to apply.
          </Text>
          
          <TouchableOpacity 
            style={styles.applicationButton}
            onPress={() => handleApplicationLink('Physician')}
          >
            <MaterialIcons name="link" size={24} color="white" />
            <Text style={styles.buttonText}>2023 Physician Mentorship Application Link</Text>
          </TouchableOpacity>
          <Text style={styles.noteText}>*Click the link to fill out the application. Please read through the "2023 Details & instructions to Apply" BEFORE completing the application.</Text>
          
          <TouchableOpacity 
            style={styles.applicationButton}
            onPress={() => handleApplicationLink('Nurse')}
          >
            <MaterialIcons name="link" size={24} color="white" />
            <Text style={styles.buttonText}>2023 Nurse Mentorship Application Link</Text>
          </TouchableOpacity>
          <Text style={styles.noteText}>*Click the link to fill out the application. Please read through the "2023 Details & instructions to Apply" BEFORE completing the application.</Text>
        </View>

        {/* Learn More */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learn More</Text>
          <Text style={styles.paragraphText}>
            Want to know more about our physician mentoring program? Click below for detailed information or email Sabrina@walknfaith.org
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={styles.learnMoreButton}
              onPress={toggleLearnMoreModal}
            >
              <MaterialIcons name="info" size={24} color="white" />
              <Text style={styles.buttonText}>Learn More</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={handleEmailContact}
            >
              <MaterialIcons name="email" size={24} color="white" />
              <Text style={styles.buttonText}>Contact via Email</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Other Programs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Other Healthcare Programs</Text>
          
          <View style={styles.programItem}>
            <FontAwesome5 name="user-nurse" size={24} color="#007AFF" />
            <View style={styles.programInfo}>
              <Text style={styles.programTitle}>Nurse Mentorship Program</Text>
              <Text style={styles.programStatus}>Coming Soon</Text>
            </View>
          </View>
          
          <View style={styles.programItem}>
            <FontAwesome5 name="user-md" size={24} color="#007AFF" />
            <View style={styles.programInfo}>
              <Text style={styles.programTitle}>LPN Program</Text>
              <Text style={styles.programStatus}>Coming Soon</Text>
            </View>
          </View>
          
          <View style={styles.programItem}>
            <FontAwesome5 name="heartbeat" size={24} color="#007AFF" />
            <View style={styles.programInfo}>
              <Text style={styles.programTitle}>CMT Program</Text>
              <Text style={styles.programStatus}>Coming Soon</Text>
            </View>
          </View>
        </View>

        {/* First Aid and CNA Refresher sections removed as requested */}

        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
          <Text style={styles.buttonText}>Back to Training Programs</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Learn More Modal */}
      <Modal
        visible={showLearnMoreModal}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleLearnMoreModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Physician Mentor Program</Text>
              <TouchableOpacity onPress={toggleLearnMoreModal} style={styles.closeButton}>
                <MaterialIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScrollView}>
              {/* Application Notice */}
              <View style={styles.modalNoticeContainer}>
                <MaterialIcons name="announcement" size={24} color="#ff6b6b" />
                <Text style={styles.modalNoticeText}>
                  <Text style={styles.noticeHighlight}>Applications are only accepted March 27, 2023 through April 24, 2023.</Text> Please DO NOT submit the application until March 27th.
                </Text>
              </View>

              {/* Program Purpose */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Program Purpose</Text>
                <Text style={styles.modalParagraph}>
                  The Purpose Tech Physician Mentoring Program provides local high school and college students the opportunity to witness and understand the importance of professions in the medical field, from evaluation and treatment for follow-up care.
                </Text>
              </View>

              {/* Program Details */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Program Details</Text>
                <Text style={styles.modalParagraph}>
                  Doctors from a variety of specialties volunteer their time, leading students in the office setting, on their hospital rounds, in the emergency department, and even in the operating room. The Purpose Tech Physician Mentoring Program is offered at both WalkNFaith outpatient clinic and St. Luke's Hospital.
                </Text>
              </View>

              {/* Program Schedule */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Program Schedule</Text>
                <Text style={styles.modalParagraph}>
                  The Program is offered for six to eight weeks between June and August. Student participation for the program requires a three to five day per week commitment.
                </Text>
              </View>

              {/* Rotation Information */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Medical Specialty Rotations</Text>
                <Text style={styles.modalParagraph}>
                  Each week, participating students work with a different medical professional in a different specialty. This rotation introduces the participating students to the many multidisciplinary facets of medicine. By exposing the students to many specialties, participants have a more complete understanding of the diversity of medical career opportunities.
                </Text>
              </View>

              {/* Application Button */}
              <TouchableOpacity 
                style={styles.modalApplyButton}
                onPress={() => {
                  toggleLearnMoreModal();
                  handleApplicationLink('Physician');
                }}
              >
                <MaterialIcons name="assignment" size={24} color="white" />
                <Text style={styles.buttonText}>Apply to Program</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    flex: 1,
    marginRight: 10,
  },
  noticeContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff8e1',
    padding: 15,
    borderRadius: 10,
    margin: 20,
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  noticeText: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  noticeHighlight: {
    fontWeight: 'bold',
    color: '#ff6b6b',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  paragraphText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#34495e',
  },
  downloadButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  applicationButton: {
    backgroundColor: '#28a745',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  contactButton: {
    backgroundColor: '#6c5ce7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  noteText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  programItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  programInfo: {
    marginLeft: 15,
  },
  programTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  programStatus: {
    fontSize: 14,
    color: '#e74c3c',
    fontStyle: 'italic',
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
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#34495e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    margin: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    maxWidth: 600,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  closeButton: {
    padding: 5,
  },
  modalScrollView: {
    padding: 15,
  },
  modalNoticeContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF9C4',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  modalNoticeText: {
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  modalSection: {
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalParagraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 10,
  },
  modalApplyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default PhysicianMentorProgramScreen;
