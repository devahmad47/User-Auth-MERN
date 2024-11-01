const express = require('express');
const router = express.Router();
const {
  registerUser,
  verifyOTP,
  loginUser,
  getUsers,
} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/register', registerUser);
router.post('/verify-otp', verifyOTP);
router.post('/login', loginUser);
router.get('/users', getUsers);
module.exports = router;
