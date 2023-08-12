const jwt = require("jsonwebtoken");
require('dotenv').config();


// Middleware function for token verification
const protect = (req, res, next) => {
  const tokenHeader = req.header("Authorization");
  const token = tokenHeader ? tokenHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token,  process.env.JWT_SECRET_KEY); // Replace with your secret key
    req.user = decoded; // Attach the decoded payload to the request object
    next(); // Move to the next middleware
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = protect;
