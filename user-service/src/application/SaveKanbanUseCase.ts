import { IEventPublisher } from './CreateUserUseCase';

export class SaveKanbanUseCase {
  constructor(
    private readonly prisma: any,
    private readonly eventPublisher: IEventPublisher
  ) {}

  async execute(userId: string, kanbanState: any): Promise<void> {
    // 1. Transactional Outbox: Salva State + Evento simultaneamente
    await this.prisma.$transaction(async (tx: any) => {
      await tx.user.upsert({
        where: { id: userId },
        create: { id: userId, name: 'Admin', email: 'admin@techquest.com', password: '123', kanbanState },
        update: { kanbanState }
      });

      await tx.outbox.create({
        data: {
          aggregateId: userId,
          eventType: 'KANBAN_SYNC',
          payload: { userId, kanbanState },
          published: false
        }
      });
    });

    // 2. Best-effort publish imediato para UI parecer instantânea
    try {
      await this.eventPublisher.publish('user-events', {
        type: 'KANBAN_SYNC',
        data: { userId, kanbanState }
      });
    } catch (e) {
      console.warn("Falha no Kafka, o Outbox Relay cuidará do KANBAN_SYNC mais tarde.");
    }
  }
}
