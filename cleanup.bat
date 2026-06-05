@echo off
echo ==================================================
echo TechQuest - Full Environment Cleanup
echo ==================================================
echo.
echo Stopping and removing Docker containers and volumes...
docker compose down -v

echo.
echo Deleting node_modules and dist folders in all services...
FOR /d /r . %%d in (node_modules,dist,build) DO (
  IF EXIST "%%d" (
    echo Deleting %%d
    rd /s /q "%%d"
  )
)

echo.
echo Cleanup complete! You can now run "npm install" or "docker compose up --build" for a fresh start.
pause
