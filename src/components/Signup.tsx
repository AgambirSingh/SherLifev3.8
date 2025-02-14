import React, { useState } from 'react';
import { auth, db } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validateUsername = (username: string) => {
    const regex = /^[a-zA-Z0-9_]{3,20}$/;
    return regex.test(username);
  };

  const validateEmail = (email: string) => {
    return email.endsWith('@sheridancollege.ca');
  };

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
    return strength;
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
      case 3:
        return 'bg-yellow-500';
      case 4:
      case 5:
        return 'bg-green-500';
      default:
        return 'bg-gray-200';
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage('');
    setIsLoading(true);

    if (!validateUsername(username)) {
      setError('Username must be 3-20 characters long and can only contain letters, numbers, and underscores');
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Only @sheridancollege.ca email addresses are allowed');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    if (checkPasswordStrength(password) < 3) {
      setError('Password is too weak. Please include uppercase, lowercase, numbers, and special characters');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!acceptTerms) {
      setError('Please accept the terms and conditions');
      setIsLoading(false);
      return;
    }

    try {
      const usernameRef = doc(db, "usernames", username);
      const usernameSnap = await getDoc(usernameRef);
      
      if (usernameSnap.exists()) {
        setError("Username already taken. Please choose another.");
        setIsLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await updateProfile(user, { displayName: username });
        await setDoc(doc(db, "usernames", username), {
          uid: user.uid
        });
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          emailVerified: false,
          uid: user.uid,
          username: username,
          createdAt: new Date().toISOString()
        });
        await sendEmailVerification(user);
        setMessage('Signup successful! A verification link has been sent to your email.');
        navigate('/verify-email');
      }
    } catch (err: any) {
      setError(err.message);
      if (auth.currentUser) {
        try {
          await auth.currentUser.delete();
        } catch (deleteErr) {
          console.error("Error cleaning up auth user:", deleteErr);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Welcome to SherLife</h2>
          <p className="mt-3 text-lg font-medium text-gray-600">Create your account</p>
        </div>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm font-medium">{error}</div>}
        {message && <div className="bg-green-50 text-green-500 p-3 rounded-md text-sm font-medium">{message}</div>}

        <form onSubmit={handleSignup} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Choose a username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 appearance-none rounded-lg block w-full px-3 py-2 border
                border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none
                focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                3-20 characters, letters, numbers, and underscores only
              </p>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Sheridan Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="yourname@sheridancollege.ca"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none rounded-lg block w-full px-3 py-2 border
                border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none
                focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Create a strong password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  checkPasswordStrength(e.target.value);
                }}
                className="mt-1 appearance-none rounded-lg block w-full px-3 py-2 border
                border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none
                focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div className="mt-2">
                <div className="h-2 rounded-full bg-gray-200">
                  <div
                    className={`h-full rounded-full transition-all ${getPasswordStrengthColor()}`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 appearance-none rounded-lg block w-full px-3 py-2 border
                border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none
                focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I accept the{' '}
              <a href="/privacy-policy" className="text-indigo-600 hover:text-indigo-500">
                terms and conditions
              </a>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent
              text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;