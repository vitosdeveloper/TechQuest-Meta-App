import { IEventPublisher } from './CreateUserUseCase';

export class CompleteLessonUseCase {
  constructor(
    private readonly prisma: any,
    private readonly eventPublisher: IEventPublisher
  ) {}

  async execute(userId: string, lessonId: string): Promise<void> {
    // 1. Salva evento no Outbox (Transacional)
    await this.prisma.outbox.create({
      data: {
        aggregateId: userId,
        eventType: 'LESSON_COMPLETED',
        payload: { userId, lessonId },
        published: false
      }
    });

    // 2. Best-effort publish agora mesmo
    try {
      await this.eventPublisher.publish('user-events', {
        type: 'LESSON_COMPLETED',
        data: { userId, lessonId }
      });
    } catch (e) {
      console.warn("Falha no Kafka, o Outbox Relay cuidará do envio mais tarde.");
    }
  }
}
