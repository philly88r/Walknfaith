import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { colors } from '../theme/colors';

interface Resource {
  title: string;
  description: string;
  link?: string;
  phone?: string;
}

export default function MentalHealthScreen() {
  const resources: Resource[] = [
    {
      title: '24/7 Crisis Hotline test',
      description: 'Immediate support available 24/7 for mental health crises',
      phone: '1-800-273-8255',
    },
    {
      title: 'Online Counseling',
      description: 'Connect with licensed therapists online',
      link: 'https://www.betterhelp.com',
    },
    {
      title: 'Anxiety and Depression Support',
      description: 'Resources and support groups for anxiety and depression',
      link: 'https://adaa.org',
    },
    {
      title: 'Mindfulness Meditation',
      description: 'Free guided meditation resources',
      link: 'https://www.headspace.com',
    },
    {
      title: 'Support Groups',
      description: 'Find local and online support groups',
      link: 'https://www.nami.org/Support-Education/Support-Groups',
    },
  ];

  const handleLinkPress = (url?: string) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  const handlePhonePress = (phone?: string) => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Mental Health Resources</Text>
        <Text style={styles.subHeaderText}>
          Access support and resources for your mental well-being
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Emergency Support</Text>
        <View style={styles.emergencyCard}>
          <Text style={styles.emergencyTitle}>Need immediate help?</Text>
          <Text style={styles.emergencyText}>
            If you're in crisis or having thoughts of suicide, help is available 24/7
          </Text>
          <TouchableOpacity
            style={styles.emergencyButton}
            onPress={() => handlePhonePress('1-800-273-8255')}
          >
            <Text style={styles.emergencyButtonText}>Call Crisis Hotline</Text>
          </TouchableOpacity>
        </View>

        {resources.map((resource, index) => (
          <TouchableOpacity
            key={index}
            style={styles.resourceCard}
            onPress={() =>
              resource.link
                ? handleLinkPress(resource.link)
                : handlePhonePress(resource.phone)
            }
          >
            <Text style={styles.resourceTitle}>{resource.title}</Text>
            <Text style={styles.resourceDescription}>{resource.description}</Text>
            {resource.link && (
              <Text style={styles.resourceLink}>Click to visit website →</Text>
            )}
            {resource.phone && (
              <Text style={styles.resourceLink}>Click to call →</Text>
            )}
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  emergencyCard: {
    backgroundColor: colors.error,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  emergencyText: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 16,
  },
  emergencyButton: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: colors.error,
    fontSize: 16,
    fontWeight: '600',
  },
  resourceCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
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
  resourceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  resourceDescription: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 12,
  },
  resourceLink: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
});
