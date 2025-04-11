/**
 * Utility for handling PDF quiz downloads and assignments
 */
import { Platform } from 'react-native-web';

// Map quiz titles to PDF file names
export const getQuizPdfFileName = (quizTitle: string): string => {
  switch (quizTitle) {
    case 'Positions on Side':
      return 'Hartman Video Quiz_Positions on Side.pdf';
    case 'Assists to Ambulate Using Gait Belt':
      return 'Hartman Video Quiz_Assists to Ambulate Using Gait Belt-.pdf';
    case 'Transferring a Patient Using a Mechanical Lift':
      return 'Hartman Video Quiz_Transferring a Patient Using a Mechanical Lift.pdf';
    case 'Transfers from Bed to Wheelchair':
      return 'Hartman Video Quiz_Transfers from Bed to Wheelchair.pdf';
    case 'Using Proper Body Mechanics':
      return 'Hartman Video Quiz_Using Proper Body Mechanics.pdf';
    default:
      return '';
  }
};

// Open or download PDF
export const openQuizPdf = async (quizTitle: string): Promise<void> => {
  const pdfFileName = getQuizPdfFileName(quizTitle);
  
  if (!pdfFileName) {
    console.error('PDF not found for quiz:', quizTitle);
    return;
  }
  
  try {
    // Since we're using React Native Web, we can use window.open
    const pdfUrl = `/assets/pdfs/${pdfFileName}`;
    window.open(pdfUrl, '_blank');
  } catch (error) {
    console.error('Error opening PDF:', error);
  }
};

// Open assignment PDF directly by filename
export const openAssignmentPdf = async (filename: string): Promise<void> => {
  try {
    const pdfUrl = `/assets/pdfs/${filename}`;
    window.open(pdfUrl, '_blank');
  } catch (error) {
    console.error('Error opening assignment PDF:', error);
  }
};

export default openQuizPdf;
