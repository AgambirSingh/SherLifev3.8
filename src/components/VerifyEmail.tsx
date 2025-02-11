import React, { useEffect } from 'react';
import { auth } from '../config/firebase';
import { sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      await auth.currentUser?.reload();
      if (auth.currentUser?.emailVerified) {
        clearInterval(interval);
        navigate('/login');
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleResend = async () => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      try {
        await sendEmailVerification(auth.currentUser);
        alert('Verification email resent! Please check your inbox.');
      } catch (err) {
        console.error('Error resending verification email:', err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Verify Your Email</h2>
        <p className="mt-2 text-sm text-gray-600">
          A verification link has been sent to your email. Please verify your email to continue.
        </p>
        <button
          onClick={handleResend}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none 
                    focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Resend Verification Email
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
