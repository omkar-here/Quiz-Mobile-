import { Link } from 'react-router-dom';
import upraisedLogo from './images/upraised-logo.svg'

const HomeScreen = () => {

 return (
    <div className="bg-custom-gradient bg-blend-multiply h-screen flex flex-col">
      <img
        src={upraisedLogo}
        alt="upraised logo"
        className="w-[197px] h-[70px] mx-auto mt-[20px]"
      />
      <div className="flex-grow flex items-center justify-center">
        <div className="h-[190px] shadow-lg w-[200px] bg-white flex items-center justify-center rounded-full">
          <div className="text-[#FF3B3C] text-center font-poppins text-5xl font-extrabold">
            Quiz
          </div>
        </div>
      </div>
      <Link
        to="/quiz"
        className="w-[80%] h-[7%] mb-[40px] bg-[#FF3B3F] mx-auto flex items-center justify-center rounded-3xl"
      >
        <div className="font-nunito text-2xl font-black text-white leading-[67px]">
          Start
        </div>
      </Link>
    </div>
  );
};

export default HomeScreen;
