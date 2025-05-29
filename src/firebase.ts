import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBntyl_FtR7RLUkYEGroK3a3mxIqqZ7TFg',
  authDomain: 'stable-stakes-e0511.firebaseapp.com',
  projectId: 'stable-stakes-e0511',
  storageBucket: 'stable-stakes-e0511.appspot.com',
  messagingSenderId: '371122162126',
  appId: '1:371122162126:web:7229885e45748f5824039f',
  measurementId: 'G-2Z4SYKC900',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 