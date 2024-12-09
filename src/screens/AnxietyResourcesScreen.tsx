import React from 'react';
import { ScrollView, View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

const AnxietyResourcesScreen = () => {
  const emergencyCall = () => {
    Linking.openURL('tel:988');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Anxiety Resources</Text>
      
      {/* Understanding Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Understanding Anxiety Disorders</Text>
          <Text style={styles.text}>
            Anxiety disorders are characterized by excessive fear or worry that is difficult to control 
            and disproportionate to the actual situation. Common symptoms include:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Restlessness</Text>
            <Text style={styles.bulletPoint}>• Fatigue</Text>
            <Text style={styles.bulletPoint}>• Difficulty concentrating</Text>
            <Text style={styles.bulletPoint}>• Irritability</Text>
            <Text style={styles.bulletPoint}>• Muscle tension</Text>
            <Text style={styles.bulletPoint}>• Sleep disturbances</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Treatment Options */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Professional Treatment Options</Text>
          <Text style={styles.subTitle}>Psychotherapy</Text>
          <Text style={styles.text}>
            Cognitive-behavioral therapy (CBT) helps identify and modify negative thought patterns 
            and behaviors associated with anxiety.
          </Text>
          <Text style={styles.subTitle}>Medication</Text>
          <Text style={styles.text}>
            Various medications can be prescribed to manage symptoms. Consult with a healthcare 
            provider to determine the most appropriate treatment.
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
            onPress={() => Linking.openURL('https://www.guilfordcountync.gov/our-county/human-services/behavioral-health')}>
            <Text style={styles.linkText}>Guilford County Behavioral Health Centers</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>

      {/* Self-Help Strategies */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Self-Help Strategies</Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Practice mindfulness and meditation</Text>
            <Text style={styles.bulletPoint}>• Engage in regular physical activity</Text>
            <Text style={styles.bulletPoint}>• Maintain healthy lifestyle choices</Text>
            <Text style={styles.bulletPoint}>• Use stress management techniques</Text>
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

export default AnxietyResourcesScreen;
