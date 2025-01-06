// File: controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Helper function to handle error responses
const sendErrorResponse = (res, statusCode, message, error = null) => {
  res.status(statusCode).json({ message, ...(error && { error }) });
};

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return sendErrorResponse(res, 400, 'All fields are required');
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return sendErrorResponse(res, 400, 'User already exists');
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    sendErrorResponse(res, 500, 'Error registering user', error);
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendErrorResponse(res, 400, 'Email and password are required');
  }

  try {
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return sendErrorResponse(res, 401, 'Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password.trim(), user.password);
    if (!isPasswordValid) {
      return sendErrorResponse(res, 401, 'Invalid email or password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    sendErrorResponse(res, 500, 'Error logging in', error);
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return sendErrorResponse(res, 404, 'User not found');
    }

    res.status(200).json(user);
  } catch (error) {
    sendErrorResponse(res, 500, 'Error fetching user profile', error);
  }
};
