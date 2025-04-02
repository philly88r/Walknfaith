import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native-web';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import SignatureCanvas from 'react-signature-canvas';

type Props = NativeStackScreenProps<RootStackParamList, 'CNAApplication'>;

type Cohort = 'Morning' | 'Evening' | 'Weekend';
type CprInterest = 'Yes' | 'No';
type ParentStatus = 'Yes' | 'No';

const CNAApplicationScreen: React.FC<Props> = ({ navigation }) => {
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [ssn, setSsn] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cashApp, setCashApp] = useState('');
  const [cohort, setCohort] = useState<Cohort | ''>('');
  const [referral, setReferral] = useState('');
  const [cprInterest, setCprInterest] = useState<CprInterest | ''>('');
  const [licenseImage, setLicenseImage] = useState<string | null>(null);
  const [parentStatus, setParentStatus] = useState<ParentStatus | ''>('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Refs
  const signatureRef = useRef<SignatureCanvas | null>(null);
  
  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Handle license image upload
  const handleLicenseUpload = async () => {
    try {
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: [4, 3],
      });

      if (!result.canceled) {
        setLicenseImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error uploading license:', error);
    }
  };
  
  // Handle signature clear
  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
      setSignature(null);
    }
  };
  
  // Handle signature end
  const handleSignatureEnd = () => {
    if (signatureRef.current) {
      const signatureData = signatureRef.current.toDataURL();
      setSignature(signatureData);
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!firstName) newErrors.firstName = 'First name is required';
    if (!lastName) newErrors.lastName = 'Last name is required';
    if (!ssn) newErrors.ssn = 'Social Security Number is required';
    if (ssn && !/^\d{9}$/.test(ssn)) newErrors.ssn = 'SSN must be 9 digits';
    
    if (!phone) newErrors.phone = 'Phone number is required';
    if (phone && !/^\(\d{3}\) \d{3}-\d{4}$/.test(phone)) newErrors.phone = 'Phone format should be (XXX) XXX-XXXX';
    
    if (!email) newErrors.email = 'Email is required';
    if (email && !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    
    if (!cashApp) newErrors.cashApp = 'Cash App cashtag is required';
    if (!cohort) newErrors.cohort = 'Please select a cohort';
    if (!cprInterest) newErrors.cprInterest = 'Please select an option';
    if (!licenseImage) newErrors.licenseImage = 'Please upload a photo of your driver\'s license';
    if (!parentStatus) newErrors.parentStatus = 'Please select an option';
    if (!termsAgreed) newErrors.termsAgreed = 'You must agree to the terms';
    if (!signature) newErrors.signature = 'Signature is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Format phone number
  const formatPhoneNumber = (text: string) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (cleaned.length <= 3) {
      return cleaned.length ? `(${cleaned}` : '';
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  };
  
  // Handle phone input
  const handlePhoneChange = (text: string) => {
    setPhone(formatPhoneNumber(text));
  };
  
  // Handle SSN input
  const handleSsnChange = (text: string) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, '');
    // Limit to 9 digits
    setSsn(cleaned.slice(0, 9));
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorKey = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorKey);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setLoading(true);
    
    try {
      // Here you would normally submit the form data to your backend
      // For now, we'll just simulate a submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      Alert.alert(
        'Application Submitted',
        'Your application has been submitted successfully. Please remember to send the $50 application fee to $WalkNFAith2024 via Cash App to complete your application process.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert(
        'Submission Error',
        'There was an error submitting your application. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Image 
            source={require('../../assets/walknfaith-logo-footer.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>CNA Class Application</Text>
        </View>
        
        {/* Application Fee Notice */}
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeText}>
            Please note that a non-refundable application fee of $50 is required to process your application for the CNA program. After submitting your application, please ensure you pay this fee via Cash App to $WalkNFAith2024.
          </Text>
          <Text style={[styles.noticeText, styles.importantText]}>
            Important: The application fee is integral to the enrollment process. However, your application will not be processed until we have received your non-refundable $50 application fee. To avoid any delays in your enrollment, please ensure that you pay this fee via Cash App immediately after submitting your application.
          </Text>
          <Text style={styles.noticeText}>
            Ensure that you enter your correct Cash App cashtag. This will help us promptly and accurately associate your payment with your application.
          </Text>
        </View>
        
        {/* Application Form */}
        <View style={styles.formContainer}>
          {/* Name */}
          <View style={styles.formRow}>
            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>First Name<Text style={styles.required}>*</Text></Text>
              <TextInput
                id="firstName"
                style={[styles.input, errors.firstName ? styles.inputError : null]}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First Name"
              />
              {errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}
            </View>
            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>Last Name<Text style={styles.required}>*</Text></Text>
              <TextInput
                id="lastName"
                style={[styles.input, errors.lastName ? styles.inputError : null]}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last Name"
              />
              {errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}
            </View>
          </View>
          
          {/* SSN */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Social Security #<Text style={styles.required}>*</Text></Text>
            <TextInput
              id="ssn"
              style={[styles.input, errors.ssn ? styles.inputError : null]}
              value={ssn}
              onChangeText={handleSsnChange}
              placeholder="e.g., 492987896"
              keyboardType="numeric"
              maxLength={9}
            />
            <Text style={styles.helperText}>No characters. Numbers only</Text>
            {errors.ssn ? <Text style={styles.errorText}>{errors.ssn}</Text> : null}
          </View>
          
          {/* Phone */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone Number<Text style={styles.required}>*</Text></Text>
            <TextInput
              id="phone"
              style={[styles.input, errors.phone ? styles.inputError : null]}
              value={phone}
              onChangeText={handlePhoneChange}
              placeholder="(000) 000-0000"
              keyboardType="phone-pad"
            />
            <Text style={styles.helperText}>Please enter a valid phone number.</Text>
            {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
          </View>
          
          {/* Email */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email<Text style={styles.required}>*</Text></Text>
            <TextInput
              id="email"
              style={[styles.input, errors.email ? styles.inputError : null]}
              value={email}
              onChangeText={setEmail}
              placeholder="example@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>
          
          {/* Cash App */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Enter Your Cash App cashtag name:<Text style={styles.required}>*</Text></Text>
            <TextInput
              id="cashApp"
              style={[styles.input, errors.cashApp ? styles.inputError : null]}
              value={cashApp}
              onChangeText={setCashApp}
              placeholder="$YourCashAppTag"
              autoCapitalize="none"
            />
            {errors.cashApp ? <Text style={styles.errorText}>{errors.cashApp}</Text> : null}
          </View>
          
          {/* Cohort */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Which Cohort would you be interested in?<Text style={styles.required}>*</Text></Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[styles.optionButton, cohort === 'Morning' ? styles.optionSelected : null]}
                onPress={() => setCohort('Morning')}
              >
                <Text style={[styles.optionText, cohort === 'Morning' ? styles.optionTextSelected : null]}>Morning</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionButton, cohort === 'Evening' ? styles.optionSelected : null]}
                onPress={() => setCohort('Evening')}
              >
                <Text style={[styles.optionText, cohort === 'Evening' ? styles.optionTextSelected : null]}>Evening</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionButton, cohort === 'Weekend' ? styles.optionSelected : null]}
                onPress={() => setCohort('Weekend')}
              >
                <Text style={[styles.optionText, cohort === 'Weekend' ? styles.optionTextSelected : null]}>Weekend</Text>
              </TouchableOpacity>
            </View>
            {errors.cohort ? <Text style={styles.errorText}>{errors.cohort}</Text> : null}
          </View>
          
          {/* Referral */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Which of our community partners were you referred by?</Text>
            <TextInput
              style={styles.input}
              value={referral}
              onChangeText={setReferral}
              placeholder="Enter referral source (if any)"
            />
          </View>
          
          {/* CPR Interest */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Would you be interested in taking CPR training? [Fee $65 after enrollment]<Text style={styles.required}>*</Text></Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[styles.optionButton, cprInterest === 'Yes' ? styles.optionSelected : null]}
                onPress={() => setCprInterest('Yes')}
              >
                <Text style={[styles.optionText, cprInterest === 'Yes' ? styles.optionTextSelected : null]}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionButton, cprInterest === 'No' ? styles.optionSelected : null]}
                onPress={() => setCprInterest('No')}
              >
                <Text style={[styles.optionText, cprInterest === 'No' ? styles.optionTextSelected : null]}>No</Text>
              </TouchableOpacity>
            </View>
            {errors.cprInterest ? <Text style={styles.errorText}>{errors.cprInterest}</Text> : null}
          </View>
          
          {/* License Upload */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Take a photo of your driver's license<Text style={styles.required}>*</Text></Text>
            <TouchableOpacity 
              style={[styles.uploadButton, errors.licenseImage ? styles.uploadButtonError : null]} 
              onPress={handleLicenseUpload}
            >
              <MaterialIcons name="add-a-photo" size={24} color={colors.primary} />
              <Text style={styles.uploadButtonText}>
                {licenseImage ? 'License Photo Uploaded' : 'Upload License Photo'}
              </Text>
            </TouchableOpacity>
            {licenseImage && (
              <Image source={{ uri: licenseImage }} style={styles.licensePreview} />
            )}
            {errors.licenseImage ? <Text style={styles.errorText}>{errors.licenseImage}</Text> : null}
          </View>
          
          {/* Parent Status */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Are you the parent or guardian of children newborn to 5 years old? If so, and are enrolled in our Certified Nursing Assistant (CNA) program, you will be automatically enrolled in our Parenting Program. This initiative is designed to support the specific needs of parents within our student community.<Text style={styles.required}>*</Text></Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[styles.optionButton, parentStatus === 'Yes' ? styles.optionSelected : null]}
                onPress={() => setParentStatus('Yes')}
              >
                <Text style={[styles.optionText, parentStatus === 'Yes' ? styles.optionTextSelected : null]}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionButton, parentStatus === 'No' ? styles.optionSelected : null]}
                onPress={() => setParentStatus('No')}
              >
                <Text style={[styles.optionText, parentStatus === 'No' ? styles.optionTextSelected : null]}>No</Text>
              </TouchableOpacity>
            </View>
            {errors.parentStatus ? <Text style={styles.errorText}>{errors.parentStatus}</Text> : null}
          </View>
          
          {/* Terms Agreement */}
          <View style={styles.formGroup}>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity 
                style={[styles.checkbox, termsAgreed ? styles.checkboxChecked : null]}
                onPress={() => setTermsAgreed(!termsAgreed)}
              >
                {termsAgreed && <MaterialIcons name="check" size={18} color="white" />}
              </TouchableOpacity>
              <Text style={styles.termsText}>
                Terms of Use and Privacy Agreement.<Text style={styles.required}>*</Text>
              </Text>
            </View>
            {errors.termsAgreed ? <Text style={styles.errorText}>{errors.termsAgreed}</Text> : null}
          </View>
          
          {/* Signature */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Signature<Text style={styles.required}>*</Text></Text>
            <View style={[styles.signatureContainer, errors.signature ? styles.signatureContainerError : null]}>
              {Platform.OS === 'web' && (
                <SignatureCanvas
                  ref={signatureRef}
                  onEnd={handleSignatureEnd}
                  canvasProps={{
                    width: '100%',
                    height: 200,
                    className: 'signatureCanvas',
                    style: { border: '1px solid #ddd', borderRadius: 8 }
                  }}
                />
              )}
            </View>
            <TouchableOpacity style={styles.clearButton} onPress={clearSignature}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
            {errors.signature ? <Text style={styles.errorText}>{errors.signature}</Text> : null}
          </View>
          
          {/* Submit Button */}
          <TouchableOpacity 
            style={styles.submitButton} 
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.submitButtonText}>Submit</Text>
            )}
          </TouchableOpacity>
          
          <Text style={styles.poweredBy}>Powered by Walk N Faith</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logo: {
    width: 150,
    height: 80,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
  },
  noticeContainer: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  noticeText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
    color: '#333',
  },
  importantText: {
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 20,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  formGroup: {
    marginBottom: 20,
    width: '100%',
  },
  halfWidth: {
    width: '48%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  required: {
    color: 'red',
    marginLeft: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputError: {
    borderColor: 'red',
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    marginBottom: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}20`,
  },
  optionText: {
    color: '#333',
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderStyle: 'dashed',
  },
  uploadButtonError: {
    borderColor: 'red',
  },
  uploadButtonText: {
    marginLeft: 10,
    color: colors.primary,
  },
  licensePreview: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  termsText: {
    flex: 1,
  },
  signatureContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    height: 200,
    marginTop: 8,
    overflow: 'hidden',
  },
  signatureContainerError: {
    borderColor: 'red',
  },
  clearButton: {
    alignSelf: 'flex-end',
    padding: 8,
    marginTop: 8,
  },
  clearButtonText: {
    color: colors.primary,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  poweredBy: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});

export default CNAApplicationScreen;
