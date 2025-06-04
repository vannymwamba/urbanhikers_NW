import {
  users,
  routes,
  bookings,
  reviews,
  waitingList,
  type User,
  type UpsertUser,
  type Route,
  type InsertRoute,
  type Booking,
  type InsertBooking,
  type Review,
  type InsertReview,
  type WaitingListEntry,
  type InsertWaitingListEntry,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Route operations
  getRoutes(): Promise<Route[]>;
  getRoute(id: number): Promise<Route | undefined>;
  createRoute(route: InsertRoute): Promise<Route>;
  updateRoute(id: number, route: Partial<InsertRoute>): Promise<Route>;
  deleteRoute(id: number): Promise<void>;
  getRoutesByUser(userId: string): Promise<Route[]>;

  // Booking operations
  getBookings(): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookingsByUser(userId: string): Promise<Booking[]>;
  getBookingsByRoute(routeId: number): Promise<Booking[]>;

  // Review operations
  getReviews(): Promise<Review[]>;
  getReviewsByRoute(routeId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  getReviewsByUser(userId: string): Promise<Review[]>;

  // Waiting list operations
  createWaitingListEntry(entry: InsertWaitingListEntry): Promise<WaitingListEntry>;
  getWaitingListEntries(): Promise<WaitingListEntry[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations (required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Route operations
  async getRoutes(): Promise<Route[]> {
    return await db
      .select()
      .from(routes)
      .where(eq(routes.isPublic, true))
      .orderBy(desc(routes.createdAt));
  }

  async getRoute(id: number): Promise<Route | undefined> {
    const [route] = await db.select().from(routes).where(eq(routes.id, id));
    return route;
  }

  async createRoute(route: InsertRoute): Promise<Route> {
    const [newRoute] = await db.insert(routes).values(route).returning();
    return newRoute;
  }

  async updateRoute(id: number, route: Partial<InsertRoute>): Promise<Route> {
    const [updatedRoute] = await db
      .update(routes)
      .set({ ...route, updatedAt: new Date() })
      .where(eq(routes.id, id))
      .returning();
    return updatedRoute;
  }

  async deleteRoute(id: number): Promise<void> {
    await db.delete(routes).where(eq(routes.id, id));
  }

  async getRoutesByUser(userId: string): Promise<Route[]> {
    return await db
      .select()
      .from(routes)
      .where(eq(routes.createdBy, userId))
      .orderBy(desc(routes.createdAt));
  }

  // Booking operations
  async getBookings(): Promise<Booking[]> {
    return await db.select().from(bookings).orderBy(desc(bookings.createdAt));
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking;
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db.insert(bookings).values(booking).returning();
    return newBooking;
  }

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    return await db
      .select()
      .from(bookings)
      .where(eq(bookings.userId, userId))
      .orderBy(desc(bookings.createdAt));
  }

  async getBookingsByRoute(routeId: number): Promise<Booking[]> {
    return await db
      .select()
      .from(bookings)
      .where(eq(bookings.routeId, routeId))
      .orderBy(desc(bookings.createdAt));
  }

  // Review operations
  async getReviews(): Promise<Review[]> {
    return await db.select().from(reviews).orderBy(desc(reviews.createdAt));
  }

  async getReviewsByRoute(routeId: number): Promise<Review[]> {
    return await db
      .select()
      .from(reviews)
      .where(eq(reviews.routeId, routeId))
      .orderBy(desc(reviews.createdAt));
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db.insert(reviews).values(review).returning();
    
    // Update route rating
    const routeReviews = await this.getReviewsByRoute(review.routeId);
    const avgRating = routeReviews.reduce((sum, r) => sum + r.rating, 0) / routeReviews.length;
    
    await db
      .update(routes)
      .set({ rating: avgRating.toString() })
      .where(eq(routes.id, review.routeId));
    
    return newReview;
  }

  async getReviewsByUser(userId: string): Promise<Review[]> {
    return await db
      .select()
      .from(reviews)
      .where(eq(reviews.userId, userId))
      .orderBy(desc(reviews.createdAt));
  }

  // Waiting list operations
  async createWaitingListEntry(entry: InsertWaitingListEntry): Promise<WaitingListEntry> {
    const [newEntry] = await db.insert(waitingList).values(entry).returning();
    return newEntry;
  }

  async getWaitingListEntries(): Promise<WaitingListEntry[]> {
    return await db
      .select()
      .from(waitingList)
      .orderBy(desc(waitingList.createdAt));
  }
}

export const storage = new DatabaseStorage();
