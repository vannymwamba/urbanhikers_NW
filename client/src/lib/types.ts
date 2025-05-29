import { Timestamp } from 'firebase/firestore';

export interface User {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Route {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  distance: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  price: string;
  imageUrl?: string;
  rating: number;
  isPublic: boolean;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Booking {
  id: string;
  routeId: string;
  userId: string;
  bookingDate: Timestamp;
  participants: number;
  totalPrice: string;
  status: string;
  createdAt: Timestamp;
}

export interface Review {
  id: string;
  routeId: string;
  userId: string;
  rating: number;
  comment?: string;
  createdAt: Timestamp;
}

// Form types
export interface CreateRouteData {
  title: string;
  description: string;
  category: string;
  duration: string;
  distance: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  price: string;
  imageUrl?: string;
  isPublic: boolean;
}

export interface CreateBookingData {
  routeId: string;
  bookingDate: string;
  participants: number;
  totalPrice: string;
  status: string;
}

export interface CreateReviewData {
  routeId: string;
  rating: number;
  comment?: string;
}