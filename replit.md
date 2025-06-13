# Urban Hikers - Walking Tour Platform

## Overview

Urban Hikers is a full-stack web application for discovering and booking guided walking tours in urban environments. The platform allows users to explore curated routes featuring historical landmarks, street art, food tours, and hidden local gems. Users can browse routes, create their own tours, book experiences, and connect with fellow urban explorers.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom gold/orange theme colors
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Authentication**: Dual authentication system:
  - Firebase Authentication for user management
  - Replit Auth for deployment environment
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful endpoints with proper error handling

### Hybrid Data Storage
The application uses a unique dual-storage approach:
- **Firebase Firestore**: For user authentication and some document-based data
- **PostgreSQL**: For relational data like routes, bookings, and reviews
- **Drizzle ORM**: Type-safe database queries and schema management

## Key Components

### Authentication System
- Firebase Authentication handles user sign-in/sign-up with Google OAuth
- Replit Auth provides session management for the deployment environment
- User data is synchronized between Firebase and PostgreSQL
- Protected routes require authentication

### Route Management
- Users can browse all available walking routes
- Authenticated users can create new routes
- Routes include metadata like duration, difficulty, price, and ratings
- Category-based filtering (Historic, Art & Culture, Food & Drink)

### Booking System
- Authenticated users can book tours with date selection
- Participant count and dynamic pricing calculation
- Booking status tracking and management
- User-specific booking history

### Review System
- Users can leave ratings and comments for completed routes
- Average ratings are calculated and displayed
- Reviews are tied to specific routes and users

## Data Flow

1. **User Authentication**: Users sign in via Firebase, session data stored in PostgreSQL
2. **Route Discovery**: Routes fetched from PostgreSQL, displayed with filtering options
3. **Booking Process**: Form validation → API call → Database storage → Confirmation
4. **Route Creation**: Authenticated users submit route data → Validation → Storage
5. **Reviews**: Post-booking users can submit reviews → Database storage → Rating updates

## External Dependencies

### Firebase Services
- **Authentication**: User sign-in/sign-up with email and Google OAuth
- **Firestore**: Document storage with security rules
- **Hosting**: Static site deployment (configured but using Replit deployment)

### Database
- **PostgreSQL**: Primary database via Neon serverless
- **Drizzle Kit**: Database migrations and schema management
- **Connection Pooling**: Neon serverless connection pooling

### UI Libraries
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library
- **Framer Motion**: Animation library

## Deployment Strategy

### Development Environment
- Replit-hosted development with hot module replacement
- Environment variables for Firebase configuration
- PostgreSQL database provisioned via Replit

### Production Build
- Vite builds optimized static assets
- Express server serves API and static files
- Session storage via PostgreSQL
- Firebase handles authentication and some data

### Configuration
- **Port**: 5000 (mapped to external port 80)
- **Build Process**: `npm run build` compiles frontend and backend
- **Start Command**: `npm run start` runs production server
- **Development**: `npm run dev` starts development server with HMR

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### June 13, 2025 - Firebase Authentication Implementation
- Completed full Firebase Google authentication integration
- Implemented real-time authentication state management with onAuthStateChanged
- Added proper user profile display in header (photo, name)
- Created comprehensive logout functionality with Firebase signOut
- Enhanced sign-in and sign-up pages with Google OAuth integration
- Removed conditional "Create Route" navigation to maintain consistent header layout
- Successfully tested with multiple user accounts including ming.zeng@urban-hikers.com

### Authentication Status
- Firebase project: "urbunhikers" 
- Google OAuth working with authorized domains
- User authentication state properly detected and managed
- Header layout now consistent regardless of authentication status

## User Preferences

- Communication style: Simple, everyday language
- UI Layout: Keep header navigation consistent - no conditional elements that change layout