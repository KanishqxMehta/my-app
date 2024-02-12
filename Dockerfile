# Use an official Node runtime as a base image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install --force

# Copy the local source files to the working directory
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Run npm start when the container launches
CMD ["npm", "start"]

