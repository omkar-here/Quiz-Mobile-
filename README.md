# Quiz Application

This is a web-based Quiz Application built with **React**. The app allows users to answer quiz questions with single-choice and multi-choice options, calculates scores based on their answers, and displays the results in an intuitive UI. The project follows best practices for code quality, RESTful APIs, and deployment.


## Features

1. **Interactive Quiz Interface**: 
   - Supports single and multi-choice questions.
   - Tracks time taken for each question.
   - Validates answers and prevents empty submissions.

2. **Result Calculation**:
   - Calculates the user's score based on their answers and the time taken.
   - Backend fallback logic for score validation.

3. **Responsive Design**: 
   - Mobile-first UI with adaptive layouts.

4. **RESTful API Integration**:
   - Fetch questions and submit answers using APIs.

5. **Deployment Ready**:
   - Hosted live for demonstration purposes.

---

## Tech Stack

- **Frontend**: React, TailwindCSS, Circular Progress Bar
- **Backend**: (Placeholder for API, REST endpoints assumed)
- **Deployment**: Vercel/Netlify
- **Build Tools**: Vite

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- Node.js (v18.x or above)
- npm or yarn
- Git

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/quiz-app.git
   cd quiz-app
   ```

2. Install dependencies:
  ```bash
  npm install
  ```

3. Running Locally
Start the development server:

```bash
npm run dev
```

```bash
http://localhost:5173
```

# API Documentation

## 1. Fetch Quiz Questions  

- **Endpoint**: `/api/quiz`  
- **Method**: `GET`  
- **Description**: Fetches the list of quiz questions with their options, types (single/multi-choice), and optional images.

### Response Example:
```json
{
  "status": "success",
  "data": [
    {
      "question": "What is the capital of France?",
      "options": ["Paris", "Berlin", "Madrid", "Rome"],
      "type": "single",
      "image": "https://example.com/image.jpg"
    },
    {
      "question": "Select the primary colors.",
      "options": ["Red", "Blue", "Yellow", "Green"],
      "type": "multi"
    }
  ]
}
```

### 2. Submit Answer

- **Endpoint**: `/api/quiz/answer`
- **Method**: `POST`
- **Description**: Submits the user's answer for a specific question along with the time taken to answer it.

#### Request Payload:
```json
{
  "questionId": "q123",
  "selectedAnswers": ["Paris"],
  "timeTaken": 25
}
```

### 3. Fetch Quiz Results

- **Endpoint**: `/api/quiz/result`
- **Method**: `POST`
- **Description**: Sends all the user’s answers for the quiz and retrieves the calculated score.

#### Request Payload:
```json
{
  "answers": [
    { 
      "questionId": "q123", 
      "selectedAnswers": ["Paris"], 
      "timeTaken": 25 
    },
    { 
      "questionId": "q124", 
      "selectedAnswers": ["Red", "Blue", "Yellow"], 
      "timeTaken": 45 
    }
  ]
}
```

#### Response Payload
```
{
  "status": "success",
  "score": 85,
  "correctAnswers": 8,
  "totalQuestions": 10
}
```



