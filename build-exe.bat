@echo off
echo ========================================
echo LMS Executable Builder
echo ========================================
echo.

echo Building frontend...
npm run build
if %errorlevel% neq 0 (
    echo Failed to build frontend
    pause
    exit /b 1
)

echo.
echo Building executable...
npm run build:exe
if %errorlevel% neq 0 (
    echo Failed to build executable
    pause
    exit /b 1
)

echo.
echo ========================================
echo Executable built successfully!
echo ========================================
echo.
echo Your executable is ready: lms-app.exe
echo.
echo To run on another system:
echo 1. Copy lms-app.exe to the target system
echo 2. Copy the config.env.example file
echo 3. Update the environment variables
echo 4. Run lms-app.exe
echo.
pause
