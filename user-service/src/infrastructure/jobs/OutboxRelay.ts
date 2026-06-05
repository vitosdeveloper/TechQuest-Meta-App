import cron from 'node-cron';
import { PrismaClient } from '../../../prisma/generated/client';
import { IEventPublisher } from '../../application/CreateUserUseCase';

export class OutboxRelay {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly eventPublisher: IEventPublisher
  ) {}

  start() {
    console.log('🔄 Outbox Relay iniciado. Varrendo eventos pendentes a cada 10 segundos...');
    
    cron.schedule('*/10 * * * * *', async () => {
      try {
        const pendingEvents = await this.prisma.outbox.findMany({
          where: { published: false },
          take: 50 // processa em lotes
        });

        if (pendingEvents.length > 0) {
          console.log(`📦 [OUTBOX] Encontrados ${pendingEvents.length} eventos pendentes. Enviando pro Kafka...`);
        }

        for (const event of pendingEvents) {
          try {
            // Tenta enviar pro Kafka
            await this.eventPublisher.publish('user-events', {
              type: event.eventType,
              data: event.payload
            });

            // Marca como processado com sucesso
            await this.prisma.outbox.update({
              where: { id: event.id },
              data: { published: true }
            });
            console.log(`✅ [OUTBOX] Evento ${event.id} processado com sucesso.`);
          } catch (error) {
            console.error(`❌ [OUTBOX] Falha ao enviar evento ${event.id} pro Kafka. Será tentado novamente.`, error);
          }
        }
      } catch (err) {
        console.error('Erro crítico no Outbox Relay:', err);
      }
    });
  }
}
