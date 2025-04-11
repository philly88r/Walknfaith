import supabase from './supabaseClient';
import insertOfficialQuizData from './completeQuizData';

// Function to check if tables exist and create them if needed
export const setupQuizDatabase = async () => {
  try {
    console.log('Checking if quiz tables exist...');
    
    // Check if the quizzes table exists and is accessible
    const { error: quizzesError } = await supabase
      .from('quizzes')
      .select('count')
      .limit(1);
    
    if (quizzesError) {
      console.log('Quizzes table may not exist:', quizzesError.message);
      console.log('Note: Please run the SQL in src/utils/quiz_tables.sql in the Supabase SQL Editor');
      console.log('Required tables: quizzes, quiz_questions, quiz_options, quiz_submissions, quiz_answers');
      return false;
    }
    
    // Check if the quiz_questions table exists and is accessible
    const { error: questionsError } = await supabase
      .from('quiz_questions')
      .select('count')
      .limit(1);
    
    if (questionsError) {
      console.log('quiz_questions table may not exist:', questionsError.message);
      console.log('Note: Please run the SQL in src/utils/quiz_tables.sql in the Supabase SQL Editor');
      return false;
    }
    
    // Check if the quiz_options table exists and is accessible
    const { error: optionsError } = await supabase
      .from('quiz_options')
      .select('count')
      .limit(1);
    
    if (optionsError) {
      console.log('quiz_options table may not exist:', optionsError.message);
      console.log('Note: Please run the SQL in src/utils/quiz_tables.sql in the Supabase SQL Editor');
      return false;
    }
    
    console.log('Quiz tables exist and are accessible');
    return true;
  } catch (error) {
    console.error('Error checking quiz database:', error);
    return false;
  }
};

