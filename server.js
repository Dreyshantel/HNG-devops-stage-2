const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config/keys");
require('dotenv').config();

// Use environment variables if available, otherwise fall back to config
const MONGO_URI_FINAL = process.env.MONGO_URI || MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY || require("./config/keys").SECRET_KEY;

// Debug: Show which configuration is being used
console.log("🔧 Configuration Debug:");
console.log("NODE_ENV:", process.env.NODE_ENV || 'development (default)');
console.log("Config file loaded:", process.env.NODE_ENV === 'production' ? 'prod.js' : 'atlas.js');
console.log("Environment MONGO_URI:", process.env.MONGO_URI ? 'Set' : 'Not set');
console.log("Config MONGO_URI:", MONGO_URI ? 'Available' : 'Not available');

// Middleware
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/auth", require("./routes/authRoute"));
app.use("/", require("./routes/courseRoute"));
app.use("/users", require("./routes/userRoute"));
app.use("/profile", require("./routes/profileRoute"));
app.use("/enroll-course", require("./routes/enrollRoute"));

// Production deployment
if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'))
  const path = require('path')
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// Database and server startup
const PORT = process.env.PORT || 5000;

// Start server first, then try to connect to database
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Try to connect to MongoDB after server starts
  connectToMongoDB();
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please try a different port.`);
    process.exit(1);
  } else {
    console.error('Server error:', error);
  }
});

// MongoDB connection function
async function connectToMongoDB() {
  try {
    console.log("🔌 Attempting to connect to MongoDB Atlas...");
    console.log("📡 Connection string:", MONGO_URI_FINAL.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
    
    await mongoose.connect(MONGO_URI_FINAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 second timeout
      socketTimeoutMS: 45000, // 45 second timeout
    });
    console.log("✅ Database connected successfully to MongoDB Atlas!");
    console.log("🌐 Database name:", mongoose.connection.name);
    console.log("🔗 Connection state:", mongoose.connection.readyState);
  } catch (err) {
    console.error("❌ Database connection failed with detailed error:");
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    console.error("Error code:", err.code);
    
    if (err.name === 'MongoNetworkError') {
      console.error("🌐 Network Error - Check your internet connection and IP whitelist");
    } else if (err.name === 'MongoServerSelectionError') {
      console.error("🔍 Server Selection Error - Check your connection string and credentials");
    } else if (err.name === 'MongoParseError') {
      console.error("📝 Parse Error - Check your connection string format");
    }
    
    console.warn("📝 The server is running but database features will not work.");
    console.warn("🔧 To fix this, please:");
    console.warn("   1. Check your MongoDB Atlas credentials (username/password)");
    console.warn("   2. Ensure your IP is whitelisted in Atlas Network Access");
    console.warn("   3. Verify the connection string is correct");
    console.warn("   4. Check if the cluster is running and accessible");
    
    // Don't exit the process, let the server continue running
    // This allows the frontend to work even without database
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    if (mongoose.connection.readyState === 1) {
      mongoose.connection.close();
    }
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Don't exit for unhandled rejections in development
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Don't exit for uncaught exceptions in development
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
});
