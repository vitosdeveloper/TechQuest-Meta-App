import { PrismaClient } from '../../../prisma/generated/client';
import { User, IUserRepository } from '../../domain/User';

export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        password: user.passwordHash
      },
    });
  }

  // Unit of Work nativo do Prisma para o Outbox Pattern
  async saveWithOutbox(user: User, eventType: string, eventPayload: any): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      // 1. Salva o usuário
      await tx.user.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          password: user.passwordHash
        },
      });

      // 2. Salva o evento no Outbox
      await tx.outbox.create({
        data: {
          aggregateId: user.id,
          eventType: eventType,
          payload: eventPayload
        }
      });
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return new User(user.id, user.name, user.email, user.password, user.createdAt);
  }

  async updateKanbanState(userId: string, kanbanState: any): Promise<void> {
    await this.prisma.user.updateMany({
      where: { id: userId },
      data: { kanbanState }
    });
  }
}
