Write-Host "🧹 Iniciando Protocolo de Limpeza Profunda (TechQuest V2)" -ForegroundColor Cyan

Write-Host "1. Derrubando Containers e Volumes do Docker..." -ForegroundColor Yellow
docker-compose down -v
docker system prune -f --volumes

Write-Host "2. Apagando pastas node_modules e dist..." -ForegroundColor Yellow
$folders = @("node_modules", "dist", ".turbo")
$services = @(".", "api-gateway", "user-service", "course-service", "gamification-service", "ai-service", "frontend")

foreach ($service in $services) {
    foreach ($folder in $folders) {
        $target = Join-Path $service $folder
        if (Test-Path $target) {
            Write-Host "   Removendo $target..."
            Remove-Item -Recurse -Force $target -ErrorAction SilentlyContinue
        }
    }
}

Write-Host "✨ Limpeza concluída! Você pode rodar 'npm install' novamente para recomeçar do zero." -ForegroundColor Green
