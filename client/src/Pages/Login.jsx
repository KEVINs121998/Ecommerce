import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUserAction } from "../actions/authActions";
import { useSelector } from "react-redux"; 
import "@fortawesome/fontawesome-free/css/all.min.css";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const dispatch = useDispatch(); // Redux dispatch function
  const navigate = useNavigate();

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const token = useSelector((state) => state.auth.token); // Replace with your actual auth state


  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form validation logic
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
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form before submitting
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        dispatch(loginUserAction(data.token));
        window.history.replaceState(null, "", "/"); // Replaces login in history
        navigate("/", { replace: true });


        if (cartItems.length > 0) {
          await fetch("http://localhost:5000/cart/save-cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.token}`,
            },
            body: JSON.stringify({ items: cartItems }),
          });
        }

        navigate("/", { replace: true });
      } else {
        // If login fails, display an appropriate error message
        setErrors({ general: data.message || "Invalid email or password." });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ general: "Something went wrong. Please try again later." });
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"} 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 bottom-2.5 cursor-pointer text-gray-500"
            >
              {showPassword ? (
                <i className="fas fa-eye-slash"></i> // Eye-slash icon for hiding
              ) : (
                <i className="fas fa-eye"></i> // Eye icon for showing
              )}
            </span>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>
          {errors.general && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {errors.general}
            </p>
          )}
        <div className="mb-4 text-right">
  <button
    type="button" // Prevents form submission
    onClick={() => navigate("/forgot-password")}
    className="text-blue-500 text-sm hover:underline"
  >
    Forgot Password?
  </button>
</div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-500 hover:underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
