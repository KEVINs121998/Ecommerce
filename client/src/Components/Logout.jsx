// Logout.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to login page
  }, [navigate]);

  return null; // No need to render anything, just redirect
};

export default Logout;
