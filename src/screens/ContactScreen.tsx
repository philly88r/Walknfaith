import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
  Platform,
  ActivityIndicator,
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const contactInfo = {
    phone: '314-260-9097',
    email: 'Sabrina@walknfaith.org',
    address: '4001 Cottage St. St. Louis, MO 63113',
    name: 'WalkNFaith/PurposeTech Institute'
  };

  // Create a ref for the form
  const formRef = useRef(null);

  const handleSubmit = async () => {
    // Validate form
    if (!message.name || !message.email || !message.subject || !message.message) {
      setSubmitResult({
        success: false,
        message: 'Please fill out all fields'
      });
      return;
    }

    // Simplified email validation - just check for @ symbol
    if (!message.email.includes('@')) {
      setSubmitResult({
        success: false,
        message: 'Please enter a valid email address with @ symbol'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // Submit the form to FormSubmit
      if (formRef.current) {
        formRef.current.submit();
        
        // Since the form will redirect, we'll show a success message briefly
        setSubmitResult({
          success: true,
          message: 'Sending message...'
        });
        
        // Clear form after submission
        setTimeout(() => {
          setMessage({ name: '', email: '', subject: '', message: '' });
          setIsSubmitting(false);
        }, 1000);
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: 'An error occurred. Please try again later.'
      });
      setIsSubmitting(false);
    }
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
            
            {/* Hidden form for FormSubmit */}
            <form 
              ref={formRef}
              action="https://formsubmit.co/Sabrina@walknfaith.org" 
              method="POST"
              style={{ display: 'none' }}
            >
              <input type="text" name="name" value={message.name} readOnly />
              <input type="email" name="email" value={message.email} readOnly />
              <input type="text" name="_subject" value={`Contact Form: ${message.subject}`} readOnly />
              <input type="text" name="subject" value={message.subject} readOnly />
              <textarea name="message" value={message.message} readOnly />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value={window.location.href} />
            </form>
            
            {/* Visual form that users interact with */}
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
              style={[styles.submitButton, isSubmitting && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color={colors.white} size="small" />
              ) : (
                <Text style={styles.submitButtonText}>Send Message</Text>
              )}
            </TouchableOpacity>

            {submitResult && (
              <View style={[styles.resultContainer, submitResult.success ? styles.successContainer : styles.errorContainer]}>
                <Text style={styles.resultText}>{submitResult.message}</Text>
              </View>
            )}
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
  disabledButton: {
    opacity: 0.7,
  },
  resultContainer: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
  },
  successContainer: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
  },
  errorContainer: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
  },
  resultText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
