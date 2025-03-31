import React from 'react';
import { TouchableOpacity } from 'react-native-web';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { NavigationProp } from '@react-navigation/native';

interface BackButtonProps {
  navigation: NavigationProp<any>;
}

const BackButton = ({ navigation }: BackButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ marginRight: 15 }}
    >
      <MaterialIcons name="arrow-back" size={24} color={colors.white} />
    </TouchableOpacity>
  );
};

export default BackButton;
