module.exports = {
    // Use MongoDB Atlas free tier - you can sign up at https://www.mongodb.com/atlas
    // For now, using a placeholder that will work with local MongoDB if available
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/lms",
    SECRET_KEY: process.env.SECRET_KEY || "your-super-secret-jwt-key-change-this-in-production",
    
    // Alternative: Use MongoDB Atlas (recommended for distribution)
    // MONGO_URI: "mongodb+srv://username:password@cluster.mongodb.net/lms?retryWrites=true&w=majority",
    
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "your_cloud_name",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "your_api_key",
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "your_api_secret"
}
