import { Kafka } from 'kafkajs';

const brokers = process.env.KAFKA_BROKERS ? process.env.KAFKA_BROKERS.split(',') : ['localhost:9092'];

export const kafkaClient = new Kafka({
  clientId: 'techquest-user-service',
  brokers: brokers,
});
