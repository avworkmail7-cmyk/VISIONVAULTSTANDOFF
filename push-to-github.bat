@echo off
title Push to GitHub
cd /d "%~dp0"

echo.
echo Pushing Life Proof AI to GitHub (ailife repo)...
echo.

git init
if errorlevel 1 (
    echo Git is not installed or not in PATH. Install from https://git-scm.com/download/win
    pause
    exit /b 1
)

git add .
git commit -m "Initial commit: Vite + React website"
git branch -M main
git remote add origin https://github.com/avworkmail7-cmyk/ailife.git
git push -u origin main

echo.
pause
