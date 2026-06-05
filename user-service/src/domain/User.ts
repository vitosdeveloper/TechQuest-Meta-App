export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly createdAt: Date
  ) {}

  // Lógica de domínio rica ficaria aqui (Domain-Driven Design)
  public isValid(): boolean {
    return this.email.includes('@');
  }
}

// Interface que a camada de Infraestrutura vai implementar (Inversão de Dependência)
export interface IUserRepository {
  save(user: User): Promise<void>;
  saveWithOutbox(user: User, eventType: string, eventPayload: any): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}
