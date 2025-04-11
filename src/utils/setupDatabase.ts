import supabase from './supabaseClient';

// Function to check if tables exist and create them if needed
export const setupQuizDatabase = async () => {
  try {
    console.log('Checking if quiz tables exist...');
    
    // We'll assume the tables already exist in Supabase
    // This is because table creation requires admin privileges
    // Instead, we'll just check if we can access the tables
    
    // Try to access the quizzes table
    const { error: quizzesError } = await supabase
      .from('quizzes')
      .select('count')
      .limit(1);
    
    if (quizzesError) {
      console.log('Quizzes table may not exist:', quizzesError.message);
      console.log('Note: Tables should be created in the Supabase dashboard');
      console.log('Required tables: quizzes, quiz_questions, quiz_options, quiz_submissions, quiz_answers');
      return false;
    }
    
    console.log('Quiz tables exist or are accessible');
    return true;
  } catch (error) {
    console.error('Error checking quiz database:', error);
    return false;
  }
};

// Function to insert sample quiz data
export const insertSampleQuizData = async () => {
  try {
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
    
    // Insert quizzes
    for (const quiz of quizzes) {
      const { data: quizData, error: quizError } = await supabase
        .from('quizzes')
        .insert(quiz)
        .select();
      
      if (quizError) {
        console.error(`Error inserting quiz "${quiz.title}":`, quizError);
        continue;
      }
      
      const quizId = quizData[0].id;
      
      // Sample questions for "Positions on Side" quiz
      if (quiz.title === 'Positions on Side') {
        const questions = [
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
        
        // Insert questions and options
        for (const question of questions) {
          const options = [...question.options];
          // Create a new object without the options property
          const questionData = {
            quiz_id: question.quiz_id,
            question_text: question.question_text
          };
          
          const { data: insertedQuestion, error: questionError } = await supabase
            .from('quiz_questions')
            .insert(questionData)
            .select();
          
          if (questionError) {
            console.error('Error inserting question:', questionError);
            continue;
          }
          
          const questionId = insertedQuestion[0].id;
          
          // Insert options for this question
          for (const option of options) {
            const { error: optionError } = await supabase
              .from('quiz_options')
              .insert({
                question_id: questionId,
                ...option
              });
            
            if (optionError) {
              console.error('Error inserting option:', optionError);
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
        // Tables exist but no data, insert sample data
        console.log('Tables exist but no data found. Inserting sample data...');
        await insertSampleQuizData();
      } else {
        console.log('Quiz tables exist and contain data');
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
