import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native-web';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

const services = [
  {
    id: 1,
    title: 'Mental Health Treatment',
    icon: 'medical-outline' as const,
  },
  {
    id: 2,
    title: 'Substance Abuse & Mental Health Seminars',
    icon: 'people-outline' as const,
  },
  {
    id: 3,
    title: 'Trauma Informed Care',
    icon: 'heart-outline' as const,
  },
  {
    id: 4,
    title: 'Medicated Assisted Treatment',
    icon: 'medical-outline' as const,
  },
  {
    id: 5,
    title: 'Narcan Community Distribution Site',
    icon: 'medkit-outline' as const,
  },
  {
    id: 6,
    title: 'Crisis Stabilization & Diversity Training',
    icon: 'people-outline' as const,
  },
  {
    id: 7,
    title: 'Individual, Group, and Spiritual Counseling',
    icon: 'person-outline' as const,
  },
  {
    id: 8,
    title: 'Mentoring Sessions',
    icon: 'people-outline' as const,
  },
  {
    id: 9,
    title: 'Job Training & Placement',
    icon: 'briefcase-outline' as const,
  },
  {
    id: 10,
    title: 'Dental Restorative Treatment',
    icon: 'medical-outline' as const,
  },
  {
    id: 11,
    title: 'Life Skills Classes',
    icon: 'school-outline' as const,
  },
];

