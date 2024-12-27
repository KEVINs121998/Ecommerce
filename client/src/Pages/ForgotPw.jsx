import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      // Here you should send the email to your backend API for password reset
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccessMessage("Password reset link sent to your email.");
      } else {
        setError("An error occurred, please try again.");
      }
    } catch (err) {
      setError("Failed to send password reset email.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-xs">{successMessage}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
