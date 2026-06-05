import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from './graphql/User.resolver';
import { ThrottlerModule } from '@nestjs/throttler';
import { GqlThrottlerGuard } from './graphql/gql-throttler.guard';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: '/graphql',
      context: ({ req, res }: any) => ({ req, res }),
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 100, // Máximo de 100 requisições por minuto
        }
      ],
      storage: new ThrottlerStorageRedisService(process.env.REDIS_URL || 'redis://127.0.0.1:6379'),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    UserResolver,
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(createProxyMiddleware({ 
        target: process.env.COURSE_SERVICE_URL || 'http://127.0.0.1:3002', 
        changeOrigin: true,
        pathRewrite: { '^/api/lessons': '' },
        on: { proxyReq: fixRequestBody }
      }))
      .forRoutes('/api/lessons', '/api/lessons/*path', '/api/files', '/api/files/*path');

    consumer
      .apply(createProxyMiddleware({ 
        target: process.env.GAMIFICATION_SERVICE_URL || 'http://127.0.0.1:3003', 
        changeOrigin: true,
        on: { proxyReq: fixRequestBody }
      }))
      .forRoutes('/api/xp', '/api/xp/*path');

    consumer
      .apply(createProxyMiddleware({ 
        target: process.env.AI_SERVICE_URL || 'http://127.0.0.1:3004', 
        changeOrigin: true,
        on: { proxyReq: fixRequestBody }
      }))
      .forRoutes('/api/ai', '/api/ai/*path');

    consumer
      .apply(createProxyMiddleware({ 
        target: process.env.USER_SERVICE_URL || 'http://127.0.0.1:3000', 
        changeOrigin: true,
        on: { proxyReq: fixRequestBody }
      }))
      .forRoutes('/api/users', '/api/users/*path');
  }
}
