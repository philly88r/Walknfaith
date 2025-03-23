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
      title: '24/7 Crisis Hotline',
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

        <View style={styles.resourceCardAwarnessAndPrevention}>
        <Text style={styles.resourceTitleAwarenessAndPrevention}>Mental Health Awareness and Prevention</Text>
        <View style={styles.bulletPointContainer}>
          <Text style={[styles.resourceDescription, styles.bulletPoint]}>• Mental health is a key component to overall health and is closely linked to physical health.</Text>
          <Text style={[styles.resourceDescription, styles.bulletPoint]}>• Factors at the individual, family, community, and society levels can influence mental health.</Text>
          <Text style={[styles.resourceDescription, styles.bulletPoint]}>• CDC promotes a public health approach to prevent mental health conditions before they develop or worsen.</Text>
          <Text style={[styles.resourceDescription, styles.bulletPoint]}>• If you live with a mental health condition or are experiencing mental distress, help is available.</Text>
        </View>
        <Text style={styles.resourceDescriptionJustified}>
          Mental health is the component of behavioral health that includes our emotional, psychological, and social well-being. Mental health is a state of well-being that enables us to cope with the stresses of life, realize our abilities, learn well and work well, and contribute to our community.
        </Text>
        <Text style={styles.resourceDescriptionJustified}>
          Mental and physical health are equally important components of overall health.
        </Text>
        <Text style={styles.resourceDescriptionJustified}>
        Mental health is closely linked to physical health.
          For example, depression increases the risk for many types of physical, long-lasting (chronic) conditions like diabetes, heart disease, and stroke. Similarly, the presence of chronic conditions can increase the risk for developing a mental health condition.
          Addressing mental health and physical health needs can improve overall health.
          Mental health is not simply the absence of a mental health condition—it is also about the presence of well-being and the ability to thrive.
        </Text>
        <Text style={styles.resourceDescriptionJustified}>
        Many factors influence our ability to thrive and experience optimal well-being, such as family and community relationships, access to opportunities, and environmental circumstances.
          You can experience positive well-being even if you are living with a mental health condition. Having access to effective treatment that helps to manage symptoms along with presence of safe, stable, and nurturing relationships and environments can help.
          People who don't have a mental health condition may still face challenges to their mental health.
        </Text>
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
  resourceCardAwarnessAndPrevention: {
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
  bulletPointContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  bulletPoint: {
    flex: 1, 
    textAlign: 'center',
  },
  bulletPointSpacing: {
    marginHorizontal: 5,
  },
  resourceTitleAwarenessAndPrevention: {
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
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
  resourceDescriptionJustified: {
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
