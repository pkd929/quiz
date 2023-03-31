import React from 'react';

const QuizResult = ({ score, totalTime, restartQuiz }) => {
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;

  return (
    <div>
      <h1>Quiz Results</h1>
      <div>Final Score: {score}</div>
      <div>Time taken: {minutes}:{seconds < 10 ? '0' + seconds : seconds}</div>
      <button onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
};

export default QuizResult;
