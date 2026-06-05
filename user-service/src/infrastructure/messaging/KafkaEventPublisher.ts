import { IEventPublisher } from '../../application/CreateUserUseCase';
import { producer, connectProducer } from '../../kafka/producer';

export class KafkaEventPublisher implements IEventPublisher {
  private isConnected = false;

  async connect(): Promise<void> {
    if (!this.isConnected) {
      await connectProducer();
      this.isConnected = true;
    }
  }

  async publish(topic: string, event: any): Promise<void> {
    await this.connect();
    
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(event) }],
    });
  }
}
