import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useRegistrationStore } from '../state/useRegistrationStore';
import { USERS } from '../constants/firestore';

interface RegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: Date;
  chdId: string;
  clubId: string;
}

export const isChdIdAvailable = async (chdId: string): Promise<boolean> => {
  try {
    const usersRef = collection(db, USERS);
    const q = query(usersRef, where('chdId', '==', chdId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  } catch (error) {
    console.error('Error checking CHD ID availability:', error);
    throw error;
  }
};

export const completeRegistration = async (): Promise<void> => {
  const store = useRegistrationStore.getState();
  
  if (!store.dob) {
    throw new Error('Date of birth is required');
  }

  // Check if CHD ID is available
  const isAvailable = await isChdIdAvailable(store.chdId);
  if (!isAvailable) {
    throw new Error('This CHD ID is already registered');
  }

  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      store.email,
      store.password
    );

    // Set user document in Firestore
    await setDoc(doc(db, USERS, userCredential.user.uid), {
      email: store.email,
      firstName: store.firstName,
      lastName: store.lastName,
      dob: store.dob,
      chdId: store.chdId,
      clubId: store.clubId,
      createdAt: new Date(),
    });

    // Reset registration store
    store.reset();
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Handle specific Firebase Auth errors
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('This email is already registered');
    } else if (error.code === 'auth/weak-password') {
      throw new Error('Password is too weak');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email address');
    } else {
      throw new Error('Registration failed. Please try again later.');
    }
  }
}; 