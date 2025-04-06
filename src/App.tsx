import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider, { useAuth } from './auth/AuthProvider';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

// Protected route component that redirects to login if not authenticated
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Show loading spinner while checking authentication status
    return (
      <div className="flex h-screen items-center justify-center bg-[#0E0D0D]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C8E972]"></div>
      </div>
    );
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

// Main App component wrapped with providers
function App() {
  return (
    <AuthProvider>
      <Router className="w-full h-full">
        <div className="w-full h-full">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
