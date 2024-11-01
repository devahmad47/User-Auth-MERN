import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import CryptoJS from 'crypto-js';
import { addAdmin } from '../../StoreRedux/adminSlice'; // Changed to general user slice
import { secretEnKey } from '../../config';
export const PrivateRouteUser = ({ element }) => {
  const [session, setSession] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const decryptUserData = (data) => {
    const decryptedBytes = CryptoJS.AES.decrypt(data, secretEnKey);
    const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  };
  useEffect(() => {
    async function checkUser() {
      try {
        const storedData = localStorage.getItem('ARABIC_ADMIN_KEY_STRING'); // Generalized key name
        if (storedData) {
          const { admin, expiration } = JSON.parse(storedData);
          // Check if the session has expired
          if (expiration && expiration > Date.now()) {
            const userData = decryptUserData(admin); // Generalized function for decryption
            // Dispatch user data to Redux store
            dispatch(addAdmin(userData));
            // Update session state
            setSession(true);
          } else {
            // Remove expired session data
            localStorage.removeItem('ARABIC_ADMIN_KEY_STRING');
            setSession(false);
            dispatch(addAdmin(null)); // Clear admin data from state
            localStorage.removeItem('authToken');
            // Notify user and redirect to login
            toast.error("Session expired. Please log in again.");
            navigate('/login');
          }
        } else {
          // No session found, set session to false and redirect
          setSession(false);
          navigate('/login');
        }
      } catch (error) {
        // Handle parsing errors or other unexpected errors
        toast.error('Unable to load user data. Please try again later.');
        setSession(false);
        navigate('/login');
      }
    }
  
    checkUser();
  }, [dispatch, navigate]);
  

  return session ? element : null;
};
