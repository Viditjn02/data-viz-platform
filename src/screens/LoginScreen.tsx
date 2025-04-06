import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

/**
 * LoginScreen - Component for user authentication
 */
const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const { login, loginWithGoogle, register, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to dashboard if user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("User is authenticated, redirecting to dashboard");
      navigate('/dashboard');
    }
  }, [isAuthenticated, user, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setErrorMessage(null);
      
      if (isRegistering) {
        await register(email, password);
      } else {
        await login(email, password);
      }
      // Successful login is handled by the auth provider and the useEffect above
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      await loginWithGoogle();
      // Successful login handled by the auth provider and the useEffect above
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Google sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-[#0E0D0D]">
      <div className="bg-[#121212] p-8 rounded-lg shadow-lg w-full max-w-md border border-[#242424] flex flex-col">
        <div className="text-center mb-8">
          <svg 
            className="h-12 w-12 mx-auto mb-4" 
            viewBox="0 0 30 30" 
            fill="none"
          >
            <path
              d="M13.75 18.75H7.5L16.25 1.25V11.25H22.5L13.75 28.75V18.75Z"
              fill="#C8E972"
            />
          </svg>
          <h1 className="text-3xl font-bold text-white">Charging Station</h1>
          <p className="text-[#858882] mt-2">Data Visualization Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMessage && (
            <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#858882] mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#242424] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[#C8E972]"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#858882] mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#242424] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[#C8E972]"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#C8E972] hover:bg-[#DCFF7F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C8E972] transition-colors ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Processing...' : isRegistering ? 'Sign up' : 'Sign in'}
            </button>
          </div>
          
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-[#242424]"></div>
            <span className="mx-4 text-sm text-[#858882]">or</span>
            <div className="flex-grow border-t border-[#242424]"></div>
          </div>
          
          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex justify-center items-center py-2 px-4 border border-[#242424] rounded-md shadow-sm text-sm font-medium text-white bg-[#1A1A1A] hover:bg-[#242424] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C8E972] transition-colors"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107" />
                <path d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z" fill="#FF3D00" />
                <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3038 18.001 12 18C9.39903 18 7.19053 16.3415 6.35853 14.027L3.09753 16.5395C4.75253 19.778 8.11353 22 12 22Z" fill="#4CAF50" />
                <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2" />
              </svg>
              Sign in with Google
            </button>
          </div>
          
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-xs text-[#858882] hover:text-white"
            >
              {isRegistering ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen; 