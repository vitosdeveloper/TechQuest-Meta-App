# 🚀 TechQuest Meta-App (V2 Enterprise Protocol)

Bem-vindo ao **TechQuest Meta-App**! Você não está apenas em um repositório de código, você está em um **Curso Vivo e Gamificado de Engenharia de Software**.

## 🎯 Proposta do Projeto

O TechQuest Meta-App nasceu com o objetivo de revolucionar a forma como devs aprendem arquiteturas avançadas. Ao invés de ler tutoriais chatos ou assistir a longos vídeos teóricos, você navega em uma plataforma gamificada (com sistema de XP, Níveis e Kanban) onde as lições são ensinadas **pela própria arquitetura que faz o app rodar**.

É um conceito inovador de *Meta-Ensino*: a plataforma ensina sobre Sistemas Distribuídos sendo, ela mesma, um Ecossistema de Microserviços real! Nesta versão V2, fomos além do "código tutorial" e transformamos o repositório em uma infraestrutura pronta para produção, implementando os maiores padrões técnicos consolidados pela indústria e empresas globais como Uber, Netflix e Spotify.

## 🎓 Tópicos Principais Abordados

- **Microserviços & Sistemas Distribuídos:** Desacoplamento, Resiliência e API Gateways (Backend-for-Frontend).
- **Event-Driven Architecture (EDA):** Comunicação Assíncrona, Apache Kafka e o robusto Outbox Pattern.
- **Padrões de Projeto & Arquitetura:** Clean Architecture, CQRS (Command Query Responsibility Segregation) e Cache-Aside.
- **Engenharia de IA (RAG):** Integração Nativa e Local com LLMs via LangChain e Ollama.
- **DevOps & Cloud-Native:** Dockerização Total, Kubernetes e Terraform.
- **Observabilidade:** Monitoramento (Prometheus/Grafana) e Streaming ao vivo via Server-Sent Events (SSE).
- **Frontend Avançado:** React, Vite, Micro-frontends (MFE), Zustand e Drag-and-Drop (DnD).

---

## 🏗️ A Arquitetura (Ecossistema Microservices)

Nós adotamos uma arquitetura de **Microserviços Orientada a Eventos (EDA)** com padrão **12-Factor App**. O ecossistema é composto por componentes integrados:

1. **API Gateway (NestJS + GraphQL BFF):** O único ponto de entrada do Frontend. Resolve CORS, protege rotas via interceptores JWT, e hospeda um servidor Apollo (GraphQL) que costura dados.
2. **User Service (Express + Clean Arch + JWT):** O núcleo isolado. Assina Tokens de Autenticação. Funciona como o lado "Command" do CQRS, emitindo eventos (`USER_CREATED`, `KANBAN_SYNC`) no Apache Kafka via *Outbox Pattern*.
3. **Gamification Service (Fastify):** Um serviço de alta-performance assíncrono. Funciona de forma totalmente passiva escutando o Kafka e calculando níveis. 
4. **Query Service (Express + MongoDB):** A "Read Projection" do sistema (CQRS). Materializa views em NoSQL otimizadas para leitura rápida do GraphQL.
5. **Course Service (Express + Redis Cache):** Motor de leitura de arquivos `.lesson.md`. Usa o Redis em um padrão de *Cache-Aside* para reduzir a latência e não onerar o disco rígido a cada request.
6. **Observability Service (Express + SSE):** O nosso modo "Matrix". Ouve todo tráfego Kafka e empurra os pacotes em tempo real pro Frontend via *Server-Sent Events*.
7. **AI Service (RAG/LangChain):** Servidor HTTP de Inteligência Artificial rodando a arquitetura RAG (Retrieval-Augmented Generation) para responder a dúvidas através do terminal na UI.
8. **Frontend (React/Vite):** UI construída com estética Cyberpunk/Synthwave, consumindo APIs, gerenciando MFE e exibindo gráficos em tempo real.

---

## 🤖🌟 Inteligência Artificial 100% Grátis e Offline

A plataforma vem com suporte **Nativo e Gratuito** para rodar IAs localmente no seu computador (com memória de conversa e formatação Markdown!). Você não precisa pagar pela API da OpenAI.

