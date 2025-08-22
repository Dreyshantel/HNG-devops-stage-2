module.exports = {
    // Local MongoDB connection for development
    MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/lms",
    
    // Alternative: MongoDB Atlas connection (uncomment and update with your credentials)
    // MONGO_URI: process.env.MONGO_URI || "mongodb+srv://your_username:your_password@your_cluster.mongodb.net/lms?retryWrites=true&w=majority",
    
    SECRET_KEY: process.env.SECRET_KEY || "your-super-secret-jwt-key-change-this-in-production",
    
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "your_cloud_name",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "your_api_key",
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "your_api_secret"
}
