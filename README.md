# Menu Management System

A full-stack application for managing hierarchical menu structures with unlimited depth nesting, real-time updates, and intuitive user interface.

## Project Structure

```
├── menu-management-frontend/  # Next.js frontend application
└── menu-management-backend/   # NestJS backend application
```

## Features

- 🌳 Hierarchical menu tree visualization
- ✏️ In-line menu item editing
- ➕ Add new menu items at any level
- 🗑️ Delete menu items with all children
- 🔄 Real-time updates
- 📱 Responsive design
- 🚀 Efficient recursive queries
- 🔒 Transactional operations

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Redux Toolkit (RTK Query)
- Tailwind CSS
- Firebase Hosting

### Backend
- NestJS
- PostgreSQL
- Prisma ORM
- TypeScript
- Docker
- Railway

## Deployment

### Backend Deployment (Railway)

1. Create a new project in Railway
2. Add a PostgreSQL database
3. Create a new service from GitHub repository
4. Set environment variables:
   ```
   DATABASE_URL=your-postgresql-url
   PORT=3002
   ```
5. Deploy the service

### Frontend Deployment (Firebase)

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your frontend directory:
   ```bash
   cd menu-management-frontend
   firebase init hosting
   ```

4. Set up environment variables:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-service.railway.app
   ```

5. Build and deploy:
   ```bash
   npm run deploy
   ```

### Local Development

#### Prerequisites
- Node.js 18 or later
- PostgreSQL
- npm

#### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd menu-management-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/menu?schema=public"
   PORT=3002
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the backend server:
   ```bash
   npm run start:dev
   ```

#### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd menu-management-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3002
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /menus` - Get all menus in tree structure
- `POST /menus` - Create a new menu item
- `PATCH /menus/:id` - Update a menu item
- `DELETE /menus/:id` - Delete a menu item and its children

## Database Schema

```prisma
model Menu {
  id        String   @id @default(uuid())
  name      String
  depth     Int      @default(0)
  parentId  String?
  createdAt DateTime @default(now())
  parent    Menu?    @relation("MenuToMenu", fields: [parentId], references: [id])
  children  Menu[]   @relation("MenuToMenu")
}
```
