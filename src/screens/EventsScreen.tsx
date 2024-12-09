import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { colors } from '../theme/colors';

interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: any;
}

export default function EventsScreen() {
  const events: Event[] = [
    {
      title: 'Mental Health Awareness Workshop',
      date: 'June 15, 2024',
      time: '2:00 PM - 4:00 PM',
      location: 'Community Center',
      description:
        'Join us for an interactive workshop on understanding and managing mental health. Learn practical strategies for maintaining emotional well-being.',
    },
    {
      title: 'Meditation & Mindfulness Session',
      date: 'June 20, 2024',
      time: '10:00 AM - 11:30 AM',
      location: 'Healing Garden',
      description:
        'Experience the benefits of meditation and mindfulness practices. Suitable for beginners and experienced practitioners alike.',
    },
    {
      title: 'Support Group Meeting',
      date: 'June 25, 2024',
      time: '6:00 PM - 7:30 PM',
      location: 'Online via Zoom',
      description:
        'Monthly support group meeting for individuals seeking community and shared experiences in their mental health journey.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Upcoming Events</Text>
        <Text style={styles.subHeaderText}>
          Join us for these enriching events and activities
        </Text>
      </View>

      <View style={styles.content}>
        {events.map((event, index) => (
          <TouchableOpacity key={index} style={styles.eventCard}>
            {event.image && (
              <Image
                source={event.image}
                style={styles.eventImage}
                resizeMode="cover"
              />
            )}
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.eventDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Date:</Text>
                  <Text style={styles.detailText}>{event.date}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Time:</Text>
                  <Text style={styles.detailText}>{event.time}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Location:</Text>
                  <Text style={styles.detailText}>{event.location}</Text>
                </View>
              </View>
              <Text style={styles.eventDescription}>{event.description}</Text>
              <TouchableOpacity style={styles.registerButton}>
                <Text style={styles.registerButtonText}>Register Now</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
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
  content: {
    padding: 20,
  },
  eventCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 200,
  },
  eventInfo: {
    padding: 20,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  eventDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    width: 80,
  },
  detailText: {
    fontSize: 16,
    color: colors.textLight,
    flex: 1,
  },
  eventDescription: {
    fontSize: 16,
    color: colors.textLight,
    lineHeight: 24,
    marginBottom: 16,
  },
  registerButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  registerButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
