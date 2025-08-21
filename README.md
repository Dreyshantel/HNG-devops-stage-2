# 🎓 SEN Online Peer Learning Forum

A comprehensive Learning Management System (LMS) designed to provide an engaging, interactive environment for students and lecturers. The platform promotes collaboration, knowledge sharing, and continuous assessment while remaining lightweight, scalable, and user-friendly.

## ✨ **Features Overview**

### 🔐 **User Management & Authentication**
- **Role-based Access Control**: Student, Lecturer, Administrator
- **Secure Authentication**: JWT-based login system
- **User Profiles**: Comprehensive profile management with academic information

### 📚 **Course Management**
- **Course Creation**: Lecturers can upload lessons, videos, documents, and assignments
- **Module-Based Learning**: Structured course organization
- **Progress Tracking**: Students can monitor their learning progress
- **Course Catalog**: Browse and enroll in available courses

### 🧠 **Quiz & Assessment System**
- **Multiple Quiz Formats**: Multiple choice, true/false, short answers
- **Automatic Grading**: Instant feedback for objective questions
- **Progress Analytics**: Detailed performance reports and statistics
- **Timer & Navigation**: Professional quiz interface with question navigation

### 💬 **Communication & Collaboration**
- **Student Forum**: Course-specific discussion boards for peer interaction
- **Direct Messaging**: Secure one-to-one communication
- **Notifications**: Real-time alerts for messages, assignments, and updates
- **Knowledge Sharing**: Students can ask questions and share insights

### 📊 **Dashboard & Analytics**
- **Professional Dashboard**: Rich content with statistics, recent activities, and deadlines
- **Performance Metrics**: Track academic progress and achievements
- **Activity Timeline**: Monitor learning activities and engagement

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB Atlas account
- npm or yarn package manager

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LMS
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install
   cd ..
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=your_mongodb_atlas_connection_string
   SECRET_KEY=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the application**
   ```bash
   # Development mode (both frontend and backend)
   npm run dev
   
   # Production mode
   npm run build:prod
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🏗️ **System Architecture**

### **Frontend (React.js)**
- **Modern UI Components**: Material-UI and React-Bootstrap
- **State Management**: Redux for global state
- **Routing**: React Router for navigation
- **Responsive Design**: Mobile-friendly interface

### **Backend (Node.js + Express)**
- **RESTful APIs**: Clean API endpoints
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based security
- **File Uploads**: Multer for handling file uploads
- **Cloud Storage**: Cloudinary integration

### **Database Schema**
- **Users**: Authentication, roles, and profile information
- **Courses**: Course content, modules, and materials
- **Quizzes**: Questions, answers, and results
- **Messages**: Communication and forum posts
- **Progress**: Learning analytics and achievements

## 📱 **User Interface**

### **Professional Design**
- **Color Scheme**: Mature, professional color palette
- **Typography**: Clean, readable fonts
- **Layout**: Intuitive navigation and organization
- **Responsiveness**: Works seamlessly on all devices

### **Key Pages**
- **Dashboard**: Overview of courses, activities, and progress
- **Quiz Center**: Take assessments and view results
- **Student Forum**: Interact with peers and share knowledge
- **Profile**: Manage personal information and preferences
- **Courses**: Browse and access learning materials

## 🔧 **Development Scripts**

```json
{
  "dev": "concurrently \"npm run server\" \"npm run client\"",
  "server": "nodemon server.js",
  "client": "cd client && set NODE_OPTIONS=--openssl-legacy-provider && npm start",
  "build": "cd client && set NODE_OPTIONS=--openssl-legacy-provider && npm run build",
  "build:prod": "cd client && set NODE_OPTIONS=--openssl-legacy-provider && npm run build && cd .. && npm start",
  "build:exe": "npm run build && pkg . --targets node18-win-x64 --output lms-app.exe"
}
```

## 🌐 **API Endpoints**

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### **Courses**
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course
- `GET /api/courses/:id` - Get course details

### **Quizzes**
- `GET /api/quizzes` - Get available quizzes
- `POST /api/quizzes/:id/submit` - Submit quiz answers
- `GET /api/quizzes/results` - Get quiz results

### **Forum**
- `GET /api/forum/posts` - Get forum posts
- `POST /api/forum/posts` - Create new post
- `POST /api/forum/posts/:id/comments` - Add comment

## 📊 **Features by User Role**

### **Student**
- ✅ Access enrolled courses
- ✅ Take quizzes and assessments
- ✅ Participate in forum discussions
- ✅ Track learning progress
- ✅ Communicate with peers and lecturers

### **Lecturer**
- ✅ Create and manage courses
- ✅ Upload learning materials
- ✅ Create quizzes and assignments
- ✅ Monitor student progress
- ✅ Engage in forum discussions

### **Administrator**
- ✅ Manage all users and courses
- ✅ System-wide analytics
- ✅ Content moderation
- ✅ System configuration

## 🚀 **Deployment**

### **Local Development**
```bash
npm run dev
```

### **Production Build**
```bash
npm run build:prod
```

### **Executable Creation**
```bash
npm run build:exe
```

## 🔒 **Security Features**

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Granular permission control
- **Input Validation**: Server-side validation for all inputs
- **Password Hashing**: Bcrypt encryption for user passwords
- **CORS Protection**: Cross-origin request security

## 📈 **Performance & Scalability**

- **Modular Architecture**: Easy to extend and maintain
- **Database Optimization**: Efficient queries and indexing
- **Caching**: Redis integration for improved performance
- **Load Balancing**: Ready for horizontal scaling

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 **Support**

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for the SEN Online Peer Learning Community**

*Empowering students and lecturers through technology-driven education*
