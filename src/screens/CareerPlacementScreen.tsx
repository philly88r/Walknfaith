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

interface Event {
  day: string;
  title: string;
  description: string;
  time: string;
  location: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'CareerPlacement'>;

const CareerPlacementScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'cna' | 'cdl'>('general');
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
  ];

  const events: Event[] = [
    {
      day: 'Tuesdays',
      title: 'Facilities Tour',
      description: 'Tour for prospective students.',
      time: '1:00 pm-2:00 pm',
      location: 'Main Campus',
    },
    {
      day: 'Wednesday',
      title: 'Financial Aid Q&A',
      description: 'A questions and answer session about available tuition assistance.',
      time: '6:00 pm-8:00 pm',
      location: 'Main Campus',
    },
    {
      day: 'Saturday',
      title: 'Facilities Tour',
      description: 'Visit our facilities and see the work of our students.',
      time: '10:00 am-3:00 pm',
      location: 'Main Campus',
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

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'general' && styles.activeTab]}
          onPress={() => setActiveTab('general')}
        >
          <Text style={[styles.tabText, activeTab === 'general' && styles.activeTabText]}>Workforce Training</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'cna' && styles.activeTab]}
          onPress={() => setActiveTab('cna')}
        >
          <Text style={[styles.tabText, activeTab === 'cna' && styles.activeTabText]}>CNA Program</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'cdl' && styles.activeTab]}
          onPress={() => setActiveTab('cdl')}
        >
          <Text style={[styles.tabText, activeTab === 'cdl' && styles.activeTabText]}>CDL Program</Text>
        </TouchableOpacity>
      </View>

      {/* General Workforce Training Tab Content */}
      {activeTab === 'general' && (
        <>
          {/* About Us Section */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.sectionTitle}>About Us</Text>
              <Text style={styles.text}>
                Purpose Technical Institute & Staffing is more than a Technical College. We provide skills 
                training and education needed to find a well-paying, high-demand job. Enrollment is just 
                the first step.
              </Text>
            </Card.Content>
          </Card>

          {/* Mission Section */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Our Mission</Text>
              <Text style={styles.text}>
                Your success is our priority. Our school instructors provide a personal approach to support 
                our inclusive community, tailoring learning methods to each student's needs.
              </Text>
            </Card.Content>
          </Card>

          {/* Educators Section */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Dedicated Educators</Text>
              <Text style={styles.text}>
                Our classes are taught by dedicated, diverse, and experienced educators throughout the United States. 
                Using proven teaching strategies, they make sure that every student finds a path to success.
              </Text>
            </Card.Content>
          </Card>

          {/* Investment Areas */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Our Investment Areas</Text>
              <Text style={styles.text}>
                We invest in the following ways to increase work, educational and job-training opportunities 
                that lead to stable careers for adults and youth throughout the country:
              </Text>
              
              <View style={styles.bulletPoint}>
                <MaterialIcons name="check-circle" size={24} color={colors.primary} />
                <Text style={styles.bulletText}>
                  Expanding access to postsecondary education and skills training for adults and youth.
                </Text>
              </View>
              
              <View style={styles.bulletPoint}>
                <MaterialIcons name="check-circle" size={24} color={colors.primary} />
                <Text style={styles.bulletText}>
                  Building partnerships with businesses and others to increase career opportunities for low-wage workers and jobseekers, as well as the pool of workers with skills that employers seek.
                </Text>
              </View>
              
              <View style={styles.bulletPoint}>
                <MaterialIcons name="check-circle" size={24} color={colors.primary} />
                <Text style={styles.bulletText}>
                  Providing families with resources to assist with monthly expenses through our parent assistance program which includes monthly diaper distribution and toiletry supplies.
                </Text>
              </View>
              
              <View style={styles.bulletPoint}>
                <MaterialIcons name="check-circle" size={24} color={colors.primary} />
                <Text style={styles.bulletText}>
                  Facilitating change in black and brown communities through partnerships with Low-income housing by offering tuition-free training and job placement to singe parents who cannot afford to pay.
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Program Flexibility */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Program Flexibility</Text>
              <Text style={styles.text}>
                At Purpose Tech Institute we understand every family situation is unique. Due to this fact, we prioritize our job training programs to fit working-adults, single parents, and individuals who reside in urban communities by offering evening and weekend options.
              </Text>
              <Text style={styles.text}>
                To reduce barriers associated with transportation we offer a hybrid- online platform for curriculum training and transportation to and from our skills centers.
              </Text>
              <Text style={styles.text}>
                To ensure every student's success, we include soft-skills training, parenting skills, resume builder, and dress for success training. We believe a well-prepared student will result in a successful employee.
              </Text>
            </Card.Content>
          </Card>
        </>
      )}

      {/* CNA Program Tab Content */}
      {activeTab === 'cna' && (
        <>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Certified Nursing Assistant (CNA) Program</Text>
              <Text style={styles.text}>
                Thank You for Your Interest in Our Certified Nursing Assistant (CNA) Program
              </Text>
              <Text style={styles.subSectionTitle}>Eligibility Requirements</Text>
              <Text style={styles.text}>To ensure a seamless application process, please be aware of the following eligibility criteria:</Text>
              
              <View style={styles.bulletPoint}>
                <MaterialIcons name="person" size={24} color={colors.primary} />
                <Text style={styles.bulletText}>
                  <Text style={styles.boldText}>Age Requirement:</Text> Applicants must be 18 years of age or older.
                </Text>
              </View>
              
              <View style={styles.bulletPoint}>
                <MaterialIcons name="badge" size={24} color={colors.primary} />
                <Text style={styles.bulletText}>
                  <Text style={styles.boldText}>Identification:</Text> A valid state-issued ID or Driver's License is required.
                </Text>
              </View>
              
              <View style={styles.bulletPoint}>
                <MaterialIcons name="security" size={24} color={colors.primary} />
                <Text style={styles.bulletText}>
                  <Text style={styles.boldText}>Background Screening:</Text> Successful passing of the Family Care Safety Background Screening (FCSR) is mandatory.
                </Text>
              </View>
              
              <View style={styles.bulletPoint}>
                <MaterialIcons name="attach-money" size={24} color={colors.primary} />
                <Text style={styles.bulletText}>
                  <Text style={styles.boldText}>Application Fee:</Text> There is a non-refundable application fee of $75. After submitting your application, please pay this fee via Cash App to $WalkNFAith2024. Your application will not be processed until the fee is paid.
                </Text>
              </View>
              
              <Text style={styles.text}>
                Once we have confirmed that you meet these initial requirements, a representative from WalkNFaith will contact you to schedule a video interview. Please allow 5-7 business days for us to receive and process the results of your FCSR screening. Your patience and understanding during this period are greatly appreciated.
              </Text>
              
              <TouchableOpacity style={styles.applicationButton}>
                <Text style={styles.applicationButtonText}>CNA Class Application</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        </>
      )}

      {/* CDL Program Tab Content */}
      {activeTab === 'cdl' && (
        <>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Commercial Driving License (CDL) Program</Text>
              
              <View style={styles.cdlBenefitsContainer}>
                <Text style={styles.subSectionTitle}>TRUCKING INDUSTRY BENEFITS</Text>
                
                <View style={styles.cdlBenefitsGrid}>
                  <View style={styles.cdlBenefit}>
                    <MaterialIcons name="work" size={32} color={colors.primary} />
                    <Text style={styles.cdlBenefitText}>Stable Employment</Text>
                  </View>
                  
                  <View style={styles.cdlBenefit}>
                    <MaterialIcons name="school" size={32} color={colors.primary} />
                    <Text style={styles.cdlBenefitText}>No College Necessary</Text>
                  </View>
                  
                  <View style={styles.cdlBenefit}>
                    <MaterialIcons name="attach-money" size={32} color={colors.primary} />
                    <Text style={styles.cdlBenefitText}>High Earning Potential</Text>
                  </View>
                  
                  <View style={styles.cdlBenefit}>
                    <MaterialIcons name="timer" size={32} color={colors.primary} />
                    <Text style={styles.cdlBenefitText}>Minimal Training Time</Text>
                  </View>
                  
                  <View style={styles.cdlBenefit}>
                    <MaterialIcons name="account-balance-wallet" size={32} color={colors.primary} />
                    <Text style={styles.cdlBenefitText}>Low-Cost Training</Text>
                  </View>
                  
                  <View style={styles.cdlBenefit}>
                    <MaterialIcons name="trending-up" size={32} color={colors.primary} />
                    <Text style={styles.cdlBenefitText}>Career Advancement</Text>
                  </View>
                  
                  <View style={styles.cdlBenefit}>
                    <MaterialIcons name="directions-car" size={32} color={colors.primary} />
                    <Text style={styles.cdlBenefitText}>Independence and Freedom</Text>
                  </View>
                  
                  <View style={styles.cdlBenefit}>
                    <MaterialIcons name="map" size={32} color={colors.primary} />
                    <Text style={styles.cdlBenefitText}>Travel the Entire Country</Text>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.cdlApplyButton}>
                  <Text style={styles.cdlApplyButtonText}>Apply Now</Text>
                </TouchableOpacity>
                
                <Text style={styles.cdlContactText}>314.260.9097</Text>
              </View>
              
              <View style={styles.cdlTrainingSection}>
                <Text style={styles.subSectionTitle}>GET THE TRAINING YOU NEED FROM OUR ELDT REGISTERED SCHOOLS</Text>
                <Text style={styles.text}>
                  If you are looking for a new career in a growing industry, the commercial trucking sector could be the place for you. Since 1993, more than 50,000 students have graduated from our CDL training, and more than more than 95% of them got help finding a job. Learn more about our Entry Level Driver Training program.
                </Text>
                
                <TouchableOpacity style={styles.cdlApplyButton}>
                  <Text style={styles.cdlApplyButtonText}>Apply Now</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.cdlEarningSection}>
                <Text style={styles.subSectionTitle}>START YOUR NEW CAREER IN TRUCK DRIVING TODAY!</Text>
                <View style={styles.cdlEarningPoint}>
                  <MaterialIcons name="attach-money" size={24} color={colors.primary} />
                  <Text style={styles.cdlEarningText}>Earn between $69,000 and $85,000</Text>
                </View>
                
                <View style={styles.cdlEarningPoint}>
                  <MaterialIcons name="check-circle" size={24} color={colors.primary} />
                  <Text style={styles.cdlEarningText}>No experience required</Text>
                </View>
                
                <TouchableOpacity style={styles.cdlApplyButton}>
                  <Text style={styles.cdlApplyButtonText}>Apply Now</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.cdlFormSection}>
                <Text style={styles.subSectionTitle}>YOUR NEW DRIVING CAREER STARTS HERE</Text>
                
                <TouchableOpacity style={styles.cdlApplyButton}>
                  <Text style={styles.cdlApplyButtonText}>Complete Application Form</Text>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
        </>
      )}

      {/* Enroll CTA */}
      <TouchableOpacity style={styles.enrollButton}>
        <Text style={styles.enrollButtonText}>Enroll Today</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  headerCard: {
    marginBottom: 16,
    backgroundColor: colors.primary,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerText: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
    color: '#2c3e50',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2c3e50',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
    marginBottom: 16,
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  feature: {
    alignItems: 'center',
  },
  featureText: {
    fontSize: 14,
    color: '#2c3e50',
    marginTop: 8,
    textAlign: 'center',
  },
  programCard: {
    marginBottom: 16,
  },
  programHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  programTitleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  programTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  duration: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 4,
  },
  programDescription: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
    marginBottom: 12,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  readMoreText: {
    fontSize: 16,
    color: colors.primary,
    marginRight: 8,
  },
  eventCard: {
    marginBottom: 12,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  eventDay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  eventTime: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 8,
  },
  eventLocation: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  featuresCard: {
    backgroundColor: colors.primary + '10',
  },
  supportFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  supportText: {
    fontSize: 16,
    color: '#2c3e50',
    marginLeft: 16,
    flex: 1,
  },
  enrollButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 24,
  },
  enrollButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  programDuration: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 4,
  },
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  readMore: {
    fontSize: 16,
    color: "#007AFF",
    marginRight: 8,
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 8,
  },
  learnMoreButtonText: {
    fontSize: 16,
    color: 'white',
    marginRight: 8,
  },
  // Tab styles
  tabContainer: {
    flexDirection: 'row',
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
  cdlContactText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
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
  cdlFormSection: {
    marginTop: 24,
  },
});

export default CareerPlacementScreen;
