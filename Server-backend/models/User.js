const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  otp: { type: String },
  otpExpires: { type: Date },
  isVerified: { type: Boolean, default: false },
  sessionExpiration: {
        type: String,
    },
    jwtadmintoken:{
      type:String
    }
});

module.exports = mongoose.model('User', userSchema);
