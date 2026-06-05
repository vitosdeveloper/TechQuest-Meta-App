# 🌀 EDA Avançado: CQRS e Outbox Pattern

## 1. O Que É e o Problema que Resolve
A Arquitetura Orientada a Eventos (EDA) é fantástica, mas cria um problema terrível chamado "Problema da Dupla Escrita". Imagine que o usuário comprou um produto. O `Order Service` deve salvar no PostgreSQL e disparar um evento no Kafka para o `Delivery Service`.
Se o PostgreSQL salvar, mas o Kafka cair meio milissegundo depois, o pedido é cobrado, mas a entrega não é gerada! O estado das bases fica corrompido para sempre.

Para garantir consistência absoluta, usamos o **Transactional Outbox Pattern** somado ao **CQRS** (Segregação de Responsabilidade de Comando e Consulta).

### Dicionário Sênior
- **Outbox Pattern:** Em vez do código disparar o evento no Kafka direto, ele salva no banco de dados (na mesma transação atômica do usuário) uma tabela chamada "Outbox" (Caixa de Saída). Um robô em segundo plano lê essa tabela e garante a entrega ao Kafka.
- **CQRS:** Separar a escrita da leitura. O banco que recebe os "Comandos" (writes) é brutalmente normalizado. Já os "Queries" (reads) rodam em outro banco puramente otimizado para leitura (ex: MongoDB ou ElasticSearch), sincronizado por eventos.
- **Event Sourcing:** Uma variação extrema onde o banco de dados NÃO salva o "Estado Atual". Ele salva TODOS os eventos da história em um Log imutável (como uma fita K7). O estado atual é calculado relendo a fita.

## 2. Vantagens e Desvantagens (Trade-offs)

| Padrão | CRUD Tradicional 📚 | CQRS com Outbox ⚡ |
| :--- | :--- | :--- |
| **Garantia de Entrega** | Baixa (Requisição HTTP quebra fácil) | At-least-once (Garantia de 100% que o evento voará pelo Kafka) |
| **Complexidade** | Simples (Apenas 1 banco) | Altíssima (Eventual Consistency, Relays, Filas Mortas - DLQ) |
| **Desempenho de Leitura**| Lento (Joins complexos) | Imbatível (Os dados já estão mastigados na Projeção de Leitura) |

## 3. Cenário Ideal de Uso

**✅ Quando usar Outbox e CQRS:**
- Sistemas financeiros onde você **não pode perder 1 bit** de dado sob nenhuma hipótese.
- Nosso **TechQuest**! O `User Service` salva o quadro Kanban (Command), escreve no Outbox, e o `Gamification Service` cria uma Tabela Otimizada só para calcular sua XP (Read Projection).

**❌ Quando NÃO usar:**
- Pequenas APIs sem comunicação distribuída (monolitos tradicionais). Criar um Relay Assíncrono para atualizar a própria base é *Overengineering* letal.

## 4. Deep Dive (Exemplo Prático: Transação Atômica)

Veja o código do `User Service` garantindo que não haverá descompasso usando uma Transação do banco de dados (Prisma):

```typescript
// NENHUMA das duas ações salva se alguma delas falhar (Atomicity)!
await prisma.$transaction(async (tx) => {
  // 1. Atualiza o Kanban
  await tx.user.update({
    where: { id: userId },
    data: { kanbanState: state }
  });

  // 2. Grava o Evento na Caixa de Saída (Outbox)
  await tx.outbox.create({
    data: {
      aggregateId: userId,
      eventType: 'KANBAN_SYNC',
      payload: state
    }
  });
});
// 3. Apenas depois, um Poller (OutboxRelay) varre o banco de 5 em 5s e envia pro Kafka.
```

## 5. Checklist do Sênior (Perguntas de Entrevista)

1. *"O Outbox Relay garante a entrega 'At-Least-Once' (Pelo menos uma vez), o que significa que o consumidor pode receber o mesmo evento duas vezes. Como o consumidor se protege disso?" (Dica: Chaves de Idempotência).*
2. *"Em um modelo de Event Sourcing, se houverem 1 bilhão de eventos numa conta bancária, calcular o saldo atual lendo o histórico vai demorar horas. Qual é a solução arquitetural para esse problema de performance?" (Dica: Snapshots).*
3. *"Quais são os perigos de sincronizar um banco de Leitura (CQRS) de forma Eventual (Eventual Consistency) numa tela de pagamento online?"*
