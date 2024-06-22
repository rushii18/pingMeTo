import React, { useState } from "react";
import "./profile.css";

const UserProfileForm = () => {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null); // Assuming profile picture is stored as a file/blob

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleProfilePicChange = (e) => {
    // Assuming profile picture is uploaded as a file
    const file = e.target.files[0];
    setProfilePic(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("profilePic", profilePic);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="text">
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label className="item">
        Profile Picture:
        <input type="file" accept="image/*" onChange={handleProfilePicChange} />
      </label>
      <br />
      <button type="submit">Save</button>
    </form>
  );
};

export default UserProfileForm;
