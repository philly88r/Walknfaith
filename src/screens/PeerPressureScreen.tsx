import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native-web';
import { Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface PressureType {
  title: string;
  description: string;
  examples: string[];
}

interface CopingStrategy {
  title: string;
  description: string;
  tips: string[];
  icon: keyof typeof MaterialIcons.glyphMap;
}

const PeerPressureScreen = () => {
  const [expandedType, setExpandedType] = useState<number | null>(null);
  const [expandedStrategy, setExpandedStrategy] = useState<number | null>(null);

  const pressureTypes: PressureType[] = [
    {
      title: 'Direct Peer Pressure',
      description: 'Explicitly communicated pressures from peers',
      examples: [
        'Being directly asked to try substances',
        'Explicit invitations to skip classes',
        'Direct requests to share test answers',
      ],
    },
    {
      title: 'Indirect Peer Pressure',
      description: 'Subtle influences from observing peer behavior',
      examples: [
        'Feeling left out when not wearing certain brands',
        'Wanting to change habits to fit in',
        'Adopting group mannerisms',
      ],
    },
    {
      title: 'Positive Peer Pressure',
      description: 'Influences that encourage beneficial behaviors',
      examples: [
        'Friends encouraging academic excellence',
        'Group support for healthy habits',
        'Motivation to participate in community service',
      ],
    },
    {
      title: 'Negative Peer Pressure',
      description: 'Influences that lead to harmful behaviors',
      examples: [
        'Pressure to engage in risky activities',
        'Encouragement to break rules',
        'Influence to exclude others',
      ],
    },
  ];

  const copingStrategies: CopingStrategy[] = [
    {
      title: 'Build Self-Confidence',
      description: 'Develop strong self-esteem and trust in your decisions',
      tips: [
        'Practice positive self-talk',
        'Set and achieve personal goals',
        'Celebrate your unique qualities',
        'Remember your values and beliefs',
      ],
      icon: 'star',
    },
    {
      title: 'Choose Friends Wisely',
      description: 'Surround yourself with positive influences',
      tips: [
        'Seek friends who respect your choices',
        'Connect with people who share your values',
        'Build relationships with supportive peers',
        'Distance yourself from negative influences',
      ],
      icon: 'people',
    },
    {
      title: 'Practice Assertiveness',
      description: 'Learn to say no confidently and set boundaries',
      tips: [
        'Use "I" statements to express your feelings',
        'Practice saying no in different ways',
        'Stand firm in your decisions',
        'Explain your reasons if you feel comfortable',
      ],
      icon: 'volume-up',
    },
    {
      title: 'Seek Support',
      description: 'Connect with trusted individuals for guidance',
      tips: [
        'Talk to parents or guardians',
        'Consult school counselors',
        'Connect with mentors',
        'Join support groups',
      ],
      icon: 'help',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Understanding Peer Pressure</Text>
      
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>What is Peer Pressure?</Text>
          <Text style={styles.text}>
            Peer pressure is a social influence where individuals feel compelled to conform to the 
            behaviors, attitudes, or values of their peer group. While often viewed negatively, 
            peer pressure can also lead to positive outcomes depending on the influence.
          </Text>
        </Card.Content>
      </Card>

      <Text style={styles.sectionHeader}>Types of Peer Pressure</Text>
      {pressureTypes.map((type, index) => (
        <Card key={index} style={styles.card}>
          <TouchableOpacity
            onPress={() => setExpandedType(expandedType === index ? null : index)}
          >
            <Card.Content>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{type.title}</Text>
                <MaterialIcons 
                  name={expandedType === index ? 'expand-less' : 'expand-more'} 
                  size={24} 
                  color={colors.primary}
                />
              </View>
              <Text style={styles.description}>{type.description}</Text>
              {expandedType === index && (
                <View style={styles.exampleContainer}>
                  <Text style={styles.exampleTitle}>Examples:</Text>
                  {type.examples.map((example, idx) => (
                    <Text key={idx} style={styles.example}>• {example}</Text>
                  ))}
                </View>
              )}
            </Card.Content>
          </TouchableOpacity>
        </Card>
      ))}

      <Text style={styles.sectionHeader}>Coping Strategies</Text>
      {copingStrategies.map((strategy, index) => (
        <Card key={index} style={styles.card}>
          <TouchableOpacity
            onPress={() => setExpandedStrategy(expandedStrategy === index ? null : index)}
          >
            <Card.Content>
              <View style={styles.cardHeader}>
                <View style={styles.strategyTitleContainer}>
                  <MaterialIcons name={strategy.icon} size={24} color={colors.primary} />
                  <Text style={styles.cardTitle}>{strategy.title}</Text>
                </View>
                <MaterialIcons 
                  name={expandedStrategy === index ? 'expand-less' : 'expand-more'} 
                  size={24} 
                  color={colors.primary}
                />
              </View>
              <Text style={styles.description}>{strategy.description}</Text>
              {expandedStrategy === index && (
                <View style={styles.tipsContainer}>
                  <Text style={styles.tipsTitle}>Tips:</Text>
                  {strategy.tips.map((tip, idx) => (
                    <Text key={idx} style={styles.tip}>• {tip}</Text>
                  ))}
                </View>
              )}
            </Card.Content>
          </TouchableOpacity>
        </Card>
      ))}

      <Card style={[styles.card, styles.conclusionCard]}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Remember</Text>
          <Text style={styles.text}>
            You have the right to make your own choices and stand by your values. If you're 
            struggling with peer pressure, don't hesitate to reach out to trusted adults, 
            counselors, or mentors for support.
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
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
    color: '#2c3e50',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  strategyTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginLeft: 8,
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 8,
    lineHeight: 22,
  },
  exampleContainer: {
    marginTop: 12,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  example: {
    fontSize: 15,
    color: '#34495e',
    marginBottom: 4,
    lineHeight: 20,
  },
  tipsContainer: {
    marginTop: 12,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  tip: {
    fontSize: 15,
    color: '#34495e',
    marginBottom: 4,
    lineHeight: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2c3e50',
  },
  conclusionCard: {
    backgroundColor: colors.primary + '10',
    marginTop: 8,
  },
});

export default PeerPressureScreen;
