import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFYeJ-xAKYqxISG0U2Rh3EABc4JSZSN6M", // Fixed API key
  authDomain: "data-viz-platform-19573.firebaseapp.com", 
  projectId: "data-viz-platform-19573",
  storageBucket: "data-viz-platform-19573.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:a1b2c3d4e5f6g7h8i9j0k1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app; 