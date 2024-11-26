import axios from 'axios';

// Start a new quiz and fetch questions
export const fetchQuizData = () => {
  const url = `https://run.mocky.io/v3/22fc9b81-29db-42b2-b1c5-9f0f529f6cf2`;
  return axios.get(url); // Axios automatically parses JSON responses
};

export const fetchQuizAnswers = () => {
  const url = `https://run.mocky.io/v3/0536a52c-24bf-4909-9078-3a89bb4cb807`;
  return axios.get(url); // Axios automatically parses JSON responses
};

// Submit user answers (with time taken for each question)
export const submitAnswer = async (questionId, selectedOptions, timeTaken) => {
  try {
    const payload = {
      questionId,
      selectedOptions,
      timeTaken,
    };
    
    // Make sure the correct full URL is used (assuming API is running on localhost)
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
