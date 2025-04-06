import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setUser } from './store/slices/authSlice';
import AuthProvider, { useAuth } from './auth/AuthProvider';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { removeNotification } from './store/slices/uiSlice';

// Protected route component that redirects to login if not authenticated
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Show loading spinner while checking authentication status
    return <LoadingSpinner fullscreen text="Loading authentication..." />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// App component with routing
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  
  // Initialize Redux store with Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Format Firebase user to our User interface
        const user = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          photoURL: firebaseUser.photoURL
        };
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginScreen />
        } 
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        }
      />
      {/* Catch all route - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Notifications container component
const NotificationsContainer = () => {
  const notifications = useAppSelector(state => state.ui.notifications);
  const dispatch = useAppDispatch();
  
  const handleCloseNotification = (id: string) => {
    dispatch(removeNotification(id));
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
      {notifications.map(notification => (
        <ErrorMessage 
          key={notification.id}
          message={notification.message}
          severity={notification.severity}
          duration={notification.duration}
          onClose={() => handleCloseNotification(notification.id)}
        />
      ))}
    </div>
  );
};

// App-wide loading indicator for global loading states
const GlobalLoadingIndicator = () => {
  const loadingStates = useAppSelector(state => state.ui.loadingStates);
  const isLoading = Object.values(loadingStates).some(state => state === true);
  
  if (!isLoading) return null;
  
  return <LoadingSpinner fullscreen />;
};

// Main App component wrapped with providers
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router className="w-full h-full">
          <div className="w-full h-full">
            <AppRoutes />
            <NotificationsContainer />
            <GlobalLoadingIndicator />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
