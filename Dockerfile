# Use the official Node.js 18.19.0 image as the base image
FROM node:18.19.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your Node.js app will run on
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "run", "dev"]
