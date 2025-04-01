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
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper';
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
      name: "Dr. Sarah Johnson",
      role: "Program Director",
      bio: "20+ years experience in mental health counseling and youth mentorship",
      image: require('../../assets/placeholder.png'),
    },
    // Add more program leads here
  ];

  const upcomingSessions: ZoomSession[] = [
    {
      title: "Mental Health Awareness Workshop",
      date: "November 15, 2023",
      time: "2:00 PM - 3:30 PM",
      link: "https://zoom.us/j/example",
    },
    // Add more sessions here
  ];

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
    },
    {
      title: "Crisis Hotline",
      description: "24/7 support for suicide prevention",
      phone: "1-800-273-8255",
    },
    // Add more resources here
  ];

  const educationalResources: Resource[] = [
    {
      title: "CNA Program Guide",
      description: "Complete guide to becoming a Certified Nursing Assistant",
      link: "https://example.com/cna-guide",
    },
    {
      title: "Certification Opportunities",
      description: "Available certifications in healthcare and mental health",
      link: "https://example.com/certifications",
    },
    {
      title: "Scholarship Database",
      description: "Scholarships available for seniors",
      link: "https://example.com/scholarships",
    },
  ];

  const handleLink = (url: string) => {
    Linking.openURL(url);
  };

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const renderProgramLeads = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Program Leads</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {programLeads.map((lead, index) => (
          <View key={index} style={styles.leadCard}>
            <Image source={lead.image} style={styles.leadImage} />
            <Text style={styles.leadName}>{lead.name}</Text>
            <Text style={styles.leadRole}>{lead.role}</Text>
            <Text style={styles.leadBio}>{lead.bio}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderUpcomingZoomSessions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
      {upcomingSessions.map((session, index) => (
        <TouchableOpacity
          key={index}
          style={styles.sessionCard}
          onPress={() => handleLink(session.link)}
        >
          <Text style={styles.sessionTitle}>{session.title}</Text>
          <View style={styles.sessionDetails}>
            <Text style={styles.sessionDate}>{session.date}</Text>
            <Text style={styles.sessionTime}>{session.time}</Text>
          </View>
          <Text style={styles.joinLink}>Click to join Zoom meeting →</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.scheduleButton}>
        <Text style={styles.scheduleButtonText}>Schedule One-on-One Meeting</Text>
      </TouchableOpacity>
    </View>
  );

  const renderMentalHealthResources = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Mental Health Resources</Text>
      <View style={styles.resourcesContainer}>
        <TouchableOpacity 
          style={[styles.resourceCard, styles.emergencyCard]}
          onPress={() => navigation.navigate('CrisisHotlines')}
        >
          <Text style={[styles.resourceTitle, { color: 'white' }]}>Crisis Hotlines</Text>
          <Text style={[styles.resourceDescription, { color: 'white' }]}>
            24/7 support hotlines with immediate access to trained counselors
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.resourceCard, styles.emergencyCard]}
          onPress={() => navigation.navigate('SuicidePrevention')}
        >
          <Text style={[styles.resourceTitle, { color: 'white' }]}>Suicide Prevention</Text>
          <Text style={[styles.resourceDescription, { color: 'white' }]}>
            Immediate help and resources for suicide prevention
          </Text>
        </TouchableOpacity>
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

  const renderEducationalResources = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Educational Resources</Text>
      
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle2}>Our Peer Mentors</Text>
          <Text style={styles.text}>
            Our mentors understand the journey to recovery, bringing both lived experience and professional dedication. They're here to offer unwavering support, practical guidance, and a compassionate ear, proving that you're never alone. Like Darrisha and Donyell, they're passionate about helping others grow and prosper, fostering a strong team environment where your success is our shared priority.
          </Text>
          <View style={styles.mentorSection}>
            <Image source={require('../../assets/donyell-brooks.png')} style={styles.mentorImage} />
            <Text style={styles.text}>
              Hello all, I am Donyell Brooks, CNA. I recently completed my CNA course at WalkNFaith/ Purpose Tech Institute. I am so excited about my accomplishment and finally reaching one of my goals. A little more about me is that I graduated in 2017 as a medical assistant and in 2018 I became a pharmacy technician. I love the medical field and have a passion for caring for people. I have future plans to become a nurse practitioner in the NICU and also want to mentor and assist others wanting to join the medical field.
            </Text>
          </View>
          <View style={styles.mentorSection}>
            <Image source={require('../../assets/darisha-barnes.png')} style={styles.mentorImage} />
            <Text style={styles.text}>
              Hello! I'm Darrisha Barnes. I've been dedicated to healthcare since age 18, with a passion for elder care that began at 16. I've progressed from dietary aid to L1MA/DSP, and now as a CNA, I find immense fulfilment in improving the lives of my residents. With over six years of experience and a strong work ethic, my residents are my top priority. I'm committed to growth, pursuing my CMT license in six months, and ultimately aiming to become a nurse. I believe my CNA experience provides invaluable insight into the challenges and sacrifices of frontline care, fostering a collaborative and supportive team environment. I'm a team player and eager to assist others in their growth and success.
            </Text>
          </View>
          <View>
            <ImageBackground
              source={require('../../assets/mentor-image.jpg')}
              style={styles.backgroundImage}
              imageStyle={styles.backgroundImageStyle}
            >
              <Text style={styles.overlayText}>
                Mentoring at Purpose Tech Institute involves experienced nurses and CNAs sharing knowledge and skills to support student career development. Peer mentors guide mentees, who are students seeking to advance in their technical programs. Benefits include practical learning, increased confidence, improved communication, and a trusted support system for both mentors and mentees.
              </Text>
            </ImageBackground>
          </View>
        </Card.Content>
      </Card>

      

      {educationalResources.map((resource, index) => (
        <TouchableOpacity
          key={index}
          style={styles.resourceCard}
          onPress={() => resource.link ? handleLink(resource.link) : resource.phone ? handleCall(resource.phone) : null}
        >
          <Text style={styles.resourceTitle}>{resource.title}</Text>
          <Text style={styles.resourceDescription}>{resource.description}</Text>
          {resource.link && <Text style={styles.resourceLink}>Learn More →</Text>}
          {resource.phone && <Text style={styles.resourceLink}>Call Now →</Text>}
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderAttendanceSurvey = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Session Feedback</Text>
      <TouchableOpacity style={styles.surveyButton}>
        <Text style={styles.surveyButtonText}>Complete Attendance Survey</Text>
      </TouchableOpacity>
    </View>
  );

  const tabs = [
    { key: 'program', title: 'Program' },
    { key: 'calendar', title: 'Calendar' },
    { key: 'resources', title: 'Resources' },
    { key: 'education', title: 'Education' },
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
            {renderProgramLeads()}
            {renderAttendanceSurvey()}
          </>
        )}
        {activeTab === 'calendar' && renderUpcomingZoomSessions()}
        {activeTab === 'resources' && renderMentalHealthResources()}
        {activeTab === 'education' && renderEducationalResources()}
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
  card: {
    marginBottom: 16,
    elevation: 4,
    backgroundColor: 'white',
  },
  sectionTitle2: {
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
  mentorSection: {
    flexDirection: 'column', 
    alignItems: 'center',
    marginVertical: 16,
  },
  mentorImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
  },
  mentorBio: {
    flex: 1,
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
  backgroundImage: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  backgroundImageStyle: {
    opacity: 0.3,
  },
  overlayText: {
    textAlign: 'center',
    paddingHorizontal: 16,
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
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
    marginRight: 16,
    width: 200,
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
});

export default MentorshipScreen;
