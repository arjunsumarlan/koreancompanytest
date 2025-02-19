# Menu Management System - Frontend

A Next.js application for managing hierarchical menu structures with features like unlimited depth nesting, and real-time updates.

## Features

- 🌳 Hierarchical menu tree visualization
- ✏️ In-line menu item editing
- ➕ Add new menu items at any level
- 🗑️ Delete menu items with all children
- 🔄 Real-time updates
- 📱 Responsive design

## Tech Stack

- Next.js 14
- TypeScript
- Redux Toolkit (RTK Query)
- Tailwind CSS

## Prerequisites

- Node.js 18 or later
- npm
- Backend service running

## Installation

1. Clone the repository:
```bash
git clone git@github.com:arjunsumarlan/koreancompanytest.git
cd menu-management-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3002
```

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Building for Production

```bash
npm run build
# or
yarn build
```

## Deployment

### Deploying to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
5. Deploy

## Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API URL (required)

## Project Structure

```
src/
├── app/              # Next.js app router
├── components/       # React components
├── store/           # Redux store and API slices
├── types/           # TypeScript type definitions
```
