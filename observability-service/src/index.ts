import fastify from 'fastify';
import cors from '@fastify/cors';
import { Kafka } from 'kafkajs';
import { EventEmitter } from 'events';

const server = fastify({ logger: true });
const eventEmitter = new EventEmitter();

server.register(cors, {
  origin: '*',
});

const kafka = new Kafka({
  clientId: 'observability-service',
  brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
});

const consumer = kafka.consumer({ 
  groupId: 'observability-group',
  maxWaitTimeInMs: 10000,
  heartbeatInterval: 10000,
  sessionTimeout: 60000
});

// Mantemos um histórico na memória para enviar aos clientes recém-conectados
const logHistory: any[] = [];
const MAX_HISTORY = 50;

async function runKafka() {
  await consumer.connect();
  // Inscreve-se em todos os tópicos conhecidos
  await consumer.subscribe({ topic: 'user-events', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (!message.value) return;
      const data = JSON.parse(message.value.toString());
      
      const logEntry = {
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toISOString(),
        topic,
        data,
      };

      logHistory.push(logEntry);
      if (logHistory.length > MAX_HISTORY) logHistory.shift();

      // Dispara evento interno para o SSE
      eventEmitter.emit('new-log', logEntry);
    },
  });
}

// Endpoint SSE (Server-Sent Events)
server.get('/stream', (req, reply) => {
  reply.raw.setHeader('Content-Type', 'text/event-stream');
  reply.raw.setHeader('Cache-Control', 'no-cache');
  reply.raw.setHeader('Connection', 'keep-alive');
  reply.raw.setHeader('Access-Control-Allow-Origin', '*');
  reply.raw.flushHeaders(); // Envia os headers imediatamente

  // Envia o histórico assim que o cliente conectar
  reply.raw.write(`data: ${JSON.stringify({ type: 'history', logs: logHistory })}\n\n`);

  const onNewLog = (logEntry: any) => {
    reply.raw.write(`data: ${JSON.stringify({ type: 'live', log: logEntry })}\n\n`);
  };

  eventEmitter.on('new-log', onNewLog);

  // Limpeza quando o cliente desconectar
  req.raw.on('close', () => {
    eventEmitter.removeListener('new-log', onNewLog);
  });
});

// Endpoint POST para serviços enviarem logs HTTP (caso não usem Kafka)
server.post('/log', async (req, reply) => {
  const { source, level, message, details } = req.body as any;
  
  const logEntry = {
    id: Math.random().toString(36).substring(7),
    timestamp: new Date().toISOString(),
    topic: `http-log-${source}`,
    data: { level, message, details }
  };

  logHistory.push(logEntry);
  if (logHistory.length > MAX_HISTORY) logHistory.shift();

  eventEmitter.emit('new-log', logEntry);
  return { status: 'received' };
});

const start = async () => {
  try {
    await runKafka();
    await server.listen({ port: 3006, host: '0.0.0.0' });
    console.log('👁️ Observability Service rodando na porta 3006');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
