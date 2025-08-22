# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project

## Step 2: Create a Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider and region
4. Click "Create"

## Step 3: Set Up Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and password (save these!)
5. Set privileges to "Read and write to any database"
6. Click "Add User"

## Step 4: Set Up Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add your specific IP addresses
5. Click "Confirm"

## Step 5: Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string

## Step 6: Update Configuration
1. Open `LMS/config/atlas.js`
2. Replace the MONGO_URI with your connection string:
   ```javascript
   MONGO_URI: process.env.MONGO_URI || "mongodb+srv://your_username:your_password@your_cluster.mongodb.net/lms?retryWrites=true&w=majority"
   ```
3. Replace `your_username`, `your_password`, and `your_cluster` with your actual values

## Step 7: Test Connection
1. Restart your server: `npm run server`
2. Check if you see: "✅ Database connected successfully to MongoDB Atlas!"

## Alternative: Use Environment Variable
Create a `.env` file in the LMS directory:
```
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/lms?retryWrites=true&w=majority
```

## Troubleshooting
- Ensure your IP is whitelisted in Network Access
- Check username/password are correct
- Verify cluster name is correct
- Make sure you're using the right connection string format
