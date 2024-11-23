import { useState, useEffect } from 'react';
import { startQuiz, submitAnswer, finishQuiz } from '../services/api';

// Custom hook to handle quiz logic
export const useQuiz = () => {
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [timeTaken, setTimeTaken] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(null);

  // Start the quiz and fetch questions
  const startNewQuiz = async () => {
    try {
      const data = await startQuiz();
      setQuizData(data);
      setQuizStarted(true);
      setCurrentQuestionIndex(0);
      setScore(null);
    } catch (error) {
      console.error("Error starting the quiz:", error);
    }
  };

  // Submit the answer for the current question
  const submitCurrentAnswer = async () => {
    const currentQuestion = quizData.questions[currentQuestionIndex];
    const timeTakenForQuestion = timeTaken;

    try {
      await submitAnswer(
        currentQuestion.id,
        selectedOptions,
        timeTakenForQuestion
      );

      if (currentQuestionIndex === quizData.questions.length - 1) {
        finishQuizAndGetScore();
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOptions([]);
        setTimeTaken(0); // Reset time for next question
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  // Finish the quiz and fetch the score report
  const finishQuizAndGetScore = async () => {
    try {
      const response = await finishQuiz(quizData.quizId);
      setScore(response); 
      setQuizFinished(true);
    } catch (error) {
      console.error("Error finishing the quiz:", error);
    }
  };

  // Start timing when a question is shown
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setTimeTaken(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestionIndex]);

  return {
    quizData,
    currentQuestionIndex,
    selectedOptions,
    setSelectedOptions,
    timeTaken,
    quizStarted,
    quizFinished,
    score,
    startNewQuiz,
    submitCurrentAnswer,
  };
};
