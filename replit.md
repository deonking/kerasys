# Kerasys Brasil E-commerce Application

## Overview

This is a full-stack e-commerce application for Kerasys Brasil, a hair care products company. The application is built with React on the frontend and Express.js on the backend, featuring a product catalog, shopping cart functionality, and a modern responsive design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui components
- **State Management**: React Context for cart state management
- **Data Fetching**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and building

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Session Management**: express-session with MemoryStore
- **Data Layer**: Currently using in-memory storage with plans for Drizzle ORM + PostgreSQL
- **API Design**: RESTful API endpoints for products and cart operations

### Key Components

#### Frontend Components
- **Product Catalog**: Grid-based product display with filtering by category
- **Shopping Cart**: Sidebar cart with add/remove/update quantity functionality
- **Product Pages**: Individual product detail views
- **Responsive Design**: Mobile-first approach with Tailwind CSS

#### Backend Services
- **Product Service**: CRUD operations for products with category filtering
- **Cart Service**: Session-based cart management
- **Storage Layer**: Abstract storage interface with in-memory implementation

### Data Flow

1. **Product Display**: Frontend fetches products from `/api/products` endpoint
2. **Category Filtering**: Products filtered by category via query parameters
3. **Cart Operations**: Cart state managed through React Context and synchronized with backend
4. **Session Management**: Cart items tied to user sessions via express-session

### External Dependencies

#### Frontend Dependencies
- **UI Framework**: React + TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **State Management**: TanStack Query for server state
- **Utilities**: clsx, class-variance-authority for conditional styling
- **Icons**: Lucide React

#### Backend Dependencies
- **Database**: Planned PostgreSQL with Neon serverless
- **ORM**: Drizzle ORM for type-safe database operations
- **Session Storage**: In-memory store (MemoryStore)
- **Development**: tsx for TypeScript execution

### Deployment Strategy

#### Development
- **Frontend**: Vite dev server with HMR
- **Backend**: tsx for running TypeScript directly
- **Database**: Planned Neon PostgreSQL (currently in-memory)

#### Production
- **Build Process**: 
  - Frontend: Vite builds to `dist/public`
  - Backend: esbuild bundles server to `dist/index.js`
- **Static Assets**: Served by Express in production
- **Database**: Neon PostgreSQL serverless
- **Environment**: Node.js runtime

#### Current State vs Planned
- **Current**: In-memory storage for development/testing
- **Planned**: PostgreSQL database with Drizzle ORM migrations
- **Session Store**: Currently MemoryStore, can be upgraded to connect-pg-simple for PostgreSQL

#### Recent Changes (January 2025)
- **Image Proxy Solution**: Implemented server-side proxy for ElaUSA images to resolve CORS issues and ensure real product photos display correctly
- **Cart Context Bug Fix**: Resolved infinite loop in cart context that was causing browser console errors and performance issues
- **Massive Catalog Expansion**: Expanded from 12 to 56 authentic Kerasys products from ElaUSA
- **Complete Shampoo Collection**: Added 25 shampoos covering all Kerasys lines (Keratin Bond, Oriental Premium, Natural Recipe, Hair Clinic, Perfume, Damage Clinic)
- **Full Product Lines**: Implemented complete product lines with matching shampoos, condicionadores and treatments
- **Premium Kits**: Added professional salon kits and complete care bundles with significant discounts
- **Specialized Treatments**: Added protein recovery treatments, hair masks, scalp care serums and anti-aging formulas
- **Authentic Pricing**: All products maintain real Brazilian pricing from ElaUSA with proper discount percentages
- **Product Variety**: Now includes 400ml, 600ml, 1L sizes and specialized formulas (anti-dandruff, color protection, volumizing)
- **API Optimization**: Products properly paginated with 56 total items accessible via API parameters

The application follows a monorepo structure with shared TypeScript types and schemas between frontend and backend, ensuring type safety across the full stack.