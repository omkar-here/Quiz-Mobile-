import upraisedLogo from './images/upraised-logo.svg'
const LandingPage = () => {
return (
    <div className="bg-custom-gradient bg-blend-multiply h-screen flex flex-col">
    <img
        src={upraisedLogo}
        alt="upraised logo"
        className="w-[197px] h-[70px] mx-auto mt-[20px]"
    />
    <div className="flex-grow flex items-center justify-center">
        <div className="h-[200px] shadow-lg w-[200px] bg-white flex items-center justify-center rounded-full">
        <div className="text-[#FF3B3C] text-center rounded-full font-poppins text-5xl font-extrabold leading-[90px] decoration-skip-ink-none">
            Quiz
        </div>
        </div>
    </div>
    <div className="w-[80%] h-[5%] mb-[40px] bg-[#FF3B3F] cursor-pointer mx-auto mt-auto flex items-center justify-center rounded-3xl">
        <div className="font-nunito text-2xl font-black text-white leading-[67px] text-left decoration-skip-ink-none">
            Start 
        </div>
    </div>
    </div>
)
}

export default LandingPage