#!/bin/bash
echo "🛑 Parando containers..."
docker-compose down

echo "🗑️ Removendo volumes de banco de dados (Zerar ambiente)..."
docker volume rm learning-app_postgres_data learning-app_mongodb_data learning-app_grafana_data learning-app_prometheus_data 2>/dev/null || true

echo "🔥 Removendo pastas node_modules e dist (Limpeza pesada)..."
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
find . -name "dist" -type d -prune -exec rm -rf '{}' +

echo "✅ Ambiente resetado com sucesso! Rode 'npm install' e 'docker-compose up -d' novamente."
