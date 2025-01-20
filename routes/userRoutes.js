const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateMiddleware = require('../middleware/validationMiddleware');
const { authenticate } = require('../middleware/authMiddleware');

// Register user
router.post('/register', validateMiddleware.validateRegister, userController.registerUser);

// Login user
router.post('/login', validateMiddleware.validateLogin, userController.loginUser);

// Get user profile
router.get('/profile',authenticate, userController.getUserProfile);

module.exports = router;
