# Next.js Project Template

A clean, modular Next.js project template with TypeScript, ready for building any kind of application.

## Project Structure

```
/
├── config/                 # Sequelize configuration
│   └── config.js          # Database configuration for different environments
├── migrations/             # Database migration files
│   └── [timestamp]-migration-name.js  # Migration files
├── seeds/                  # Database seed files
│   └── seed.ts            # Database seed script
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── layout.tsx     # Root layout component
│   │   └── page.tsx       # Home page
│   ├── components/        # Reusable UI components
│   │   ├── Dashboard.tsx  # Dashboard component template
│   │   └── Providers.tsx  # Context providers template
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   │   ├── auth.ts        # Authentication utilities template
│   │   ├── database.ts    # Sequelize database connection
│   │   └── logger.ts      # Logging utilities template
│   ├── models/            # Sequelize data models
│   ├── modules/           # Feature modules (modular architecture)
│   │   ├── auth/          # Authentication module
│   │   │   ├── controllers/# API controllers
│   │   │   ├── dto/       # Data transfer objects
│   │   │   ├── models/    # Data models
│   │   │   ├── services/  # Business logic services
│   │   │   └── views/     # Module-specific views
│   │   └── user/          # User management module
│   │       ├── controllers/
│   │       ├── dto/
│   │       ├── models/
│   │       ├── services/
│   │       └── views/
│   ├── store/             # State management (Redux)
│   │   ├── actions/       # Redux actions
│   │   ├── selectors/     # Redux selectors
│   │   ├── slices/        # Redux slices
│   │   │   └── authSlice.ts
│   │   └── store.ts       # Redux store configuration
│   ├── styles/            # Global styles and CSS
│   ├── types/             # TypeScript type definitions
│   │   ├── index.ts       # Type exports
│   │   ├── auth.ts        # Authentication types
│   │   └── user.ts        # User types
│   ├── models/            # Sequelize data models
│   │   └── Test.ts        # Example model
│   └── utils/             # Utility functions
├── docker-compose.yml     # Docker PostgreSQL database configuration
├── next.config.js         # Next.js configuration
├── package.json           # Project dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory (copy from `env.example`):
   ```bash
   cp env.example .env.local
   ```
   Then update the values in `.env.local`:
   ```
   DB_NAME=delivery_local
   DB_USER=app_user
   DB_PASSWORD=strong_password
   DB_HOST=localhost
   DB_PORT=5432
   ```

3. **Start the database:**
   ```bash
   # Start PostgreSQL database with Docker
   docker-compose up -d

   # Create database and run migrations
   npm run db:create
   npm run db:migrate

   # Seed the database
   npm run db:seed
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

### Database Commands

- `npm run db:create` - Create database
- `npm run db:drop` - Drop database
- `npm run db:migrate` - Run database migrations
- `npm run db:migrate:undo` - Undo last migration
- `npm run db:seed` - Seed the database with initial data
- `npm run db:seed:undo` - Undo database seeding

## Architecture Overview

### Modular Architecture
The project follows a modular architecture where each feature is organized into its own module under `src/modules/`. Each module contains:
- **Controllers**: API endpoint handlers
- **DTOs**: Data transfer objects for request/response validation
- **Models**: Data models and database interactions
- **Services**: Business logic and external API calls
- **Views**: Module-specific UI components

### State Management
Redux is configured for global state management with:
- Slices for different domains (auth, etc.)
- Actions and selectors for state operations
- Typed store configuration

### Type Safety
Full TypeScript support with:
- Centralized type definitions in `src/types/`
- Sequelize models with TypeScript interfaces
- Strict type checking enabled

## Customization

### Adding a New Module
1. Create a new folder under `src/modules/`
2. Add the required subfolders: `controllers/`, `dto/`, `models/`, `services/`, `views/`
3. Implement your module's logic following the established patterns
4. Add type definitions in `src/types/`
5. Export types from `src/types/index.ts`

### Adding Dependencies
- Runtime dependencies: `npm install package-name`
- Development dependencies: `npm install -D package-name`
- Update `package.json` scripts as needed

### Database Changes
1. Update or create Sequelize models in `src/models/`
2. Generate and run migrations:
   ```bash
   # Generate a new migration
   npx sequelize-cli migration:generate --name add-column-to-table

   # Edit the generated migration file in migrations/ folder
   # Then run the migration
   npm run db:migrate

   # Undo last migration (if needed)
   npm run db:migrate:undo
   ```
3. Update the database connection in `src/lib/database.ts` if needed
4. Update seed files in `seeds/` as necessary

### Migration Files
- **Location**: `migrations/` directory
- **Tracking**: Sequelize automatically creates `SequelizeMeta` table to track applied migrations
- **Naming**: Use descriptive names like `add-user-email-field` or `create-products-table`

## Database Setup

### Sequelize Configuration

The project uses Sequelize ORM with PostgreSQL. Key configuration files:

- **`config/config.js`**: Sequelize CLI configuration for different environments
- **`src/lib/database.ts`**: Main database connection and model initialization
- **`src/models/`**: Sequelize model definitions
- **`seeds/seed.ts`**: Database seeding script

### Environment Variables

Database connection is configured through `.env.local`:

```bash
DB_NAME=delivery_local
DB_USER=app_user
DB_PASSWORD=strong_password
DB_HOST=localhost
DB_PORT=5432
```

### Docker Database

PostgreSQL runs in Docker with the following setup:
```bash
# Start database
docker-compose up -d

# View logs
docker-compose logs postgres

# Connect to database
docker-compose exec postgres psql -U app_user -d delivery_local
```

## Technologies Used

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Sequelize ORM
- **Styling**: Tailwind CSS (can be added)
- **State Management**: Redux Toolkit
- **Development**: ESLint, Prettier, TypeScript

## API Testing

The project includes a test API endpoint to verify database connectivity:

```bash
# Get all test records
curl http://localhost:3000/api/test

# Create a new test record
curl -X POST -H "Content-Type: application/json" \
  -d '{"name":"New Test","description":"Test description","value":42}' \
  http://localhost:3000/api/test
```

## Next Steps

1. Add your preferred styling solution (Tailwind, styled-components, etc.)
2. Implement authentication if needed
3. Add API routes under `src/app/api/`
4. Create your first feature module
5. Set up testing framework
6. Configure CI/CD pipeline
7. Add database migrations for schema changes
8. Set up database backup and restore procedures

This template provides a solid foundation for building scalable Next.js applications with clean architecture and best practices.
