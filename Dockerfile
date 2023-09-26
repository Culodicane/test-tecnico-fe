# Use an official Node.js runtime as the base image for building
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install project dependencies
RUN npm install

# Copy the entire Angular app to the working directory
COPY . .

# Build the Angular app for production
RUN ng build --configuration=production

# Use an official Nginx runtime as the final base image
FROM nginx:latest

# Copy the built Angular app from the build stage to the Nginx web server's default location
COPY --from=build /usr/src/app/dist/* /usr/share/nginx/html/

# Expose port 80 for serving the Angular app
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
