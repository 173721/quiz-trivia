import React, { useState, useEffect } from "react";
import axios from "axios";
import CommonComponent2 from "../CommonComponent2";
import "../App.css"; // Include your custom CSS here

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [quitz, setQuitz] = useState({ category: "", level: "", language: "" });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => {
        setCategories(res?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  // Handle selection changes for category, level, and language
  const selectCategory = (categoryId) => {
    setQuitz({ ...quitz, category: categoryId });
  };

  const selectLevel = (level) => {
    setQuitz({ ...quitz, level });
  };

  const selectLanguage = (language) => {
    setQuitz({ ...quitz, language });
  };

  // Submit selected category, level, and language to fetch questions
  const submit = () => {
    if (quitz.category && quitz.level !== "" && quitz.language !== "") {
      setLoading(true);

      let apiUrl = "";
      switch (quitz.language) {
        case "telugu":
          apiUrl = `http://localhost:5000/api/telugu-questions?level=${quitz.level}&category=${quitz.category}`;
          break;
        case "hindi":
          apiUrl = `http://localhost:5000/api/hindi-questions?level=${quitz.level}&category=${quitz.category}`;
          break;
        case "english":
          apiUrl = `http://localhost:5000/api/questions?level=${quitz.level}&category=${quitz.category}`;
          break;
        default:
          alert("Invalid language selected.");
          setLoading(false);
          return;
      }

      axios
        .get(apiUrl)
        .then((res) => {
          setResults(res?.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
          setLoading(false);
        });
    } else {
      alert("Please select a category, level, and language.");
    }
  };

  // Find the selected category name
  const selectedCategory =
    categories.find((cat) => cat.id === quitz.category)?.name || "Unknown";

  return (
    <>
      {loading ? (
        <div className="loading-spinner">
          <p>Loading...</p>
        </div>
      ) : results.length === 0 ? (
        <div className="home-content">
          <br />
          <h1 className="title">Welcome to Genius</h1>

          <div className="form-container">
            {/* Category Selection */}
            <div className="form-group">
              <h3 className="form-header">Select Category:</h3>
              <div className="tab-options">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => selectCategory(category.id)}
                    className={`tab-button ${
                      quitz.category === category.id ? "selected" : ""
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Level Selection */}
            <div className="form-group">
              <h3 className="form-header">Select Difficulty:</h3>
              <div className="tab-options">
                {["easy", "medium", "hard"].map((level) => (
                  <button
                    key={level}
                    onClick={() => selectLevel(level)}
                    className={`tab-button ${
                      quitz.level === level ? "selected" : ""
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Language Selection */}
          <div className="form-group text-center">
  <h3 className="form-header mb-4">Select Language:</h3>
  
  <div className="tab-options">
    <select
      value={quitz.language}
      onChange={(e) => selectLanguage(e.target.value)}
      className="language-dropdown mx-auto block w-60 text-center border border-gray-300 rounded-lg shadow-sm"
    >
      <option value="" disabled>
        Select a language
      </option>
      <option value="english">English</option>
      <option value="telugu">Telugu</option>
      <option value="hindi">Hindi</option>
      
    </select>
  </div>
</div>

          {/* Submit Button */}
          <div className="submit-container">
            <button
              className="submit-button"
              onClick={submit}
              disabled={!quitz.category || !quitz.level || !quitz.language}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <CommonComponent2
          questions={results}
          title={selectedCategory}
          back={() => setResults([])}
        />
      )}
    </>
  );
};

export default Home;

