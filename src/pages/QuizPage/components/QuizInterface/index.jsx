import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useNavigate } from 'react-router-dom';
import "react-circular-progressbar/dist/styles.css";

const QuizInterface = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);

  const questions = [
    {
      question: "How do you judge what should be added in the next version of the app?",
      options: [
        "Data Analysis",
        "User's feedback",
        "Copy from similar product",
        "Make a questionary",
        "Personal feeling"
      ],
      correctAnswer: "Data Analysis"
    },
    {
      question: "What is the primary goal of a UX design?",
      options: [
        "Increase aesthetics",
        "Improve user experience",
        "Reduce development costs",
        "Focus on brand identity",
        "Boost marketing"
      ],
      correctAnswer: "Improve user experience"
    },
    {
      question: "Which method is best for collecting user feedback?",
      options: [
        "Surveys",
        "Interviews",
        "Focus groups",
        "Analytics tools",
        "All of the above"
      ],
      correctAnswer: "All of the above"
    },
  ];

  const totalQuestions = questions.length;
  const current = currentQuestionIndex + 1;

  const handleNext = () => {
    if (selectedOption !== null) {
      const selectedAnswer = questions[currentQuestionIndex].options[selectedOption];
      setAnswers([...answers, selectedAnswer]);

      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null); // Reset the selected option for the next question
      } else {
        navigate("/result", { state: { answers } }); // Navigate to results with answers
      }
    } else {
      alert("Please select an option before proceeding.");
    }
  };

  return (

    <div className="min-h-screen flex flex-col align-center">
      <div className='bg-purple-200 h-[150px] w-full flex justify-center items-end'>
        <div className="w-[100px] h-[100px] -mb-[30px] z-10 p-2 rounded-full bg-white flex items-center justify-center">
          <CircularProgressbar 
            styles={buildStyles({
              pathColor: "#44B77B",
              trailColor: "#eee",
              strokeLinecap: "butt",
            })}  
            value={(current / totalQuestions) * 100}
            text={
              <tspan>
                <tspan style={{ fontSize: "35px", fontWeight: "bold"}}>{current}</tspan>
                <tspan style={{ fontSize: "16px" }}>/{totalQuestions}</tspan>
              </tspan>
            }
          />
        </div> 
      </div>

      <div className='bg-white p-4 -mt-[20px] rounded-tl-[30px] rounded-tr-[30px]'>
        <h2 className="text-xl font-bold text-gray-800 mb-8 mt-[80px] px-4">
          {questions[currentQuestionIndex].question}
        </h2>

        <div className="space-y-4 mb-8">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(index)}
              className={`w-full p-4 rounded-xl text-left ${
                selectedOption === index 
                  ? 'bg-white shadow-lg border-2 border-purple-300' 
                  : 'bg-gray-50 hover:bg-white hover:shadow-md transition-all'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 
                ${selectedOption === index 
                    ? 'border-purple-500 bg-purple-500' 
                    : 'border-gray-300'
                }`} />
                <span className="text-gray-700">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div 
        onClick={handleNext}
        className="fixed bottom-[20px] left-1/2 -translate-x-1/2 w-[90%] bg-red-500 text-white py-4 px-6 rounded-full font-semibold flex items-center justify-center gap-2 cursor-pointer"
      >
        {current === totalQuestions ? "Finish" : "Next"}
        <ChevronRight className="w-5 h-5" />
      </div>
    </div>
  );
};

export default QuizInterface;