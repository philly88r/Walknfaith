import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Image,
  Linking,
} from 'react-native-web';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { colors } from '../theme/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ProgramLead {
  name: string;
  role: string;
  bio: string;
  image: any;
}

interface ZoomSession {
  title: string;
  date: string;
  time: string;
  link: string;
}

interface Resource {
  title: string;
  description: string;
  link?: string;
  phone?: string;
}

const MentorshipScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState('program');
  
  const programLeads: ProgramLead[] = [
    {
      name: "Mandy Parker MS, BCBA, LBA",
      role: "Youth Regional Director",
      bio: "Mandy Parker has her undergraduate degree from Utah State University and a Master in Science at Southern Illinois University in Behavior Analysis and Therapy. She has years of experience working in various areas of human services: disabilities, youth corrections, substance abuse for adolescents, brain injury rehabilitation, helping families indicated on abuse and neglect in their homes to establish routines, acquire child management, problem-solving, assertiveness, budgeting, and stress management skills. She facilitates community training and serves on a Children's behavioral health coalition. Mandy specializes in Acceptance and Commitment Training and is passionate about teaching others how to identify their values and live more in line with what matters most to them amid whatever challenges they face.",
      image: require('../../assets/walknfaith-logo.png'),
    },
    {
      name: "Donyell Brooks, CNA",
      role: "CNA Student Mentor",
      bio: "I recently completed my CNA course at WalkNFaith/Purpose Tech Institute. I am so excited about my accomplishment and finally reaching one of my goals. A little more about me is that I graduated in 2017 as a medical assistant and in 2018 I became a pharmacy technician. I love the medical field and have a passion for caring for people. I have future plans to become a nurse practitioner in the NICU and also want to mentor and assist others wanting to join the medical field.",
      image: require('../../assets/DonyellBrooks.jpeg'),
    },
    {
      name: "Staci Stevenson",
      role: "Peer Youth Mentor",
      bio: "I'm a dedicated nursing student at the University of Missouri. After completing the CNA program with Walk N Faith last summer, I discovered my passion for healthcare and have since committed to pursuing a career in nursing. This fall, I'm starting my clinical major, and I'm on track to graduate in December 2026. In addition to my studies, I founded USNursing, an organization designed to build a supportive community on campus and promote diversity within the nursing field.",
      image: require('../../assets/staci_stevenson.jpeg'),
    },
    {
      name: "Emmanuel Opada",
      role: "Physician Mentor/Regional Health Director",
      bio: "Emmanuel is a board certified Infection Control Epidemiologist. He has about 10 years experience working in both healthcare facilities and public health both in West Africa and the United State. He has a background in Medicine and also holds a Master degree in Public health. He is currently an Epidemiologist at the Victoria County Health Department, Texas, having worked with government and non governmental organizations including the Global Fund Project on HIV prevention, care and treatment in West Africa. He has some articles published in his name.",
      image: require('../../assets/embada.png'),
    }
  ];

  // Calendar data removed as requested

  const mentalHealthResources: Resource[] = [
    {
      title: "Anxiety Support",
      description: "Understanding and managing anxiety in daily life",
      link: "https://example.com/anxiety",
    },
    {
      title: "Depression Resources",
      description: "Coping strategies and support for depression",
      link: "https://example.com/depression",
    }
    // Add more resources here
  ];

  // Education data removed as requested

  const handleLink = (url: string) => {
    Linking.openURL(url);
  };

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const renderMentorshipInfo = () => (
    <View style={styles.section}>
      <View style={styles.infoCard}>
        <Text style={styles.paragraphText}>
          We understand mentoring is widely used, and the chances are that you will have either been mentored or mentored someone else at some stage, or several stages in your life, without even realizing it or calling it mentoring. We, here at Purpose Tech Institute define mentoring as a caring seasoned individual or peer, nurse, cna, or Nurse Practitioner sharing their knowledge, skills, and experience with another person to help them to progress.
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Who are the Peer Mentors?</Text>
        <Text style={styles.paragraphText}>
          The definition of a mentor is a person who shares their knowledge, skills, and/or their experience, to help another person, or group of people, to progress. Our mentors are Certified Nurse Aides and Nurses who want to see you exceed and reach your goals.
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>What is a Mentee?</Text>
        <Text style={styles.paragraphText}>
          The definition of a mentee is a person who receives knowledge, skills, experience, and guidance from a mentor, to help them, the mentee, to progress. This progress is seen in our program as student's who are enrolled in our technical program and are looking for career development, such as moving into a new role or job, but can be offered throughout a person's life. In some cases, you may here the word mentee referred to as 'mentoree'.
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>What are the Benefits of Mentoring?</Text>
        <Text style={styles.paragraphText}>
          There are a significant number of benefits to mentoring for everyone involved. In traditional mentoring, with two parties, both the mentor and mentee stand to gain a lot from the mentoring relationship, which is why organizations are increasingly using mentoring programs and mentoring software to promote mentoring to their employees.
        </Text>
        
        <Text style={styles.subTitle}>Benefits of mentoring can include:</Text>
        
        <View style={styles.benefitsList}>
          <View style={styles.benefitItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.benefitText}>Effective learning and first-hand knowledge-sharing through mentoring</Text>
          </View>
          
          <View style={styles.benefitItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.benefitText}>Gaining practical insights, guidance, and advice from those in a position of experience</Text>
          </View>
          
          <View style={styles.benefitItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.benefitText}>Increased confidence (typically for the mentee) from having a mentor in a position of seniority in an organisation</Text>
          </View>
          
          <View style={styles.benefitItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.benefitText}>Improved interpersonal and communication skills for both the mentor and mentee</Text>
          </View>
          
          <View style={styles.benefitItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.benefitText}>Empowerment from the mentee to progress effectively and the mentor to take on the new and additional responsibilities of supporting the mentee</Text>
          </View>
          
          <View style={styles.benefitItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.benefitText}>Wider understanding of different perspectives, be that from different countries, organisations or departments in the same organisation</Text>
          </View>
          
          <View style={styles.benefitItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.benefitText}>A trusted partner to discuss more confidential challenges and goals in one's career</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderProgramLeads = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Program Leads</Text>
      <View style={styles.leadsContainer}>
        {programLeads.map((lead, index) => (
          <View key={index} style={styles.leadCard}>
            <Image source={lead.image} style={styles.leadImage} />
            <Text style={styles.leadName}>{lead.name}</Text>
            <Text style={styles.leadRole}>{lead.role}</Text>
            <Text style={styles.leadBio}>{lead.bio}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  // Calendar tab removed as requested

  const renderMentalHealthResources = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Mental Health Resources</Text>
      <View style={styles.resourcesContainer}>
        <TouchableOpacity 
          style={styles.resourceCard}
          onPress={() => navigation.navigate('AnxietyResources')}
        >
          <Text style={styles.resourceTitle}>Anxiety Support</Text>
          <Text style={styles.resourceDescription}>
            Learn about anxiety, treatment options, and access support resources
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.resourceCard}
          onPress={() => navigation.navigate('DepressionResources')}
        >
          <Text style={styles.resourceTitle}>Depression Support</Text>
          <Text style={styles.resourceDescription}>
            Access information about depression, treatment options, and support services
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.resourceCard}
          onPress={() => navigation.navigate('PeerPressure')}
        >
          <Text style={styles.resourceTitle}>Peer Pressure</Text>
          <Text style={styles.resourceDescription}>
            Understanding peer pressure and learning effective coping strategies
          </Text>
        </TouchableOpacity>
        {/* Add more mental health resource cards here */}
      </View>
    </View>
  );

  // Education tab removed as requested

  // Attendance survey removed as requested

  const tabs = [
    { key: 'program', title: 'Program' },
    { key: 'team', title: 'Team' },
    { key: 'resources', title: 'Resources' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Mentorship Hub</Text>
        <Text style={styles.subHeaderText}>
          Connect, Learn, and Grow Together
        </Text>
      </View>

      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        {activeTab === 'program' && (
          <>
            {renderMentorshipInfo()}
          </>
        )}
        {activeTab === 'team' && renderProgramLeads()}
        {activeTab === 'resources' && renderMentalHealthResources()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: colors.primary,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 4,
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  activeTabText: {
    color: colors.white,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  leadCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    width: '48%',
    maxWidth: 500,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leadImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    alignSelf: 'center',
  },
  leadName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  leadRole: {
    fontSize: 14,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  leadBio: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
  },
  leadsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  sessionCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  sessionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sessionDate: {
    fontSize: 14,
    color: colors.textLight,
  },
  sessionTime: {
    fontSize: 14,
    color: colors.textLight,
  },
  joinLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  scheduleButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  scheduleButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  resourcesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  resourceCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emergencyCard: {
    backgroundColor: '#e74c3c',
  },
  resourceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.primary,
  },
  resourceDescription: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  resourceLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  surveyButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  surveyButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
  },
  paragraphText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 12,
    marginBottom: 12,
  },
  benefitsList: {
    marginTop: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginTop: 8,
    marginRight: 8,
  },
  benefitText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
});

export default MentorshipScreen;
