import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './pages/QuizPage';
// import ResultPage from './pages/ResultPage';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the Home Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Route for the Quiz Page */}
        <Route path="/quiz" element={<QuizPage />} />

        {/* Route for the Result Page */}
        {/* <Route path="/result" element={<ResultPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
