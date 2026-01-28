FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and lock files
COPY package*.json ./

# Install dependencies including react-router-dom and serve
RUN npm install react-router-dom serve && npm install

# Copy the rest of the app
COPY . .

# Build the React app for production
RUN npm run build

# Expose port for serve to run on
EXPOSE 3000

# Start the app using 'serve'
CMD ["npx", "serve", "-s", "build"]
