# LMS Project Setup Guide

## Prerequisites

### 1. Install Node.js
- Download Node.js from [https://nodejs.org/](https://nodejs.org/)
- Choose the LTS version (18.x.x or 20.x.x)
- **IMPORTANT**: During installation, make sure to check "Add to PATH"
- Restart your terminal/PowerShell after installation

### 2. Install MongoDB
- Download MongoDB Community Server from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- Install MongoDB as a service
- Make sure MongoDB is running on port 27017

### 3. Verify Installation
```bash
node --version
npm --version
```

## Quick Setup

### Option 1: Run Setup Scripts
- **Windows**: Double-click `setup.bat`
- **PowerShell**: Run `.\setup.ps1`

### Option 2: Manual Setup
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

## Configuration

### 1. Environment Variables
Copy `config.env.example` to `.env` and update the values:
```bash
# Database Configuration
MONGO_URI=mongodb://localhost:27017/lms

# JWT Secret Key
SECRET_KEY=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 2. Database Setup
- Ensure MongoDB is running
- The application will automatically create the database and collections

## Running the Application

### Development Mode (Both Frontend and Backend)
```bash
npm run dev
```

### Backend Only
```bash
npm run server
```

### Frontend Only
```bash
npm run client
```

## Project Structure

```
LMS/
├── server.js              # Main server file
├── package.json           # Backend dependencies
├── config/                # Configuration files
├── routes/                # API routes
├── controllers/           # Route controllers
├── model/                 # Database models
├── middlewares/           # Express middlewares
├── uploads/               # File uploads directory
├── client/                # React frontend
│   ├── src/               # Source code
│   ├── public/            # Public assets
│   └── package.json       # Frontend dependencies
└── README.md              # Project documentation
```

## Features

- **Role-based Authentication**: Student, Teacher, Admin
- **Course Management**: Create, read, update, delete courses
- **User Management**: Manage students and teachers
- **File Uploads**: Course materials and thumbnails
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Live course information

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Courses
- `GET /get-courses` - Get all courses
- `GET /get-course/:courseId` - Get specific course
- `POST /post-course` - Create new course (Admin only)
- `DELETE /delete` - Delete course (Admin only)

### Users
- `GET /users/student` - Get all students
- `GET /users/teacher` - Get all teachers

## Troubleshooting

### Common Issues

1. **Node.js not found**
   - Reinstall Node.js and check "Add to PATH"
   - Restart terminal after installation

2. **MongoDB connection failed**
   - Ensure MongoDB service is running
   - Check if port 27017 is available

3. **Port already in use**
   - Change PORT in environment variables
   - Kill processes using the port

4. **Dependencies installation failed**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and package-lock.json
   - Run `npm install` again

### Getting Help

- Check the console for error messages
- Verify all prerequisites are installed
- Ensure environment variables are set correctly
- Check if MongoDB is running

## Development

### Adding New Features
1. Create new routes in `routes/` directory
2. Add controllers in `controllers/` directory
3. Create models in `model/` directory
4. Update frontend components as needed

### Code Style
- Use consistent indentation
- Follow existing naming conventions
- Add comments for complex logic
- Test thoroughly before committing

## Deployment

### Production Build
```bash
# Build frontend
cd client
npm run build
cd ..

# Start production server
npm start
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use strong `SECRET_KEY`
- Configure production MongoDB URI
- Set up proper file storage (Cloudinary recommended)

