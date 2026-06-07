# 🧠 Engenharia de Inteligência Artificial, RAG e AI Agents

## 1. O Que É e o Problema que Resolve
O ChatGPT tem um limite: Ele foi treinado com o conhecimento da humanidade até a data de hoje, mas ele **não sabe absolutamente nada** sobre os arquivos privados da sua empresa, e "alucinará" (inventará fatos) se questionado.
Para o TechQuest possuir um "Mentor AI" que entenda 100% dos nossos cursos e guie o usuário lendo nossos códigos, nós cruzamos o Engenheiro de Software com o Cientista de Dados usando o Padrão **RAG (Retrieval-Augmented Generation)**. Mais recentemente, evoluímos isso para um **AI Agent Autônomo**.

### Dicionário Sênior
- **LLM (Large Language Model):** Os super-cérebros artificiais, baseados em redes neurais da arquitetura Transformer. (Ex: GPT-4, Llama 3, Claude). 
- **Embeddings Vetoriais:** É a matemática pura. É o processo de pegar um texto em português e traduzi-lo em uma coordenada física no espaço dimensional. 
- **Vector Database (Banco de Dados Vetorial):** Em vez de usar cláusulas `WHERE`, este banco caça informações usando "Proximidade Geométrica" (Cosine Similarity).
- **AI Agent (Agente de IA):** Um LLM equipado com "Ferramentas" (Tools). Em vez de apenas responder texto, o modelo pode tomar decisões, buscar no Google, acessar sites ou rodar scripts na máquina antes de montar a resposta final.

## 2. Vantagens e Desvantagens (Trade-offs)

| Abordagem | Fine-Tuning (Treinar o Cérebro) 🎓 | RAG Clássico (Buscar nos Arquivos) 📚 | AI Agent (Autonomia) 🤖 |
| :--- | :--- | :--- | :--- |
| **Funcionamento**| Ensinar padrões alterando as sinapses da IA. | O modelo é "burro", mas tem acesso a um BD Vetorial. | O modelo possui "Ferramentas" e decide sozinho qual usar. |
| **Complexidade** | Altíssima (Data Science puro). | Média (Pipelines de Ingestão de Dados). | Alta (Orquestração de Chamadas, ReAct, Loops infinitos). |
| **Custo/Latência**| Milhões de dólares para treinar. Rápido na resposta. | Barato. Envolve busca matemática + LLM (1 chamada). | Custo varia. Pode demorar mais pois o Agente faz múltiplas requisições (Reasoning). |

## 3. Deep Dive Arquitetural: Clean Architecture em IA

Uma grande armadilha ao usar bibliotecas geniais como o **LangChain** é o **Alto Acoplamento**. O LangChain tende a misturar regras de negócio (prompts, cadeias de decisão) com infraestrutura (conexão com Ollama, requisições HTTP). 

No TechQuest, nós refatoramos o `ai-service` aplicando os princípios de **Clean Architecture**:

- **Domain:** Nossas `Interfaces` (`IAiProvider`, `IVectorStore`). O núcleo do sistema não sabe se estamos usando LangChain, OpenAI ou LLaMA.
- **Application (Use Cases):** Casos de uso puros como `AskQuestionUseCase`. Eles recebem a string do usuário e orquestram a interface do IA, sem saber como a mágica acontece.
- **Infrastructure (Adapters/Tools):** Onde a "sujeira" do LangChain vive (`LangChainAgentProvider`). É aqui que criamos o `AgentExecutor` e nossas ferramentas (`KnowledgeBaseTool`, `WebBrowserTool`).
- **Controllers:** Rotas do Express limpíssimas (`AiController`).

Essa separação garante que, se amanhã o LangChain for substituído por outra biblioteca (como o LlamaIndex ou SDKs nativos), nós alteramos apenas a camada de Infraestrutura, sem tocar na regra de negócio.

## 4. Function Calling (Tool Calling) na Prática

Nós substituímos a antiga cadeia engessada (`createRetrievalChain`) por um **Agente Autônomo** (`createToolCallingAgent`). O fluxo agora é:

1. O Usuário pergunta: *"Leia o site https://vitosdeveloper.com e resuma"*.
2. O LLM recebe a string e a lista de Ferramentas Disponíveis (ex: `WebBrowserTool`, `TechQuestKnowledgeTool`).
3. O modelo (LLaMA 3.2 / GPT) raciocina: *"Para responder a isso, eu preciso usar a ferramenta WebBrowserTool passando a URL"*.
4. O modelo retorna um JSON mandando o servidor executar a função.
5. O `AgentExecutor` (nosso Backend NodeJS) pega o JSON, roda a função (fazendo o `fetch` e o parsing com `Cheerio`), e devolve o texto do site pro LLM.
6. O LLM lê o texto do site e finalmente monta a resposta pro usuário.

Tudo isso acontece em loop e sozinho! Se o usuário fizesse uma pergunta sobre a arquitetura do TechQuest, o LLM decidiria chamar a ferramenta `TechQuestKnowledgeTool` para ler nosso BD Vetorial.

## 5. Como o TechQuest Implementou Isso (Ollama Local)

- O nosso `docker-compose.yml` sobe o **Ollama** de forma enclausurada.
- Um script automático faz o download do modelo principal (`llama3.2` - Suporta Tool Calling!) e do modelo vetorial (`nomic-embed-text`).
- O `ai-service` (agora blindado pela Clean Architecture) consome o LangChain apontando para a rede local via `http://ollama:11434`.
- **Zero Custos, 100% Autonomia**: Seus dados de chat e os sites raspados nunca saem da sua máquina hospedeira!

## 6. Checklist do Sênior (Perguntas de Entrevista)

1. *"A janela de contexto (Context Window) de um LLM é limitada. O que acontece se o nosso RAG retornar 5.000 páginas de PDFs como resultado e nós enviarmos tudo para o modelo?"*
2. *"Em buscas tradicionais nós usamos a 'Busca Lexical' (Keyword). O RAG usa 'Busca Semântica'. Como a busca semântica acha um resultado se o usuário escrever 'dinheiro', mas o texto só usa 'capital monetário'?"*
3. *"Ao usar LangChain, por que é perigoso deixar o `AgentExecutor` com acesso irrestrito ao bash da máquina host em produção?"*
