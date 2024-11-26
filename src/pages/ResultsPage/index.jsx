import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useMemo, useState } from 'react';
import { fetchQuizAnswers, finishQuiz } from '../../services/api';

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [shouldUseFallback, setShouldUseFallback] = useState(true);
  // Get user answers and time taken from the previous page
  const answers = useMemo(() => location.state?.answers || [], [location.state]);
  const timeTakenForEachQuestion = useMemo(() => answers.map(answer => answer.timeTaken), [answers]);

  console.log({answers})
  console.log({quizAnswers})


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch correct answers from the backend
        const response = await fetchQuizAnswers();
        const apiData = response.data.quizData;
        setQuizAnswers(apiData);

        // Submit answers and fetch the final score from the backend
        const finishResponse = await finishQuiz({ answers });
        const backendScore = finishResponse.data.score;
        setScore(backendScore);
        setShouldUseFallback(false);
      } catch (error) {
        console.error("Error fetching quiz data or finishing quiz:", error);
      }
    };

    fetchData();
  }, [answers]);

  // Fallback logic: calculate the score manually in case backend scoring fails
  const calculateCorrectAnswers = () => {
    let correctAnswers = 0;
  
    for (let i = 0; i < answers.length; i++) {
      const userAnswer = answers[i]?.selectedAnswers;
      const correctAnswer = quizAnswers[i]?.correctAnswer;
      console.log({userAnswer, correctAnswer})
      if (userAnswer?.length !== correctAnswer?.length) {
        continue;
      }
  
      const isCorrect = userAnswer?.every(option => correctAnswer.includes(option));
      if (isCorrect) {
        correctAnswers++;
      }
    }
    return correctAnswers;
  };
  

  console.log({x:calculateCorrectAnswers()});
  

  const calculateScoreWithPenalty = () => {
    const correctAnswers = calculateCorrectAnswers();
    let totalScore = correctAnswers * 10; // 10 points for each correct answer

    timeTakenForEachQuestion.forEach(timeTaken => {
      if (timeTaken > 120) {
        totalScore -= 20; // Severe penalty for taking more than 120 seconds
      } else if (timeTaken > 45) {
        totalScore -= 10; // Medium penalty
      } else if (timeTaken > 30) {
        totalScore -= 5; // Small penalty
      }
    });

    // Ensure that the score does not go below 0
    return Math.max(totalScore, 0);
  };

  const correctAnswers = calculateCorrectAnswers();
  const finalScore = shouldUseFallback ? calculateScoreWithPenalty() : score;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-purple-200 h-40"></div>
      <div className="bg-white rounded-t-3xl flex-1 -mt-8 p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Your result</h1>

        {/* Progress Bar */}
        <div className="relative w-48 h-48 mb-8">
          <CircularProgressbar
            value={finalScore} // Use calculated or backend-provided score
            maxValue={100}
            text={`${finalScore}%`}
            styles={buildStyles({
              pathColor: "#FF3B3F",
              trailColor: "#f0f0f0",
              textColor: "#FF3B3F",
              textSize: "28px",
            })}
          />
        </div>

        <div className="w-full space-y-4">
          <div className="bg-green-50 p-4 rounded-xl flex items-center gap-3">
            <span className="w-2 h-2 bg-[#44B77B] rounded-full"></span>
            <span className="font-medium text-gray-700">{correctAnswers} Correct</span>
          </div>
          <div className="bg-red-50 p-4 rounded-xl flex items-center gap-3">
            <span className="w-2 h-2 bg-[#FF3B3F] rounded-full"></span>
            <span className="font-medium text-gray-700">
              {quizAnswers.length - correctAnswers} Incorrect
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="mt-auto w-full bg-red-500 text-white py-4 px-6 rounded-full font-semibold"
        >
          Start Again
        </button>
        </div>
    </div>
  );
};

export default ResultsPage;

