import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilita o CORS para o Frontend Web
  app.enableCors();

  // Segurança com Helmet (Desabilita Content-Security-Policy temporariamente para MFE/GraphQL Playground funcionar)
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
  }));

  const PORT = process.env.PORT || 3001;

  // Interceptor global para envio de logs assíncronos ao Observability Service
  app.use((req: any, res: any, next: () => void) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      if (req.originalUrl.includes('/api/')) {
        fetch('http://localhost:3006/log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            source: 'api-gateway',
            level: res.statusCode >= 400 ? 'error' : 'info',
            message: `[Gateway] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`,
            details: { method: req.method, url: req.originalUrl, status: res.statusCode, durationMs: duration }
          })
        }).catch(() => { /* falha silenciosa se o observability estiver down */ });
      }
    });
    next();
  });

  // --- AUTENTICAÇÃO JWT ---
  const jwt = require('jsonwebtoken');
  const JWT_SECRET = process.env.JWT_SECRET || 'secret-senior-techquest';

  app.use('/api', (req: any, res: any, next: () => void) => {
    // Permite rotas públicas
    if (
      req.originalUrl.includes('/api/users/login') || 
      (req.originalUrl === '/api/users' && req.method === 'POST') ||
      req.originalUrl === '/api/'
    ) {
      return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Acesso Negado: Token JWT Ausente.' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // Repassa pro gateway
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Acesso Negado: Token JWT Inválido ou Expirado.' });
    }
  });

  await app.listen(PORT);
  console.log(`🛡️ API Gateway (NestJS) rodando na porta ${PORT}. Roteando serviços via AppModule...`);
}
bootstrap();
