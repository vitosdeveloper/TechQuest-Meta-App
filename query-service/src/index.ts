import express from 'express';
import mongoose from 'mongoose';
import { Kafka } from 'kafkajs';
import cors from 'cors';

const app = express();
app.use(express.json());

// ==========================================
// Mongoose / MongoDB (Read Model)
// ==========================================
const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  gamification: {
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    title: { type: String, default: 'Iniciante' }
  },
  lastUpdated: { type: Date, default: Date.now }
});

const UserReadModel = mongoose.model('User', userSchema);

// ==========================================
// Kafka Consumer (Sincronização CQRS)
// ==========================================
const kafka = new Kafka({
  clientId: 'query-service',
  brokers: [(process.env.KAFKA_BROKER || 'localhost:9092')]
});

const consumer = kafka.consumer({ 
  groupId: 'query-cqrs-group',
  maxWaitTimeInMs: 10000,
  heartbeatInterval: 10000,
  sessionTimeout: 60000
});

async function startKafka() {
  await consumer.connect();
  // Escuta os eventos tanto do User Service quanto do Gamification
  await consumer.subscribe({ topic: 'user-events', fromBeginning: true });
  await consumer.subscribe({ topic: 'gamification-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (!message.value) return;
      
      const event = JSON.parse(message.value.toString());
      console.log(`[CQRS] Recebido evento no tópico ${topic}: ${event.type}`);

      try {
        if (event.type === 'USER_CREATED') {
          // Salva ou atualiza no MongoDB
          await UserReadModel.findOneAndUpdate(
            { userId: event.data.id },
            { 
              name: event.data.name, 
              email: event.data.email, 
              lastUpdated: new Date() 
            },
            { upsert: true, new: true }
          );
          console.log(`[CQRS] Read Model do usuário ${event.data.id} atualizado (User Info).`);
        } 
        else if (event.type === 'GAMIFICATION_UPDATED') {
          // Vem do Gamification Service
          await UserReadModel.findOneAndUpdate(
            { userId: event.userId },
            { 
              gamification: {
                xp: event.xp,
                level: event.level,
                title: event.title
              },
              lastUpdated: new Date()
            },
            { upsert: true, new: true }
          );
          console.log(`[CQRS] Read Model do usuário ${event.userId} atualizado (Gamification).`);
        }
      } catch (err) {
        console.error(`[CQRS] Erro ao materializar view:`, err);
      }
    }
  });
}

// ==========================================
// Rotas de Consulta (Leitura Otimizada)
// ==========================================
app.get('/:id', async (req, res) => {
  try {
    const user = await UserReadModel.findOne({ userId: req.params.id });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado no Read Model' });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao consultar MongoDB' });
  }
});

// ==========================================
// Inicialização
// ==========================================
const PORT = process.env.PORT || 3007;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://techquest:techquest_password@localhost:27017/techquest_query_db?authSource=admin';

async function bootstrap() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(`🍃 [MongoDB] Query Service conectado.`);
    
    await startKafka();
    console.log(`🎧 [Kafka] Query Service escutando eventos para CQRS.`);
    
    app.listen(PORT, () => {
      console.log(`🚀 Query Service (CQRS Read Model) rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error('Falha crítica ao iniciar Query Service', err);
    process.exit(1);
  }
}

bootstrap();
