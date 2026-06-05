# 🚀 TechQuest Meta-App (V2 Enterprise Protocol)

Bem-vindo ao **TechQuest Meta-App**! Você não está apenas em um repositório de código, você está em um **Curso Vivo e Gamificado de Engenharia de Software**.

Nesta versão V2, abandonamos o "código espaguete" e transformamos a plataforma em uma infraestrutura pronta para produção, implementando os maiores padrões técnicos usados por empresas globais como Uber, Netflix e Spotify.

## 🏗️ A Arquitetura (Ecossistema Microservices)

Nós adotamos uma arquitetura de **Microserviços Orientada a Eventos (EDA)** com padrão **12-Factor App**. O ecossistema é composto por 5 componentes integrados:

1. **API Gateway (NestJS + GraphQL BFF):** O único ponto de entrada do Frontend. Resolve CORS, protege rotas via interceptores JWT, e hospeda um servidor Apollo (GraphQL) que costura dados através do *Schema Stitching*.
2. **User Service (Express + Clean Arch + JWT):** O núcleo isolado. Assina Tokens de Autenticação. Funciona como o lado "Command" do CQRS, emitindo eventos (`USER_CREATED`, `KANBAN_SYNC`) no Apache Kafka via *Outbox Pattern*.
3. **Gamification Service (Fastify):** Um serviço de alta-performance assíncrono. Funciona como a "Read Projection" (Query side) escutando o Kafka. 
4. **Course Service (Express + Redis Cache):** Motor de leitura de arquivos `.lesson.md`. Usa o Redis em um padrão de *Cache-Aside* para reduzir a latência e não onerar o disco rígido a cada request.
5. **Observability Service (Express + SSE):** O nosso modo "Matrix". Ouve todo tráfego Kafka e logs do Gateway, empurrando os pacotes em tempo real pro Frontend via *Server-Sent Events*.
6. **AI Service (RAG/LangChain):** Servidor HTTP de Inteligência Artificial rodando a arquitetura RAG (Retrieval-Augmented Generation) para responder a dúvidas.
7. **Frontend (React/Vite):** UI construída com estética Synthwave, consumindo APIs em GraphQL, gerenciando JWT e exibindo o terminal SSE em tempo real.

---

## 🤖🌟 Inteligência Artificial 100% Grátis e Offline (Novidade!)

Não quer pagar pela API da OpenAI? Sem problemas! A plataforma vem com suporte **Nativo e Gratuito** para rodar IAs localmente no seu computador (com memória de conversa e formatação Markdown!).

1. Baixe e instale o [Ollama.com](https://ollama.com/) na sua máquina.
2. No seu terminal, baixe os modelos:
   - Chat: `ollama run llama3.2` (Rápido/Leve) ou `mistral`.
   - Embeddings (Leitura do Código): `ollama pull nomic-embed-text`
3. Vá no arquivo `.env` da pasta `ai-service` e ative o motor local:
   ```env
   USE_OLLAMA=true
   OLLAMA_MODEL=llama3.2
   OLLAMA_EMBEDDING_MODEL=nomic-embed-text
   ```
4. Reinicie o servidor! O Mestre do Código agora responderá usando a sua placa de vídeo/processador local.

---

## 🚀 Como Executar

O projeto foi desenhado no padrão **12-Factor App**, permitindo execução flexível tanto para Desenvolvimento rápido (Hot-Reload) quanto para Produção (Containers Isolados).

### 🛠️ Modo Desenvolvimento (Hot Reload / TSX Watch)
Use este modo quando quiser editar o código e ver as mudanças em tempo real. Os serviços de infraestrutura (Postgres, Kafka) rodam no Docker, enquanto as APIs rodam nativamente no seu Node.js via `tsx watch`.

1. Suba a infraestrutura pesada (Bancos, Caches e Mensageria):
   ```bash
   docker-compose up -d postgres zookeeper kafka rabbitmq prometheus grafana redis
   ```
2. Instale as dependências raiz e inicie o orquestrador (Concurrently):
   ```bash
   npm install
   npm start
   ```
   *Isso irá subir todos os 4 microserviços, o API Gateway e o Frontend (Vite) simultaneamente com auto-reload ativado. O frontend estará em http://localhost:5173*

### 🐳 Modo Produção (Dockerização Total)
Use este modo para validar a arquitetura Cloud-Native final, onde Frontend, Gateway e todos os microserviços rodam enclausurados em containers Linux Alpine (com Nginx).

1. Construa todas as imagens e suba a rede completa:
   ```bash
   docker-compose build
   docker-compose up -d
   ```
2. O Frontend estará disponível nativamente na porta `80` ou `5173` via Nginx através da rede roteada do Docker.

---

## 📚 Como Estudar e Matriz de Teoria vs Prática

O sistema foi desenhado para você aprender lendo as aulas no Frontend e observando o código-fonte em tempo real. Cada lição possui uma implementação *Sênior* oculta nos arquivos deste repositório:

| AULA (Frontend) | ONDE ESTÁ A MAGIA NESTE CÓDIGO? |
|-----------------|---------------------------------|
| **Clean Architecture** | Vá para `user-service/src/domain/User.ts` (O núcleo) e `user-service/src/application/CreateUserUseCase.ts`. Veja como o banco de dados é invertido! |
| **Apache Kafka & Mensageria** | Veja `user-service/src/index.ts` (Produtor via Outbox Relay) e `gamification-service/src/index.ts` (Consumidor Assíncrono com Idempotência). |
| **Padrões de Microserviços (BFF)** | Veja a maravilha do API Gateway (Apollo GraphQL) em `api-gateway/src/graphql/User.resolver.ts`. |
| **Autenticação (JWT)** | Cheque a rota em `user-service/src/infrastructure/controllers/UserController.ts` e a blindagem em `api-gateway/src/main.ts`. |
| **Caching com Redis** | O padrão Cache-Aside está no `course-service/src/application/use-cases/ListLessonsUseCase.ts`. |
| **Observabilidade em Tempo Real** | Os interceptors do gateway enviam logs para o `observability-service/src/index.ts`, que lança pro `ObservabilityTerminal.tsx` no Frontend. |
| **Engenharia de IA (RAG)** | Vá em `ai-service/src/rag.ts`. Lá está a lógica matemática vetorial do LangChain! |
| **Event-Driven / Outbox Pattern** | Olhe `user-service/src/infrastructure/jobs/OutboxRelay.ts`. Um CronJob de resiliência. |

Bem-vindo ao Estado da Arte da Engenharia!
