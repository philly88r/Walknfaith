import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native-web';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const CDLTrainingScreen = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    hasCDL: 'no',
    military: 'no',
    enrollmentStatus: 'info',
  });

  const benefits = [
    { icon: 'business', title: 'Stable Employment' },
    { icon: 'school', title: 'No College Necessary' },
    { icon: 'attach-money', title: 'High Earning Potential' },
    { icon: 'access-time', title: 'Minimal Training Time' },
    { icon: 'monetization-on', title: 'Low-Cost Training' },
    { icon: 'trending-up', title: 'Career Advancement' },
    { icon: 'directions-car', title: 'Independence and Freedom' },
    { icon: 'explore', title: 'Travel the Country' },
  ];

  const handleCall = () => {
    Linking.openURL('tel:314.260.9097');
  };

  const handleApply = () => {
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>CDL Training Program</Text>
          <Text style={styles.headerSubtitle}>Start Your New Career in Truck Driving Today!</Text>
        </View>

        {/* Benefits Grid */}
        <View style={styles.benefitsContainer}>
          <Text style={styles.sectionTitle}>TRUCKING INDUSTRY BENEFITS</Text>
          <View style={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <MaterialIcons name={benefit.icon} size={24} color="#007AFF" />
                <Text style={styles.benefitText}>{benefit.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ELDT Information */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>GET THE TRAINING YOU NEED FROM OUR ELDT REGISTERED SCHOOLS</Text>
          <Text style={styles.infoText}>
            If you are looking for a new career in a growing industry, the commercial trucking sector could be the place for you. 
            Since 1993, more than 50,000 students have graduated from our CDL training, and more than 95% of them got help finding a job.
          </Text>
        </View>

        {/* Earnings Section */}
        <View style={styles.earningsSection}>
          <Text style={styles.earningsTitle}>POTENTIAL EARNINGS</Text>
          <Text style={styles.earningsAmount}>$69,000 - $85,000</Text>
          <Text style={styles.noExperience}>No experience required</Text>
        </View>

        {/* Application Form */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>START YOUR APPLICATION</Text>
          
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={(text) => setFormData({...formData, firstName: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={formData.lastName}
            onChangeText={(text) => setFormData({...formData, lastName: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(text) => setFormData({...formData, phone: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Home Zip"
            keyboardType="numeric"
            maxLength={5}
            value={formData.zipCode}
            onChangeText={(text) => setFormData({...formData, zipCode: text})}
          />

          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply Now</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <FontAwesome5 name="phone" size={20} color="white" />
            <Text style={styles.callButtonText}>Call 314.260.9097</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  benefitsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitItem: {
    width: '48%',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    alignItems: 'center',
  },
  benefitText: {
    marginTop: 8,
    textAlign: 'center',
  },
  infoSection: {
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    lineHeight: 24,
  },
  earningsSection: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#007AFF',
  },
  earningsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  earningsAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  noExperience: {
    color: '#fff',
    fontSize: 16,
  },
  formContainer: {
    padding: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  callButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default CDLTrainingScreen;
