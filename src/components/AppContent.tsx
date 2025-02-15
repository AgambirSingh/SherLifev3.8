import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import LoadingSpinner from './LoadingSpinner';
import Login from './Login';
import Signup from './Signup';
import VerifyEmail from './VerifyEmail';
import ResetPassword from './ResetPassword';
import Layout from './Layout';
import Marketplace from './Marketplace';
import Confessions from './Confessions';
import Events from './Events';
import Landing from './Landing';
import Resources from './Resources';
import Profile from './Profile';
import { AuthProvider } from '../contexts/AuthContext';
import PrivacyPolicy from './PrivacyPolicy';

// Check if user is a first-time visitor
const useFirstTimeVisitor = () => {
  const hasVisited = localStorage.getItem("visited");
  return !hasVisited;
};

const ProtectedRoute: React.FC = () => {
  const { user, loading } = useUser();
  
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" replace />;
  if (!user.emailVerified) return <Navigate to="/verify-email" replace />;  
  
  return <Outlet />; 
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useUser();
  const isFirstTimeVisitor = useFirstTimeVisitor();
  
  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to="/resources" replace />;
  // Redirect returning visitors directly to login
  if (!isFirstTimeVisitor && window.location.pathname === '/') {
    return <Navigate to="/login" replace />;
  }
  // Show landing page to first-time visitors
  if (isFirstTimeVisitor && window.location.pathname === '/') {
    return <Navigate to="/landing" replace />;
  }
  
  return <>{children}</>;
};

const LandingWrapper: React.FC = () => {
  const isFirstTimeVisitor = useFirstTimeVisitor();
  
  if (!isFirstTimeVisitor) {
    return <Navigate to="/login" replace />;
  }
  
  return <Landing />;
};

function AppContent() {
  const { loading } = useUser();

  if (loading) return <LoadingSpinner />;

  return (
    <AuthProvider>
    <Routes>
      {/* Public routes */}
      <Route path="/landing" element={<LandingWrapper />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />
     

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/confessions" element={<Confessions />} />
          <Route path="/events" element={<Events />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/profile" element={<Profile />} />
          
        </Route>
      </Route>

      {/* Root route */}
      <Route 
        path="/" 
        element={
          <PublicRoute>
            <Navigate to="/landing" replace />
          </PublicRoute>
        } 
      />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </AuthProvider>
  );
}

export default AppContent;