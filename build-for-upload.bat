@echo off
title Build Life Proof AI for upload
cd /d "%~dp0"

echo.
echo Building the website...
echo.
call npm install
if errorlevel 1 (
    echo.
    echo npm install failed. Make sure Node.js is installed from https://nodejs.org
    pause
    exit /b 1
)

call npm run build
if errorlevel 1 (
    echo.
    echo Build failed.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   BUILD DONE
echo ========================================
echo.
echo Next steps:
echo 1. Open https://app.netlify.com/drop in your browser
echo 2. Drag the "dist" folder onto the page
echo    (It's in this folder: %~dp0dist)
echo 3. Netlify will give you a live link for your site
echo.
echo Opening the dist folder and Netlify Drop...
echo.
start "" "%~dp0dist"
start "" "https://app.netlify.com/drop"
pause
