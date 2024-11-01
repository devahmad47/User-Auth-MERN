import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../../config';
import { toast } from 'react-toastify';
const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${serverUrl}/api/auth/verify-otp`, { email, otp });
      toast.success(response.data.message)
      navigate('/login');
    } catch (error) {
      alert(error.response.data.message || 'OTP verification failed');
    }
  };

  return (
    <div className="flex items-center  justify-center h-screen bg-purple-300">
      <form className="p-6 bg-white  rounded shadow-md" onSubmit={handleVerify}>
        <h2 className="mb-12 text-xl font-semibold text-center">Verify OTP</h2>
        <input type="text" placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} className="w-full p-2 mb-3 border rounded" required />
        <button type="submit" className="w-full p-2 text-white bg-purple-500 rounded hover:bg-purple-600">Verify OTP</button>
      </form>
    </div>
  );
};

export default VerifyOTP;
