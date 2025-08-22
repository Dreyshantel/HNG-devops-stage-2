@echo off
echo ========================================
echo    Launching LMS Application
echo ========================================
echo.
echo Starting backend server...
start "Backend Server" cmd /k "npm run server"

echo Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo Starting frontend client...
start "Frontend Client" cmd /k "npm run client"

echo.
echo ========================================
echo    Application Status:
echo ========================================
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Both services are starting in separate windows
echo Check the windows for any error messages
echo.
echo Press any key to exit this launcher...
pause >nul
