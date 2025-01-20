const userService = require('../services/userService');

// Helper function to handle error responses
const sendErrorResponse = (res, statusCode, message, error = null) => {
  res.status(statusCode).json({ message, ...(error && { error }) });
};

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const response = await userService.registerUser(req.body);
    res.status(201).json(response);
  } catch (error) {
    sendErrorResponse(res, 400, error.message);
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const response = await userService.loginUser(req.body);
    res.status(200).json(response);
  } catch (error) {
    sendErrorResponse(res, 401, error.message);
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    // Log req.user for debugging
    console.log('Authenticated user:', req.user);

    const response = await userService.getUserProfile(req.user.id);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    res.status(404).json({ message: error.message });
  }
};

