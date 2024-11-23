import axios from 'axios';

// Base URL for the API
const API_URL = 'https://api.quizapp.com'; 

// Start a new quiz and fetch questions
export const startQuiz = async () => {
  try {
    const response = await axios.post(`${API_URL}/start`);
    return response.data; 
  } catch (error) {
    console.error("Error starting the quiz:", error);
    throw error;
  }
};

// Submit user answers
export const submitAnswer = async (questionId, selectedOptions, timeTaken) => {
  try {
    const payload = {
      questionId,
      selectedOptions,
      timeTaken,
    };
    const response = await axios.post(`${API_URL}/submit-answer`, payload);
    return response.data; 
  } catch (error) {
    console.error("Error submitting answer:", error);
    throw error;
  }
};

// Finish the quiz and get the score
export const finishQuiz = async (quizId) => {
  try {
    const response = await axios.post(`${API_URL}/finish`, { quizId });
    return response.data; 
  } catch (error) {
    console.error("Error finishing the quiz:", error);
    throw error;
  }
};
