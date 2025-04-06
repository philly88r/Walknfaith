import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native-web';
import { Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

interface Program {
  title: string;
  duration: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
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
  const programs: Program[] = [
    {
      title: 'CNA Training Program',
      duration: '10 weeks',
      description: 'Our program allows working adults the flexibility of learning in a hybrid environment.',
      icon: 'medical-services',
    },
    {
      title: 'CDL Training Program',
      duration: '3-4 weeks',
      description: 'Be on your way to a successful truck driving career in just a few weeks.',
      icon: 'local-shipping',
    },
    {
      title: 'Physician Mentor Program',
      duration: 'Flexible',
      description: 'Provides local high school and college students the opportunity to witness and understand the importance of professions in the medical field.',
      icon: 'psychology',
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
          <View style={styles.featureContainer}>
            <View style={styles.feature}>
              <MaterialIcons name="school" size={32} color={colors.primary} />
              <Text style={styles.featureText}>Dedicated Educators</Text>
            </View>
            <View style={styles.feature}>
              <MaterialIcons name="trending-up" size={32} color={colors.primary} />
              <Text style={styles.featureText}>Career Growth</Text>
            </View>
            <View style={styles.feature}>
              <MaterialIcons name="support-agent" size={32} color={colors.primary} />
              <Text style={styles.featureText}>24/7 Support</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Programs Section */}
      <Text style={styles.sectionHeader}>Our Programs</Text>
      {programs.map((program, index) => (
        <Card key={index} style={styles.programCard}>
          <Card.Content>
            <View style={styles.programHeader}>
              <MaterialIcons name={program.icon} size={32} color={colors.primary} />
              <View style={styles.programTitleContainer}>
                <Text style={styles.programTitle}>{program.title}</Text>
                <Text style={styles.duration}>{program.duration}</Text>
              </View>
            </View>
            <Text style={styles.programDescription}>{program.description}</Text>
            <TouchableOpacity style={styles.readMoreButton}>
              <Text style={styles.readMoreText}>Read More</Text>
              <MaterialIcons name="arrow-forward" size={20} color={colors.primary} />
            </TouchableOpacity>
          </Card.Content>
        </Card>
      ))}
      <TouchableOpacity 
        style={styles.programCard}
        onPress={() => navigation.navigate('CNATraining')}
      >
        <View style={styles.programHeader}>
          <FontAwesome5 name="user-nurse" size={24} color="#007AFF" />
          <Text style={styles.programTitle}>CNA Training Program</Text>
        </View>
        <Text style={styles.programDuration}>6-8 weeks</Text>
        <Text style={styles.programDescription}>
          Start your nursing career as a Certified Nursing Assistant. Learn essential patient care skills in our comprehensive program.
        </Text>
        <View style={styles.readMoreContainer}>
          <Text style={styles.readMore}>Learn More</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#007AFF" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.programCard}
        onPress={() => navigation.navigate('CDLTraining')}
      >
        <View style={styles.programHeader}>
          <FontAwesome5 name="truck" size={24} color="#007AFF" />
          <Text style={styles.programTitle}>CDL Training Program</Text>
        </View>
        <Text style={styles.programDuration}>3-4 weeks</Text>
        <Text style={styles.programDescription}>
          Start your career in commercial truck driving. Earn between $69,000 and $85,000 with our ELDT registered training program.
        </Text>
        <View style={styles.readMoreContainer}>
          <Text style={styles.readMore}>Learn More</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#007AFF" />
        </View>
      </TouchableOpacity>

      {/* Schedule Section */}
      <Text style={styles.sectionHeader}>Upcoming Events</Text>
      {events.map((event, index) => (
        <Card key={index} style={styles.eventCard}>
          <Card.Content>
            <View style={styles.eventHeader}>
              <Text style={styles.eventDay}>{event.day}</Text>
              <Text style={styles.eventTime}>{event.time}</Text>
            </View>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDescription}>{event.description}</Text>
            <Text style={styles.eventLocation}>
              <MaterialIcons name="location-on" size={16} color={colors.primary} />
              {' '}{event.location}
            </Text>
          </Card.Content>
        </Card>
      ))}

      {/* Features Section */}
      <Card style={[styles.card, styles.featuresCard]}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Our Best Features</Text>
          <Text style={styles.text}>
            Want a head start on your career? Career and Technical Education courses deliver a core 
            academic education and the employable knowledge you'll need for prolonged career success. 
            We've created a structure that drives career growth even before graduation.
          </Text>
          <View style={styles.supportFeature}>
            <MaterialIcons name="computer" size={32} color={colors.primary} />
            <Text style={styles.supportText}>
              Access to Online Library, Skills Videos, Lectures and more
            </Text>
          </View>
        </Card.Content>
      </Card>

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
});

export default CareerPlacementScreen;
