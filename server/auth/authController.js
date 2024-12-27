const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// Debug environment variable
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not defined in environment variables.");
  throw new Error("JWT_SECRET is missing. Please define it in your .env file.");
}

const JWT_SECRET = process.env.JWT_SECRET;

// Signup logic
const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({ email, password: hashedPassword });

    // Generate a JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Signup error:", error); 
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Login logic
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch user from the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error); // Debugging
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signup, login };
