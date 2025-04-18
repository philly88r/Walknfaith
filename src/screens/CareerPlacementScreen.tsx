import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native-web';
import { Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

interface Program {
  title: string;
  duration: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  route?: string; // Optional navigation route for the program
}

type Props = NativeStackScreenProps<RootStackParamList, 'CareerPlacement'>;

const CareerPlacementScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'cna' | 'cdl' | 'physician'>('cna');
  
  const programs: Program[] = [
    {
      title: 'CNA Training Program',
      duration: '6-8 weeks',
      description: 'Start your nursing career as a Certified Nursing Assistant. Learn essential patient care skills in our comprehensive program.',
      icon: 'medical-services',
      route: 'CNATraining',
    },
    {
      title: 'CDL Training Program',
      duration: '3-4 weeks',
      description: 'Start your career in commercial truck driving. Earn between $69,000 and $85,000 with our ELDT registered training program.',
      icon: 'local-shipping',
      route: 'CDLTrainingProgram',
    },
    {
      title: 'Physician Mentor Program',
      duration: 'Flexible',
      description: 'Provides local high school and college students the opportunity to witness and understand the importance of professions in the medical field.',
      icon: 'psychology',
      route: 'PhysicianMentorProgram',
    },
    {
      title: 'Nurse Mentorship Program',
      duration: 'Coming Soon',
      description: 'An opportunity for aspiring nurses to learn from experienced healthcare professionals in real-world settings.',
      icon: 'favorite',
      route: '',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <Text style={styles.headerTitle}>Purpose Tech Institute & Staffing</Text>
          <Text style={styles.headerText}>
            We embrace a learning environment that will prepare you for the path ahead. Our programs 
            offer classes that incorporate traditional learning styles as well as hands-on experiences 
            for adult education.
          </Text>
        </Card.Content>
      </Card>

      {/* Enroll Today Section */}
      <Card style={styles.enrollCard}>
        <Card.Content>
          <Text style={styles.enrollTitle}>Enroll Today</Text>
          <Text style={styles.enrollText}>
            Are you ready to take the next step toward your future career?
            Check out all that we offer and come see us today in the Career Center located on the WalkNFaith-Purpose Tech Campus!
          </Text>
        </Card.Content>
      </Card>

      {/* About Us Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Us</Text>
        <Card style={styles.infoCard}>
          <Card.Content>
            <Text style={styles.infoTitle}>About Us</Text>
            <Text style={styles.infoText}>
              Purpose Technical Institute & Staffing is more than a Technical College. We provide skills training and education needed to find a well-paying, high-demand job. Enrollment is just the first step.
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.infoCard}>
          <Card.Content>
            <Text style={styles.infoTitle}>Our Mission</Text>
            <Text style={styles.infoText}>
              Your success is our priority. Our school instructors provide a personal approach to support our inclusive community, tailoring learning methods to each student's needs.
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.infoCard}>
          <Card.Content>
            <Text style={styles.infoTitle}>Dedicated Educators</Text>
            <Text style={styles.infoText}>
              Our classes are taught by dedicated, diverse, and experienced educators throughout the United States. Using proven teaching strategies, they make sure that every student finds a path to success.
            </Text>
          </Card.Content>
        </Card>
      </View>

      {/* Programs Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Programs</Text>
        
        {/* Program Cards */}
        <View style={styles.programsContainer}>
          {programs.map((program, index) => (
            <Card key={index} style={styles.programCard}>
              <View style={styles.programHeader}>
                <View style={styles.iconContainer}>
                  <MaterialIcons name={program.icon} size={36} color={colors.primary} />
                </View>
                <View style={styles.programInfo}>
                  <Text style={styles.programTitle}>{program.title}</Text>
                  <Text style={styles.programDuration}>{program.duration}</Text>
                </View>
              </View>
              <Text style={styles.programDescription}>{program.description}</Text>
              {program.route ? (
                <TouchableOpacity 
                  style={styles.learnMoreButton}
                  onPress={() => navigation.navigate(program.route as keyof RootStackParamList)}
                >
                  <Text style={styles.learnMoreButtonText}>Read More</Text>
                  <MaterialIcons name="arrow-forward" size={16} color="white" />
                </TouchableOpacity>
              ) : (
                <View style={styles.comingSoonBadge}>
                  <Text style={styles.comingSoonText}>Coming Soon</Text>
                </View>
              )}
            </Card>
          ))}
        </View>
      </View>

      {/* Career Placement Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Career Placement</Text>
      </View>

      {/* Support Section */}
      <Card style={styles.supportCard}>
        <Card.Content>
          <Text style={styles.supportTitle}>Support 24/7</Text>
          <Text style={styles.supportText}>Access to Online Library, Skills Videos, Lectures and more.</Text>
        </Card.Content>
      </Card>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Successful Programs</Text>
        <Text style={styles.featureText}>
          Our programs are fully accredited, and will prepare you to tackle real-world issues with confidence in your methodology, no matter where you go.
        </Text>
        
        <Text style={styles.featureSubtitle}>Our Best Features Specially For You</Text>
        <Text style={styles.featureText}>
          Want a head start on your career? Career and Technical Education courses deliver a core academic education and the employable knowledge you'll need for prolonged career success. On top of that, we've created a structure that drives career growth even before graduation, giving you the chance to earn back tuition costs and get ahead fast.
        </Text>

        <Card style={styles.trainingCard}>
          <Card.Content>
            <Text style={styles.trainingTitle}>Training program opportunities include:</Text>
            <View style={styles.trainingGrid}>
              <View style={styles.trainingItem}>
                <Text style={styles.trainingText}>CNA Program</Text>
              </View>
              <View style={styles.trainingItem}>
                <Text style={styles.trainingText}>CDL Program</Text>
              </View>
              <View style={styles.trainingItem}>
                <Text style={styles.trainingText}>Physician Mentorship</Text>
              </View>
              <View style={styles.trainingItem}>
                <Text style={styles.trainingText}>Clinical Instructor</Text>
              </View>
              <View style={styles.trainingItem}>
                <Text style={styles.trainingText}>Nurse Mentorship Program</Text>
              </View>
              <View style={styles.trainingItem}>
                <Text style={styles.trainingText}>Nurse Practitioner Mentorship</Text>
              </View>
            </View>
            
            <Text style={styles.comingSoonTitle}>Coming soon</Text>
            <View style={styles.trainingGrid}>
              <View style={styles.trainingItem}>
                <Text style={styles.trainingText}>PN Program</Text>
              </View>
              <View style={styles.trainingItem}>
                <Text style={styles.trainingText}>LPN Bridge To RN</Text>
              </View>
              <View style={styles.trainingItem}>
                <Text style={styles.trainingText}>Nurse Assistant</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.downloadButton}
              onPress={() => window.open('/assets/pdfs/Nursing Assistant Course Student Contract- PDF (1) (1) (1) (1) (1).pdf', '_blank')}
            >
              <FontAwesome5 name="file-pdf" size={20} color="white" />
              <Text style={styles.buttonText}>Download Nursing Assistant Course Student Contract</Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      </View>

      {/* Upcoming Events Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <Card style={styles.eventCard}>
          <Card.Content>
            <Text style={styles.eventTitle}>Monthly CNA Orientation</Text>
            <View style={styles.eventDetails}>
              <View style={styles.eventDetail}>
                <MaterialIcons name="event" size={18} color={colors.primary} />
                <Text style={styles.eventDetailText}>Time to be announced</Text>
              </View>
              <View style={styles.eventDetail}>
                <MaterialIcons name="location-on" size={18} color={colors.primary} />
                <Text style={styles.eventDetailText}>On Campus or Zoom</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* CDL Promotion */}
      <Card style={styles.cdlPromoCard}>
        <Card.Content>
          <Text style={styles.cdlPromoTitle}>Let's Learn Beyond The Limits</Text>
          <Text style={styles.cdlPromoSubtitle}>No CDL? No Problem, We Train!</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerCard: {
    margin: 16,
    backgroundColor: colors.primary + '10',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  enrollCard: {
    margin: 16,
    backgroundColor: colors.primary + '20',
  },
  enrollTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  enrollText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  section: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 20,
  },
  infoCard: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  programsContainer: {
    marginTop: 20,
  },
  programCard: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  programHeader: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: colors.primary + '15',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  programInfo: {
    marginLeft: 16,
    flex: 1,
  },
  programTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  programDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 16,
  },
  programDuration: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 4,
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  learnMoreButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 8,
  },
  comingSoonBadge: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  comingSoonText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  cdlPromoCard: {
    margin: 16,
    backgroundColor: colors.primary + '15',
  },
  cdlPromoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  cdlPromoSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  // Additional styles for components referenced in JSX
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventDetailText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  eventsContainer: {
    marginTop: 16,
  },
  eventCard: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  eventDay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  eventTime: {
    fontSize: 14,
    color: '#555',
    marginLeft: 4,
    marginRight: 12,
  },
  eventLocation: {
    fontSize: 14,
    color: '#555',
    marginLeft: 4,
  },
  supportCard: {
    margin: 16,
    backgroundColor: colors.primary + '15',
  },
  supportTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  supportText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign: 'center',
  },
  featureText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 16,
  },
  featureSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  trainingCard: {
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  trainingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  trainingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  trainingItem: {
    width: '48%',
    backgroundColor: colors.primary + '10',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  trainingText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  comingSoonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 8,
    marginBottom: 16,
  },
});

// Export the component for use in navigation
export default CareerPlacementScreen;