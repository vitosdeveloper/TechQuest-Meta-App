import 'dotenv/config';
import express from 'express';
import { CreateUserUseCase } from './application/CreateUserUseCase';
import { PrismaUserRepository } from './infrastructure/database/PrismaUserRepository';
import { KafkaEventPublisher } from './infrastructure/messaging/KafkaEventPublisher';
import { UserController } from './infrastructure/controllers/UserController';
import { PrismaClient } from '../prisma/generated/client';
import { OutboxRelay } from './infrastructure/jobs/OutboxRelay';
import { SaveKanbanUseCase } from './application/SaveKanbanUseCase';
import { CompleteLessonUseCase } from './application/CompleteLessonUseCase';
import { UserGrpcServer } from './infrastructure/grpc/UserGrpcServer';

const app = express();
app.use(express.json());

// ==========================================
// WIRING (Injeção de Dependências Manual)
// ==========================================
// Aqui nós instanciamos as dependências concretas da Infraestrutura
const prisma = new PrismaClient();
const userRepository = new PrismaUserRepository(prisma);
const eventPublisher = new KafkaEventPublisher();

// Injetamos as dependências no Caso de Uso (Aplicação)
const createUserUseCase = new CreateUserUseCase(userRepository, eventPublisher);
const saveKanbanUseCase = new SaveKanbanUseCase(prisma, eventPublisher);
const completeLessonUseCase = new CompleteLessonUseCase(prisma, eventPublisher);

// Passamos o caso de uso para o Controller (Apresentação)
const userController = new UserController(
  createUserUseCase,
  saveKanbanUseCase,
  completeLessonUseCase,
  prisma
);

// ==========================================
// ROTAS
// ==========================================
app.post('/', (req, res) => userController.create(req, res));
app.post(['/login', '/api/users/login'], (req, res) => userController.login(req, res));
app.post(['/:id/kanban', '/api/users/:id/kanban'], (req, res) => userController.saveKanbanState(req, res));
app.post(['/:id/complete-lesson', '/api/users/:id/complete-lesson'], (req, res) => userController.completeLesson(req, res));
app.get(['/:id', '/api/users/:id'], (req, res) => userController.getById(req, res));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'User Service UP (Clean Architecture)' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`🚀 User Service (Clean Arch + Outbox) rodando na porta ${PORT}`);
  
  // Inicia a conexão com o Mensageiro e o Banco
  await eventPublisher.connect();
  await prisma.$connect();
  
  // Inicia o job que protege a entrega dos eventos (Outbox Relay)
  const relay = new OutboxRelay(prisma, eventPublisher);
  relay.start();

  // Inicia o Servidor gRPC
  const grpcServer = new UserGrpcServer(prisma);
  grpcServer.start();
});
