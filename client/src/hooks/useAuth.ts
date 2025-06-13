import { useState, useEffect } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export function useAuth() {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setIsLoading(false);
      console.log('Auth state changed:', user ? 'User signed in' : 'User signed out');
    });

    return () => unsubscribe();
  }, []);

  return {
    user: firebaseUser,
    firebaseUser,
    isLoading,
    isAuthenticated: !!firebaseUser,
  };
}
