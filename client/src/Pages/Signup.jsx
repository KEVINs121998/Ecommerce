import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";


const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful! Redirecting to login...");
        navigate("/login");
      } else {
        setErrors({ general: data.message });
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({ general: "Something went wrong. Please try again later." });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
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
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <i
              className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"} absolute right-3 top-9 cursor-pointer text-gray-500`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <i
              className={`fas ${
                showConfirmPassword ? "fa-eye" : "fa-eye-slash"
              } absolute right-3 top-9 cursor-pointer text-gray-500`}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            ></i>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
            )}
          </div>
          {errors.general && <p className="text-red-500 text-xs">{errors.general}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
