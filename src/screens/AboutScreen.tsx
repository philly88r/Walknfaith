import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

const services = [
  {
    id: 1,
    title: 'Mental Health Treatment',
    icon: 'medical',
  },
  {
    id: 2,
    title: 'Substance Abuse & Mental Health Seminars',
    icon: 'people',
  },
  {
    id: 3,
    title: 'Trauma Informed Care',
    icon: 'heart',
  },
  {
    id: 4,
    title: 'Medicated Assisted Treatment',
    icon: 'medical',
  },
  {
    id: 5,
    title: 'Narcan Community Distribution Site',
    icon: 'medkit',
  },
  {
    id: 6,
    title: 'Crisis Stabilization & Diversity Training',
    icon: 'people',
  },
  {
    id: 7,
    title: 'Individual, Group, and Spiritual Counseling',
    icon: 'person',
  },
  {
    id: 8,
    title: 'Mentoring Sessions',
    icon: 'people',
  },
  {
    id: 9,
    title: 'Job Training & Placement',
    icon: 'briefcase',
  },
  {
    id: 10,
    title: 'Dental Restorative Treatment',
    icon: 'medical',
  },
  {
    id: 11,
    title: 'Life Skills Classes',
    icon: 'school',
  },
];

const partners = [
  {
    id: 1,
    name: 'St. Luke\'s Hospital',
    description: 'Leading healthcare provider offering comprehensive medical services.',
    icon: 'medical',
  },
  {
    id: 2,
    name: 'Community Health Network',
    description: 'Network of healthcare providers focused on community wellness.',
    icon: 'people',
  },
  {
    id: 3,
    name: 'Local Mental Health Alliance',
    description: 'Coalition of mental health professionals and organizations.',
    icon: 'heart',
  },
  {
    id: 4,
    name: 'Workforce Development Center',
    description: 'Supporting career development and job placement services.',
    icon: 'business',
  },
];

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Who We Are Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Who We Are</Text>
        <View style={styles.card}>
          <Text style={styles.missionText}>
            Here at WALKNFAITH, our approach is evidence-based and person-centered. We pride ourselves on our approach to both co-occurring mental health and substance abuse issues by providing a culturally sensitive, personalized, and holistic approach to recovery.
          </Text>
          <Text style={styles.missionText}>
            WalkNFaith, is committed and dedicated to ending the Opioid Epidemic through spiritual care, medication-assisted treatment, preventative education, and supportive services.
          </Text>
        </View>
      </View>

      {/* Services Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Services</Text>
        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <View key={service.id} style={styles.serviceCard}>
              <Ionicons name={service.icon} size={24} color={colors.primary} />
              <Text style={styles.serviceTitle}>{service.title}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Partners Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Partners</Text>
        <View style={styles.partnersContainer}>
          {partners.map((partner) => (
            <TouchableOpacity key={partner.id} style={styles.partnerCard}>
              <Ionicons name={partner.icon} size={32} color={colors.primary} />
              <Text style={styles.partnerName}>{partner.name}</Text>
              <Text style={styles.partnerDescription}>{partner.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: width * 0.6,
    height: 100,
    tintColor: colors.white,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.primary,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  missionText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: colors.text,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  serviceCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  serviceTitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    color: colors.text,
    fontWeight: '500',
  },
  partnersContainer: {
    gap: 15,
  },
  partnerCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  partnerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: colors.text,
  },
  partnerDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: colors.textLight,
  },
});
