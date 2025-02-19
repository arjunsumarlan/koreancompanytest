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

### Backend
- NestJS
- PostgreSQL
- Prisma ORM
- TypeScript
- Docker

## Quick Start

### Prerequisites
- Node.js 18 or later
- PostgreSQL
- npm

### Backend Setup

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
FRONTEND_URL=http://localhost:3000
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the backend server:
```bash
npm run start:dev
```

### Frontend Setup

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

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

### Backend Development
- API runs on [http://localhost:3002](http://localhost:3002)
- Swagger documentation available at [http://localhost:3002/api](http://localhost:3002/api)
- Database schema managed with Prisma

### Frontend Development
- Development server runs on [http://localhost:3000](http://localhost:3000)
- Real-time updates using RTK Query
- Styled with Tailwind CSS

## Docker Support

Backend can be run in Docker:

```bash
cd menu-management-backend
docker build -t menu-management-backend .
docker run -p 3002:3002 --env-file .env menu-management-backend
```

## Testing

### Backend Tests
```bash
cd menu-management-backend
npm run test
```

### Frontend Tests
```bash
cd menu-management-frontend
npm run test
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
