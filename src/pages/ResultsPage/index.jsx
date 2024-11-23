import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const quizData = [
    { correctAnswer: "Data Analysis" },
    { correctAnswer: "Improve user experience" },
    { correctAnswer: "All of the above" },
  ];

  const answers = location.state?.answers || [];
  const correctAnswers = answers.filter(
    (answer, index) => answer === quizData[index].correctAnswer
  ).length;

  const score = Math.round((correctAnswers / quizData.length) * 100);

  return (
    <div className="min-h-screen bg-purple-200 p-4 flex flex-col">
      <div className="bg-white rounded-t-3xl flex-1 mt-16 p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Your result</h1>

        {/* Progress Bar */}
        <div className="relative w-48 h-48 mb-8">
          <CircularProgressbar
            value={score}
            maxValue={100}
            text={`${score}%`}
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
            <span className="font-medium text-gray-700">{correctAnswers} Correct</span>
          </div>
          <div className="bg-red-50 p-4 rounded-xl flex items-center gap-3">
            <span className="font-medium text-gray-700">
              {quizData.length - correctAnswers} Incorrect
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
