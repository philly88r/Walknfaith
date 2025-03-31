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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'PurposeTechInstitute'>;

const PurposeTechInstituteScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Purpose Tech Institute & Staffing</Text>
          <Text style={styles.headerSubtitle}>Education for Real-World Success</Text>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Us</Text>
          <Text style={styles.paragraphText}>
            Purpose Technical Institute & Staffing is more than a Technical College. We provide skills 
            training and education needed to find a well-paying, high-demand job. Enrollment is just 
            the first step.
          </Text>
        </View>

        {/* Mission Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.paragraphText}>
            Your success is our priority. Our school instructors provide a personal approach to support 
            our inclusive community, tailoring learning methods to each student's needs.
          </Text>
        </View>

        {/* Educators Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dedicated Educators</Text>
          <Text style={styles.paragraphText}>
            Our classes are taught by dedicated, diverse, and experienced educators throughout the United States. 
            Using proven teaching strategies, they make sure that every student finds a path to success.
          </Text>
        </View>

        {/* Investment Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Investment</Text>
          <Text style={styles.paragraphText}>
            We invest in the following ways to increase work, educational and job-training opportunities 
            that lead to stable careers for adults and youth throughout the country:
          </Text>
          
          <View style={styles.bulletPoint}>
            <MaterialIcons name="arrow-right" size={20} color={colors.primary} />
            <Text style={styles.bulletText}>
              Expanding access to postsecondary education and skills training for adults and youth.
            </Text>
          </View>
          
          <View style={styles.bulletPoint}>
            <MaterialIcons name="arrow-right" size={20} color={colors.primary} />
            <Text style={styles.bulletText}>
              Building partnerships with businesses and others to increase career opportunities for low-wage 
              workers and jobseekers, as well as the pool of workers with skills that employers seek.
            </Text>
          </View>
          
          <View style={styles.bulletPoint}>
            <MaterialIcons name="arrow-right" size={20} color={colors.primary} />
            <Text style={styles.bulletText}>
              Providing families with resources to assist with monthly expenses through our parent assistance 
              program which includes monthly diaper distribution and toiletry supplies.
            </Text>
          </View>
          
          <View style={styles.bulletPoint}>
            <MaterialIcons name="arrow-right" size={20} color={colors.primary} />
            <Text style={styles.bulletText}>
              Facilitating change in black and brown communities through partnerships with Low-income housing 
              by offering tuition-free training and job placement to singe parents who cannot afford to pay.
            </Text>
          </View>
        </View>

        {/* Approach Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Approach</Text>
          <Text style={styles.paragraphText}>
            At Purpose Tech Institute we understand every family situation is unique. Due to this fact, 
            we prioritize our job training programs to fit working-adults, single parents, and individuals 
            who reside in urban communities by offering evening and weekend options.
          </Text>
          
          <Text style={styles.paragraphText}>
            To reduce barriers associated with transportation we offer a hybrid- online platform for 
            curriculum training and transportation to and from our skills centers.
          </Text>
          
          <Text style={styles.paragraphText}>
            To ensure every student's success, we include soft-skills training, parenting skills, 
            resume builder, and dress for success training. We believe a well-prepared student will 
            result in a successful employee.
          </Text>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>What Sets Us Apart</Text>
          
          <View style={styles.featureCard}>
            <FontAwesome5 name="clock" size={24} color={colors.primary} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Flexible Scheduling</Text>
              <Text style={styles.featureText}>
                Evening and weekend classes designed for working adults and single parents
              </Text>
            </View>
          </View>
          
          <View style={styles.featureCard}>
            <FontAwesome5 name="laptop" size={24} color={colors.primary} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Hybrid Learning</Text>
              <Text style={styles.featureText}>
                Online curriculum combined with in-person skills training
              </Text>
            </View>
          </View>
          
          <View style={styles.featureCard}>
            <FontAwesome5 name="bus" size={24} color={colors.primary} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Transportation Assistance</Text>
              <Text style={styles.featureText}>
                Transportation provided to and from our skills centers
              </Text>
            </View>
          </View>
          
          <View style={styles.featureCard}>
            <FontAwesome5 name="briefcase" size={24} color={colors.primary} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Comprehensive Training</Text>
              <Text style={styles.featureText}>
                Technical skills plus soft skills, resume building, and professional development
              </Text>
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaText}>Ready to start your journey to a better career?</Text>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => navigation.navigate('CareerPlacement')}
          >
            <Text style={styles.ctaButtonText}>View Our Programs</Text>
          </TouchableOpacity>
        </View>

        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
          <Text style={styles.backButtonText}>Back to Career Placement</Text>
        </TouchableOpacity>
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
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.primary,
  },
  paragraphText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#34495e',
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingLeft: 10,
    alignItems: 'flex-start',
  },
  bulletText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
  },
  featuresSection: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    alignItems: 'flex-start',
  },
  featureContent: {
    marginLeft: 15,
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
  },
  featureText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#34495e',
  },
  ctaSection: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  ctaText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  ctaButtonText: {
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
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default PurposeTechInstituteScreen;
