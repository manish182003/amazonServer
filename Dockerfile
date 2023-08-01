# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application's source code
COPY . .

# Expose the port your server listens on (replace 3000 with your actual port number)
EXPOSE 3000

# Start your Node.js server
CMD ["node", "index.js"]
