@echo off
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-site.ps1"
if errorlevel 1 (
  echo.
  echo Failed to start CloneX. Make sure Node.js is installed.
  pause
)
