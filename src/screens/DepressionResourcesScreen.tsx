import React from 'react';
import { ScrollView, View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { colors } from '../theme/colors';

const DepressionResourcesScreen = () => {
  const emergencyCall = () => {
    Linking.openURL('tel:988');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Depression Resources</Text>
      
      {/* Understanding Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Understanding Depression</Text>
          <Text style={styles.text}>
            Depression is more than just feeling down; it's a complex condition that can significantly 
            impact daily life. Common symptoms include:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Persistent sadness or low mood</Text>
            <Text style={styles.bulletPoint}>• Loss of interest in activities</Text>
            <Text style={styles.bulletPoint}>• Changes in appetite and weight</Text>
            <Text style={styles.bulletPoint}>• Sleep disturbances</Text>
            <Text style={styles.bulletPoint}>• Fatigue or loss of energy</Text>
            <Text style={styles.bulletPoint}>• Difficulty concentrating</Text>
            <Text style={styles.bulletPoint}>• Feelings of worthlessness</Text>
            <Text style={styles.bulletPoint}>• Recurrent thoughts of death</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Treatment Options */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Professional Treatment Options</Text>
          <Text style={styles.subTitle}>Psychotherapy</Text>
          <Text style={styles.text}>
            Cognitive-behavioral therapy (CBT) and interpersonal therapy (IPT) help identify and 
            change negative thought patterns.
          </Text>
          <Text style={styles.subTitle}>Medication</Text>
          <Text style={styles.text}>
            Antidepressants can help balance brain chemicals affecting mood. Consult a healthcare 
            provider to determine the most suitable medication.
          </Text>
          <Text style={styles.subTitle}>Combination Therapy</Text>
          <Text style={styles.text}>
            Using both psychotherapy and medication often yields the best results.
          </Text>
        </Card.Content>
      </Card>

      {/* Local Resources */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Local Resources in Greensboro</Text>
          <TouchableOpacity 
            style={styles.link}
            onPress={() => Linking.openURL('https://namiguilford.org')}>
            <Text style={styles.linkText}>NAMI Guilford</Text>
          </TouchableOpacity>
          <Text style={styles.text}>
            Free mental health support, online groups, resources, and education for residents.
          </Text>
          <TouchableOpacity 
            style={styles.link}
            onPress={() => Linking.openURL('https://www.dbsalliance.org')}>
            <Text style={styles.linkText}>Depression and Bipolar Support Alliance</Text>
          </TouchableOpacity>
          <Text style={styles.text}>
            Access online support groups and educational resources.
          </Text>
        </Card.Content>
      </Card>

      {/* Self-Help Strategies */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Self-Help Strategies</Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Engage in regular physical activity</Text>
            <Text style={styles.bulletPoint}>• Maintain a healthy diet</Text>
            <Text style={styles.bulletPoint}>• Establish regular sleep patterns</Text>
            <Text style={styles.bulletPoint}>• Practice mindfulness and meditation</Text>
            <Text style={styles.bulletPoint}>• Avoid alcohol and drugs</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Crisis Help */}
      <Card style={[styles.card, styles.emergencyCard]}>
        <Card.Content>
          <Text style={styles.emergencyTitle}>Need Immediate Help?</Text>
          <TouchableOpacity 
            style={styles.emergencyButton}
            onPress={emergencyCall}>
            <Text style={styles.emergencyButtonText}>Call 988 - Crisis Lifeline</Text>
          </TouchableOpacity>
          <Text style={styles.emergencyText}>
            24/7 access to trained crisis counselors
          </Text>
        </Card.Content>
      </Card>

      {/* Educational Resources */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Educational Resources</Text>
          <TouchableOpacity 
            style={styles.link}
            onPress={() => Linking.openURL('https://www.nimh.nih.gov/health/topics/depression')}>
            <Text style={styles.linkText}>National Institute of Mental Health</Text>
          </TouchableOpacity>
          <Text style={styles.text}>
            Comprehensive information on depression symptoms, causes, and treatments.
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2c3e50',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
    color: '#34495e',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2c3e50',
    marginBottom: 8,
  },
  bulletPoints: {
    marginTop: 8,
    marginLeft: 8,
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 4,
    color: '#2c3e50',
  },
  link: {
    marginVertical: 8,
  },
  linkText: {
    fontSize: 16,
    color: '#3498db',
    textDecorationLine: 'underline',
  },
  emergencyCard: {
    backgroundColor: '#e74c3c',
  },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  emergencyButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  emergencyButtonText: {
    color: '#e74c3c',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emergencyText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default DepressionResourcesScreen;
