import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration for urbunhikers project
const firebaseConfig = {
  apiKey: "AIzaSyAo4M__4u9aFCGN5ZH45ZahB5aU6YrCeCE",
  authDomain: "urbunhikers.firebaseapp.com",
  projectId: "urbunhikers",
  storageBucket: "urbunhikers.firebasestorage.app",
  messagingSenderId: "293208679604",
  appId: "1:293208679604:web:ac2733e3af61aac4b263e1",
  measurementId: "G-ZZKYGR142X"
};

// Initialize Firebase (avoid duplicate app initialization)
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

console.log("Firebase initialized successfully");
console.log("Project ID:", firebaseConfig.projectId);

export { auth, db, storage };
export default app;