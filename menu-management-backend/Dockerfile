FROM node:18-alpine

WORKDIR /app

# First copy only package files
COPY menu-management-backend/package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema
COPY menu-management-backend/prisma ./prisma/
RUN npx prisma generate

# Copy source code
COPY menu-management-backend/ .

# Build app
RUN npm run build

# Expose port
EXPOSE 3002

# Start app
CMD ["node", "dist/main"] 