import supabase from './supabaseClient';

// This file contains the complete quiz data with all required questions for licensing purposes
// Each quiz MUST have exactly 7 questions with the exact wording as specified in the official materials

export interface QuizOption {
  option_text: string;
  is_correct: boolean;
}

export interface QuizQuestion {
  quiz_id: number;
  question_text: string;
  options: QuizOption[];
}

export interface Quiz {
  id?: number;
  title: string;
  description: string;
}

// All official quizzes
export const officialQuizzes: Quiz[] = [
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

// Get official questions for a specific quiz
export const getOfficialQuestions = (quizTitle: string, quizId: number): QuizQuestion[] => {
  switch (quizTitle) {
    case 'Positions on Side':
      return [
        {
          quiz_id: quizId,
          question_text: 'When positioning a resident on his side, the NA should:',
          options: [
            { option_text: 'Place a pillow under the resident\'s head', is_correct: true },
            { option_text: 'Place a pillow under the resident\'s back', is_correct: false },
            { option_text: 'Place a pillow under the resident\'s feet', is_correct: false },
            { option_text: 'Place a pillow under the resident\'s abdomen', is_correct: false }
          ]
        },
        {
          quiz_id: quizId,
          question_text: 'When positioning a resident on his side, the NA should:',
          options: [
            { option_text: 'Position the resident on the edge of the bed', is_correct: false },
            { option_text: 'Position the resident in the middle of the bed', is_correct: true },
            { option_text: 'Position the resident on the far side of the bed', is_correct: false },
            { option_text: 'Position the resident at the foot of the bed', is_correct: false }
          ]
        },
        {
          quiz_id: quizId,
          question_text: 'When positioning a resident on his side, the NA should:',
          options: [
            { option_text: 'Place a pillow between the resident\'s knees', is_correct: true },
            { option_text: 'Place a pillow under the resident\'s knees', is_correct: false },
            { option_text: 'Place a pillow on top of the resident\'s knees', is_correct: false },
            { option_text: 'Place a pillow under the resident\'s feet', is_correct: false }
          ]
        },
        {
          quiz_id: quizId,
          question_text: 'When positioning a resident on his side, the NA should:',
          options: [
            { option_text: 'Position the upper arm in front of the resident', is_correct: true },
            { option_text: 'Position the upper arm behind the resident', is_correct: false },
            { option_text: 'Position the upper arm under the resident', is_correct: false },
            { option_text: 'Position the upper arm above the resident\'s head', is_correct: false }
          ]
        },
        {
          quiz_id: quizId,
          question_text: 'When positioning a resident on his side, the NA should:',
          options: [
            { option_text: 'Position the lower arm behind the resident', is_correct: false },
            { option_text: 'Position the lower arm in front of the resident', is_correct: false },
            { option_text: 'Position the lower arm under the resident\'s head', is_correct: false },
            { option_text: 'Position the lower arm against the mattress', is_correct: true }
          ]
        },
        {
          quiz_id: quizId,
          question_text: 'When positioning a resident on his side, the NA should:',
          options: [
            { option_text: 'Position the lower leg straight', is_correct: true },
            { option_text: 'Position the lower leg bent', is_correct: false },
            { option_text: 'Position the lower leg off the edge of the bed', is_correct: false },
            { option_text: 'Position the lower leg on top of the upper leg', is_correct: false }
          ]
        },
        {
          quiz_id: quizId,
          question_text: 'When positioning a resident on his side, the NA should:',
          options: [
            { option_text: 'Position the upper leg straight', is_correct: false },
            { option_text: 'Position the upper leg bent at the hip and knee', is_correct: true },
            { option_text: 'Position the upper leg bent at the knee only', is_correct: false },
            { option_text: 'Position the upper leg under the lower leg', is_correct: false }
          ]
        }
      ];
    
    case 'Assists to Ambulate Using Gait Belt':
      return [
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
    
    case 'Transferring a Patient Using a Mechanical Lift':
      return [
        {
          quiz_id: quizId,
          question_text: 'When using a mechanical lift, the NA should:',
          options: [
            { option_text: 'Place the sling under the resident while the resident is sitting in the chair', is_correct: false },
            { option_text: 'Place the sling under the resident while the resident is lying in bed', is_correct: true },
            { option_text: 'Place the sling under the resident while the resident is standing', is_correct: false },
            { option_text: 'Place the sling under the resident while the resident is in the bathroom', is_correct: false }
          ]
        },
        {
          quiz_id: quizId,
          question_text: 'When using a mechanical lift, the NA should:',
          options: [
            { option_text: 'Position the lift so that the base is closed', is_correct: false },
            { option_text: 'Position the lift so that the base is partially open', is_correct: false },
            { option_text: 'Position the lift so that the base is fully open', is_correct: true },
            { option_text: 'Position the lift so that the base is removed', is_correct: false }
          ]
        },
        {
          quiz_id: quizId,
          question_text: 'When using a mechanical lift, the NA should:',
          options: [
            { option_text: 'Lower the lift until the resident is sitting in the chair', is_correct: true },
            { option_text: 'Lower the lift until the resident is hovering above the chair', is_correct: false },
            { option_text: 'Lower the lift until the resident is standing in the chair', is_correct: false },
            { option_text: 'Lower the lift until the resident is lying in the chair', is_correct: false }
          ]
        },
        {
          quiz_id: quizId,
          question_text: 'When using a mechanical lift, the NA should:',
          options: [
            { option_text: 'Check the manufacturer\'s instructions for the lift\'s weight capacity', is_correct: true },
            { option_text: 'Check with the resident about the lift\'s weight capacity', is_correct: false },
            { option_text: 'Check with the family about the lift\'s weight capacity', is_correct: false },
            { option_text: 'Check with housekeeping about the lift\'s weight capacity', is_correct: false }
          ]
        },
        {
          quiz_id: quizId,
          question_text: 'When using a mechanical lift, the NA should:',
          options: [
            { option_text: 'Attach the sling to the lift before positioning the resident on the sling', is_correct: false },
            { option_text: 'Attach the sling to the lift after positioning the resident on the sling', is_correct: true },
            { option_text: 'Attach the sling to the lift while the resident is standing', is_correct: false },
            { option_text: 'Attach the sling to the lift while the resident is in the bathroom', is_correct: false }
          ]
        },
        {
          quiz_id: quizId,
          question_text: 'When using a mechanical lift, the NA should:',
          options: [
            { option_text: 'Have at least two staff members present', is_correct: true },
            { option_text: 'Have at least one staff member present', is_correct: false },
            { option_text: 'Have at least three staff members present', is_correct: false },
            { option_text: 'Have at least four staff members present', is_correct: false }
          ]
        },
        {
          quiz_id: quizId,
          question_text: 'When using a mechanical lift, the NA should:',
          options: [
            { option_text: 'Check that all sling attachments are secure', is_correct: true },
            { option_text: 'Check that all sling attachments are loose', is_correct: false },
            { option_text: 'Check that all sling attachments are removed', is_correct: false },
            { option_text: 'Check that all sling attachments are new', is_correct: false }
          ]
        }
      ];
    
    case 'Transfers from Bed to Wheelchair':
      return [
        {
          quiz_id: quizId,
          question_text: 'When transferring a resident from bed to wheelchair, the NA should:',
          options: [
            { option_text: 'Position the wheelchair at the foot of the bed', is_correct: false },
            { option_text: 'Position the wheelchair at the head of the bed', is_correct: false },
            { option_text: 'Position the wheelchair at a 45-degree angle to the bed', is_correct: true },
            { option_text: 'Position the wheelchair parallel to the bed', is_correct: false }
          ]
        },
        {
          quiz_id: quizId,
          question_text: 'When transferring a resident from bed to wheelchair, the NA should:',
          options: [
            { option_text: 'Lock the wheels on the bed and wheelchair', is_correct: true },
            { option_text: 'Lock the wheels on the bed only', is_correct: false },
            { option_text: 'Lock the wheels on the wheelchair only', is_correct: false },
            { option_text: 'Keep all wheels unlocked for easier movement', is_correct: false }
          ]
        },
        {
          quiz_id: quizId,
          question_text: 'When transferring a resident from bed to wheelchair, the NA should:',
          options: [
            { option_text: 'Raise the bed to the highest position', is_correct: false },
            { option_text: 'Lower the bed to the lowest position', is_correct: false },
            { option_text: 'Adjust the bed to the same height as the wheelchair seat', is_correct: true },
            { option_text: 'Keep the bed at a 45-degree angle', is_correct: false }
          ]
        },
        {
          quiz_id: quizId,
          question_text: 'When transferring a resident from bed to wheelchair, the NA should:',
          options: [
            { option_text: 'Have the resident look up at the ceiling', is_correct: false },
            { option_text: 'Have the resident look down at the floor', is_correct: false },
            { option_text: 'Have the resident look at the wheelchair', is_correct: true },
            { option_text: 'Have the resident close his eyes', is_correct: false }
          ]
        },
        {
          quiz_id: quizId,
          question_text: 'When transferring a resident from bed to wheelchair, the NA should:',
          options: [
            { option_text: 'Support the resident\'s back and under the thighs', is_correct: true },
            { option_text: 'Support the resident\'s neck and shoulders', is_correct: false },
            { option_text: 'Support the resident\'s arms only', is_correct: false },
            { option_text: 'Support the resident\'s legs only', is_correct: false }
          ]
        },
        {
          quiz_id: quizId,
          question_text: 'When transferring a resident from bed to wheelchair, the NA should:',
          options: [
            { option_text: 'Block the resident\'s knees with your knees', is_correct: true },
            { option_text: 'Block the resident\'s feet with your feet', is_correct: false },
            { option_text: 'Block the resident\'s elbows with your elbows', is_correct: false },
            { option_text: 'Block the resident\'s shoulders with your shoulders', is_correct: false }
          ]
        },
        {
          quiz_id: quizId,
          question_text: 'When transferring a resident from bed to wheelchair, the NA should:',
          options: [
            { option_text: 'Ensure the resident\'s feet are flat on the floor', is_correct: true },
            { option_text: 'Ensure the resident\'s feet are crossed at the ankles', is_correct: false },
            { option_text: 'Ensure the resident\'s feet are dangling above the floor', is_correct: false },
            { option_text: 'Ensure the resident\'s feet are on the footrests', is_correct: false }
          ]
        }
      ];
    
    case 'Using Proper Body Mechanics':
      return [
        {
          quiz_id: quizId,
          question_text: 'When using proper body mechanics, the NA should:',
          options: [
            { option_text: 'Bend at the waist', is_correct: false },
            { option_text: 'Bend at the knees', is_correct: true },
            { option_text: 'Bend at the neck', is_correct: false },
            { option_text: 'Bend at the shoulders', is_correct: false }
          ]
        },
        {
          quiz_id: quizId,
          question_text: 'When using proper body mechanics, the NA should:',
          options: [
            { option_text: 'Keep the back straight', is_correct: true },
            { option_text: 'Keep the back bent', is_correct: false },
            { option_text: 'Keep the back twisted', is_correct: false },
            { option_text: 'Keep the back arched', is_correct: false }
          ]
        },
        {
          quiz_id: quizId,
          question_text: 'When using proper body mechanics, the NA should:',
          options: [
            { option_text: 'Keep the feet close together', is_correct: false },
            { option_text: 'Keep the feet shoulder-width apart', is_correct: true },
            { option_text: 'Keep one foot in front of the other', is_correct: false },
            { option_text: 'Keep the feet on tiptoes', is_correct: false }
          ]
        },
        {
          quiz_id: quizId,
          question_text: 'When using proper body mechanics, the NA should:',
          options: [
            { option_text: 'Hold objects away from the body', is_correct: false },
            { option_text: 'Hold objects close to the body', is_correct: true },
            { option_text: 'Hold objects above the head', is_correct: false },
            { option_text: 'Hold objects below the waist', is_correct: false }
          ]
        },
        {
          quiz_id: quizId,
          question_text: 'When using proper body mechanics, the NA should:',
          options: [
            { option_text: 'Pivot the feet when turning', is_correct: true },
            { option_text: 'Twist the back when turning', is_correct: false },
            { option_text: 'Bend the knees when turning', is_correct: false },
            { option_text: 'Arch the back when turning', is_correct: false }
          ]
        },
        {
          quiz_id: quizId,
          question_text: 'When using proper body mechanics, the NA should:',
          options: [
            { option_text: 'Push rather than pull', is_correct: true },
            { option_text: 'Pull rather than push', is_correct: false },
            { option_text: 'Lift rather than push or pull', is_correct: false },
            { option_text: 'Drag rather than push or pull', is_correct: false }
          ]
        },
        {
          quiz_id: quizId,
          question_text: 'When using proper body mechanics, the NA should:',
          options: [
            { option_text: 'Use the strongest muscles to do the work', is_correct: true },
            { option_text: 'Use the weakest muscles to do the work', is_correct: false },
            { option_text: 'Use only arm muscles to do the work', is_correct: false },
            { option_text: 'Use only back muscles to do the work', is_correct: false }
          ]
        }
      ];
    
    default:
      return [];
  }
};

// Function to insert all official quiz data into Supabase
export const insertOfficialQuizData = async () => {
  try {
    console.log('Inserting official quiz data...');
    
    // Insert quizzes one by one
    for (const quiz of officialQuizzes) {
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
      
      let quizId: number;
      
      // If quiz already exists, use its ID
      if (existingQuiz && existingQuiz.length > 0) {
        console.log(`Quiz "${quiz.title}" already exists with ID: ${existingQuiz[0].id}`);
        quizId = existingQuiz[0].id;
      } else {
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
        quizId = quizData[0].id;
      }
      
      // Get official questions for this quiz
      const questions = getOfficialQuestions(quiz.title, quizId);
      
      if (questions.length === 0) {
        console.error(`No questions found for quiz "${quiz.title}"`);
        continue;
      }
      
      console.log(`Inserting ${questions.length} questions for quiz "${quiz.title}"...`);
      
      // Insert questions and options
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
        
        let questionId: number;
        
        // If question already exists, use its ID
        if (existingQuestion && existingQuestion.length > 0) {
          console.log(`Question already exists for quiz ID ${questionData.quiz_id} with ID: ${existingQuestion[0].id}`);
          questionId = existingQuestion[0].id;
        } else {
          // Insert new question
          const { data: insertedQuestion, error: questionError } = await supabase
            .from('quiz_questions')
            .insert(questionData)
            .select();
          
          if (questionError) {
            console.error('Error inserting question:', questionError);
            continue;
          }
          
          console.log(`Question inserted with ID: ${insertedQuestion[0].id}`);
          questionId = insertedQuestion[0].id;
        }
        
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
    
    console.log('Official quiz data inserted successfully');
    return true;
  } catch (error) {
    console.error('Error inserting official quiz data:', error);
    return false;
  }
};

export default insertOfficialQuizData;
