import { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChange, getCurrentUserData } from '@/lib/auth';
import type { User } from '@/lib/types';

export function useAuth() {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      setFirebaseUser(user);
      
      if (user) {
        // Get user data from Firestore
        const userDoc = await getCurrentUserData(user);
        setUserData(userDoc);
      } else {
        setUserData(null);
      }
      
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user: userData,
    firebaseUser,
    isLoading,
    isAuthenticated: !!firebaseUser,
  };
}
