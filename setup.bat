@echo off
echo ========================================
echo LMS Project Setup Script
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    echo Make sure to check "Add to PATH" during installation
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo.

echo Checking npm version:
npm --version
echo.

echo Installing backend dependencies...
npm install
if %errorlevel% neq 0 (
    echo Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo Installing frontend dependencies...
cd client
npm install
if %errorlevel% neq 0 (
    echo Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo ========================================
echo Setup completed successfully!
echo ========================================
echo.
echo To start the development server:
echo   npm run dev
echo.
echo To start only the backend:
echo   npm run server
echo.
echo To start only the frontend:
echo   npm run client
echo.
pause

