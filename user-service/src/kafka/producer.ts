import { kafkaClient } from './client';

export const producer = kafkaClient.producer();

export async function connectProducer() {
  await producer.connect();
  console.log('Kafka Producer connected successfully');
}

export async function disconnectProducer() {
  await producer.disconnect();
}

export async function publishUserCreatedEvent(user: any) {
  try {
    await producer.send({
      topic: 'user-events',
      messages: [
        {
          key: String(user.id),
          value: JSON.stringify({
            eventType: 'USER_CREATED',
            timestamp: new Date().toISOString(),
            payload: user
          }),
        },
      ],
    });
    console.log(`Event USER_CREATED published for user ID: ${user.id}`);
  } catch (error) {
    console.error('Error publishing USER_CREATED event', error);
  }
}
