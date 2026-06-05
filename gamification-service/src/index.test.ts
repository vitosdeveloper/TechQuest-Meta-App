import supertest from 'supertest';
import { fastify, prisma } from './index';

// Moca o PrismaClient
jest.mock('../prisma/generated/client', () => {
  const mPrismaClient = {
    userXp: {
      findUnique: jest.fn(),
    },
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe('Gamification Service API', () => {
  afterAll(async () => {
    await fastify.close();
  });

  it('deve retornar 0 XP se o usuário não for encontrado', async () => {
    // Simula usuário não encontrado no banco
    (prisma.userXp.findUnique as jest.Mock).mockResolvedValue(null);

    await fastify.ready();
    const response = await supertest(fastify.server)
      .get('/usuario-inexistente')
      .expect(200);

    expect(response.body).toEqual({
      userId: 'usuario-inexistente',
      xp: 0,
      level: 1,
    });
  });

  it('deve retornar o XP correto do usuário', async () => {
    // Simula usuário com 150 XP e Nível 2
    (prisma.userXp.findUnique as jest.Mock).mockResolvedValue({
      userId: 'user-123',
      xp: 150,
      level: 2
    });

    await fastify.ready();
    const response = await supertest(fastify.server)
      .get('/user-123')
      .expect(200);

    expect(response.body).toEqual({
      userId: 'user-123',
      xp: 150,
      level: 2,
    });
  });
});
