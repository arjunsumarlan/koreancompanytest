FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install
RUN npx prisma generate

# Copy source code
COPY . .

# Build app
RUN npm run build

# Expose port
EXPOSE 3002

# Start app with increased startup timeout
CMD ["node", "dist/main"] 