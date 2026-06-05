import { User, IUserRepository } from '../../domain/User';

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email) || null;
  }

  async saveWithOutbox(user: User, event: any): Promise<void> {
    this.users.push(user);
    // In-memory mock: We don't really process the outbox event here
    console.log('[InMemory] Saved user and mocked outbox event:', event);
  }
}
