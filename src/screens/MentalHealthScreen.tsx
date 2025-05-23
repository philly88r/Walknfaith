import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native-web';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';

interface Resource {
  title: string;
  description: string;
  link?: string;
  phone?: string;
}

export default function MentalHealthScreen() {
  const navigation = useNavigation();
  const resources: Resource[] = [
    {
      title: 'Online Counseling',
      description: 'Connect with our counselors through our contact form',
      // Using a special identifier instead of a URL for the contact form
      link: 'CONTACT_FORM',
    },
    {
      title: 'Anxiety and Depression Support',
      description: 'Resources and support groups for anxiety and depression',
      link: 'https://adaa.org',
    },
    // Mindfulness Meditation resource removed as requested
    {
      title: 'Support Groups',
      description: 'Find local and online support groups',
      link: 'https://www.nami.org/Support-Education/Support-Groups',
    },
  ];

  const handleLinkPress = (url?: string) => {
    if (url === 'CONTACT_FORM') {
      // Navigate to the Contact screen
      navigation.navigate('Contact' as never);
    } else if (url) {
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
