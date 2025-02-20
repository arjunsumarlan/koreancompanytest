FROM node:18-alpine

WORKDIR /app

# First copy only package files to leverage Docker cache
COPY menu-management-backend/package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma files and generate client
COPY menu-management-backend/prisma ./prisma/
RUN npx prisma generate

# Copy the rest of the application
COPY menu-management-backend/ .

# Build app
RUN npm run build

# Expose port
EXPOSE 3002

# Start app
CMD ["npm", "run", "start:prod"] 