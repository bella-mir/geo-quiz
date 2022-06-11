import React from "react";
import { useState } from "react";
import { selectedRegions } from "./constants";

export default function Quiz(props) {
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleResetButtonClick = () => {
    setShowScore(false);
    setScore(0);
    setCurrentQuestion(0);
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
    <div className="app">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {selectedRegions.length}
          <button onClick={handleResetButtonClick}>Reset score</button>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Where is {selectedRegions[currentQuestion]}</span>
            </div>
            <div className="question-text">
              {currentQuestion + 1}/ {selectedRegions.length}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
