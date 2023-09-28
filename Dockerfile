# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli@16
# Install project dependencies
RUN npm install

# Copy the entire Angular app to the working directory
COPY . .

# Build the Angular app
RUN npm run ng build -- --configuration="production"

# Expose the port the app will run on
EXPOSE 80

# Start the Angular app
CMD ng serve --configuration=production --host 0.0.0.0 --port 80
