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

      {/* Events Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Career Placement</Text>
        
        <View style={styles.eventsContainer}>
          <Card style={styles.eventCard}>
            <Card.Content>
              <Text style={styles.eventDay}>Tuesdays</Text>
              <Text style={styles.eventTitle}>Facilities Tour</Text>
              <Text style={styles.eventDescription}>Tour for prospective students.</Text>
              <View style={styles.eventDetails}>
                <MaterialIcons name="access-time" size={16} color={colors.primary} />
                <Text style={styles.eventTime}>1:00 pm-2:00 pm</Text>
                <MaterialIcons name="location-on" size={16} color={colors.primary} />
                <Text style={styles.eventLocation}>Main Campus</Text>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.eventCard}>
            <Card.Content>
              <Text style={styles.eventDay}>Wednesday</Text>
              <Text style={styles.eventTitle}>Financial Aid Q&A</Text>
              <Text style={styles.eventDescription}>A questions and answer session about available tuition assistance.</Text>
              <View style={styles.eventDetails}>
                <MaterialIcons name="access-time" size={16} color={colors.primary} />
                <Text style={styles.eventTime}>6:00 pm-8:00 pm</Text>
                <MaterialIcons name="location-on" size={16} color={colors.primary} />
                <Text style={styles.eventLocation}>Main Campus</Text>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.eventCard}>
            <Card.Content>
              <Text style={styles.eventDay}>Saturday</Text>
              <Text style={styles.eventTitle}>Facilities Tour</Text>
              <Text style={styles.eventDescription}>Visit our facilities and see the work of our students.</Text>
              <View style={styles.eventDetails}>
                <MaterialIcons name="access-time" size={16} color={colors.primary} />
                <Text style={styles.eventTime}>10:00 am-3:00 pm</Text>
                <MaterialIcons name="location-on" size={16} color={colors.primary} />
                <Text style={styles.eventLocation}>Main Campus</Text>
              </View>
            </Card.Content>
          </Card>
        </View>
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

      {/* CDL Promotion */}
      <Card style={styles.cdlPromoCard}>
        <Card.Content>
          <Text style={styles.cdlPromoTitle}>Let's Learn Beyond The Limits</Text>
          <Text style={styles.cdlPromoSubtitle}>No CDL? No Problem, We Train!</Text>
        </Card.Content>
      </Card>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'cna' && styles.activeTab]}
          onPress={() => setActiveTab('cna')}
        >
          <Text style={[styles.tabText, activeTab === 'cna' && styles.activeTabText]}>CNA</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'cdl' && styles.activeTab]}
          onPress={() => setActiveTab('cdl')}
        >
          <Text style={[styles.tabText, activeTab === 'cdl' && styles.activeTabText]}>CDL License</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'physician' && styles.activeTab]}
          onPress={() => setActiveTab('physician')}
        >
          <Text style={[styles.tabText, activeTab === 'physician' && styles.activeTabText]}>Physician Mentor Program</Text>
        </TouchableOpacity>
      </View>

      {/* CNA Program Tab Content */}
      {activeTab === 'cna' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certified Nursing Assistant (CNA) Program</Text>
          <Text style={styles.sectionDescription}>
            Our CNA program prepares students for a rewarding career in healthcare. As a certified nursing assistant, you'll provide essential care to patients in hospitals, nursing homes, and other healthcare settings.
          </Text>

          <Card style={styles.programDetailsCard}>
            <Card.Content>
              <Text style={styles.subSectionTitle}>Program Highlights</Text>
              
              <View style={styles.bulletPoint}>
                <MaterialIcons name="check-circle" size={20} color={colors.primary} />
                <Text style={styles.bulletText}>
                  <Text style={styles.boldText}>Comprehensive Training: </Text>
                  Our 6-8 week program covers all aspects of patient care, from basic nursing skills to specialized care techniques.
                </Text>
              </View>

              <View style={styles.bulletPoint}>
                <MaterialIcons name="check-circle" size={20} color={colors.primary} />
                <Text style={styles.bulletText}>
                  <Text style={styles.boldText}>Hands-on Experience: </Text>
                  Practice your skills in our state-of-the-art lab and through clinical rotations at local healthcare facilities.
                </Text>
              </View>

              <View style={styles.bulletPoint}>
                <MaterialIcons name="check-circle" size={20} color={colors.primary} />
                <Text style={styles.bulletText}>
                  <Text style={styles.boldText}>Job Placement Assistance: </Text>
                  Our career services team will help you find employment opportunities after graduation.
                </Text>
              </View>

              <View style={styles.bulletPoint}>
                <MaterialIcons name="check-circle" size={20} color={colors.primary} />
                <Text style={styles.bulletText}>
                  <Text style={styles.boldText}>Certification Preparation: </Text>
                  We'll prepare you to pass the state certification exam with confidence.
                </Text>
              </View>

              <TouchableOpacity 
                style={styles.applicationButton}
                onPress={() => navigation.navigate('CNATraining')}
              >
                <Text style={styles.applicationButtonText}>View Full Program Details</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        </View>
      )}

      {/* CDL Program Tab Content */}
      {activeTab === 'cdl' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Commercial Driver's License (CDL) Program</Text>
          <Text style={styles.sectionDescription}>
            Our CDL program prepares you for a high-demand career in commercial truck driving. With comprehensive training and hands-on experience, you'll be ready to hit the road with confidence.
          </Text>

          <View style={styles.cdlBenefitsContainer}>
            <Text style={styles.subSectionTitle}>Program Benefits</Text>
            <View style={styles.cdlBenefitsGrid}>
              <View style={styles.cdlBenefit}>
                <FontAwesome5 name="truck" size={30} color={colors.primary} />
                <Text style={styles.cdlBenefitText}>ELDT Registered Training</Text>
              </View>
              <View style={styles.cdlBenefit}>
                <FontAwesome5 name="money-bill-wave" size={30} color={colors.primary} />
                <Text style={styles.cdlBenefitText}>High Earning Potential</Text>
              </View>
              <View style={styles.cdlBenefit}>
                <FontAwesome5 name="calendar-alt" size={30} color={colors.primary} />
                <Text style={styles.cdlBenefitText}>3-4 Week Program</Text>
              </View>
              <View style={styles.cdlBenefit}>
                <FontAwesome5 name="hands-helping" size={30} color={colors.primary} />
                <Text style={styles.cdlBenefitText}>Job Placement Assistance</Text>
              </View>
            </View>
          </View>

          <View style={styles.cdlTrainingSection}>
            <Text style={styles.subSectionTitle}>Training Includes</Text>
            <View style={styles.bulletPoint}>
              <MaterialIcons name="check-circle" size={20} color={colors.primary} />
              <Text style={styles.bulletText}>
                <Text style={styles.boldText}>Classroom Instruction: </Text>
                Learn traffic laws, safety regulations, and trip planning.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <MaterialIcons name="check-circle" size={20} color={colors.primary} />
              <Text style={styles.bulletText}>
                <Text style={styles.boldText}>Range Training: </Text>
                Practice vehicle inspection, backing, and basic maneuvers in a controlled environment.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <MaterialIcons name="check-circle" size={20} color={colors.primary} />
              <Text style={styles.bulletText}>
                <Text style={styles.boldText}>Road Training: </Text>
                Gain experience driving on public roads with an experienced instructor.
              </Text>
            </View>
          </View>

          <View style={styles.cdlEarningSection}>
            <Text style={styles.subSectionTitle}>Earning Potential</Text>
            <View style={styles.cdlEarningPoint}>
              <FontAwesome5 name="dollar-sign" size={20} color={colors.primary} />
              <Text style={styles.cdlEarningText}>Starting salary: $69,000 - $85,000</Text>
            </View>
            <View style={styles.cdlEarningPoint}>
              <FontAwesome5 name="dollar-sign" size={20} color={colors.primary} />
              <Text style={styles.cdlEarningText}>Experienced drivers can earn $100,000+</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.cdlApplyButton}
            onPress={() => navigation.navigate('CDLTrainingProgram')}
          >
            <Text style={styles.cdlApplyButtonText}>View Full Program Details</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Physician Mentor Program Tab */}
      {activeTab === 'physician' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Physician Mentor Program</Text>
          
          {/* Application Notice */}
          <View style={styles.noticeContainer}>
            <MaterialIcons name="announcement" size={24} color="#ff6b6b" />
            <Text style={styles.noticeText}>
              <Text style={styles.noticeHighlight}>Applications are only accepted March 27, 2023 through April 24, 2023.</Text> Please DO NOT submit the application until March 27th.
            </Text>
          </View>
          
          <Text style={styles.sectionDescription}>
            The Purpose Tech Physician Mentoring Program provides local high school and college students the opportunity to witness and understand the importance of professions in the medical field, from evaluation and treatment for follow-up care.
          </Text>
          
          <Card style={styles.programDetailsCard}>
            <Card.Content>
              <Text style={styles.paragraphText}>
                Doctors from a variety of specialties volunteer their time, leading students in the office setting, on their hospital rounds, in the emergency department, and even in the operating room. The Purpose Tech Physician Mentoring Program is offered at both WalkNFaith outpatient clinic and St. Luke's Hospital.
              </Text>
              
              <Text style={styles.paragraphText}>
                The Program is offered for six to eight weeks between June and August. Student participation for the program requires a three to five day per week commitment. Each week, participating students work with a different medical professional in a different specialty. This rotation introduces the participating students to the many multidisciplinary facets of medicine. By exposing the students to many specialties, participants have a more complete understanding of the diversity of medical career opportunities.
              </Text>
            </Card.Content>
          </Card>
          
          <Text style={styles.subSectionTitle}>Forms to Download</Text>
          
          <TouchableOpacity style={styles.downloadButton}>
            <MaterialIcons name="file-download" size={24} color="white" />
            <Text style={styles.buttonText}>2023 Background Check</Text>
          </TouchableOpacity>
          <Text style={styles.noteText}>*If over 18 only. You will be asked to upload this information onto your application.</Text>
          
          <TouchableOpacity style={styles.downloadButton}>
            <MaterialIcons name="file-download" size={24} color="white" />
            <Text style={styles.buttonText}>2023 Details/Instructions to Apply</Text>
          </TouchableOpacity>
          <Text style={styles.noteText}>*Read thoroughly before completing the application.</Text>
          
          <Text style={styles.subSectionTitle}>Application Link</Text>
          <Text style={styles.noticeText}>
            <Text style={styles.noticeHighlight}>Applications are only accepted March 27, 2023 through April 24, 2023.</Text> Please DO NOT submit the application until March 27th.
          </Text>
          
          <Text style={styles.paragraphText}>
            We will be having both a Physician Mentorship Program and a Nurse Mentorship Program. Please click the appropriate link for which program you would like to apply.
          </Text>
          
          <TouchableOpacity style={styles.applicationButton}>
            <Text style={styles.applicationButtonText}>2023 Physician Mentorship Application Link</Text>
          </TouchableOpacity>
          <Text style={styles.noteText}>*Click the link to fill out the application. Please read through the "2023 Details & instructions to Apply" BEFORE completing the application.</Text>
          
          <TouchableOpacity style={styles.applicationButton}>
            <Text style={styles.applicationButtonText}>2023 Nurse Mentorship Application Link</Text>
          </TouchableOpacity>
          <Text style={styles.noteText}>*Click the link to fill out the application. Please read through the "2023 Details & instructions to Apply" BEFORE completing the application.</Text>
          
          <Text style={styles.subSectionTitle}>Learn More</Text>
          <Text style={styles.paragraphText}>
            To learn more about our physician mentoring program email Sabrina@walknfaith.org
            or call Sabrina at (805) 739-3590.
          </Text>
          
          <TouchableOpacity style={styles.downloadButton}>
            <MaterialIcons name="file-download" size={24} color="white" />
            <Text style={styles.buttonText}>2023 Mentor Brochure</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.viewFullDetailsButton}
            onPress={() => navigation.navigate('PhysicianMentorProgram')}
          >
            <Text style={styles.viewFullDetailsText}>View Full Program Details</Text>
          </TouchableOpacity>
        </View>
      )}
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
  card: {
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 12,
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
  cdlPromoText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign: 'center',
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
  // Tab styles
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  activeTabText: {
    color: 'white',
  },
  // Bullet point styles
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  bulletText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    lineHeight: 24,
  },
  boldText: {
    fontWeight: 'bold',
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 16,
    marginBottom: 12,
  },
  applicationButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  applicationButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  // CDL specific styles
  cdlBenefitsContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
  cdlBenefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cdlBenefit: {
    width: '48%',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cdlBenefitText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
    color: '#333',
  },
  cdlApplyButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  cdlApplyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  cdlTrainingSection: {
    marginTop: 24,
  },
  cdlEarningSection: {
    marginTop: 24,
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
  },
  cdlEarningPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cdlEarningText: {
    fontSize: 16,
    marginLeft: 12,
  },
  // Physician Mentor Program styles
  programDetailsCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 16,
  },
  paragraphText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#34495e',
  },
  noticeContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff8e1',
    padding: 15,
    borderRadius: 10,
    marginVertical: 15,
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
  downloadButton: {
    backgroundColor: '#007AFF',
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
  viewFullDetailsButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  viewFullDetailsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CareerPlacementScreen;
