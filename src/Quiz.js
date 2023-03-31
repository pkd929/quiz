import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(60);

  useEffect(() => {
    
    const fetchQuestions = async () => {
      const response = await fetch('https://example.com/api/questions');
      const data = await response.json();
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  useEffect(() => {

    const timer = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);

    
    if (timeRemaining === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const handleNextQuestion = () => {
    
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setSelectedAnswerIndex(null);
  };

  const handleAnswerSelect = (index) => {

    setSelectedAnswerIndex(index);
  };

  return (
    <div>
      {questions.length > 0 ? (
        <>
          <h2>Question {currentQuestionIndex + 1}</h2>
          <p>{questions[currentQuestionIndex].question}</p>
          <ul>
            {questions[currentQuestionIndex].answers.map((answer, index) => (
              <li key={index}>
                <input
                  type="radio"
                  id={`answer-${index}`}
                  name="answer"
                  value={answer}
                  checked={selectedAnswerIndex === index}
                  onChange={() => handleAnswerSelect(index)}
                />
                <label htmlFor={`answer-${index}`}>{answer}</label>
              </li>
            ))}
          </ul>
          <button onClick={handleNextQuestion}>Next Question</button>
        </>
      ) : (
        <p>Loading questions...</p>
      )}
      <p>Time Remaining: {timeRemaining}</p>
    </div>
  );
};

export default Quiz;

