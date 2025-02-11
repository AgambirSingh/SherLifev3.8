import React, { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState(''); // Expected to be an email.
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, identifier, password);
      if (userCredential.user.emailVerified) {
        navigate('/');
      } else {
        setError('EMAIL_NOT_VERIFIED');
        await auth.signOut();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleResendVerification = async () => {
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
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome to SherLife</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <input
              type="text"
              placeholder="Email (or Username)"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border 
              border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none
               focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300
               placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md
               text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? <LoadingSpinner /> : 'Sign In'}
            </button>
          </div>
        </form>
        {error === 'EMAIL_NOT_VERIFIED' && (
          <div className="mt-4 text-center">
            <button
              onClick={handleResendVerification}
              className="text-blue-600 hover:underline"
            >
              Resend Verification Email
            </button>
          </div>
        )}
        <div className="text-center mt-2">
          <Link to="/reset-password" className="text-sm text-indigo-600 hover:text-indigo-500">
            Forgot your password? Reset Password
          </Link>
        </div>
        <div className="text-center mt-2">
          <Link to="/signup" className="text-sm text-indigo-600 hover:text-indigo-500">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
