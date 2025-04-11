import supabase from './supabaseClient';

// Function to set up the quiz database tables
export const setupQuizDatabase = async () => {
  try {
    // Create quizzes table
    const { error: quizzesError } = await supabase.rpc('exec_sql', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS quizzes (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });
    
    if (quizzesError) {
      console.error('Error creating quizzes table:', quizzesError);
      return false;
    }
    
    // Create quiz_questions table
    const { error: questionsError } = await supabase.rpc('exec_sql', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS quiz_questions (
          id SERIAL PRIMARY KEY,
          quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
          question_text TEXT NOT NULL,
          question_type TEXT NOT NULL DEFAULT 'multiple_choice',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });
    
    if (questionsError) {
      console.error('Error creating quiz_questions table:', questionsError);
      return false;
    }
    
    // Create quiz_options table
    const { error: optionsError } = await supabase.rpc('exec_sql', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS quiz_options (
          id SERIAL PRIMARY KEY,
          question_id INTEGER REFERENCES quiz_questions(id) ON DELETE CASCADE,
          option_text TEXT NOT NULL,
          is_correct BOOLEAN NOT NULL DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });
    
    if (optionsError) {
      console.error('Error creating quiz_options table:', optionsError);
      return false;
    }
    
    // Create quiz_submissions table
    const { error: submissionsError } = await supabase.rpc('exec_sql', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS quiz_submissions (
          id SERIAL PRIMARY KEY,
          user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
          quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
          score INTEGER,
          completed BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });
    
    if (submissionsError) {
      console.error('Error creating quiz_submissions table:', submissionsError);
      return false;
    }
    
    // Create quiz_answers table
    const { error: answersError } = await supabase.rpc('exec_sql', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS quiz_answers (
          id SERIAL PRIMARY KEY,
          submission_id INTEGER REFERENCES quiz_submissions(id) ON DELETE CASCADE,
          question_id INTEGER REFERENCES quiz_questions(id) ON DELETE CASCADE,
          selected_option_id INTEGER REFERENCES quiz_options(id) ON DELETE CASCADE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });
    
    if (answersError) {
      console.error('Error creating quiz_answers table:', answersError);
      return false;
    }
    
    console.log('Quiz database tables created successfully');
    return true;
  } catch (error) {
    console.error('Error setting up quiz database:', error);
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
          delete question.options;
          
          const { data: questionData, error: questionError } = await supabase
            .from('quiz_questions')
            .insert(question)
            .select();
          
          if (questionError) {
            console.error('Error inserting question:', questionError);
            continue;
          }
          
          const questionId = questionData[0].id;
          
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
    // Check if tables already exist
    const { data, error } = await supabase
      .from('quizzes')
      .select('id')
      .limit(1);
    
    if (error && error.code === '42P01') {
      // Table doesn't exist, create tables and insert data
      const tablesCreated = await setupQuizDatabase();
      if (tablesCreated) {
        await insertSampleQuizData();
      }
    } else if (!error && data && data.length === 0) {
      // Tables exist but no data, insert sample data
      await insertSampleQuizData();
    } else if (error) {
      console.error('Error checking if tables exist:', error);
    } else {
      console.log('Quiz tables already exist and contain data');
    }
  } catch (error) {
    console.error('Error running database setup:', error);
  }
};

// Export a function to be called from the app
export default runDatabaseSetup;
