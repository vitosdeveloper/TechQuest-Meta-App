# 🗄️ Engenharia de Dados: Bancos e Teorema CAP

## 1. O Que É e o Problema que Resolve

Um sistema não é nada sem seus dados. Até certo ponto de escala, colocar tudo no MySQL/PostgreSQL e esquecer da vida resolve o problema. 
No entanto, no mundo dos Microserviços (Big Data), surgem desafios severos: Como fazer buscas ultrarrápidas em tabelas de 500 Milhões de linhas? O que acontece quando os discos do banco de dados enchem? Como relacionamentos complexos matam a performance?

- **Bancos SQL (Relacionais):** PostgreSQL, MySQL, SQL Server. Dados estruturados com transações rígidas e garantias financeiras.
- **Bancos NoSQL (Não-Relacionais):** MongoDB (Documentos), Cassandra (Wide-Column), Neo4J (Grafos). Focam em agilidade de desenvolvimento (sem schema rígido) e escalabilidade infinita (Sharding), abdicando de consistência perfeita na maioria das vezes.

### Dicionário Sênior
- **ACID:** (Atomicity, Consistency, Isolation, Durability). É o selo de ouro dos bancos SQL. Garante que se uma transferência bancária de R$ 100 sair da conta A, obrigatoriamente entrará na B, ou TUDO falhará (Rollback).
- **Índice B-Tree (B-Tree Index):** O segredo de uma busca rápida. O banco cria uma "Árvore de Busca" paralela na memória. Uma busca O(log n) num índice B-Tree resolve milhões de linhas num piscar de olhos, enquanto uma busca burra (Full Table Scan) travaria a CPU.
- **Sharding (Fragmentação):** Quando o banco enche, você não põe um HD maior. Você quebra a tabela em pedaços e joga metade num servidor (ex: usuários de A-M) e a outra metade em outro (N-Z). Bancos NoSQL como o MongoDB fazem isso magicamente.

## 2. Vantagens e Desvantagens (Trade-offs)

| Característica | Bancos Relacionais (SQL) 📊 | Bancos Não-Relacionais (NoSQL) 📦 |
| :--- | :--- | :--- |
| **Estrutura** | Tabela rígida (Colunas exatas) | JSON Flexível (Schema-less) |
| **Integração (Joins)** | Perfeito para relacionamentos | Péssimo para relacionamentos |
| **Escalabilidade** | Vertical (Scale-Up) | Horizontal (Scale-Out nativo) |
| **Confiabilidade** | Transações ACID puras | Foco no Teorema CAP (Eventual Consistency) |

## 3. Cenário Ideal de Uso

**✅ Quando usar Bancos SQL (PostgreSQL):**
- Sistemas financeiros, carteiras digitais, controle de estoque crítico.
- Quando os relacionamentos importam (Uma Venda -> Pertence a um Usuário -> Que pertence a uma Empresa -> Que tem N pagamentos).

**✅ Quando usar Bancos NoSQL (MongoDB / DynamoDB):**
- Sistemas de catálogos de e-commerce variados (uma geladeira tem atributos diferentes de uma camiseta).
- Sistemas de logs, auditorias ou IoT de altíssimo volume, onde a taxa de escrita (INSERT) é de milhões por segundo e não pode travar.

## 4. Deep Dive (Exemplo Prático: O Poder do Índice)

Imagine uma consulta clássica no seu código:
`SELECT * FROM users WHERE email = 'hacker@cyber.com';`

Se houver 10 Milhões de usuários e você **não tem índice**, o PostgreSQL lerá 10 Milhões de linhas do HD uma por uma até achar o usuário. Isso derrete o servidor. 

A atitude Sênior:
```sql
-- Criando um índice na coluna email
CREATE UNIQUE INDEX idx_users_email ON users(email);
```
Agora, o banco cria uma B-Tree em memória só com os e-mails e ponteiros físicos. A mesma consulta achará o e-mail não lendo 10 milhões de linhas, mas em cerca de **20 pulos matemáticos na árvore**. A consulta cai de 5 segundos para 0.001 milissegundos.

## 5. Checklist do Sênior (Perguntas de Entrevista)

1. *"Se eu criar índices em todas as colunas da minha tabela, minhas buscas ficarão perfeitamente velozes. Qual é a contrapartida catastrófica dessa decisão?" (Dica: Pense na lentidão dos INSERTs/UPDATEs).*
2. *"Explique o que é Normalização vs Desnormalização de banco de dados, e por que no NoSQL a gente muitas vezes duplica os dados de propósito?"*
3. *"O que é Eventual Consistency? É aceitável num sistema de rede social? E num banco?"*
