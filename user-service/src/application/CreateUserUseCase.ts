import { User, IUserRepository } from '../domain/User';

export interface IEventPublisher {
  publish(topic: string, event: any): Promise<void>;
}

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly eventPublisher: IEventPublisher
  ) {}

  async execute(name: string, email: string, passwordHash: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('E-mail já está em uso.');
    }

    const user = new User(
      Math.random().toString(36).substr(2, 9), // Simulação de UUID
      name,
      email,
      passwordHash,
      new Date()
    );

    if (!user.isValid()) {
      throw new Error('E-mail inválido.');
    }

    // 3. Persistência Transacional (Usuário + Evento no Outbox)
    // Isso garante que se o Kafka cair, não perdemos o evento.
    await this.userRepository.saveWithOutbox(
      user, 
      'USER_CREATED', 
      { id: user.id, name: user.name, email: user.email }
    );

    // Opcional: Ainda podemos publicar pro Kafka de forma 'best effort' agora,
    // mas o Job (Relay) que vai garantir a entrega do Outbox depois.
    try {
      await this.eventPublisher.publish('user-events', {
        type: 'USER_CREATED',
        data: { id: user.id, name: user.name, email: user.email }
      });
      // Importante: No mundo real, você atualizaria o status do Outbox pra PROCESSED aqui,
      // mas deixaremos o Relay Cron fazer o trabalho pesado!
    } catch(e) {
      console.warn("Falha no Kafka, o Outbox Relay cuidará do envio mais tarde.");
    }

    return user;
  }
}
