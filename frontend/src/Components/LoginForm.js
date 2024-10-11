import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import Modal from "./Modal"; // Import the Modal component
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import GoogleIcon from "../Assets/google.png";
import noImage from "../Assets/noImage.jpg";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control the modal
  const [loading, setLoading] = useState(false); // Loader state
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userName") !== null) {
      navigate("/welcome");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Username and password are required");
      setShowModal(true);
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users?username=${username}&password=${password}`
      );
      if (response.data.rowid > 0) {
        localStorage.setItem("userName", response.data.username);
        navigate("/welcome");
      } else {
        setError("Invalid username or password");
        setShowModal(true);
      }
    } catch (err) {
      setError("Error logging in");
      setShowModal(true);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  //   const handleLogin = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/api/users?username=${username}&password=${password}`
  //       );
  //       if (response.data.rowid > 0) {
  //         localStorage.setItem("userName", response.data.username);
  //         navigate("/welcome");
  //       } else {
  //         setError("Invalid username or password");
  //         setShowModal(true); // Show the modal on error
  //       }
  //     } catch (err) {
  //       setError("Error logging in");
  //       setShowModal(true); // Show the modal on error
  //     }
  //   };

  // Handle Google login

  const handleGoogleLogin = async () => {
    setError(""); // Clear previous error messages

    setLoading(true); // Start loading
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      localStorage.setItem("userName", user.displayName);
      localStorage.setItem("userEmail", user.email); // Optionally store email
      navigate("/welcome");
    } catch (error) {
      let errorMessage = "";
      switch (error.code) {
        case "auth/popup-closed-by-user":
          errorMessage =
            "Google login was closed before completing. Please try again.";
          break;
        case "auth/cancelled-popup-request":
          errorMessage =
            "Another popup is already open. Please close it and try again.";
          break;
        default:
          errorMessage =
            "Google login failed. Please check your internet connection or try again.";
      }
      setError(errorMessage);
      setShowModal(true);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ display: "contents" }} className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-input"
            disabled={loading} // Disable input when loading
          />
        </div>
        <div style={{ display: "contents" }} className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
            disabled={loading}
          />
        </div>
        <br />
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          className="auth-actions"
        >
          <Link to="/Signup" className="signup-button" disabled={loading}>
            Signup
          </Link>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        {/* Google Login Button */}
        <div className="google-login-container">
          <button
            onClick={handleGoogleLogin}
            className="google-button"
            disabled={loading}
          >
            <img src={GoogleIcon} className="google-logo" alt={noImage} />
            {loading ? "Logging in..." : "Login with Google"}
          </button>
        </div>

        {/* Include the Modal */}
        <Modal show={showModal} onClose={closeModal} message={error} />
      </form>
    </div>
  );
}

export default Login;
