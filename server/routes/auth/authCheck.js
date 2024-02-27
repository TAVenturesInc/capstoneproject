const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authCheck = (req, res, next) => {
  // Get the token from the request headers
  const token = req.header("Authorization");

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object for later use
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authCheck;
