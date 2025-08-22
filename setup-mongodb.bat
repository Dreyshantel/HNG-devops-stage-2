@echo off
echo ========================================
echo    LMS MongoDB Atlas Setup Helper
echo ========================================
echo.
echo This script will help you set up MongoDB Atlas
echo.
echo Step 1: Open MONGODB_ATLAS_SETUP.md for detailed instructions
echo Step 2: Update LMS/config/atlas.js with your Atlas credentials
echo Step 3: Run this script again to launch the application
echo.
echo Press any key to open the setup guide...
pause >nul
start MONGODB_ATLAS_SETUP.md

echo.
echo ========================================
echo    Quick Atlas Setup Steps:
echo ========================================
echo 1. Go to: https://www.mongodb.com/atlas
echo 2. Create free account and cluster
echo 3. Add database user (username + password)
echo 4. Whitelist your IP (0.0.0.0/0 for development)
echo 5. Copy connection string
echo 6. Update LMS/config/atlas.js
echo.
echo After setup, run: npm run dev
echo.
pause
