import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useNavigate } from 'react-router-dom';
import "react-circular-progressbar/dist/styles.css";
import { fetchQuizData, submitAnswer } from '../../../../services/api';

const QuizInterface = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]); // For multi-choice support
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchQuizData();
        const apiData = response?.data?.data;
        setQuestions(apiData);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchData();
  }, []);

  const totalQuestions = questions?.length;
  const current = currentQuestionIndex + 1;

  const handleOptionToggle = (index) => {
    const type = questions[currentQuestionIndex]?.type || "single"; // Default to single choice
  
    if (type === "single") {
      setSelectedOptions([index]); // Only allow one option to be selected
    } else if (type === "multi") {
      if (selectedOptions.includes(index)) {
        setSelectedOptions(selectedOptions.filter(opt => opt !== index)); // Deselect the option
      } else {
        setSelectedOptions([...selectedOptions, index]); // Add the option to the selected list
      }
    }
  };

  const handleNext = async () => {
    try {
      if (selectedOptions.length > 0) {
        const selectedAnswers = selectedOptions.map(
          index => questions[currentQuestionIndex].options[index]
        );

        const endTime = Date.now();
        const timeForCurrentQuestion = Math.round((endTime - startTime) / 1000);

        // Update answers state with the current question's selected answers
        const updatedAnswers = [
          ...answers,
          { 
            questionId: questions[currentQuestionIndex].question,
            selectedAnswers,
            timeTaken: timeForCurrentQuestion
          }
        ];

        setAnswers(updatedAnswers); // Set updated answers state

        if (currentQuestionIndex < totalQuestions - 1) {
          // Move to the next question after updating the answers
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedOptions([]);
          setStartTime(Date.now());
          const questionId = questions[currentQuestionIndex].question;
          await submitAnswer(questionId, selectedAnswers, timeForCurrentQuestion);
        } else {
          // After the last question, navigate to the results page with the updated answers
          navigate("/result", { state: { answers: updatedAnswers } });
        }

        
      } else {
        alert("Please select at least one option before proceeding.");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
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
          {questions?.[currentQuestionIndex]?.question}
        </h2>

        <div className="space-y-4 mb-24">
          {questions?.[currentQuestionIndex]?.image && (
            <img
              src={questions?.[currentQuestionIndex]?.image}
              alt="Question"
              className="w-full object-cover rounded-xl"
            />
          )}
          {questions?.[currentQuestionIndex]?.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionToggle(index)}
              className={`w-full p-4 rounded-xl text-left ${
                selectedOptions.includes(index)
                  ? 'bg-white shadow-lg border-2 border-purple-300' 
                  : 'bg-gray-50 hover:bg-white hover:shadow-md transition-all'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 
                ${selectedOptions.includes(index)
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
