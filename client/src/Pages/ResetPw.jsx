import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { token } = useParams(); // Assuming the token is in the URL

  const navigate = useNavigate();

  useEffect(() => {
    // You would verify the token here to make sure it's valid.
    // Call your backend API to check if the token is valid and not expired.
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!password || !confirmPassword) {
      setError("Both password fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Send the new password to the backend to update the password for the user
      const response = await fetch(`/api/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setSuccessMessage("Password has been reset successfully.");
        setTimeout(() => navigate("/login"), 3000); // Redirect to login after success
      } else {
        setError("Failed to reset password, please try again.");
      }
    } catch (err) {
      setError("Error resetting password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              New Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          {successMessage && <p className="text-green-500 text-xs">{successMessage}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
