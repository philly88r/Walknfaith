import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native-web';
import { MaterialIcons } from '@expo/vector-icons';
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
import PhysicianMentorProgramScreen from '../screens/PhysicianMentorProgramScreen';
import PurposeTechInstituteScreen from '../screens/PurposeTechInstituteScreen';
import CDLTrainingProgramScreen from '../screens/CDLTrainingProgramScreen';
import AnxietyResourcesScreen from '../screens/AnxietyResourcesScreen';
import DepressionResourcesScreen from '../screens/DepressionResourcesScreen';
import CrisisHotlinesScreen from '../screens/CrisisHotlinesScreen';
import PeerPressureScreen from '../screens/PeerPressureScreen';
import SuicidePreventionScreen from '../screens/SuicidePreventionScreen';
import TestAuthScreen from '../screens/TestAuthScreen';
import BackButton from '../components/BackButton';
import { RootStackParamList } from './types';
import { colors } from '../theme/colors';
import { useProfile } from '../context/ProfileContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { profile } = useProfile();

  const HeaderTitle = () => (
    <Text style={styles.headerText}>
      Crisis Counseling and Same-Day Medicated Assisted Treatment. No Appointment Needed. Call 314.913.8243
    </Text>
  );

  const ProfileIcon = ({ navigation }: { navigation: any }) => (
    <TouchableOpacity
      style={styles.profileIconContainer}
      onPress={() => navigation.navigate('Profile')}
    >
      {profile && profile.firstName && profile.lastName ? (
        <View style={styles.profileInitialsContainer}>
          <Text style={styles.profileInitials}>
            {profile.firstName[0]}{profile.lastName[0]}
          </Text>
        </View>
      ) : (
        <MaterialIcons name="account-circle" size={28} color={colors.white} />
      )}
    </TouchableOpacity>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: colors.primary,
            height: 80, // Make header taller to fit text
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerRight: () => <ProfileIcon navigation={navigation} />,
        })}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            headerTitle: () => <HeaderTitle />,
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
          name="PhysicianMentorProgram" 
          component={PhysicianMentorProgramScreen}
          options={{
            title: 'Physician Mentor Program',
          }}
        />
        <Stack.Screen 
          name="PurposeTechInstitute" 
          component={PurposeTechInstituteScreen}
          options={({ navigation }) => ({
            title: 'Purpose Tech Institute',
            headerLeft: () => <BackButton navigation={navigation} />,
          })}
        />
        <Stack.Screen 
          name="CDLTrainingProgram" 
          component={CDLTrainingProgramScreen}
          options={({ navigation }) => ({
            title: 'CDL Training Program',
            headerLeft: () => <BackButton navigation={navigation} />,
          })}
        />
        <Stack.Screen 
          name="TestAuth" 
          component={TestAuthScreen}
          options={({ navigation }) => ({
            title: 'Authentication Test',
            headerLeft: () => <BackButton navigation={navigation} />,
          })}
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
  profileIconContainer: {
    marginRight: 15,
    padding: 5,
  },
  profileInitialsContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
