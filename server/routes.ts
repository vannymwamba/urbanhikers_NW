import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertRouteSchema, insertBookingSchema, insertReviewSchema, insertWaitingListSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Route endpoints
  app.get("/api/routes", async (req, res) => {
    try {
      const routes = await storage.getRoutes();
      res.json(routes);
    } catch (error) {
      console.error("Error fetching routes:", error);
      res.status(500).json({ message: "Failed to fetch routes" });
    }
  });

  app.get("/api/routes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const route = await storage.getRoute(id);
      if (!route) {
        return res.status(404).json({ message: "Route not found" });
      }
      res.json(route);
    } catch (error) {
      console.error("Error fetching route:", error);
      res.status(500).json({ message: "Failed to fetch route" });
    }
  });

  app.post("/api/routes", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const routeData = insertRouteSchema.parse({
        ...req.body,
        createdBy: userId,
      });
      const route = await storage.createRoute(routeData);
      res.status(201).json(route);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid route data", errors: error.errors });
      }
      console.error("Error creating route:", error);
      res.status(500).json({ message: "Failed to create route" });
    }
  });

  app.put("/api/routes/:id", isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const userId = req.user.claims.sub;
      
      // Check if route exists and user owns it
      const existingRoute = await storage.getRoute(id);
      if (!existingRoute) {
        return res.status(404).json({ message: "Route not found" });
      }
      if (existingRoute.createdBy !== userId) {
        return res.status(403).json({ message: "Not authorized to update this route" });
      }

      const routeData = insertRouteSchema.partial().parse(req.body);
      const route = await storage.updateRoute(id, routeData);
      res.json(route);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid route data", errors: error.errors });
      }
      console.error("Error updating route:", error);
      res.status(500).json({ message: "Failed to update route" });
    }
  });

  app.delete("/api/routes/:id", isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const userId = req.user.claims.sub;
      
      // Check if route exists and user owns it
      const existingRoute = await storage.getRoute(id);
      if (!existingRoute) {
        return res.status(404).json({ message: "Route not found" });
      }
      if (existingRoute.createdBy !== userId) {
        return res.status(403).json({ message: "Not authorized to delete this route" });
      }

      await storage.deleteRoute(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting route:", error);
      res.status(500).json({ message: "Failed to delete route" });
    }
  });

  app.get("/api/users/:userId/routes", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.params.userId;
      const currentUserId = req.user.claims.sub;
      
      // Users can only see their own routes
      if (userId !== currentUserId) {
        return res.status(403).json({ message: "Not authorized" });
      }

      const routes = await storage.getRoutesByUser(userId);
      res.json(routes);
    } catch (error) {
      console.error("Error fetching user routes:", error);
      res.status(500).json({ message: "Failed to fetch user routes" });
    }
  });

  // Booking endpoints
  app.get("/api/bookings", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const bookings = await storage.getBookingsByUser(userId);
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.post("/api/bookings", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const bookingData = insertBookingSchema.parse({
        ...req.body,
        userId,
      });
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      console.error("Error creating booking:", error);
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  app.get("/api/routes/:routeId/reviews", async (req, res) => {
    try {
      const routeId = parseInt(req.params.routeId);
      const reviews = await storage.getReviewsByRoute(routeId);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/routes/:routeId/reviews", isAuthenticated, async (req: any, res) => {
    try {
      const routeId = parseInt(req.params.routeId);
      const userId = req.user.claims.sub;
      const reviewData = insertReviewSchema.parse({
        ...req.body,
        routeId,
        userId,
      });
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      console.error("Error creating review:", error);
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  // Waiting list endpoint
  app.post("/api/waiting-list", async (req, res) => {
    try {
      const waitingListData = insertWaitingListSchema.parse(req.body);
      
      const entry = await storage.createWaitingListEntry(waitingListData);
      
      res.status(201).json({ 
        message: "Successfully joined the waiting list!",
        entry: {
          id: entry.id,
          firstName: entry.firstName,
          city: entry.city,
          createdAt: entry.createdAt
        }
      });
    } catch (error) {
      console.error("Error creating waiting list entry:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid form data", errors: error.errors });
      }
      if ((error as any).code === '23505') { // Unique constraint violation
        return res.status(409).json({ message: "This email is already on our waiting list!" });
      }
      res.status(500).json({ message: "Failed to join waiting list" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
