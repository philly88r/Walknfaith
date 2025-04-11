import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native-web';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import openQuizPdf from '../utils/quizPdfHandler';

interface Quiz {
  id: number;
  title: string;
  description: string;
}

interface QuizPdfSectionProps {
  quizzes: Quiz[];
}

const QuizPdfSection: React.FC<QuizPdfSectionProps> = ({ quizzes }) => {
  return (
    <View style={styles.pdfSection}>
      <Text style={styles.pdfSectionTitle}>Download PDF Versions</Text>
      <Text style={styles.pdfSectionDescription}>
        Click on any quiz below to download the PDF version for printing or offline use.
      </Text>
      
      {quizzes.map((quiz) => (
        <TouchableOpacity 
          key={quiz.id} 
          style={styles.pdfCard}
          onPress={async () => await openQuizPdf(quiz.title)}
        >
          <FontAwesome5 name="file-pdf" size={24} color="#FF3B30" style={styles.pdfIcon} />
          <View style={styles.pdfCardContent}>
            <Text style={styles.pdfTitle}>{quiz.title}</Text>
            <Text style={styles.pdfDescription}>Download PDF version</Text>
          </View>
          <MaterialIcons name="file-download" size={24} color={colors.primary} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  pdfSection: {
    marginTop: 10,
  },
  pdfSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  pdfSectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  pdfCard: {
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
  pdfCardContent: {
    flex: 1,
  },
  pdfTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  pdfDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default QuizPdfSection;
