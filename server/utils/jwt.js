const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Token missing" });
  }
  console.log("Token:", token); // Log token to verify it's coming
  // Add token verification logic here (e.g., jwt.verify())
  next();
};


module.exports = { generateToken, verifyToken };
