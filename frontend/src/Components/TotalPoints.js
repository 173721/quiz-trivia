import React, { useEffect, useState } from "react";
import "./TotalPoints.css"; // Create this CSS file for styling
import { useNavigate } from "react-router-dom";

const TotalPoints = ({ totalPoints, onClose }) => {
  const [animationClass, setAnimationClass] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Add entrance animation class
    setAnimationClass("popup-fade-in");
  }, []);

  // Determine whether to congratulate or encourage the user to try again
  const isSuccess = totalPoints >= 50;
  const titleMessage = isSuccess ? "Congratulations!" : "You Lost the game!";
  const buttonMessage = isSuccess ? "🎉🎉 Ok 🎉🎉" : "🔄 Retry 🔄";

  const handleClick = () => {
    if (isSuccess) {
      onClose();
    } else {
      navigate("/welcome"); // Navigate to home page
    }
  };

  return (
    <div className={`total-points-overlay ${animationClass}`}>
      <div className="total-points-content">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <h2 className="total-title">{titleMessage}</h2>
        <div id="gifContainer">
          {isSuccess ?<>
            <img
            id="responseGif"
            src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGRlNDk4cHhmNTRjNnhtcWVldWFoY3FvcjU0eWticDZueHU1YmN5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/X9izlczKyCpmCSZu0l/giphy.gif"
            alt="Feedback GIF"
            width='150'
            height='150'
          />
          </>:<img
            id="responseGif"
            src="https://media.tenor.com/RDkJjx1qvvsAAAAi/oops-ops.gif"
            alt="Feedback GIF"
            width='150'
            height='150'
          />
}
        </div>
        <div
          className={`points-display ${
            isSuccess ? "high-points" : "low-points"
          }`}
        >
          <span>{totalPoints}</span>
        </div>
        <button className="btnConfirm" onClick={handleClick}>
          {buttonMessage}
        </button>
      </div>
    </div>
  );
};

export default TotalPoints;
