-- Create quizzes table
CREATE TABLE IF NOT EXISTS public.quizzes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz_questions table
CREATE TABLE IF NOT EXISTS public.quiz_questions (
  id SERIAL PRIMARY KEY,
  quiz_id INTEGER REFERENCES public.quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL DEFAULT 'multiple_choice',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz_options table
CREATE TABLE IF NOT EXISTS public.quiz_options (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES public.quiz_questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz_submissions table
CREATE TABLE IF NOT EXISTS public.quiz_submissions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id INTEGER REFERENCES public.quizzes(id) ON DELETE CASCADE,
  score INTEGER NOT NULL DEFAULT 0,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz_answers table
CREATE TABLE IF NOT EXISTS public.quiz_answers (
  id SERIAL PRIMARY KEY,
  submission_id INTEGER REFERENCES public.quiz_submissions(id) ON DELETE CASCADE,
  question_id INTEGER REFERENCES public.quiz_questions(id) ON DELETE CASCADE,
  selected_option_id INTEGER REFERENCES public.quiz_options(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies for security
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_answers ENABLE ROW LEVEL SECURITY;

-- Create policies for quizzes (everyone can read, only authenticated users can insert)
CREATE POLICY "Allow public read access to quizzes" 
  ON public.quizzes FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to insert quizzes" 
  ON public.quizzes FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policies for quiz_questions (everyone can read, only authenticated users can insert)
CREATE POLICY "Allow public read access to quiz_questions" 
  ON public.quiz_questions FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to insert quiz_questions" 
  ON public.quiz_questions FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policies for quiz_options (everyone can read, only authenticated users can insert)
CREATE POLICY "Allow public read access to quiz_options" 
  ON public.quiz_options FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to insert quiz_options" 
  ON public.quiz_options FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policies for quiz_submissions (users can only see their own submissions)
CREATE POLICY "Allow users to see their own submissions" 
  ON public.quiz_submissions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow users to insert their own submissions" 
  ON public.quiz_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own submissions" 
  ON public.quiz_submissions FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for quiz_answers (users can only see their own answers)
CREATE POLICY "Allow users to see their own answers" 
  ON public.quiz_answers FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM public.quiz_submissions WHERE id = submission_id
    )
  );

CREATE POLICY "Allow users to insert their own answers" 
  ON public.quiz_answers FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM public.quiz_submissions WHERE id = submission_id
    )
  );
