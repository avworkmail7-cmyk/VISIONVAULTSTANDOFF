@echo off
title Life Proof AI
cd /d "%~dp0"

echo Installing dependencies...
call npm install
if errorlevel 1 (
    echo.
    echo npm install failed. Check that Node.js is installed.
    pause
    exit /b 1
)

echo.
echo Starting Life Proof AI...
echo Browser will open at http://localhost:5173
echo Close this window to stop the server.
echo.

start /b cmd /c "timeout /t 4 /nobreak >nul && start http://localhost:5173"

call npm run dev

pause
