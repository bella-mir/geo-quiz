import React from "react";
import { useState } from "react";
import { selectedRegions } from "./constants";
import "./Quiz.css"


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
    <div className="quiz">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {selectedRegions.length}
          <button className="quiz__play" onClick={handleResetButtonClick}>Play again</button>
        </div>
      ) : (
        <>
          <div className="question-section">
              <span>{selectedRegions[currentQuestion]} ({currentQuestion + 1}/{selectedRegions.length})</span>
            </div>
        </>
      )}
    </div>
  );
}
