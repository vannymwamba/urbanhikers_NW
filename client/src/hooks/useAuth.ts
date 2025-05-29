import { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export function useAuth() {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If Firebase auth is not initialized, return mock state for preview
    if (!auth) {
      setIsLoading(false);
      return;
    }

    // TODO: Implement Firebase auth state listener when credentials are configured
    setIsLoading(false);
  }, []);

  return {
    user: null, // Will be populated when Firebase is configured
    firebaseUser,
    isLoading,
    isAuthenticated: false, // Will work when Firebase is configured
  };
}