Em nossa arquitetura, o motor de IA (Ollama) já está "dockerizado" e pronto para uso sob o profile \`ai\` no Docker Compose. 

### Passos para inicializar:
1. **Ative a IA no arquivo \`.env\`:** Vá na pasta \`ai-service\` e configure:
   \`\`\`env
   USE_OLLAMA=true
   OLLAMA_MODEL=llama3.2
   OLLAMA_EMBEDDING_MODEL=nomic-embed-text
   \`\`\`
2. **Aloque Memória RAM no Docker Desktop:** Modelos de IA são pesados. Vá em **Docker Desktop Settings -> Resources -> Advanced** e garanta que o Docker tenha pelo menos **8GB a 16GB de RAM** alocados. Caso contrário, o container do Ollama será morto por falta de memória (OOMKilled).
3. **Suba o ecossistema com o profile AI:**
   No seu terminal, rode o comando abaixo. Ele subirá a aplicação normal e engatilhará os containers do Ollama.
   \`\`\`bash
   docker-compose --profile ai up -d --build
   \`\`\`
   *(Obs: Na primeira vez, o container \`ollama-init\` vai baixar os modelos \`llama3.2\` e \`nomic-embed-text\` automaticamente. Isso pode demorar alguns minutos dependendo da sua internet).*

E pronto! O Mestre do Código agora responderá usando a sua CPU/Placa de vídeo local, de forma 100% privada.

---

## 🚀 Como Executar

O projeto foi desenhado no padrão **12-Factor App**, permitindo execução flexível tanto para Desenvolvimento rápido (Hot-Reload) quanto para Produção (Containers Isolados).

### 🛠️ Modo Desenvolvimento (Hot Reload)
Use este modo quando quiser editar o código e ver as mudanças em tempo real. Os serviços de infraestrutura (Postgres, Kafka) rodam no Docker, enquanto as APIs rodam nativamente no seu Node.js via `tsx watch`.

1. Suba a infraestrutura pesada (Bancos, Caches e Mensageria):
   ```bash
   docker-compose up -d postgres zookeeper kafka rabbitmq prometheus grafana redis
   ```
2. Na raiz, instale as dependências e inicie o orquestrador (Concurrently):
   ```bash
   npm install
   npm start
   ```
   *O frontend estará rodando em http://localhost:5173*

### 🐳 Modo Produção (Dockerização Total)
Use este modo para validar a arquitetura Cloud-Native final, onde Frontend, Gateway e todos os microserviços rodam enclausurados em containers Alpine.

1. Construa todas as imagens e suba a rede completa:
   ```bash
   docker-compose up -d --build
   ```
2. O Frontend estará disponível através da rede roteada do Docker em http://localhost:5173 (ou porta mapeada).

---

## 📚 Como Estudar e Matriz de Teoria vs Prática

O sistema foi desenhado para você aprender lendo as aulas no Frontend e observando o código-fonte em tempo real. Cada lição possui uma implementação *Sênior* oculta nos arquivos deste repositório:

| AULA (Frontend) | ONDE ESTÁ A MAGIA NESTE CÓDIGO? |
|-----------------|---------------------------------|
| **Clean Architecture** | Vá para `user-service/src/domain/User.ts` (O núcleo) e `user-service/src/application/CreateUserUseCase.ts`. Veja como o banco de dados é invertido! |
| **Apache Kafka & Mensageria** | Veja `user-service/src/index.ts` (Produtor via Outbox Relay) e `gamification-service/src/index.ts` (Consumidor Assíncrono com Idempotência). |
| **CQRS & Padrões (BFF)** | Veja a maravilha do API Gateway (Apollo GraphQL) em `api-gateway/src/graphql/User.resolver.ts` e a projeção de leitura em `query-service`. |
| **Autenticação (JWT)** | Cheque a rota em `user-service/src/infrastructure/controllers/UserController.ts` e a blindagem em `api-gateway/src/main.ts`. |
| **Caching com Redis** | O padrão Cache-Aside está no `course-service/src/application/use-cases/ListLessonsUseCase.ts`. |
| **Observabilidade em Tempo Real** | Os interceptors do gateway enviam logs para o `observability-service/src/index.ts`, que lança pro `ObservabilityTerminal.tsx` no Frontend. |
| **Engenharia de IA (RAG)** | Vá em `ai-service/src/rag.ts`. Lá está a lógica matemática vetorial do LangChain! |
| **Event-Driven / Outbox Pattern** | Olhe `user-service/src/infrastructure/jobs/OutboxRelay.ts`. Um CronJob de resiliência a quedas do Kafka. |

Bem-vindo ao Estado da Arte da Engenharia!

---

## 👨‍💻 Créditos e Contato

Desenvolvido com 💜 por **vitosdeveloper**.
Acompanhe meu trabalho, conecte-se comigo e explore novos projetos de Arquitetura de Software:

- 🌐 **Site / Portfólio:** [vitosdeveloper.com](https://vitosdeveloper.com)
- 💼 **LinkedIn:** [linkedin.com/in/vitosdeveloper](https://linkedin.com/in/vitosdeveloper)
- 🐙 **GitHub:** [github.com/vitosdeveloper](https://github.com/vitosdeveloper)
