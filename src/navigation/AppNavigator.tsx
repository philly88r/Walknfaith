import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import MentalHealthScreen from '../screens/MentalHealthScreen';
import AboutScreen from '../screens/AboutScreen';
import EventsScreen from '../screens/EventsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ContactScreen from '../screens/ContactScreen';
import MentorshipScreen from '../screens/MentorshipScreen';
import CareerPlacementScreen from '../screens/CareerPlacementScreen';
import CNATrainingScreen from '../screens/CNATrainingScreen';
import AnxietyResourcesScreen from '../screens/AnxietyResourcesScreen';
import DepressionResourcesScreen from '../screens/DepressionResourcesScreen';
import CrisisHotlinesScreen from '../screens/CrisisHotlinesScreen';
import PeerPressureScreen from '../screens/PeerPressureScreen';
import SuicidePreventionScreen from '../screens/SuicidePreventionScreen';
import { RootStackParamList } from './types';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const HeaderTitle = () => (
    <Text style={styles.headerText}>
      Crisis Counseling and Same-Day Medicated Assisted Treatment. No Appointment Needed. Call 314.913.8243
    </Text>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
            height: 80, // Make header taller to fit text
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            headerTitle: (props) => <HeaderTitle {...props} />,
          }}
        />
        <Stack.Screen 
          name="Schedule" 
          component={ScheduleScreen}
          options={{
            title: 'Schedule Appointment',
          }}
        />
        <Stack.Screen 
          name="MentalHealth" 
          component={MentalHealthScreen}
          options={{
            title: 'Mental Health Resources',
          }}
        />
        <Stack.Screen 
          name="About" 
          component={AboutScreen}
          options={{
            title: 'About Us',
          }}
        />
        <Stack.Screen 
          name="Events" 
          component={EventsScreen}
          options={{
            title: 'Events',
          }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{
            title: 'Edit Profile',
          }}
        />
        <Stack.Screen 
          name="Contact" 
          component={ContactScreen}
          options={{
            title: 'Contact Us',
          }}
        />
        <Stack.Screen 
          name="Mentorship" 
          component={MentorshipScreen}
          options={{
            title: 'Mentorship Program',
          }}
        />
        <Stack.Screen 
          name="CareerPlacement" 
          component={CareerPlacementScreen}
          options={{
            title: 'Career Placement',
          }}
        />
        <Stack.Screen 
          name="CNATraining" 
          component={CNATrainingScreen}
          options={{
            title: 'CNA Training Program',
          }}
        />
        <Stack.Screen 
          name="AnxietyResources" 
          component={AnxietyResourcesScreen}
          options={{ title: 'Anxiety Resources' }}
        />
        <Stack.Screen 
          name="DepressionResources" 
          component={DepressionResourcesScreen}
          options={{ title: 'Depression Resources' }}
        />
        <Stack.Screen 
          name="CrisisHotlines" 
          component={CrisisHotlinesScreen}
          options={{ title: 'Crisis Hotlines' }}
        />
        <Stack.Screen 
          name="PeerPressure" 
          component={PeerPressureScreen}
          options={{ title: 'Peer Pressure' }}
        />
        <Stack.Screen 
          name="SuicidePrevention" 
          component={SuicidePreventionScreen}
          options={{ title: 'Suicide Prevention Resources' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: colors.white,
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 20,
  },
});
