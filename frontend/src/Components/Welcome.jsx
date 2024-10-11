import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Components/styles.css";
import useSound from "use-sound";
import welcomeStart from "../sounds/welcome-start.mp3";
import Profile from "./Profile";

const Welcome = () => {
  const navigate = useNavigate();

  // State to store the user's name
   let userName = localStorage.getItem("userName") || ""

  const [playstart] = useSound(welcomeStart);

  useEffect(() => {
    if (localStorage.getItem("userName") == null) {
      navigate("/");
    }

    const timer = setTimeout(() => {
    }, 1000);

    // Clean up the timeout when the component is unmounted
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleStartClick = () => {
    playstart();
    setTimeout(() => {
      navigate("/home");
    }, 1700);
  };
  return (
    <>
      <div className="welcome-container">
        <div class="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="userProfile">
          <Profile />
        </div>
        <h2 className="heading">Welcome {userName}</h2>
        <div>
          <button
            type="button"
            onClick={() => handleStartClick()}
            className="button-container"
          >
            Start
          </button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
