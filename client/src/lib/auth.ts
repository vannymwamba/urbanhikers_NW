import { 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from './firebase';
import { createUser, getUser, updateUser } from './firestore';
import type { User } from './types';

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user exists in Firestore, if not create them
    const existingUser = await getUser(user.uid);
    if (!existingUser) {
      await createUser({
        email: user.email || '',
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
        profileImageUrl: user.photoURL || ''
      });
    }
    
    return user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Error signing in with email:', error);
    throw error;
  }
};

// Create account with email and password
export const createAccount = async (email: string, password: string, firstName: string, lastName: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    
    // Create user document in Firestore
    await createUser({
      email: user.email || '',
      firstName,
      lastName,
      profileImageUrl: ''
    });
    
    return user;
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Get current user data from Firestore
export const getCurrentUserData = async (firebaseUser: FirebaseUser): Promise<User | null> => {
  try {
    return await getUser(firebaseUser.uid);
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// Auth state observer
export const onAuthStateChange = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};