const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password.trim(), 10);
  const newUser = new User({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
  });

  await newUser.save();
  return { message: 'User registered successfully' };
};

// Login user
exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email: email.trim().toLowerCase() });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password.trim(), user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    token,
  };
};

// Get user profile
exports.getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};
