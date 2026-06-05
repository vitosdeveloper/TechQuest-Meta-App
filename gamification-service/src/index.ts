import Fastify from 'fastify';
import { Kafka } from 'kafkajs';
import * as dotenv from 'dotenv';
import { PrismaClient } from '../prisma/generated/client';

dotenv.config();

import { calculateLevel, getTitle } from './utils/gamification';
export { calculateLevel, getTitle };

export const fastify = Fastify({ logger: true });
export const prisma = new PrismaClient();

// Configuração do Kafka
const kafka = new Kafka({
  clientId: 'gamification-service',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092']
});

// ==========================================
// Gamification Mechanics
// ==========================================

const lessonRewards: Record<string, number> = {
  'intro.lesson.md': 50,
  'agile.lesson.md': 80,
  'user-service.lesson.md': 100,
  'solid.lesson.md': 110,
  'devops.lesson.md': 120,
  'auth.lesson.md': 120,
  'ci.lesson.md': 120,
  'microfrontends.lesson.md': 130,
  'caching.lesson.md': 140,
  'tests.lesson.md': 150,
  'mensageria.lesson.md': 150,
  'observability.lesson.md': 150,
  'security.lesson.md': 160,
  'system-design.lesson.md': 170,
  'cloud-native.lesson.md': 180,
  'grpc-graphql.lesson.md': 190,
  'eda-advanced.lesson.md': 200,
  'ai-engineering.lesson.md': 250,
};

const consumer = kafka.consumer({ 
  groupId: 'gamification-group',
  maxWaitTimeInMs: 10000,
  heartbeatInterval: 10000,
  sessionTimeout: 60000
});
const producer = kafka.producer(); // Usado para enviar mensagens falhas para DLQ

async function startKafka() {
  let connected = false;
  while (!connected) {
    try {
      await producer.connect();
      await consumer.connect();
      connected = true;
      fastify.log.info("✅ Gamification Service conectado ao Kafka com sucesso!");
    } catch (error) {
      fastify.log.error("Erro ao conectar no Kafka. Tentando novamente em 5 segundos...");
      await new Promise(res => setTimeout(res, 5000));
    }
  }

  try {
    await consumer.subscribe({ topic: 'user-events', fromBeginning: true });
    
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (!message.value) return;
        
        let event;
        try {
          event = JSON.parse(message.value.toString());
        } catch(e) {
          fastify.log.error("Mensagem não é um JSON válido. Enviando para DLQ...");
          await sendToDLQ(message.value.toString(), 'INVALID_JSON');
          return;
        }

        // O Payload PRECISA ter um eventId (que no nosso caso mapearemos como o user.id para simplificar, 
        // mas num sistema real o evento teria seu próprio ID único. Vamos usar o offset do Kafka como fallback perfeito)
        const eventId = event.id || event.data?.id || `offset-${partition}-${message.offset}`;

        if (!eventId) {
          fastify.log.error("Mensagem sem ID rastreável. Ignorando.");
          return;
        }

        try {
          // ==========================================
          // 🛡️ IDEMPOTÊNCIA + TRANSAÇÃO
          // ==========================================
          await prisma.$transaction(async (tx) => {
            // 1. Checa se o evento já foi processado
            const alreadyProcessed = await tx.processedEvent.findUnique({ where: { eventId } });
            
            if (alreadyProcessed) {
              fastify.log.info(`♻️ [IDEMPOTÊNCIA] Evento ${eventId} já foi processado anteriormente. Ignorando.`);
              return; // Sai da transação sem fazer nada
            }

            // 2. Registra o evento como processado
            await tx.processedEvent.create({
              data: { eventId, type: event.type }
            });

            // 3. Executa a regra de negócio
            if (event.type === 'USER_CREATED') {
              const userId = event.data.id;
              
              // Upsert (Cria com 0XP inicial)
              const xpRecord = await tx.userXp.upsert({
                where: { userId },
                create: { userId, xp: 0, level: 1 },
                update: { xp: { increment: 0 } }
              });
              
              // Atualiza o nível
              const newLevel = calculateLevel(xpRecord.xp);
              if (newLevel > xpRecord.level) {
                 await tx.userXp.update({ where: { userId }, data: { level: newLevel } });
              }

              // ==========================================
              // CQRS: Notifica que o perfil gamificado mudou
              // ==========================================
              await producer.send({
                topic: 'gamification-events',
                messages: [{ value: JSON.stringify({ type: 'GAMIFICATION_UPDATED', userId, xp: xpRecord.xp, level: newLevel, title: getTitle(newLevel) }) }]
              });

              fastify.log.info(`🎉 Usuário ${userId} registrado no sistema de Gamificação. (Total: ${xpRecord.xp})`);
            } else if (event.type === 'KANBAN_SYNC') {
              const userId = event.data.userId;
              const kanbanState = event.data.kanbanState || {}; // Ex: { "intro.lesson.md": "done" }

              // Recalcula XP Absoluta baseada apenas nas missões concluídas
              let totalXp = 0;
              for (const [lessonId, status] of Object.entries(kanbanState)) {
                if (status === 'done') {
                  const reward = lessonRewards[lessonId] || 50;
                  totalXp += reward;
                }
              }

              const newLevel = calculateLevel(totalXp);

              const xpRecord = await tx.userXp.upsert({
                where: { userId },
                create: { userId, xp: totalXp, level: newLevel },
                update: { xp: totalXp, level: newLevel }
              });

              await producer.send({
                topic: 'gamification-events',
                messages: [{ value: JSON.stringify({ type: 'GAMIFICATION_UPDATED', userId, xp: totalXp, level: newLevel, title: getTitle(newLevel) }) }]
              });

              fastify.log.info(`🔄 [CQRS State Sync] Usuário ${userId} foi sincronizado para ${totalXp} XP (Nível ${newLevel}).`);
            }
          });
        } catch (error: any) {
          // ==========================================
          // ☠️ DEAD LETTER QUEUE (DLQ)
          // ==========================================
          fastify.log.error(`Erro ao processar evento ${eventId}. Enviando para DLQ...`);
          await sendToDLQ(message.value.toString(), error.message);
        }
      },
    });
  } catch (error) {
    fastify.log.error(error, 'Erro crítico no Kafka');
  }
}

