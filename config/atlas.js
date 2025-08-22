module.exports = {
    // MongoDB Atlas connection - Working connection string
    MONGO_URI: process.env.MONGO_URI || "mongodb+srv://lms_user:lms_password123@cluster0.c73ecye.mongodb.net/lms?retryWrites=true&w=majority&appName=Cluster0",
    
    // Alternative: Use local MongoDB for development (uncomment this line and comment the above line if Atlas fails)
    // MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/lms",
    
    SECRET_KEY: process.env.SECRET_KEY || "your-super-secret-jwt-key-change-this-in-production",
    
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "your_cloud_name",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "your_api_key",
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "your_api_secret"
}
