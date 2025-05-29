import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import type { User, Route, Booking, Review } from './types';

// Collections
const USERS_COLLECTION = 'users';
const ROUTES_COLLECTION = 'routes';
const BOOKINGS_COLLECTION = 'bookings';
const REVIEWS_COLLECTION = 'reviews';

// User operations
export const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
  const docRef = await addDoc(collection(db, USERS_COLLECTION), {
    ...userData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });
  return docRef.id;
};

export const getUser = async (id: string): Promise<User | null> => {
  const docRef = doc(db, USERS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as User;
  }
  return null;
};

export const updateUser = async (id: string, userData: Partial<User>) => {
  const docRef = doc(db, USERS_COLLECTION, id);
  await updateDoc(docRef, {
    ...userData,
    updatedAt: Timestamp.now()
  });
};

// Route operations
export const createRoute = async (routeData: Omit<Route, 'id' | 'createdAt' | 'updatedAt'>) => {
  const docRef = await addDoc(collection(db, ROUTES_COLLECTION), {
    ...routeData,
    rating: 0,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });
  return docRef.id;
};

export const getRoutes = async (): Promise<Route[]> => {
  const q = query(collection(db, ROUTES_COLLECTION), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Route[];
};

export const getRoute = async (id: string): Promise<Route | null> => {
  const docRef = doc(db, ROUTES_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Route;
  }
  return null;
};

export const getRoutesByUser = async (userId: string): Promise<Route[]> => {
  const q = query(
    collection(db, ROUTES_COLLECTION), 
    where('createdBy', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Route[];
};

export const updateRoute = async (id: string, routeData: Partial<Route>) => {
  const docRef = doc(db, ROUTES_COLLECTION, id);
  await updateDoc(docRef, {
    ...routeData,
    updatedAt: Timestamp.now()
  });
};

export const deleteRoute = async (id: string) => {
  const docRef = doc(db, ROUTES_COLLECTION, id);
  await deleteDoc(docRef);
};

// Booking operations
export const createBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
  const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), {
    ...bookingData,
    createdAt: Timestamp.now()
  });
  return docRef.id;
};

export const getBookings = async (): Promise<Booking[]> => {
  const q = query(collection(db, BOOKINGS_COLLECTION), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Booking[];
};

export const getBookingsByUser = async (userId: string): Promise<Booking[]> => {
  const q = query(
    collection(db, BOOKINGS_COLLECTION), 
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Booking[];
};

export const getBookingsByRoute = async (routeId: string): Promise<Booking[]> => {
  const q = query(
    collection(db, BOOKINGS_COLLECTION), 
    where('routeId', '==', routeId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Booking[];
};

// Review operations
export const createReview = async (reviewData: Omit<Review, 'id' | 'createdAt'>) => {
  const docRef = await addDoc(collection(db, REVIEWS_COLLECTION), {
    ...reviewData,
    createdAt: Timestamp.now()
  });
  return docRef.id;
};

export const getReviews = async (): Promise<Review[]> => {
  const q = query(collection(db, REVIEWS_COLLECTION), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Review[];
};

export const getReviewsByRoute = async (routeId: string): Promise<Review[]> => {
  const q = query(
    collection(db, REVIEWS_COLLECTION), 
    where('routeId', '==', routeId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Review[];
};

export const getReviewsByUser = async (userId: string): Promise<Review[]> => {
  const q = query(
    collection(db, REVIEWS_COLLECTION), 
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Review[];
};