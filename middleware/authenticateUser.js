const jwt = require('jsonwebtoken');

// Middleware to authenticate the user via JWT token
const authenticateUser = (req, res, next) => {
  // Get the token from Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the secret key stored in .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user id to the request object
    req.user = { id: decoded.id };  // Attach the decoded user ID

    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticateUser;
