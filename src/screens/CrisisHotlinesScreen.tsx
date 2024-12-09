import React from 'react';
import { ScrollView, View, Text, StyleSheet, Linking, TouchableOpacity, Platform } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface HotlineInfo {
  name: string;
  description: string;
  number: string;
  hours: string;
  website?: string;
}

const CrisisHotlinesScreen = () => {
  const hotlines: HotlineInfo[] = [
    {
      name: '988 Suicide & Crisis Lifeline',
      description: 'Free, confidential 24/7 support for people in distress, prevention and crisis resources.',
      number: '988',
      hours: '24/7',
      website: 'https://988lifeline.org',
    },
    {
      name: 'Crisis Text Line',
      description: 'Free crisis counseling via text message.',
      number: '741741',
      hours: '24/7',
      website: 'https://www.crisistextline.org',
    },
    {
      name: 'SAMHSA National Helpline',
      description: 'Treatment referral and information service for individuals dealing with mental health or substance use disorders.',
      number: '1-800-662-4357',
      hours: '24/7',
      website: 'https://www.samhsa.gov/find-help/national-helpline',
    },
    {
      name: 'Veterans Crisis Line',
      description: 'Connects veterans and their families with caring, qualified responders.',
      number: '988',
      hours: '24/7',
      website: 'https://www.veteranscrisisline.net',
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

  const openWebsite = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={[styles.card, styles.emergencyCard]}>
        <Card.Content>
          <Text style={styles.emergencyTitle}>Emergency Services</Text>
          <TouchableOpacity 
            style={styles.emergencyButton}
            onPress={() => makeCall('911')}>
            <MaterialIcons name="emergency" size={24} color="#e74c3c" />
            <Text style={styles.emergencyButtonText}>Call 911 for Immediate Emergency</Text>
          </TouchableOpacity>
          <Text style={styles.emergencyText}>
            If you or someone else is in immediate danger
          </Text>
        </Card.Content>
      </Card>

      <Text style={styles.header}>Crisis Hotlines</Text>
      
      {hotlines.map((hotline, index) => (
        <Card key={index} style={styles.card}>
          <Card.Content>
            <Text style={styles.hotlineName}>{hotline.name}</Text>
            <Text style={styles.description}>{hotline.description}</Text>
            <Text style={styles.hours}>Available: {hotline.hours}</Text>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.callButton}
                onPress={() => makeCall(hotline.number)}>
                <MaterialIcons name="phone" size={24} color="white" />
                <Text style={styles.buttonText}>Call {hotline.number}</Text>
              </TouchableOpacity>

              {hotline.website && (
                <TouchableOpacity 
                  style={styles.websiteButton}
                  onPress={() => openWebsite(hotline.website!)}>
                  <MaterialIcons name="language" size={24} color={colors.primary} />
                  <Text style={styles.websiteButtonText}>Visit Website</Text>
                </TouchableOpacity>
              )}
            </View>
          </Card.Content>
        </Card>
      ))}

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>About Crisis Hotlines</Text>
          <Text style={styles.text}>
            Crisis hotlines provide immediate, confidential support 24/7. Trained counselors are 
            ready to listen, offer support, and connect you with local resources. Don't hesitate 
            to reach out - help is always available.
          </Text>
          <Text style={styles.text}>
            All calls are confidential and free of charge.
          </Text>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c3e50',
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  emergencyCard: {
    backgroundColor: '#e74c3c',
    marginBottom: 24,
  },
  emergencyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  emergencyButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  emergencyButtonText: {
    color: '#e74c3c',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  emergencyText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 8,
  },
  hotlineName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 8,
    lineHeight: 22,
  },
  hours: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  callButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 8,
  },
  websiteButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  websiteButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2c3e50',
    marginBottom: 8,
  },
});

export default CrisisHotlinesScreen;
