module.exports = {
    // In-memory MongoDB for testing (no installation required)
    MONGO_URI: "mongodb://127.0.0.1:27017/lms",
    SECRET_KEY: "test-secret-key-for-development",
    
    // For production, use MongoDB Atlas
    // MONGO_URI: "mongodb+srv://username:password@cluster.mongodb.net/lms?retryWrites=true&w=majority",
    
    CLOUDINARY_CLOUD_NAME: "test_cloud_name",
    CLOUDINARY_API_KEY: "test_api_key",
    CLOUDINARY_API_SECRET: "test_api_secret"
}
