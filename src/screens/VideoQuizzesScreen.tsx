import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native-web';
import { Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import supabase from '../utils/supabaseClient';
import runDatabaseSetup from '../utils/setupDatabase';

type Props = NativeStackScreenProps<RootStackParamList, 'VideoQuizzes'>;

interface Quiz {
  id: number;
  title: string;
  description: string;
}

interface Option {
  id: number;
  option_text: string;
  is_correct: boolean;
}

interface Question {
  id: number;
  question_text: string;
  options: Option[];
}

interface Answer {
  questionId: number;
  selectedOptionId: number | null;
}

const VideoQuizzesScreen: React.FC<Props> = ({ navigation }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    // Set up the database and load quizzes when the component mounts
    const setupAndLoadQuizzes = async () => {
      setLoading(true);
      try {
        // Run database setup to ensure tables exist
        await runDatabaseSetup();
        // Then load quizzes
        await loadQuizzes();
      } catch (error) {
        console.error('Error setting up database:', error);
      } finally {
        setLoading(false);
      }
    };
    
    setupAndLoadQuizzes();
  }, []);

  // Function to load quizzes from the database
  const loadQuizzes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error('Error loading quizzes:', error);
        // If there's an error, use the temporary data
        setQuizzes([
          {
            id: 1,
            title: 'Positions on Side',
            description: 'Test your knowledge about positioning patients on their side.'
          },
          {
            id: 2,
            title: 'Assists to Ambulate Using Gait Belt',
            description: 'Test your knowledge about assisting patients to walk using a gait belt.'
          },
          {
            id: 3,
            title: 'Transferring a Patient Using a Mechanical Lift',
            description: 'Test your knowledge about safe patient transfers using mechanical lifts.'
          },
          {
            id: 4,
            title: 'Transfers from Bed to Wheelchair',
            description: 'Test your knowledge about transferring patients from bed to wheelchair.'
          },
          {
            id: 5,
            title: 'Using Proper Body Mechanics',
            description: 'Test your knowledge about proper body mechanics when caring for patients.'
          }
        ]);
      } else if (data && data.length > 0) {
        setQuizzes(data);
      } else {
        // If no data is returned, use the temporary data
        setQuizzes([
          {
            id: 1,
            title: 'Positions on Side',
            description: 'Test your knowledge about positioning patients on their side.'
          },
          {
            id: 2,
            title: 'Assists to Ambulate Using Gait Belt',
            description: 'Test your knowledge about assisting patients to walk using a gait belt.'
          },
          {
            id: 3,
            title: 'Transferring a Patient Using a Mechanical Lift',
            description: 'Test your knowledge about safe patient transfers using mechanical lifts.'
          },
          {
            id: 4,
            title: 'Transfers from Bed to Wheelchair',
            description: 'Test your knowledge about transferring patients from bed to wheelchair.'
          },
          {
            id: 5,
            title: 'Using Proper Body Mechanics',
            description: 'Test your knowledge about proper body mechanics when caring for patients.'
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadQuiz = async (quiz: Quiz) => {
    setLoading(true);
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setScore(null);
    setQuizCompleted(false);
    
    try {
      // Load questions for the selected quiz
      const { data: questionsData, error: questionsError } = await supabase
        .from('quiz_questions')
        .select('id, question_text')
        .eq('quiz_id', quiz.id)
        .order('id', { ascending: true });
      
      if (questionsError) {
        console.error('Error loading questions:', questionsError);
        return;
      }
      
      if (questionsData && questionsData.length > 0) {
        // Load options for each question
        const questionsWithOptions = await Promise.all(
          questionsData.map(async (question) => {
            const { data: optionsData, error: optionsError } = await supabase
              .from('quiz_options')
              .select('id, option_text, is_correct')
              .eq('question_id', question.id)
              .order('id', { ascending: true });
            
            if (optionsError) {
              console.error('Error loading options:', optionsError);
              return {
                ...question,
                options: []
              };
            }
            
            return {
              ...question,
              options: optionsData || []
            };
          })
        );
        
        setQuestions(questionsWithOptions);
        
        // Initialize answers array
        setAnswers(questionsWithOptions.map(q => ({
          questionId: q.id,
          selectedOptionId: null
        })));
      } else {
        // If no questions found, use default questions for testing
        const defaultQuestions = [
          {
            id: 1,
            question_text: 'What is the proper position for the patient\'s arms when they are positioned on their side?',
            options: [
              { id: 1, option_text: 'Both arms extended straight out', is_correct: false },
              { id: 2, option_text: 'Upper arm supported with pillow, lower arm in comfortable position', is_correct: true },
              { id: 3, option_text: 'Both arms tucked under the body', is_correct: false },
              { id: 4, option_text: 'Arms crossed over chest', is_correct: false }
            ]
          },
          {
            id: 2,
            question_text: 'Why is a pillow placed between the patient\'s knees when positioned on their side?',
            options: [
              { id: 5, option_text: 'To keep the patient from rolling over', is_correct: false },
              { id: 6, option_text: 'To maintain body alignment and prevent pressure on bony prominences', is_correct: true },
              { id: 7, option_text: 'To elevate the legs for better circulation', is_correct: false },
              { id: 8, option_text: 'It\'s not necessary to place a pillow between the knees', is_correct: false }
            ]
          },
          {
            id: 3,
            question_text: 'How often should a patient\'s position be changed?',
            options: [
              { id: 9, option_text: 'Every 2 hours', is_correct: true },
              { id: 10, option_text: 'Every 8 hours', is_correct: false },
              { id: 11, option_text: 'Only when the patient requests it', is_correct: false },
              { id: 12, option_text: 'Once per shift', is_correct: false }
            ]
          },
          {
            id: 4,
            question_text: 'What is the proper angle for the head of the bed when a patient is in a side-lying position?',
            options: [
              { id: 13, option_text: 'Completely flat (0 degrees)', is_correct: false },
              { id: 14, option_text: '30 degrees or less', is_correct: true },
              { id: 15, option_text: '90 degrees (fully upright)', is_correct: false },
              { id: 16, option_text: '60 degrees', is_correct: false }
            ]
          },
          {
            id: 5,
            question_text: 'Which of the following is NOT a benefit of proper positioning?',
            options: [
              { id: 17, option_text: 'Prevents pressure ulcers', is_correct: false },
              { id: 18, option_text: 'Promotes comfort', is_correct: false },
              { id: 19, option_text: 'Maintains proper body alignment', is_correct: false },
              { id: 20, option_text: 'Eliminates the need for regular position changes', is_correct: true }
            ]
          }
        ];
        
        setQuestions(defaultQuestions);
        
        // Initialize answers array
        setAnswers(defaultQuestions.map(q => ({
          questionId: q.id,
          selectedOptionId: null
        })));
      }
    } catch (error) {
      console.error('Error in loadQuiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionId: number, optionId: number) => {
    setAnswers(answers.map(answer => 
      answer.questionId === questionId 
        ? { ...answer, selectedOptionId: optionId } 
        : answer
    ));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    
    answers.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (question) {
        const correctOption = question.options.find(o => o.is_correct);
        if (correctOption && answer.selectedOptionId === correctOption.id) {
          correctAnswers++;
        }
      }
    });
    
    return Math.round((correctAnswers / questions.length) * 100);
  };

  const handleSubmitQuiz = async () => {
    if (!selectedQuiz) return;
    
    setSubmitting(true);
    
    try {
      // Calculate the score
      const quizScore = calculateScore();
      setScore(quizScore);
      setQuizCompleted(true);
      
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Create a submission record
        const { data: submissionData, error: submissionError } = await supabase
          .from('quiz_submissions')
          .insert({
            user_id: user.id,
            quiz_id: selectedQuiz.id,
            score: quizScore,
            completed: true
          })
          .select();
        
        if (submissionError) {
          console.error('Error creating submission:', submissionError);
        } else if (submissionData && submissionData.length > 0) {
          const submissionId = submissionData[0].id;
          
          // Save each answer
          for (const answer of answers) {
            if (answer.selectedOptionId) {
              const { error: answerError } = await supabase
                .from('quiz_answers')
                .insert({
                  submission_id: submissionId,
                  question_id: answer.questionId,
                  selected_option_id: answer.selectedOptionId
                });
              
              if (answerError) {
                console.error('Error saving answer:', answerError);
              }
            }
          }
          
          console.log('Quiz submitted successfully with ID:', submissionId);
        }
      } else {
        console.log('User not authenticated, quiz results not saved to database');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReturnToQuizzes = () => {
    setSelectedQuiz(null);
    setQuestions([]);
    setAnswers([]);
    setScore(null);
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
  };

  const handleRetakeQuiz = () => {
    setAnswers(questions.map(q => ({
      questionId: q.id,
      selectedOptionId: null
    })));
    setScore(null);
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
  };

  const renderQuizList = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading quizzes...</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>CNA Video Quizzes</Text>
          <Text style={styles.subtitle}>
            Complete these quizzes to test your knowledge on CNA skills and procedures.
          </Text>
        </View>

        {quizzes.map((quiz) => (
          <Card key={quiz.id} style={styles.quizCard}>
            <Card.Content>
              <Text style={styles.quizTitle}>{quiz.title}</Text>
              <Text style={styles.quizDescription}>{quiz.description}</Text>
            </Card.Content>
            <Card.Actions style={{ justifyContent: 'flex-end' }}>
              <TouchableOpacity
                style={styles.startQuizButton}
                onPress={() => loadQuiz(quiz)}
              >
                <Text style={styles.startQuizButtonText}>Start Quiz</Text>
                <MaterialIcons name="arrow-forward" size={18} color="white" />
              </TouchableOpacity>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    );
  };

  const renderQuizQuestion = () => {
    if (!selectedQuiz || questions.length === 0) return null;

    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = answers.find(a => a.questionId === currentQuestion.id);

    return (
      <ScrollView style={styles.quizContainer}>
        <View style={styles.quizHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleReturnToQuizzes}
          >
            <MaterialIcons name="arrow-back" size={20} color={colors.primary} />
            <Text style={styles.backButtonText}>Back to Quizzes</Text>
          </TouchableOpacity>

          <Text style={styles.title}>{selectedQuiz.title}</Text>
          <Text style={styles.questionCounter}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
        </View>

        <Card style={styles.questionCard}>
          <Card.Content>
            <Text style={styles.questionText}>{currentQuestion.question_text}</Text>
            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionButton,
                    currentAnswer?.selectedOptionId === option.id && styles.selectedOption,
                  ]}
                  onPress={() => handleSelectOption(currentQuestion.id, option.id)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      currentAnswer?.selectedOptionId === option.id && styles.selectedOptionText,
                    ]}
                  >
                    {option.option_text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card.Content>
        </Card>

        <View style={styles.progressContainer}>
          {questions.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                currentQuestionIndex === index && styles.activeDot,
                answers[index]?.selectedOptionId !== null && styles.answeredDot,
              ]}
            />
          ))}
        </View>

        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentQuestionIndex === 0 && styles.disabledButton,
            ]}
            onPress={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <MaterialIcons name="arrow-back" size={18} color="white" />
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>

          {currentQuestionIndex < questions.length - 1 ? (
            <TouchableOpacity
              style={[
                styles.navButton,
                !answers[currentQuestionIndex]?.selectedOptionId && styles.disabledButton,
              ]}
              onPress={handleNextQuestion}
              disabled={!answers[currentQuestionIndex]?.selectedOptionId}
            >
              <Text style={styles.navButtonText}>Next</Text>
              <MaterialIcons name="arrow-forward" size={18} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.submitButton,
                !answers[currentQuestionIndex]?.selectedOptionId && styles.disabledButton,
                submitting && styles.disabledButton,
              ]}
              onPress={handleSubmitQuiz}
              disabled={!answers[currentQuestionIndex]?.selectedOptionId || submitting}
            >
              {submitting ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <>
                  <Text style={styles.submitButtonText}>Submit</Text>
                  <MaterialIcons name="check" size={18} color="white" />
                </>
              )}
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    );
  };

  const renderQuizResults = () => {
    if (!selectedQuiz || !quizCompleted || score === null) return null;

    const isPassed = score >= 70;
    
    return (
      <ScrollView style={styles.resultsContainer}>
        <View style={styles.quizHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleReturnToQuizzes}
          >
            <MaterialIcons name="arrow-back" size={20} color={colors.primary} />
            <Text style={styles.backButtonText}>Back to Quizzes</Text>
          </TouchableOpacity>

          <Text style={styles.title}>{selectedQuiz.title}</Text>
        </View>

        <Card style={[styles.resultsCard, isPassed ? styles.passedCard : styles.failedCard]}>
          <Card.Content>
            <Text style={styles.resultsTitle}>
              {isPassed ? 'Congratulations!' : 'Quiz Results'}
            </Text>
            
            <View style={styles.scoreContainer}>
              <Text style={[styles.scoreText, isPassed ? styles.passedText : styles.failedText]}>
                {score}%
              </Text>
              <Text style={styles.resultMessage}>
                {isPassed
                  ? 'You passed the quiz! Great job!'
                  : 'You did not pass. Please review the material and try again.'}
              </Text>
            </View>

            <View style={styles.resultsSummary}>
              <Text style={styles.summaryText}>
                You answered {answers.filter(a => {
                  const question = questions.find(q => q.id === a.questionId);
                  const correctOption = question?.options.find(o => o.is_correct);
                  return correctOption && a.selectedOptionId === correctOption.id;
                }).length} out of {questions.length} questions correctly.
              </Text>
            </View>
          </Card.Content>
        </Card>

        <TouchableOpacity
          style={styles.retakeButton}
          onPress={handleRetakeQuiz}
        >
          <MaterialIcons name="refresh" size={20} color="white" />
          <Text style={styles.retakeButtonText}>Retake Quiz</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  // Main render
  if (selectedQuiz) {
    if (quizCompleted) {
      return renderQuizResults();
    } else {
      return renderQuizQuestion();
    }
  }

  return renderQuizList();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  quizCard: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: 'white',
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  quizDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  startQuizButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  startQuizButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 8,
  },
  quizContainer: {
    padding: 16,
  },
  quizHeader: {
    marginBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButtonText: {
    marginLeft: 8,
    color: colors.primary,
    fontSize: 16,
  },
  questionCounter: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  questionCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 20,
  },
  optionsContainer: {
    marginTop: 8,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedOption: {
    backgroundColor: colors.primary + '20',
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: colors.primary,
    fontWeight: '500',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    width: '48%',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  navButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  submitButton: {
    backgroundColor: '#4CD964',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    width: '48%',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 12,
    height: 12,
  },
  answeredDot: {
    backgroundColor: '#4CD964',
  },
  resultsContainer: {
    padding: 16,
  },
  resultsCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  passedCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CD964',
  },
  failedCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  passedText: {
    color: '#4CD964',
  },
  failedText: {
    color: '#FF3B30',
  },
  resultMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  resultsSummary: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
  },
  retakeButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  retakeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default VideoQuizzesScreen;
