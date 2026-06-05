#!/bin/bash
echo "=================================================="
echo "TechQuest - Full Environment Cleanup"
echo "=================================================="
echo ""

echo "Stopping and removing Docker containers and volumes..."
docker compose down -v

echo ""
echo "Deleting node_modules and dist folders in all services..."
find . -type d -name "node_modules" -prune -exec rm -rf '{}' +
find . -type d -name "dist" -prune -exec rm -rf '{}' +
find . -type d -name "build" -prune -exec rm -rf '{}' +

echo ""
echo "Cleanup complete! You can now run 'docker compose up --build' for a fresh start."