const partners = [
  {
    id: 1,
    name: 'St. Luke\'s Surrey Rehab',
    description: 'Comprehensive rehabilitation services for the community.',
    icon: 'medical-outline' as const,
  },
  {
    id: 2,
    name: 'St. John\'s Place',
    description: 'Community-focused healthcare and support services.',
    icon: 'home-outline' as const,
  },
  {
    id: 3,
    name: 'Community Foundation',
    description: 'Supporting local initiatives and community development programs.',
    icon: 'people-outline' as const,
  },
  {
    id: 4,
    name: 'Urban Strategies',
    description: 'Strategic planning and development for urban communities.',
    icon: 'business-outline' as const,
  },
  {
    id: 5,
    name: 'Episcopal Health Trust Fund',
    description: 'Funding healthcare initiatives and programs for underserved communities.',
    icon: 'cash-outline' as const,
  },
  {
    id: 6,
    name: 'Department of Health & Senior Services',
    description: 'Government agency providing health services and resources for seniors.',
    icon: 'shield-outline' as const,
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

      {/* Our Team Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Team</Text>
        <View style={styles.teamContainer}>
          {/* Sabrina Davis */}
          <View style={styles.teamMemberCard}>
            <Image 
              source={require('../../assets/sabrina.jpg')} 
              style={styles.teamMemberImage} 
              resizeMode="cover" 
            />
            <View style={styles.teamMemberInfo}>
              <Text style={styles.teamMemberName}>Sabrina Davis, APRN-PMHNP, MSN, RADC-P</Text>
              <Text style={styles.teamMemberRole}>Founder & Executive Director</Text>
              <Text style={styles.teamMemberBio}>
                Sabrina Davis, APRN-PMHNP, MSN, is the Co-Founder and Executive Director of WalkNFaith Substance Abuse & Mental Health Treatment Center. Sabrina is a Psych Mental Health Nurse Practitioner with over 20 years of experience in Community Health, Mental Health, and Substance Use Treatment. She holds her Master's Degree in Executive Leadership & Management. Her commitment to advocacy for individuals diagnosed with Opiate Use Disorder has led her to open WalkNFaith in one of the highest crime and impoverished communities in Saint Louis City. To ensure individuals in rural and low-income communities have access to quality substance abuse & mental health treatment, she has acquired the only substance abuse mobile clinic van in Saint Louis. She has become the voice of those suffering from health and racial disparities.
              </Text>
            </View>
          </View>

          {/* Richard Hayes */}
          <View style={styles.teamMemberCard}>
            <Image 
              source={require('../../assets/Richard-Hayes.jpg')} 
              style={styles.teamMemberImage} 
              resizeMode="cover" 
            />
            <View style={styles.teamMemberInfo}>
              <Text style={styles.teamMemberName}>Richard Hayes</Text>
              <Text style={styles.teamMemberRole}>President</Text>
              <Text style={styles.teamMemberBio}>
                Richard Hayes has over ten years of experience in ministry and is the President of WalkNFaith. He facilitates spiritual counseling at WalkNFaith Treatment Center. Richard brings over 15 years of experience as a community activist. He remains committed to decreasing racial disparities and improving the quality of life for underprivileged people by leading our "Homeless Outreach" and "Youth Mentoring" programs.
              </Text>
            </View>
          </View>

          {/* Mandy Parker */}
          <View style={styles.teamMemberCard}>
            <Image 
              source={require('../../assets/walknfaith-logo.png')} 
              style={styles.teamMemberImage} 
              resizeMode="cover" 
            />
            <View style={styles.teamMemberInfo}>
              <Text style={styles.teamMemberName}>Mandy Parker MS, BCBA, LBA</Text>
              <Text style={styles.teamMemberRole}>Behavioral Specialist</Text>
              <Text style={styles.teamMemberBio}>
                Mandy Parker has her undergraduate degree from Utah State University and a Master in Science at Southern Illinois University in Behavior Analysis and Therapy. She has years of experience working in various areas of human services: disabilities, youth corrections, substance abuse for adolescents, brain injury rehabilitation, helping families indicated on abuse and neglect in their homes to establish routines, acquire child management, problem-solving, assertiveness, budgeting, and stress management skills. She facilitates community training and serves on a Children's behavioral health coalition. Mandy specializes in Acceptance and Commitment Training and is passionate about teaching others how to identify their values and live more in line with what matters most to them amid whatever challenges they face.
              </Text>
            </View>
          </View>

          {/* Emmanuel Opada */}
          <View style={styles.teamMemberCard}>
            <Image 
              source={require('../../assets/embada.png')} 
              style={styles.teamMemberImage} 
              resizeMode="cover" 
            />
            <View style={styles.teamMemberInfo}>
              <Text style={styles.teamMemberName}>Emmanuel Opada MD, MPH, CPH, CIC</Text>
              <Text style={styles.teamMemberRole}>Infection Control Epidemiologist</Text>
              <Text style={styles.teamMemberBio}>
                Emmanuel is a board-certified Infection Control Epidemiologist. He has ten years of experience working in healthcare facilities and public health in West Africa and the United States. He has a medical background and a Master's degree in Public health. He is an Epidemiologist and have lead several projects including the Global Fund Project, on HIV prevention, care, and treatment in West Africa. He has several published articles regarding therapy for HIV and maternal health.
              </Text>
            </View>
          </View>

          {/* Dr. Christine Crowder */}
          <View style={styles.teamMemberCard}>
            <Image 
              source={require('../../assets/christina.png')} 
              style={styles.teamMemberImage} 
              resizeMode="cover" 
            />
            <View style={styles.teamMemberInfo}>
              <Text style={styles.teamMemberName}>Dr. Christine Crowder</Text>
              <Text style={styles.teamMemberRole}>Associate Professor</Text>
              <Text style={styles.teamMemberBio}>
                Greetings everyone! My name is Dr. Christine Crowder. I reside in the St. Louis metropolitan area. I received my bachelor's degree in Psychology, Master of Social Work and Master of Arts in Teaching (Social Sciences) degrees at Grambling State University (Grambling, Louisiana).
              </Text>
            </View>
          </View>

          {/* Janika Johnson */}
          <View style={styles.teamMemberCard}>
            <Image 
              source={require('../../assets/janika.jpeg')} 
              style={styles.teamMemberImage} 
              resizeMode="cover" 
            />
            <View style={styles.teamMemberInfo}>
              <Text style={styles.teamMemberName}>Janika Johnson</Text>
              <Text style={styles.teamMemberRole}>Nurse Practitioner, Internal Medicine Specialist</Text>
              <Text style={styles.teamMemberBio}>
                I am a Nurse Practitioner specializing in Internal Medicine and serving as a Hospitalist. I have traveled and worked across various clinical settings, including labor and delivery, medical-surgical, inpatient rehabilitation, and psychiatric nursing. This broad experience has equipped me with a comprehensive understanding of patient care, enabling a holistic approach to managing complex medical conditions.
                
                I am passionate about advancing the field of healthcare, and deeply committed to teaching and mentoring the next generation of healthcare professionals. Whether through clinical training or educational outreach, I strive to inspire future healthcare workers to provide compassionate and evidence-based care.
              </Text>
            </View>
          </View>

          {/* Shon Wash */}
          <View style={styles.teamMemberCard}>
            <Image 
              source={require('../../assets/shon-wash.jpg')} 
              style={styles.teamMemberImage} 
              resizeMode="cover" 
            />
            <View style={styles.teamMemberInfo}>
              <Text style={styles.teamMemberName}>Shon Wash</Text>
              <Text style={styles.teamMemberRole}>Marketing Director</Text>
              <Text style={styles.teamMemberBio}>
                Shon Wash brings over 15 years of strategic marketing experience to WalkNFaith. His expertise in community outreach and digital marketing has helped expand the organization's reach throughout the St. Louis area. Shon is passionate about creating awareness for mental health and substance abuse resources in underserved communities. He leads all marketing initiatives, public relations efforts, and community engagement strategies, ensuring that those who need WalkNFaith's services can easily find and access them.
              </Text>
            </View>
          </View>
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
    color: colors.text,
    textAlign: 'center',
  },
  teamContainer: {
    marginTop: 10,
  },
  teamMemberCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
  },
  teamMemberImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 15,
  },
  teamMemberInfo: {
    flex: 1,
  },
  teamMemberName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  teamMemberRole: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  teamMemberBio: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
  },
});
