@echo off
setlocal
title One-Click GitHub Push
cd /d "%~dp0"

echo.
echo One-click update for VISIONVAULTSTANDOFF...
echo.

git --version >nul 2>&1
if errorlevel 1 (
    echo Git is not installed or not in PATH. Install from https://git-scm.com/download/win
    pause
    exit /b 1
)

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo This folder is not a git repository.
    echo Open the correct project folder and try again.
    pause
    exit /b 1
)

git remote get-url origin >nul 2>&1
if errorlevel 1 (
    git remote add origin https://github.com/avworkmail7-cmyk/VISIONVAULTSTANDOFF.git
) else (
    git remote set-url origin https://github.com/avworkmail7-cmyk/VISIONVAULTSTANDOFF.git
)

git add .

git diff --cached --quiet
if not errorlevel 1 (
    echo No changes to commit. Already up to date.
    echo.
    pause
    exit /b 0
)

set "MSG=Update %date% %time%"
git commit -m "%MSG%"
if errorlevel 1 (
    echo Commit failed.
    pause
    exit /b 1
)

git push -u origin main
if errorlevel 1 (
    echo Push failed. You may need to sign in to GitHub.
    pause
    exit /b 1
)

echo.
echo Success: changes pushed to GitHub.
pause
endlocal
