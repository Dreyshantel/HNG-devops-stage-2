# LMS Project Setup Script
Write-Host "========================================" -ForegroundColor Green
Write-Host "LMS Project Setup Script" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Check Node.js installation
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    Write-Host "Make sure to check 'Add to PATH' during installation" -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

# Check npm version
try {
    $npmVersion = npm --version
    Write-Host "npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "npm is not available" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
try {
    npm install
    Write-Host "Backend dependencies installed successfully" -ForegroundColor Green
} catch {
    Write-Host "Failed to install backend dependencies" -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

Write-Host ""

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
try {
    Set-Location client
    npm install
    Set-Location ..
    Write-Host "Frontend dependencies installed successfully" -ForegroundColor Green
} catch {
    Write-Host "Failed to install frontend dependencies" -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Setup completed successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "To start the development server:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "To start only the backend:" -ForegroundColor Cyan
Write-Host "  npm run server" -ForegroundColor White
Write-Host ""
Write-Host "To start only the frontend:" -ForegroundColor Cyan
Write-Host "  npm run client" -ForegroundColor White
Write-Host ""

Read-Host "Press Enter to continue"

