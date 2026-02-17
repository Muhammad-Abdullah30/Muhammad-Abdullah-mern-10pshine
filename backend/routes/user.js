const express = require('express');
const { getUserProfile, changePassword } = require('../controller/user');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Get user profile with statistics
router.get('/profile', authenticateToken, getUserProfile);

// Change password
router.put('/change-password', authenticateToken, changePassword);

module.exports = router;
