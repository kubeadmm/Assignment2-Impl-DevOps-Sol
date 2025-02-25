# Step 1: Use the official Node.js image as a base
FROM node:14

# Step 2: Set the working directory inside the container to /app
WORKDIR /app

# Step 3: Copy package.json and package-lock.json into the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy everything from your local directory into the /app directory in the container
COPY ./src /app/src
COPY ./src/index.js /app/index.js

# Step 6: Expose port 8080 (Cloud Run default port)
EXPOSE 8080

# Step 7: Command to run the app when the container starts (index.js is in the src folder)
CMD ["node", "src/index.js"]
