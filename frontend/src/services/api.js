import axios from 'axios';

// Start a new quiz and fetch questions
export const fetchQuizData = () => {
  // incase of api failure, you can replace this with http://localhost:5000/api/quiz
  const url = `https://run.mocky.io/v3/22fc9b81-29db-42b2-b1c5-9f0f529f6cf2`;
  return axios.get(url);
};

export const fetchQuizAnswers = () => {
  // incase of api failure, you can replace this with http://localhost:5000/api/answers
  const url = `https://run.mocky.io/v3/0536a52c-24bf-4909-9078-3a89bb4cb807`;
  return axios.get(url); 
};

// Submit user answers (with time taken for each question)
export const submitAnswer = async (questionId, selectedOptions, timeTaken) => {
  try {
    const payload = {
      questionId,
      selectedOptions,
      timeTaken,
    };
    
    const url = `http://localhost:5000/api/submit-answer`;
    const response = await axios.post(url, payload); // Send data to the backend
    return response.data; 
  } catch (error) {
    console.error("Error submitting answer:", error);
    throw error;
  }
};

// Finish the quiz and get the score
export const finishQuiz = async (quizId) => {
  try {
    const response = await axios.post('http://localhost:5000/api/submit-answer', { quizId });
    return response.data; 
  } catch (error) {
    console.error("Error finishing the quiz:", error);
    throw error;
  }
};
