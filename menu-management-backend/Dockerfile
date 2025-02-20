FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY menu-management-backend/package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema
COPY menu-management-backend/prisma ./prisma/

# Create .env file with DATABASE_URL from build arg
ARG DATABASE_URL
RUN echo "DATABASE_URL=${DATABASE_URL}" > .env
RUN npx prisma generate

# Copy source code
COPY menu-management-backend/ .

# Build app
RUN npm run build

# Expose port
EXPOSE 3002

# Start app
CMD ["npm", "run", "start:prod"]
