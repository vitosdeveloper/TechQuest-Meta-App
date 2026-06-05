import { Resolver, Query, Args } from '@nestjs/graphql';
import { GamificationData, User } from './User.type';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';

// Carrega o arquivo Proto
const PROTO_PATH = path.resolve(__dirname, '../../proto/user.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true, longs: String, enums: String, defaults: true, oneofs: true
});
const userProto: any = grpc.loadPackageDefinition(packageDefinition).userpackage;

// Conecta ao User Service via gRPC
const grpcClient = new userProto.UserService(
  process.env.USER_SERVICE_GRPC_URL || 'localhost:50051',
  grpc.credentials.createInsecure()
);

@Resolver(() => User)
export class UserResolver {
  
  @Query(() => User, { nullable: true })
  async user(@Args('id') id: string): Promise<User | null> {
    try {
      // ==========================================
      // CQRS: Tenta ler o modelo otimizado (Read Model no MongoDB)
      // ==========================================
      try {
        const queryUrl = process.env.QUERY_SERVICE_URL || 'http://localhost:3007';
        const queryRes = await fetch(`${queryUrl}/${id}`);
        if (queryRes.ok) {
          const data = await queryRes.json();
          return {
            id: data.userId,
            name: data.name || (data.email ? data.email.split('@')[0] : 'Desconhecido'),
            email: data.email || 'desconhecido@techquest.com',
            gamification: data.gamification || { xp: 0, level: 1, title: 'Iniciante' }
          };
        }
      } catch (err) {
        console.warn('Query Service indisponível, ativando Fallback para serviços primários...');
      }

      // ==========================================
      // FALLBACK: Eventual Consistency miss (Busca direto nas fontes via gRPC)
      // ==========================================
      const userData: any = await new Promise((resolve, reject) => {
        grpcClient.GetUser({ id }, (err: any, response: any) => {
          if (err) reject(err);
          else resolve(response);
        });
      });

      let gamification: GamificationData = { xp: 0, level: 1, title: 'Iniciante' };
      try {
        const gamificationUrl = process.env.GAMIFICATION_SERVICE_URL || 'http://localhost:3003';
        const xpRes = await fetch(`${gamificationUrl}/${id}`);
        if (xpRes.ok) {
          gamification = await xpRes.json();
        }
      } catch (err) {
        console.warn('Falha ao obter gamification no fallback', err);
      }

      // 3. Schema Stitching/BFF: Combina e retorna pro frontend
      return {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        gamification
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
