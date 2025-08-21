@echo off
echo ========================================
echo LMS Quick Start
echo ========================================
echo.

echo Starting the application...
echo.

echo Option 1: Start with local MongoDB (if installed)
echo Option 2: Use MongoDB Atlas (recommended for distribution)
echo.

echo For immediate testing, we'll try to start the server...
echo If MongoDB is not available, you'll need to:
echo 1. Install MongoDB locally, OR
echo 2. Set up MongoDB Atlas (free tier)
echo.

echo Starting server...
npm run server

pause
