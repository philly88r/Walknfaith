import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native-web';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface AssignmentsSectionProps {
  onOpenAssignment: (filename: string) => void;
}

const AssignmentsSection: React.FC<AssignmentsSectionProps> = ({ onOpenAssignment }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Assignments</Text>
      <Text style={styles.description}>
        Download the following assignments required for your CNA training.
      </Text>
      
      <TouchableOpacity 
        style={styles.assignmentCard}
        onPress={() => onOpenAssignment('Appendix B Handouts_Nursing Assistant_Basics 6e.pdf')}
      >
        <FontAwesome5 name="file-pdf" size={24} color="#FF3B30" style={styles.pdfIcon} />
        <View style={styles.assignmentContent}>
          <Text style={styles.assignmentTitle}>Nursing Assistant Basics 6e</Text>
          <Text style={styles.assignmentDescription}>Appendix B Handouts</Text>
        </View>
        <MaterialIcons name="file-download" size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  assignmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  pdfIcon: {
    marginRight: 16,
  },
  assignmentContent: {
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  assignmentDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default AssignmentsSection;
