# Menu Management System - Backend

A NestJS backend service for managing hierarchical menu structures with PostgreSQL database.

## Features

- 🌳 Recursive menu tree management
- 🔄 Efficient CTE-based queries
- 🔒 Transactional operations
- 🚀 Docker support
- 📝 Prisma ORM

## Tech Stack

- NestJS
- PostgreSQL
- Prisma
- TypeScript
- Docker

## Prerequisites

- Node.js 18 or later
- PostgreSQL
- npm
- Docker (optional)

## Installation

1. Clone the repository:
```bash
git clone git@github.com:arjunsumarlan/koreancompanytest.git
cd menu-management-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/menu?schema=public"
PORT=3002
FRONTEND_URL=http://localhost:3000
```

4. Set up the database:
```bash
npx prisma migrate dev
```

## Development

Run the development server:

```bash
npm run start:dev
```

The API will be available at [http://localhost:3002](http://localhost:3002)

## Docker

Build the Docker image:
```bash
docker build -t menu-management-backend .
```

Run the container:
```bash
docker run -p 3002:3002 --env-file .env menu-management-backend
```

## Deployment

### Deploying to Render

1. Push your code to GitHub
2. Go to [Render](https://render.com)
3. Create a new Web Service
4. Choose Docker runtime
5. Add environment variables:
   - `DATABASE_URL`
   - `PORT`
   - `FRONTEND_URL`
6. Deploy

## API Endpoints

- `GET /menus` - Get all menus in tree structure
- `POST /menus` - Create a new menu item
- `PATCH /menus/:id` - Update a menu item
- `DELETE /menus/:id` - Delete a menu item and its children

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string (required)
- `PORT`: Server port (default: 3002)
- `FRONTEND_URL`: Frontend application URL for CORS

## Project Structure

```
src/
├── menu/            # Menu module
├── prisma/          # Prisma schema and migrations
├── main.ts          # Application entry point
└── app.module.ts    # Root module
```

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