async function sendToDLQ(payload: string, reason: string) {
  try {
    await producer.send({
      topic: 'user-events-dlq',
      messages: [
        { value: payload, headers: { errorReason: reason } }
      ]
    });
  } catch (err) {
    console.error("FALHA CATASTRÓFICA KAFKA: Salvando fisicamente em Disco (Ultimate Fallback)", err);
    const fs = require('fs');
    const path = require('path');
    const dlqPath = path.join(__dirname, '../../dlq_events.json');
    fs.appendFileSync(dlqPath, JSON.stringify({ timestamp: new Date(), payload, reason }) + '\n');
  }
}

// Rota Fastify para checar XP
fastify.get('/:userId', async (request, reply) => {
  const { userId } = request.params as { userId: string };
  
  const record = await prisma.userXp.findUnique({ where: { userId } });
  
  const xp = record?.xp || 0;
  const level = record?.level || 1;
  const title = getTitle(level);
  
  return { 
    userId, 
    xp, 
    level,
    title
  };
});

// Rota Fastify para sincronização síncrona forçada (usada no Login)
fastify.post('/sync', async (request, reply) => {
  const { userId, kanbanState } = request.body as any;
  if (!userId) return reply.status(400).send({ error: 'userId is required' });

  // Recalcula XP Absoluta baseada apenas nas missões concluídas
  let totalXp = 0;
  if (kanbanState) {
    for (const [lessonId, status] of Object.entries(kanbanState)) {
      if (status === 'done') {
        const reward = lessonRewards[lessonId] || 50;
        totalXp += reward;
      }
    }
  }

  const newLevel = calculateLevel(totalXp);
  const title = getTitle(newLevel);

  const xpRecord = await prisma.userXp.upsert({
    where: { userId },
    create: { userId, xp: totalXp, level: newLevel },
    update: { xp: totalXp, level: newLevel }
  });

  // Dispara evento CQRS silencioso
  try {
    const tempProducer = kafka.producer();
    await tempProducer.connect();
    await tempProducer.send({
      topic: 'gamification-events',
      messages: [{ value: JSON.stringify({ type: 'GAMIFICATION_UPDATED', userId, xp: totalXp, level: newLevel, title }) }]
    });
    await tempProducer.disconnect();
  } catch(e) {
    request.log.error('Erro ao notificar CQRS no /sync');
  }

  return { userId, xp: totalXp, level: newLevel, title };
});

export const startServer = async () => {
  try {
    await prisma.$connect();
    await startKafka();
    const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3003;
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    fastify.log.info(`🎮 Gamification Service (Prisma + Resiliência) rodando na porta ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}
