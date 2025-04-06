import React from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native-web';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import MenuItem from '../components/MenuItem';
import { colors } from '../theme/colors';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
  const menuItems = [
    { title: 'SCHEDULE APPOINTMENT', route: 'Schedule' },
    { title: 'MENTAL HEALTH RESOURCES', route: 'MentalHealth' },
    { title: 'MENTORSHIP PROGRAM', route: 'Mentorship' },
    { title: 'CAREER PLACEMENT', route: 'CareerPlacement' },
    { title: 'ABOUT', route: 'About' },
    { title: 'EVENTS PAGE', route: 'Events' },
    { title: 'EDIT PROFILE', route: 'Profile' },
    { title: 'CONTACT US', route: 'Contact' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/WalknFaith-logo2 (1).png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            title={item.title}
            onPress={() => navigation.navigate(item.route as keyof RootStackParamList)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  logoContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logo: {
    width: 300,
    height: 120,
  },
  menuContainer: {
    padding: 20,
  },
});
