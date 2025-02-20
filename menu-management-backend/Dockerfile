FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install
RUN npx prisma generate

# Copy app source
COPY . .

# Build app
RUN npm run build

# Expose port
EXPOSE 3002

# Start app
CMD ["npm", "run", "start:prod"] 