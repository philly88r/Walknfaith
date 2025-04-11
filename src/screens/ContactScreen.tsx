import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native-web';
import { colors } from '../theme/colors';
// Using View instead of SafeAreaView for web compatibility

export default function ContactScreen() {
  const [message, setMessage] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const contactInfo = {
    phone: '314-260-9097',
    email: 'info@walknfaith.org',
    address: '4001 Cottage St. St. Louis, MO 63113',
    name: 'WalkNFaith/PurposeTech Institute'
  };

  const handleSubmit = () => {
    // Here you would typically send the message to your backend
    console.log('Message submitted:', message);
    alert('Message sent successfully!');
    setMessage({ name: '', email: '', subject: '', message: '' });
  };

  const handleCall = () => {
    const phoneUrl = Platform.select({
      ios: `tel:${contactInfo.phone}`,
      android: `tel:${contactInfo.phone}`,
      default: `tel:${contactInfo.phone}`,
    });
    if (phoneUrl) Linking.openURL(phoneUrl);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${contactInfo.email}`);
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Contact {contactInfo.name}</Text>
          
          <View style={styles.contactInfoSection}>
            <TouchableOpacity style={styles.contactItem} onPress={handleCall}>
              <Text style={styles.contactLabel}>Phone:</Text>
              <Text style={styles.contactValue}>{contactInfo.phone}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.contactItem} onPress={handleEmail}>
              <Text style={styles.contactLabel}>Email:</Text>
              <Text style={styles.contactValue}>{contactInfo.email}</Text>
            </TouchableOpacity>
            
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Address:</Text>
              <Text style={styles.contactValue}>{contactInfo.address}</Text>
            </View>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.subtitle}>Send us a message</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              value={message.name}
              onChangeText={(text: string) => setMessage({ ...message, name: text })}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Your Email"
              value={message.email}
              onChangeText={(text: string) => setMessage({ ...message, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Subject"
              value={message.subject}
              onChangeText={(text: string) => setMessage({ ...message, subject: text })}
            />
            
            <TextInput
              style={[styles.input, styles.messageInput]}
              placeholder="Your Message"
              value={message.message}
              onChangeText={(text: string) => setMessage({ ...message, message: text })}
              multiline
              numberOfLines={Platform.select({ ios: null, android: 4, default: 4 })}
              textAlignVertical="top"
            />

            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Send Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 15,
  },
  contactInfoSection: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
      default: {
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  contactItem: {
    marginBottom: 15,
  },
  contactLabel: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  formSection: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 15,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
      default: {
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
