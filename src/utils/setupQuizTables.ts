import supabase from './supabaseClient';

// Function to set up all quiz-related tables
export const setupQuizTables = async () => {
  try {
    // Create quizzes table
    const { error: quizzesError } = await supabase.rpc('create_quiz_tables', {});
    
    if (quizzesError) {
      console.error('Error creating quiz tables:', quizzesError);
      return false;
    }
    
    console.log('Quiz tables created successfully');
    return true;
  } catch (error) {
    console.error('Error setting up quiz tables:', error);
    return false;
  }
};

// Function to create the stored procedure for creating tables
export const createStoredProcedure = async () => {
  try {
    // Create a stored procedure to set up all quiz tables
    const { error } = await supabase.rpc('create_stored_procedure_for_quiz_tables', {});
    
    if (error) {
      console.error('Error creating stored procedure:', error);
      return false;
    }
    
    console.log('Stored procedure created successfully');
    return true;
  } catch (error) {
    console.error('Error creating stored procedure:', error);
    return false;
  }
};

// SQL for creating tables - this will be executed by the stored procedure
export const quizTablesSQL = `
CREATE TABLE IF NOT EXISTS quizzes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quiz_questions (
  id SERIAL PRIMARY KEY,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL DEFAULT 'multiple_choice',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quiz_options (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES quiz_questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quiz_submissions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  score INTEGER,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quiz_answers (
  id SERIAL PRIMARY KEY,
  submission_id INTEGER REFERENCES quiz_submissions(id) ON DELETE CASCADE,
  question_id INTEGER REFERENCES quiz_questions(id) ON DELETE CASCADE,
  selected_option_id INTEGER REFERENCES quiz_options(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`;
