import React from "react";
import { useState } from "react";
import { selectedRegions } from "./constants";
import "./Quiz.css";

export default function Quiz(props) {
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [quizMode, setQuizMode] = useState(false);

  const handleResetButtonClick = () => {
    setShowScore(false);
    setScore(0);
    setCurrentQuestion(0);
  };

  const handleStartButtonClick = () => {
    setQuizMode(true)
  };

  React.useEffect(() => {
    if (props.answer === selectedRegions[currentQuestion]) {
      setScore(score + 1);
    }
    console.log(props.answer);
    console.log(selectedRegions[currentQuestion]);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < selectedRegions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  }, [props.answer]);

  return (
    <div className="quiz">
      {!quizMode ? (
        <div className="title__container">
        <h1 className="title__name">RUSSIAN REGIONS QUIZ</h1>
        <button className="quiz__play" onClick={handleStartButtonClick}>Start</button>
        </div>
      ) : (
        <>
        {showScore ? (
        <div className="title__container">
          <h1 className="title__name">RUSSIAN REGIONS QUIZ</h1>
          You scored {score} out of {selectedRegions.length}
          <button className="quiz__play" onClick={handleResetButtonClick}>
            Play again
          </button>
        </div>
      ) : (
        <div className="title__container">
          <h1 className="title__name">GUESS, WHERE IS ...</h1>
          <div className="question-section">
            <span>
              {selectedRegions[currentQuestion]} ({currentQuestion + 1}/
              {selectedRegions.length})
            </span>
          </div>
        </div>
      )}
      </> 
      )}
    </div>
  );
}
