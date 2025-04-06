import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
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

  const handleSubmit = () => {
    if (!selectedType || !selectedTime) {
      alert('Please select both appointment type and time');
      return;
    }

    const selectedTimeSlot = timeSlots.find(slot => slot.id === selectedTime);
    if (!selectedTimeSlot) return;

    const appointmentDateTime = new Date(selectedDate);
    appointmentDateTime.setHours(selectedTimeSlot.hour);
    appointmentDateTime.setMinutes(0);

    console.log('Appointment scheduled:', {
      type: selectedType,
      date: format(appointmentDateTime, 'PPpp'),
    });

    alert('Appointment scheduled successfully!');
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

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Schedule Appointment</Text>
          </TouchableOpacity>
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
});
