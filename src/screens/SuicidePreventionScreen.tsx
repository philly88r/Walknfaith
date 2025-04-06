import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native-web';
import { Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface EmergencyResource {
  name: string;
  number: string;
  description: string;
  textOption?: string;
}

interface WarningSign {
  category: string;
  signs: string[];
  icon: keyof typeof MaterialIcons.glyphMap;
}

const SuicidePreventionScreen = () => {
  const emergencyResources: EmergencyResource[] = [
    {
      name: '988 Suicide & Crisis Lifeline',
      number: '988',
      description: '24/7 confidential support for anyone in crisis',
      textOption: '988',
    },
    {
      name: 'Crisis Text Line',
      number: '741741',
      description: 'Text HOME to connect with a crisis counselor',
      textOption: 'HOME',
    },
    {
      name: 'Veterans Crisis Line',
      number: '988',
      description: 'Press 1 after dialing 988 for veteran-specific support',
      textOption: '838255',
    },
    {
      name: 'The Trevor Project (LGBTQ+)',
      number: '1-866-488-7386',
      description: 'Crisis intervention for LGBTQ+ youth',
      textOption: '678678',
    },
  ];

  const warningSignsList: WarningSign[] = [
    {
      category: 'Verbal Signs',
      signs: [
        'Talking about wanting to die',
        'Feeling hopeless or trapped',
        'Being a burden to others',
        'Having no reason to live',
      ],
      icon: 'record-voice-over',
    },
    {
      category: 'Behavioral Changes',
      signs: [
        'Withdrawing from activities',
        'Isolating from friends and family',
        'Sleeping too much or too little',
        'Giving away prized possessions',
        'Increased substance use',
      ],
      icon: 'psychology',
    },
    {
      category: 'Mood Changes',
      signs: [
        'Depression or anxiety',
        'Loss of interest',
        'Irritability or agitation',
        'Sudden calmness after depression',
        'Extreme mood swings',
      ],
      icon: 'mood',
    },
  ];

  const makeCall = (number: string) => {
    const phoneNumber = Platform.select({
      ios: `telprompt:${number}`,
      android: `tel:${number}`,
    });
    if (phoneNumber) {
      Linking.openURL(phoneNumber);
    }
  };

  const sendText = (number: string, message: string) => {
    const smsUrl = Platform.select({
      ios: `sms:${number}&body=${message}`,
      android: `sms:${number}?body=${message}`,
    });
    if (smsUrl) {
      Linking.openURL(smsUrl);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Emergency Help Section */}
      <Card style={[styles.card, styles.emergencyCard]}>
        <Card.Content>
          <Text style={styles.emergencyTitle}>Need Help Now?</Text>
          <Text style={styles.emergencySubtitle}>
            You're not alone. Help is available 24/7.
          </Text>
          {emergencyResources.map((resource, index) => (
            <View key={index} style={styles.resourceContainer}>
              <Text style={styles.resourceName}>{resource.name}</Text>
              <Text style={styles.resourceDescription}>{resource.description}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.callButton}
                  onPress={() => makeCall(resource.number)}
                >
                  <MaterialIcons name="phone" size={24} color="white" />
                  <Text style={styles.buttonText}>Call {resource.number}</Text>
                </TouchableOpacity>
                {resource.textOption && (
                  <TouchableOpacity
                    style={styles.textButton}
                    onPress={() => sendText(resource.number, resource.textOption!)}
                  >
                    <MaterialIcons name="textsms" size={24} color={colors.primary} />
                    <Text style={styles.textButtonText}>
                      Text {resource.textOption}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Warning Signs Section */}
      <Text style={styles.sectionHeader}>Warning Signs</Text>
      {warningSignsList.map((category, index) => (
        <Card key={index} style={styles.card}>
          <Card.Content>
            <View style={styles.categoryHeader}>
              <MaterialIcons name={category.icon} size={24} color={colors.primary} />
              <Text style={styles.categoryTitle}>{category.category}</Text>
            </View>
            <View style={styles.signsList}>
              {category.signs.map((sign, idx) => (
                <Text key={idx} style={styles.sign}>• {sign}</Text>
              ))}
            </View>
          </Card.Content>
        </Card>
      ))}

      {/* Local Resources Section */}
      <Text style={styles.sectionHeader}>Local Resources</Text>
      <Card style={styles.card}>
        <Card.Content>
          <TouchableOpacity
            style={styles.localResource}
            onPress={() => Linking.openURL('https://namiguilford.org')}
          >
            <Text style={styles.localResourceTitle}>NAMI Guilford</Text>
            <Text style={styles.localResourceDescription}>
              Mental health support, online groups, and educational resources
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.localResource}
            onPress={() => Linking.openURL('https://www.guilfordcountync.gov/our-county/human-services/behavioral-health')}
          >
            <Text style={styles.localResourceTitle}>Guilford County Behavioral Health</Text>
            <Text style={styles.localResourceDescription}>
              Comprehensive behavioral health services and crisis support
            </Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>

      {/* Safety Planning Section */}
      <Text style={styles.sectionHeader}>Creating a Safety Plan</Text>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.safetyText}>
            A safety plan can help you navigate difficult moments. Include:
          </Text>
          <View style={styles.safetyList}>
            <Text style={styles.safetyItem}>• Personal warning signs to watch for</Text>
            <Text style={styles.safetyItem}>• Coping strategies that help you</Text>
            <Text style={styles.safetyItem}>• People you can reach out to</Text>
            <Text style={styles.safetyItem}>• Professional contacts and crisis lines</Text>
            <Text style={styles.safetyItem}>• Ways to make your environment safer</Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  emergencyCard: {
    backgroundColor: '#e74c3c',
  },
  emergencyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  emergencySubtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 16,
  },
  resourceContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  resourceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  callButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
  },
  textButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textButtonText: {
    color: colors.primary,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
    color: '#2c3e50',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginLeft: 8,
  },
  signsList: {
    marginLeft: 8,
  },
  sign: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 4,
    lineHeight: 24,
  },
  localResource: {
    marginBottom: 16,
  },
  localResourceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  localResourceDescription: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 22,
  },
  safetyText: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 12,
    lineHeight: 24,
  },
  safetyList: {
    marginLeft: 8,
  },
  safetyItem: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 8,
    lineHeight: 24,
  },
});

export default SuicidePreventionScreen;
