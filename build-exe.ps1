# LMS Executable Builder
Write-Host "========================================" -ForegroundColor Green
Write-Host "LMS Executable Builder" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Build frontend
Write-Host "Building frontend..." -ForegroundColor Yellow
try {
    npm run build
    Write-Host "Frontend built successfully" -ForegroundColor Green
} catch {
    Write-Host "Failed to build frontend" -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

Write-Host ""

# Build executable
Write-Host "Building executable..." -ForegroundColor Yellow
try {
    npm run build:exe
    Write-Host "Executable built successfully" -ForegroundColor Green
} catch {
    Write-Host "Failed to build executable" -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Executable built successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your executable is ready: lms-app.exe" -ForegroundColor Cyan
Write-Host ""
Write-Host "To run on another system:" -ForegroundColor White
Write-Host "1. Copy lms-app.exe to the target system" -ForegroundColor White
Write-Host "2. Copy the config.env.example file" -ForegroundColor White
Write-Host "3. Update the environment variables" -ForegroundColor White
Write-Host "4. Run lms-app.exe" -ForegroundColor White
Write-Host ""

Read-Host "Press Enter to continue"
