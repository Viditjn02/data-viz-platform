import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../firebase';

// User interface
interface User {
  id: string;
  email: string | null;
  name: string | null;
  photoURL?: string | null;
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use auth context - changed to named export
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

// Convert Firebase user to our User interface
const formatUser = (firebaseUser: FirebaseUser): User => ({
  id: firebaseUser.uid,
  email: firebaseUser.email,
  name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
  photoURL: firebaseUser.photoURL
});

/**
 * AuthProvider - Provider component for authentication
 * Uses Firebase Auth for email/password and Google authentication
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing auth session on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        console.log("User authenticated:", firebaseUser.email);
        setUser(formatUser(firebaseUser));
      } else {
        console.log("No user authenticated");
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Email/Password login
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please try again.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Google login failed. Please try again.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Email/Password registration
  const register = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Create the auth value object
  const authValue: AuthContextType = {
    user,
    loading,
    error,
    login,
    loginWithGoogle,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Default export for the component
export default AuthProvider; 