// ChangePassword.jsx
import { useState } from "react";
import axios from "axios";

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    try {
      const res = await axios.post("http://localhost:5000/api/user/change-password", {
        userId,
        newPassword,
      });
      alert(res.data.message);
      window.location.href = "/Editprofile";
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className="page-wrapper">
      <h2>Change Your Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
