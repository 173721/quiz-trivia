import React, { useEffect, useState } from "react";
import DefaultProfilePic from "../Assets/person.svg";
import "../Profile.css";
import LogoutModal from "./LogoutModal";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(DefaultProfilePic); // State to store profile picture
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const navigate = useNavigate();
  // const fileInputRef = useRef(null);

  useEffect(() => {
    // Fetch the profile picture from localStorage or database
    const storedProfilePic = localStorage.getItem("profilePic");
    if (storedProfilePic) {
      setProfilePic(storedProfilePic); // Set the stored profile pic
    }
  }, []);

  const handleLogout = () => {
    setIsModalOpen(false);
    console.log("User logged out");
    localStorage.removeItem("userName");
    localStorage.removeItem("profilePic"); // Clear profile picture
    navigate("/");
  };

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setProfilePic(result); // Set the uploaded profile picture in state
        localStorage.setItem("profilePic", result); // Save the picture in localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  // // Trigger the file input when profile picture is clicked
  // const triggerFileInput = () => {
  //   fileInputRef.current.click(); // Simulate file input click
  // };

  return (
    <div>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 profile-menu">
        <li className="nav-item dropdown">
          <button
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <div
              className="profile-pic"
              // onClick={triggerFileInput}
              style={{ cursor: "pointer" }}
            >
              <img
                src={profilePic}
                alt="Profile"
                className="img-fluid rounded-circle"
              />{" "}
              &nbsp;
            </div>
          </button>
          {/* <span style={{ fontSize: "20px" }}>
            {localStorage.getItem("userName")}
          </span> */}
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <a className="dropdown-item" href="/accounts">
                <i className="fas fa-sliders-h fa-fw"></i> Account
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/settings">
                <i className="fas fa-cog fa-fw"></i> Settings
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => setIsModalOpen(true)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }} // Styles to make it look like a link
              >
                <i className="fas fa-sign-out-alt fa-fw"></i> Log Out
              </button>
            </li>
          </ul>
        </li>
      </ul>

      {/* Hidden File Input */}
      <input
        // ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleProfilePicUpload}
        style={{ display: "none" }} // Hidden input
      />

      <LogoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Profile;
