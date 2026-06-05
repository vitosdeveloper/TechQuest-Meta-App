# 🏛️ Arquitetura Limpa (Clean Architecture) e APIs

No início da carreira, a maior preocupação de um desenvolvedor é "Fazer Funcionar". Colocar as queries SQL dentro da rota do Express resolve o problema rápido. Porém, quando o sistema cresce para 100.000 linhas de código, cada alteração no banco de dados quebra o sistema inteiro. É aqui que os Arquitetos entram em ação.

## 1. O Que É e o Problema que Resolve

A **Clean Architecture** (criada por Robert C. Martin / Uncle Bob) baseia-se em um princípio fundamental: a Regra da Dependência.
O coração da sua aplicação (as Regras de Negócio) não pode depender de frameworks, bibliotecas externas ou bancos de dados. As dependências devem sempre apontar de "fora" para "dentro".

Isso resolve o problema do **Acoplamento Tecnológico**. Se amanhã o seu CTO decidir trocar o banco de dados do PostgreSQL para o MongoDB, ou o framework web do Express para o Fastify, as suas Regras de Negócio (Casos de Uso e Entidades) não precisarão mudar nem uma vírgula!

### Dicionário Sênior
- **IoC (Inversion of Control):** Padrão onde o fluxo da aplicação inverte quem chama quem. Em vez do seu código chamar a biblioteca de banco de dados, o framework chama o seu código injetando a biblioteca nele.
- **DI (Dependency Injection):** Técnica para atingir a IoC. Você passa dependências (como conexões de banco) pelo construtor da classe, em vez de instanciá-las lá dentro com `new PrismaClient()`.
- **Anemic Domain Model:** Anti-pattern. Ocorre quando você cria "Entidades" vazias (só com Getters/Setters) e joga toda a regra de validação nos Serviços. Em OOP Sênior (Rich Domain), a classe `User` possui métodos próprios de regra como `user.changePassword()`.

## 2. Vantagens e Desvantagens (Trade-offs)

| Recurso | Sem Clean Arch (Spaghetti) 🍝 | Com Clean Arch 🏛️ |
| :--- | :--- | :--- |
| **Velocidade Inicial** | Extremamente Rápido | Lento (Muita burocracia/interfaces) |
| **Manutenção a Longo Prazo** | Caótica e frágil | Previsível e segura |
| **Testabilidade (TDD)** | Precisa subir banco de dados real | Testes unitários puros com Mocks em ms |
| **Curva de Aprendizado** | Baixa | Alta |

## 3. Cenário Ideal de Uso

**✅ Quando usar (Go Clean):**
- Sistemas Core complexos (ex: Motor de Pagamentos, Gamificação, Gestão Médica).
- Sistemas com ciclo de vida esperado de 5 a 10 anos.
- Equipes grandes (10+ pessoas) que precisam de limites bem definidos para trabalhar.

**❌ Quando NÃO usar (Over-engineering):**
- Um simples CRUD (Create, Read, Update, Delete) para um painel administrativo temporário.
- Protótipos e Hackathons onde a velocidade vale mais que a qualidade de manutenção. Nestes casos, use MVC ou Active Record.

## 4. O Padrão de Mercado

No mercado Node.js e TypeScript, o maior orquestrador de Clean Architecture do momento é o **NestJS**. Ele já vem com um Container de Injeção de Dependência (DI Container) de fábrica.
No ecosistema Java, o **Spring Boot** cumpre o mesmo papel, e no C#, o **.NET Core**.

Uma variação muito comum e que prega o mesmo valor é a **Hexagonal Architecture** (Ports and Adapters) de Alistair Cockburn, onde interfaces são chamadas de "Portas", e as integrações com Prisma ou Axios são os "Adaptadores".

## 5. Deep Dive (Exemplo Prático: Inversão de Controle)

O segredo está em fazer o Caso de Uso depender de um **Contrato (Interface)**, e não de uma ferramenta real.

```typescript
// 1. O Contrato (A Interface Genérica)
export interface IUserRepository {
  save(user: any): Promise<void>;
}

// 2. O Caso de Uso (O Coração Incorruptível)
export class CreateUserUseCase {
  // A mágica acontece aqui: O construtor não pede o Prisma, pede a Interface!
  constructor(private readonly userRepository: IUserRepository) {}
  
  async execute(data: any) {
    if (!data.email.includes("@")) throw new Error("Regra de Negócio Quebrada!");
    await this.userRepository.save(data); 
  }
}

// 3. A Infraestrutura Suja (O Adaptador do Banco)
export class PrismaUserRepository implements IUserRepository {
  async save(user: any): Promise<void> {
    await prisma.user.create({ data: user }); // Acoplado ao ORM
  }
}

// 4. A Fábrica Web (Montando o Lego e injetando a dependência no Node)
const dbRepository = new PrismaUserRepository(); 
const useCase = new CreateUserUseCase(dbRepository); // A INJEÇÃO OCORRE AQUI!
```

Com este código, se quiser testar o `CreateUserUseCase`, você não precisa do banco rodando. Você cria um `MockUserRepository` em memória, injeta, e roda seu teste em 1 milissegundo!

## 6. Checklist do Sênior (Perguntas de Entrevista)

1. *"Como a Inversão de Dependências (letra D do SOLID) ajuda na criação de Testes Unitários eficientes em Clean Architecture?"*
2. *"Por que o padrão 'Anemic Domain Model' é considerado ruim sob o olhar da Programação Orientada a Objetos clássica?"*
3. *"Explique as diferenças de responsabilidade entre a Camada de Application (Use Cases) e a Camada de Interface/Adapters (Controllers)."*
