import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native-web';
import { Picker } from '@react-native-picker/picker';
import { format, addDays, isWeekend, parseISO, isValid } from 'date-fns';
import { colors } from '../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const appointmentTypes = [
  { id: 'counseling', label: 'Counseling' },
  { id: 'medication', label: 'Medication' },
  { id: 'career', label: 'Career Placement' },
  { id: 'evaluation', label: 'Initial Evaluation' },
];

const timeSlots = [
  { id: '9', label: '9:00 AM', hour: 9 },
  { id: '11', label: '11:00 AM', hour: 11 },
  { id: '13', label: '1:00 PM', hour: 13 },
  { id: '15', label: '3:00 PM', hour: 15 },
];

export default function ScheduleScreen() {
  const [selectedType, setSelectedType] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [dateString, setDateString] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [dateError, setDateError] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleDateChange = (text: string) => {
    setDateString(text);
    setDateError('');

    try {
      const parsedDate = parseISO(text);
      if (!isValid(parsedDate)) {
        setDateError('Please enter a valid date in YYYY-MM-DD format');
        return;
      }

      // Get the next available weekday
      const nextAvailableDate = getNextAvailableWeekday(parsedDate);
      
      if (nextAvailableDate.getTime() < new Date().getTime()) {
        setDateError('Please select a future date');
        return;
      }

      setSelectedDate(nextAvailableDate);
    } catch (error) {
      setDateError('Invalid date format. Please use YYYY-MM-DD');
    }
  };

  const getNextAvailableWeekday = (date: Date) => {
    let nextDate = date;
    while (isWeekend(nextDate)) {
      nextDate = addDays(nextDate, 1);
    }
    return nextDate;
  };

  const isDateSelectable = (date: Date) => {
    return !isWeekend(date) && date.getTime() >= new Date().getTime();
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  // Create a ref for the form
  const formRef = useRef(null);

  const handleSubmit = async () => {
    // Reset previous submission result
    setSubmitResult(null);
    
    // Validate form
    if (!selectedType || !selectedTime) {
      setSubmitResult({
        success: false,
        message: 'Please select both appointment type and time'
      });
      return;
    }

    if (!name || !email) {
      setSubmitResult({
        success: false,
        message: 'Please provide your name and email'
      });
      return;
    }

    // Very basic email validation - accept almost anything with @ symbol
    // This is intentionally permissive to avoid false rejections
    if (!email || email.trim() === '' || !email.includes('@')) {
      setSubmitResult({
        success: false,
        message: 'Please enter your email address with @ symbol'
      });
      return;
    }

    const selectedTimeSlot = timeSlots.find(slot => slot.id === selectedTime);
    if (!selectedTimeSlot) return;

    const appointmentDateTime = new Date(selectedDate);
    appointmentDateTime.setHours(selectedTimeSlot.hour);
    appointmentDateTime.setMinutes(0);

    const appointmentType = appointmentTypes.find(type => type.id === selectedType)?.label || selectedType;
    const formattedDate = format(appointmentDateTime, 'PPpp');

    setIsSubmitting(true);

    try {
      // Direct form submission using window.open with mailto link as fallback
      try {
        // First try FormSubmit
        if (formRef.current) {
          formRef.current.submit();
          
          // Show success message
          setSubmitResult({
            success: true,
            message: 'Scheduling appointment...'
          });
          
          // Clear form after submission
          setTimeout(() => {
            setSelectedType('');
            setSelectedTime('');
            setName('');
            setEmail('');
            setPhone('');
            setIsSubmitting(false);
          }, 1000);
        }
      } catch (submitError) {
        console.error('Form submission error:', submitError);
        
        // Fallback to mailto link if FormSubmit fails
        const mailtoSubject = `New Appointment Request: ${appointmentType}`;
        const mailtoBody = `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Appointment Type: ${appointmentType}
Date: ${format(selectedDate, 'PPP')}
Time: ${timeSlots.find(slot => slot.id === selectedTime)?.label || ''}`;
        
        window.open(`mailto:Sabrina@walknfaith.org?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`, '_blank');
        
        setSubmitResult({
          success: true,
          message: 'Opening email client to send appointment request...'
        });
        
        // Clear form
        setSelectedType('');
        setSelectedTime('');
        setName('');
        setEmail('');
        setPhone('');
        setIsSubmitting(false);
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: 'An error occurred. Please try again later.'
      });
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Schedule an Appointment</Text>
          
          <View style={styles.section}>
            <Text style={styles.label}>Appointment Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedType}
                onValueChange={setSelectedType}
                style={styles.picker}
              >
                <Picker.Item label="Select type..." value="" />
                {appointmentTypes.map(type => (
                  <Picker.Item
                    key={type.id}
                    label={type.label}
                    value={type.id}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Date</Text>
            <TextInput
              style={styles.dateInput}
              value={dateString}
              onChangeText={handleDateChange}
              placeholder="YYYY-MM-DD"
            />
            {dateError && <Text style={styles.error}>{dateError}</Text>}
            <Text style={styles.dateDisplay}>
              Selected: {format(selectedDate, 'PPPP')}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Time</Text>
            <View style={styles.timeContainer}>
              {timeSlots.map(slot => (
                <TouchableOpacity
                  key={slot.id}
                  style={[
                    styles.timeButton,
                    selectedTime === slot.id && styles.selectedTimeButton,
                  ]}
                  onPress={() => handleTimeSelect(slot.id)}
                >
                  <Text
                    style={[
                      styles.timeButtonText,
                      selectedTime === slot.id && styles.selectedTimeButtonText,
                    ]}
                  >
                    {slot.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Your Information</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Your Name"
            />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Your Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Your Phone (optional)"
              keyboardType="phone-pad"
            />
          </View>

          {/* Hidden form for FormSubmit */}
          <form 
            ref={formRef}
            action="https://formsubmit.co/Sabrina@walknfaith.org" 
            method="POST"
            style={{ display: 'none' }}
          >
            <input type="text" name="name" value={name} readOnly />
            <input type="email" name="email" value={email} readOnly />
            <input type="text" name="_subject" value={`New Appointment Request: ${appointmentTypes.find(type => type.id === selectedType)?.label || selectedType}`} readOnly />
            <input type="text" name="phone" value={phone} readOnly />
            <input type="text" name="appointment_type" value={appointmentTypes.find(type => type.id === selectedType)?.label || selectedType} readOnly />
            <input type="text" name="appointment_date" value={selectedDate ? format(selectedDate, 'PPP') : ''} readOnly />
            <input type="text" name="appointment_time" value={timeSlots.find(slot => slot.id === selectedTime)?.label || ''} readOnly />
            <textarea name="message" value={`Appointment request for ${appointmentTypes.find(type => type.id === selectedType)?.label || selectedType} on ${selectedDate ? format(selectedDate, 'PPP') : ''} at ${timeSlots.find(slot => slot.id === selectedTime)?.label || ''}`} readOnly />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value={window.location.href} />
          </form>

          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color={colors.white} size="small" />
            ) : (
              <Text style={styles.submitButtonText}>Schedule Appointment</Text>
            )}
          </TouchableOpacity>

          {submitResult && (
            <View style={[styles.resultContainer, submitResult.success ? styles.successContainer : styles.errorContainer]}>
              <Text style={styles.resultText}>{submitResult.message}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
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
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  picker: {
    height: 50,
  },
  dateInput: {
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    fontSize: 16,
  },
  dateDisplay: {
    marginTop: 8,
    color: colors.text,
    fontSize: 14,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeButton: {
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    minWidth: '45%',
    alignItems: 'center',
  },
  selectedTimeButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeButtonText: {
    color: colors.text,
    fontSize: 16,
  },
  selectedTimeButtonText: {
    color: colors.white,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
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
