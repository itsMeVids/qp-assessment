# Use the Node.js slim image as the base image
FROM node:slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install -f && rm -rf /tmp/*

# Copy the rest of the application code
COPY . .

# Expose port 3000 (assuming your Node.js application listens on port 3000)
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]