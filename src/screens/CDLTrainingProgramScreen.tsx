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

type Props = NativeStackScreenProps<RootStackParamList, 'CDLTrainingProgram'>;

const CDLTrainingProgramScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>CDL Training Program</Text>
          <Text style={styles.headerSubtitle}>Start Your Career in Commercial Truck Driving</Text>
        </View>

        {/* Program Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Program Overview</Text>
          <Text style={styles.paragraphText}>
            Our CDL Training Program prepares you for a successful career in commercial truck driving. 
            With our comprehensive 3-4 week program, you can earn between $69,000 and $85,000 annually.
            Our ELDT registered training program meets all federal requirements for entry-level driver training.
          </Text>
        </View>

        {/* Program Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Program Features</Text>
          
          <View style={styles.bulletPoint}>
            <MaterialIcons name="check-circle" size={20} color={colors.primary} />
            <Text style={styles.bulletText}>
              Comprehensive classroom instruction
            </Text>
          </View>
          
          <View style={styles.bulletPoint}>
            <MaterialIcons name="check-circle" size={20} color={colors.primary} />
            <Text style={styles.bulletText}>
              Hands-on driving experience
            </Text>
          </View>
          
          <View style={styles.bulletPoint}>
            <MaterialIcons name="check-circle" size={20} color={colors.primary} />
            <Text style={styles.bulletText}>
              Test preparation and CDL exam assistance
            </Text>
          </View>
          
          <View style={styles.bulletPoint}>
            <MaterialIcons name="check-circle" size={20} color={colors.primary} />
            <Text style={styles.bulletText}>
              Job placement assistance upon completion
            </Text>
          </View>
        </View>

        {/* Program Schedule */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Program Schedule</Text>
          <Text style={styles.paragraphText}>
            Our 3-4 week program is designed to get you on the road quickly. Classes are available 
            during daytime and evening hours to accommodate your schedule.
          </Text>
          
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleDay}>Week 1</Text>
            <Text style={styles.scheduleDescription}>
              Classroom instruction, CDL permit preparation
            </Text>
          </View>
          
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleDay}>Week 2</Text>
            <Text style={styles.scheduleDescription}>
              Basic vehicle operation, range driving
            </Text>
          </View>
          
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleDay}>Week 3</Text>
            <Text style={styles.scheduleDescription}>
              Advanced driving techniques, road training
            </Text>
          </View>
          
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleDay}>Week 4</Text>
            <Text style={styles.scheduleDescription}>
              Test preparation, CDL exam, job placement assistance
            </Text>
          </View>
        </View>

        {/* Tuition and Financing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tuition and Financing</Text>
          <Text style={styles.paragraphText}>
            We offer competitive tuition rates and various financing options to help you start your 
            new career without financial stress.
          </Text>
          
          <View style={styles.pricingCard}>
            <Text style={styles.pricingTitle}>Program Tuition</Text>
            <Text style={styles.pricingAmount}>$4,500</Text>
            <Text style={styles.pricingDescription}>
              Includes all instruction, materials, and test fees
            </Text>
          </View>
          
          <Text style={styles.paragraphText}>
            Financial assistance and payment plans are available for qualified applicants. 
            Many employers also offer tuition reimbursement programs.
          </Text>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaText}>Ready to start your career in truck driving?</Text>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => navigation.navigate('Contact')}
          >
            <Text style={styles.ctaButtonText}>Contact Us Today</Text>
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
  scheduleItem: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  scheduleDay: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  scheduleDescription: {
    fontSize: 16,
    color: '#34495e',
  },
  pricingCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 20,
    marginVertical: 15,
    alignItems: 'center',
  },
  pricingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  pricingAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  pricingDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
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

export default CDLTrainingProgramScreen;
