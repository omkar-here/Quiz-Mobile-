import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const QuizInterface = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const total = 10, current = 7;
  
  const options = [
    "Data Analysis",
    "User's feedback",
    "Copy from similar product",
    "Make a questionary",
    "Personal feeling"
  ];

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
            value={(current / total) * 100}
            text={
              <tspan>
                <tspan style={{ fontSize: "35px", fontWeight: "bold"}}>{current}</tspan>
                <tspan style={{ fontSize: "16px" }}>/{total}</tspan>
              </tspan>
            }
          />
        </div> 
      </div>

      <div className='bg-white p-4 -mt-[20px] rounded-tl-[30px] rounded-tr-[30px]'>
        <h2 className="text-xl font-bold text-gray-800 mb-8 mt-[80px] px-4">
          How do you judge what should be added in the next version of the app?
        </h2>

        <div className="space-y-4 mb-8">
          {options.map((option, index) => (
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
                <div className={`w-5 h-5 rounded-full border-2 ${
                  selectedOption === index 
                    ? 'border-purple-500 bg-purple-500' 
                    : 'border-gray-300'
                }`} />
                <span className="text-gray-700">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-[20px] left-1/2 -translate-x-1/2 w-[90%] bg-red-500 text-white py-4 px-6 rounded-full font-semibold flex items-center justify-center gap-2">
        Next
        <ChevronRight className="w-5 h-5" />
      </div>
    </div>
  );
};

export default QuizInterface;
