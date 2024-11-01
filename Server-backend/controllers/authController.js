const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendOTP = require('../utils/emailService');
const crypto = require('crypto');

// Temporary storage for user registration data
let tempUserStore = {};

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("signup req", req.body);
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = crypto.randomInt(100000, 999999).toString();
    console.log("otp", otp);
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
    // Store user data temporarily
    tempUserStore[email] = { name, email, password: hashedPassword, otp, otpExpires }
    await sendOTP(email, otp);
    res.status(201).json({ message: 'User registered. OTP sent to email' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const userData = tempUserStore[email];
    
    if (!userData) return res.status(400).json({ message: 'User not found' });
    if (userData.otp === otp && userData.otpExpires > Date.now()) {
      const user = new User({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        isVerified: true,
      });
      await user.save();
      // Clear the temporary data once saved
      delete tempUserStore[email];
      return res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
  } catch (error) {
    res.status(500).json({ message: 'OTP verification failed', error });
  }
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("sdsdsdsd",req.body)
  try {
    const user = await User.findOne({ email });
    if (!user || !user.isVerified) {
      return res.status(400).json({ message: 'Invalid email or account not verified' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.jwtadmintoken=token;
    console.log("token",token)
    user.sessionExpiration = new Date().getTime() + 12 * 60 * 60 * 1000;
    res.status(200).json({ user, token});
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password -otp -otpExpires');
    res.status(200).json({users:users});
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
};
