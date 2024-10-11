import React, { useEffect, useState } from "react";
import "../Components/SettingsPage.css";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profilePic") || ""
  );
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [soundEnabled, setSoundEnabled] = useState(
    localStorage.getItem("soundEnabled") === "true"
  );

  // Save the settings in localStorage whenever they are updated
  useEffect(() => {
    localStorage.setItem("userName", userName);
    localStorage.setItem("profilePic", profilePic);
    localStorage.setItem("darkMode", darkMode);
    localStorage.setItem("soundEnabled", soundEnabled);
  }, [
    userName,
    profilePic,
    darkMode,
    soundEnabled,
  ]);

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setProfilePic(result); // Set and save profile picture
        localStorage.setItem("profilePic", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleSaveSettings = () => {
    // Alert the user and navigate to the welcome page
    alert("Settings saved successfully!");
    navigate("/welcome"); // Change this path to your actual welcome page route
  };

  return (
    <div className={`settings-page ${darkMode ? "dark-mode" : "light-mode"}`}>
      <h1>Settings</h1>

      {/* Profile Management */}
      <div className="settings-section">
        <h2>Profile</h2>
        <label>
          Username:
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          Profile Picture:
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicUpload}
          />
        </label>
        {profilePic && (
          <div className="profile-preview">
            <img
              src={profilePic}
              alt="Profile"
              className="profile-pic-preview"
            />
          </div>
        )}
      </div>

      {/* Sound Settings */}
      <div className="settings-section">
        <h2>Sound Preferences</h2>
        <label>
          Enable Sound Effects:
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={(e) => setSoundEnabled(e.target.checked)}
          />
        </label>
      </div>

      {/* Dark Mode Toggle */}
      <div className="settings-section">
        <h2>Display Preferences</h2>
        <label>
          Dark Mode:
          <input
            type="checkbox"
            checked={darkMode}
            onChange={handleDarkModeToggle}
          />
        </label>
      </div>

      {/* Save Button */}
      <div className="settings-section">
        <button
          onClick={handleSaveSettings}
          className="save-button"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
