const express = require('express');
const cors = require('cors');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// In-memory storage for user answers (to simulate a database)
let userAnswers = {};

// Quiz data with multi-choice support
const quizData = [
  {
    question: "How do you judge what should be added in the next version of the app?",
    options: [
      "Data Analysis",
      "User's feedback",
      "Copy from similar product",
      "Make a questionary",
      "Personal feeling"
    ],
    correctAnswer: ["Data Analysis"], // Single-choice represented as an array
    type: "single",
    image: 'https://www.learnable.education/wp-content/uploads/2021/08/Y11-Must-Know-Questions-Solution-3.png'
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
    correctAnswer: ["Improve user experience"], // Single-choice
    type: "single"
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
    correctAnswer: ["All of the above"], // Single-choice
    type: "single",
    image: 'https://www.learnable.education/wp-content/uploads/2021/07/Y11-Must-Know-Questions-Q13-solutions.png'
  },
  {
    question: "Select all fruits from the following options.",
    options: [
      "Apple",
      "Carrot",
      "Banana",
      "Potato"
    ],
    correctAnswer: ["Apple", "Banana"], // Multi-choice
    type: "multi"
  },
  {
    question: "Which tools are commonly used for team collaboration?",
    options: [
      "Slack",
      "Jira",
      "Zoom",
      "Canva",
      "Photoshop"
    ],
    correctAnswer: ["Slack", "Jira"], // Multi-choice
    type: "multi"
  }
];

// Endpoint to get quiz data (questions)
app.get('/api/quiz', (req, res) => {
  res.json({ data: quizData });
});

// Endpoint to submit user answers
app.post('/api/submit-answer', (req, res) => {
  const { questionId, selectedOptions, timeTaken } = req.body;

  // Validate inputs
  if (!questionId || !selectedOptions || timeTaken == null) {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  // Store the answer and time taken for each question
  if (!userAnswers[questionId]) {
    userAnswers[questionId] = [];
  }

  userAnswers[questionId].push({ selectedOptions, timeTaken });

  console.log('User Answer Stored:', userAnswers);

  res.json({ message: 'Answer submitted successfully' });
});

// Helper function to compare answers
const isAnswerCorrect = (correctAnswer, userAnswer, type) => {
  if (type === "single") {
    return userAnswer.length === 1 && userAnswer[0] === correctAnswer[0];
  } else if (type === "multi") {
    return (
      userAnswer.length === correctAnswer.length &&
      userAnswer.every(option => correctAnswer.includes(option))
    );
  }
  return false;
};

// Endpoint to finish the quiz and calculate the score
app.post('/api/finish', (req, res) => {
  const { answers } = req.body; // Array of { questionId, selectedOptions }
  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  let score = 0;

  answers.forEach(({ questionId, selectedOptions }) => {
    const question = quizData.find(q => q.id === questionId);
    if (question) {
      const isCorrect = isAnswerCorrect(
        question.correctAnswer,
        selectedOptions,
        question.type
      );
      if (isCorrect) score++;
    }
  });

  const totalQuestions = quizData.length;

  res.json({
    message: 'Quiz finished',
    score,
    totalQuestions,
    percentage: (score / totalQuestions) * 100
  });
});

// Helper function to apply penalties based on time taken
const calculateScoreWithPenalty = (answers, timeTakenForEachQuestion) => {
  let totalScore = 0;

  answers.forEach((answer, index) => {
    const question = quizData[index];
    const isCorrect = isAnswerCorrect(
      question.correctAnswer,
      answer,
      question.type
    );

    if (isCorrect) totalScore += 10; // Award points for correct answers

    const timeTaken = timeTakenForEachQuestion[index];

    // Apply penalty based on time taken
    if (timeTaken > 120) {
      totalScore -= 20; // Severe penalty
    } else if (timeTaken > 45) {
      totalScore -= 10; // Medium penalty
    } else if (timeTaken > 30) {
      totalScore -= 5; // Small penalty
    }
  });

  return Math.max(totalScore, 0); // Ensure non-negative score
};

// Endpoint to get quiz answers (correct answers)
app.get('/api/answers', (req, res) => {
  res.json({
    quizData: quizData.map(q => ({
      question: q.question,
      correctAnswer: q.correctAnswer,
      type: q.type
    }))
  });
});

// Set the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
