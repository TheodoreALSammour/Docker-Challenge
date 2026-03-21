# Use Node.js 18 as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json first (for layer caching)
COPY package.json .

# Install dependencies
RUN npm install --production

# Copy the rest of the application
COPY src/ ./src/

# Expose the port the app runs on
EXPOSE 3000

# Command to run when the container starts
CMD ["npm", "start"]