// Function to insert sample quiz data
export const insertSampleQuizData = async () => {
  try {
    console.log('Inserting sample quiz data...');
    
    // Insert sample quizzes
    const quizzes = [
      {
        title: 'Positions on Side',
        description: 'Test your knowledge about positioning patients on their side.'
      },
      {
        title: 'Assists to Ambulate Using Gait Belt',
        description: 'Test your knowledge about assisting patients to walk using a gait belt.'
      },
      {
        title: 'Transferring a Patient Using a Mechanical Lift',
        description: 'Test your knowledge about safe patient transfers using mechanical lifts.'
      },
      {
        title: 'Transfers from Bed to Wheelchair',
        description: 'Test your knowledge about transferring patients from bed to wheelchair.'
      },
      {
        title: 'Using Proper Body Mechanics',
        description: 'Test your knowledge about proper body mechanics when caring for patients.'
      }
    ];
    
    // Insert quizzes one by one
    for (const quiz of quizzes) {
      // Check if quiz already exists to avoid duplicates
      const { data: existingQuiz, error: checkError } = await supabase
        .from('quizzes')
        .select('id')
        .eq('title', quiz.title)
        .limit(1);
      
      if (checkError) {
        console.error(`Error checking for existing quiz "${quiz.title}":`, checkError);
        continue;
      }
      
      // If quiz already exists, skip insertion
      if (existingQuiz && existingQuiz.length > 0) {
        console.log(`Quiz "${quiz.title}" already exists, skipping...`);
        continue;
      }
      
      // Insert new quiz
      const { data: quizData, error: quizError } = await supabase
        .from('quizzes')
        .insert(quiz)
        .select();
      
      if (quizError) {
        console.error(`Error inserting quiz "${quiz.title}":`, quizError);
        continue;
      }
      
      console.log(`Quiz "${quiz.title}" inserted successfully with ID: ${quizData[0].id}`);
      const quizId = quizData[0].id;
      
      // Sample questions based on quiz title
      interface QuizOption {
        option_text: string;
        is_correct: boolean;
      }
      
      interface QuizQuestion {
        quiz_id: number;
        question_text: string;
        options: QuizOption[];
      }
      
      let questions: QuizQuestion[] = [];
      
      // Sample questions for "Positions on Side" quiz
      if (quiz.title === 'Positions on Side') {
        questions = [
          {
            quiz_id: quizId,
            question_text: 'What is the proper position for the patient\'s arms when they are positioned on their side?',
            options: [
              { option_text: 'Both arms extended straight out', is_correct: false },
              { option_text: 'Upper arm supported with pillow, lower arm in comfortable position', is_correct: true },
              { option_text: 'Both arms tucked under the body', is_correct: false },
              { option_text: 'Arms crossed over chest', is_correct: false }
            ]
          },
          {
            quiz_id: quizId,
            question_text: 'Why is a pillow placed between the patient\'s knees when positioned on their side?',
            options: [
              { option_text: 'To keep the patient from rolling over', is_correct: false },
              { option_text: 'To maintain body alignment and prevent pressure on bony prominences', is_correct: true },
              { option_text: 'To elevate the legs for better circulation', is_correct: false },
              { option_text: 'It\'s not necessary to place a pillow between the knees', is_correct: false }
            ]
          },
          {
            quiz_id: quizId,
            question_text: 'How often should a patient\'s position be changed?',
            options: [
              { option_text: 'Every 2 hours', is_correct: true },
              { option_text: 'Every 8 hours', is_correct: false },
              { option_text: 'Only when the patient requests it', is_correct: false },
              { option_text: 'Once per shift', is_correct: false }
            ]
          },
          {
            quiz_id: quizId,
            question_text: 'What is the proper angle for the head of the bed when a patient is in a side-lying position?',
            options: [
              { option_text: 'Completely flat (0 degrees)', is_correct: false },
              { option_text: '30 degrees or less', is_correct: true },
              { option_text: '90 degrees (fully upright)', is_correct: false },
              { option_text: '60 degrees', is_correct: false }
            ]
          },
          {
            quiz_id: quizId,
            question_text: 'Which of the following is NOT a benefit of proper positioning?',
            options: [
              { option_text: 'Prevents pressure ulcers', is_correct: false },
              { option_text: 'Promotes comfort', is_correct: false },
              { option_text: 'Maintains proper body alignment', is_correct: false },
              { option_text: 'Eliminates the need for regular position changes', is_correct: true }
            ]
          }
        ];
      } else if (quiz.title === 'Assists to Ambulate Using Gait Belt') {
        questions = [
          {
            quiz_id: quizId,
            question_text: 'When ambulating a resident with a gait belt, the NA should:',
            options: [
              { option_text: 'Stand behind the resident', is_correct: false },
              { option_text: 'Stand on the resident\'s stronger side', is_correct: true },
              { option_text: 'Stand on the resident\'s weaker side', is_correct: false },
              { option_text: 'Stand in front of the resident', is_correct: false }
            ]
          },
          {
            quiz_id: quizId,
            question_text: 'When using a gait belt, the NA should:',
            options: [
              { option_text: 'Apply the belt over bare skin', is_correct: false },
              { option_text: 'Apply the belt over clothing', is_correct: true },
              { option_text: 'Apply the belt under the breasts', is_correct: false },
              { option_text: 'Apply the belt over the breasts', is_correct: false }
            ]
          },
          {
            quiz_id: quizId,
            question_text: 'When ambulating a resident with a gait belt, the NA should:',
            options: [
              { option_text: 'Grasp the belt with palms up', is_correct: true },
              { option_text: 'Grasp the belt with palms down', is_correct: false },
              { option_text: 'Grasp the resident\'s arm', is_correct: false },
              { option_text: 'Grasp the resident\'s clothing', is_correct: false }
            ]
          },
          {
            quiz_id: quizId,
            question_text: 'Before applying a gait belt, the NA should check to see that:',
            options: [
              { option_text: 'The resident has on non-skid footwear', is_correct: true },
              { option_text: 'The resident has on skid-resistant socks', is_correct: false },
              { option_text: 'The resident has on slippers', is_correct: false },
              { option_text: 'The resident is barefoot', is_correct: false }
            ]
          },
          {
            quiz_id: quizId,
            question_text: 'When ambulating a resident with a gait belt, the NA should:',
            options: [
              { option_text: 'Walk in front of the resident', is_correct: false },
              { option_text: 'Walk behind the resident', is_correct: false },
              { option_text: 'Walk on the same side as the gait belt', is_correct: false },
              { option_text: 'Walk slightly behind and to the side of the resident', is_correct: true }
            ]
          },
          {
            quiz_id: quizId,
            question_text: 'When using a gait belt, the NA should:',
            options: [
              { option_text: 'Check that the belt is secure, but not too tight', is_correct: true },
              { option_text: 'Check that the belt is as tight as possible', is_correct: false },
              { option_text: 'Check that the belt is loose', is_correct: false },
              { option_text: 'Check that the belt is twisted', is_correct: false }
            ]
          },
          {
            quiz_id: quizId,
            question_text: 'When ambulating a resident with a gait belt, the NA should:',
            options: [
              { option_text: 'Encourage the resident to look down', is_correct: false },
              { option_text: 'Encourage the resident to look up', is_correct: false },
              { option_text: 'Encourage the resident to look straight ahead', is_correct: true },
              { option_text: 'Encourage the resident to close his eyes', is_correct: false }
            ]
          }
        ];
      }
      
      // Insert questions and options for this quiz
      if (questions.length > 0) {
        console.log(`Inserting ${questions.length} questions for quiz "${quiz.title}"...`);
        
        for (const question of questions) {
          const options = [...question.options];
          // Create a new object without the options property
          const questionData = {
            quiz_id: question.quiz_id,
            question_text: question.question_text
          };
          
          // Check if question already exists
          const { data: existingQuestion, error: checkQuestionError } = await supabase
            .from('quiz_questions')
            .select('id')
            .eq('quiz_id', questionData.quiz_id)
            .eq('question_text', questionData.question_text)
            .limit(1);
          
          if (checkQuestionError) {
            console.error('Error checking for existing question:', checkQuestionError);
            continue;
          }
          
          // If question already exists, skip insertion
          if (existingQuestion && existingQuestion.length > 0) {
            console.log(`Question already exists for quiz ID ${questionData.quiz_id}, skipping...`);
            continue;
          }
          
          // Insert new question
          const { data: insertedQuestion, error: questionError } = await supabase
            .from('quiz_questions')
            .insert(questionData)
            .select();
          
          if (questionError) {
            console.error('Error inserting question:', questionError);
            continue;
          }
          
          const questionId = insertedQuestion[0].id;
          console.log(`Question inserted with ID: ${questionId}`);
          
          // Insert options for this question
          for (const option of options) {
            const optionData = {
              question_id: questionId,
              option_text: option.option_text,
              is_correct: option.is_correct
            };
            
            // Check if option already exists
            const { data: existingOption, error: checkOptionError } = await supabase
              .from('quiz_options')
              .select('id')
              .eq('question_id', optionData.question_id)
              .eq('option_text', optionData.option_text)
              .limit(1);
            
            if (checkOptionError) {
              console.error('Error checking for existing option:', checkOptionError);
              continue;
            }
            
            // If option already exists, skip insertion
            if (existingOption && existingOption.length > 0) {
              console.log(`Option already exists for question ID ${optionData.question_id}, skipping...`);
              continue;
            }
            
            // Insert new option
            const { error: optionError } = await supabase
              .from('quiz_options')
              .insert(optionData);
            
            if (optionError) {
              console.error('Error inserting option:', optionError);
            } else {
              console.log(`Option inserted successfully for question ID ${questionId}`);
            }
          }
        }
      }
    }
    
    console.log('Sample quiz data inserted successfully');
    return true;
  } catch (error) {
    console.error('Error inserting sample quiz data:', error);
    return false;
  }
};

// Function to run the database setup
export const runDatabaseSetup = async () => {
  try {
    console.log('Starting database setup...');
    
    // Check if tables exist and are accessible
    const tablesExist = await setupQuizDatabase();
    
    if (tablesExist) {
      // Check if there's data in the quizzes table
      const { data, error } = await supabase
        .from('quizzes')
        .select('id')
        .limit(1);
      
      if (error) {
        console.error('Error checking for quiz data:', error.message);
      } else if (data && data.length === 0) {
        // Tables exist but no data, insert official quiz data
        console.log('Tables exist but no data found. Inserting official quiz data...');
        await insertOfficialQuizData();
      } else {
        console.log('Quiz tables exist and contain data');
        // Ensure all required questions exist for licensing purposes
        console.log('Verifying all required questions exist...');
        await insertOfficialQuizData();
      }
    } else {
      console.log('Unable to access quiz tables. Please ensure they are created in Supabase dashboard');
    }
  } catch (error) {
    console.error('Error running database setup:', error);
  }
};

// Export a function to be called from the app
export default runDatabaseSetup;
