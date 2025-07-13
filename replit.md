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
- **Migration Completed**: Successfully migrated from Replit Agent to standard Replit environment with full functionality preserved
- **Real Product Images Update**: Replaced all synthetic/placeholder images with authentic product photos from iHerb for globally popular Kerasys products
- **Image URL Verification**: Updated 15+ products with verified working image URLs from official Kerasys retailers
- **Image Proxy Solution**: Implemented server-side proxy for ElaUSA images to resolve CORS issues and ensure real product photos display correctly
- **Cart Context Bug Fix**: Resolved infinite loop in cart context that was causing browser console errors and performance issues
- **Complete Product Verification**: Removed all non-existent products and updated catalog with only authentic products available on ElaUSA
- **Image URL Corrections**: Fixed all broken image cache URLs to use working cache endpoints from ElaUSA
- **Expanded Catalog**: Catálogo expandido de 12 para 21 produtos autênticos verificados na ElaUSA
- **Authentic Product Data**: Todos os 21 produtos verificados como disponíveis na ElaUSA com preços, descrições e imagens corretas
- **Cache URL Standardization**: Standardized all image URLs to use the working cache (7e6530eafeba14d76580b06e3b5d93ee)
- **Real Pricing**: All products maintain authentic Brazilian pricing from ElaUSA with verified discount percentages
- **Product Categories**: Organized into kits-promocionais, condicionador, tratamento, and shampoo categories
- **Migration Completed**: Successfully migrated from Replit Agent to standard Replit environment with full functionality
- **Global Product Expansion (Janeiro 2025)**: Adicionados 20+ produtos populares mundialmente da Kerasys baseado em pesquisa de mercado global
- **Internationally Popular Lines**: Incluídas linhas Elegance & Sensual, Hair Clinic System, Natural Recipe (Tea Tree/Coconut), Color Care Protection e Advanced Age Care
- **Professional Grade Products**: Adicionados produtos de nível profissional como ampolas terapêuticas e sistemas clínicos coreanos
- **Comprehensive Portfolio**: Catálogo agora inclui 50+ produtos cobrindo todas as necessidades capilares: hidratação, reparação, volume, anti-idade, proteção da cor
- **Real Product Images Integration (January 13, 2025)**: Substituídas todas as imagens sintéticas por fotos reais dos produtos Kerasys diretamente do iHerb (cloudinary.images-iherb.com), garantindo autenticidade e qualidade profissional das imagens dos produtos
- **Pagination System Fix (January 13, 2025)**: Corrigido sistema de paginação que não estava funcionando corretamente - agora a navegação entre páginas funciona perfeitamente
- **Complete Image Replacement (January 13, 2025)**: Eliminados todos os placeholders cinzas substituindo por imagens autênticas de produtos Kerasys do iHerb
- **Responsive Image Optimization (January 13, 2025)**: Ajustadas todas as imagens para usar object-contain com padding, garantindo que produtos apareçam completos e proporcionais em todos os dispositivos (mobile, tablet, desktop)
- **ElaUSA Image Integration (January 13, 2025)**: Integradas imagens específicas da ElaUSA para produtos Moisturizing Baobab Oil Condicionador e Kerasys Argan Oil Serum com URLs otimizadas

The application follows a monorepo structure with shared TypeScript types and schemas between frontend and backend, ensuring type safety across the full stack.