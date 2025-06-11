import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration for urbunhikers project
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "PLACEHOLDER_REPLACE_WITH_ACTUAL_KEY",
  authDomain: "urbunhikers.firebaseapp.com",
  projectId: "urbunhikers",
  storageBucket: "urbunhikers.firebasestorage.app",
  messagingSenderId: "293208679604",
  appId: "1:293208679604:web:ac2733e3af61aac4b263e1",
  measurementId: "G-ZZKYGR142X"
};

// Initialize Firebase
let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization failed:", error);
  console.log("Please provide a valid FIREBASE_API_KEY to enable authentication");
}

export { auth, db, storage };
export default app;