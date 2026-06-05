# 🧠 Engenharia de Inteligência Artificial e RAG

## 1. O Que É e o Problema que Resolve
O ChatGPT tem um limite: Ele foi treinado com o conhecimento da humanidade até a data de hoje, mas ele **não sabe absolutamente nada** sobre os arquivos privados da sua empresa, e "alucinará" (inventará fatos) se questionado.
Para o TechQuest possuir um "Mentor AI" que entenda 100% dos nossos cursos e guie o usuário lendo nossos códigos, nós cruzamos o Engenheiro de Software com o Cientista de Dados usando o Padrão **RAG (Retrieval-Augmented Generation)**.

### Dicionário Sênior
- **LLM (Large Language Model):** Os super-cérebros artificiais, baseados em redes neurais da arquitetura Transformer. (Ex: GPT-4, Llama 3, Claude). 
- **Embeddings Vetoriais:** É a matemática pura. É o processo de pegar um texto em português (ex: "Arquitetura Limpa") e traduzi-lo em uma coordenada física no espaço dimensional (ex: `[0.0123, -0.441, 0.999]`). 
- **Vector Database (Banco de Dados Vetorial):** Em vez de usar cláusulas `WHERE` (banco SQL), este banco caça informações usando "Proximidade Geométrica" (Cosine Similarity). Se o Vetor da pergunta do usuário bater perto do Vetor do PDF da empresa no espaço matemático, nós retornamos aquele PDF. Ex: ChromaDB, Pinecone.

## 2. Vantagens e Desvantagens (Trade-offs)

| Abordagem | Fine-Tuning (Treinar o Cérebro) 🎓 | RAG (Buscar nos Arquivos) 📚 |
| :--- | :--- | :--- |
| **Funcionamento**| Ensinar o modelo os padrões da empresa alterando as sinapses da IA. | O modelo é "burro", mas tem acesso em tempo real ao Google Drive / Banco da empresa. |
| **Atualização** | Péssima. Alterou o dado? Tem que retreinar a IA. Custa fortunas. | Imediata. Se o Banco Vetorial atualizou, a resposta atualiza (Zero-shot). |
| **Custo Computacional**| Milhões de dólares em Placas de Vídeo (GPUs NVIDIA). | Barato. Envolve apenas busca matemática + inferência padrão API. |

## 3. Cenário Ideal de Uso

**✅ Quando usar RAG e Agentes:**
- Assistentes de leitura de PDFs jurídicos, manuais de RH internos da empresa, ou como no TechQuest, um mentor que lê os `.lesson.md` do sistema para ajudar o aluno com base estritamente no material criado pelos professores.

**❌ Quando usar Fine-Tuning:**
- Quando o objetivo não é conhecimento de dados exatos, mas ensinar a IA um tom de voz perfeito ou gerar código em uma linguagem proprietária inventada do zero.

## 4. Deep Dive (Exemplo Prático: Cadeia LangChain (Chain))

A maravilha da biblioteca LangChain no AI Service. Em meia dúzia de linhas, criamos a inteligência que caça a informação certa antes de conversar com a OpenAI/Ollama:

```typescript
import { createRetrievalChain } from 'langchain/chains';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { PromptTemplate } from '@langchain/core/prompts';

// 1. Instrução estrita de Comportamento do Mentor
const promptSistemico = PromptTemplate.fromTemplate(`
  Você é o Mentor Cyber Sênior do TechQuest. Responda apenas baseado nas informações 
  que extraí do nosso VectorDB abaixo. Se a informação não estiver lá, diga "Eu não sei".
  
  <documentos_empresa>
  {context}
  </documentos_empresa>
  
  Pergunta do Aluno: {input}
`);

// 2. Unindo o "Cérebro LLM" e a "Memória (Banco Vetorial Retriever)"
const chainDocumentos = await createStuffDocumentsChain({ llm: ollamaModel, prompt: promptSistemico });
const correnteRag = await createRetrievalChain({
  retriever: vectorStore.asRetriever(),
  combineDocsChain: chainDocumentos,
});

// 3. A Pergunta. Por debaixo dos panos ele procura a semelhança cosenoidal e cria a resposta.
const repostaMestra = await correnteRag.invoke({ input: "O que é Inversão de Controle?" });
```

## 5. Como o TechQuest Implementou Isso

No início do projeto, nosso `ai-service` sofria de "Mock Mode" quando a chave da OpenAI não estava configurada, ou consumia créditos reais via API em nuvem (GPT-3.5). Isso criava uma barreira para quem estivesse estudando ou clonando o projeto.

Nós revolucionamos isso adotando o **Ollama** (Motor Local de Inferência). A arquitetura atual se comporta da seguinte forma:
- O nosso `docker-compose.yml` agora sobe uma imagem oficial do Ollama (`ollama/ollama`) de forma totalmente enclausurada.
- Nós criamos um container transitório (`ollama-init`) que roda um script automático (`ollama pull`) e faz o download pesado do modelo principal (`llama3.2`) e do modelo matemático vetorial (`nomic-embed-text`) para um volume Docker persistente.
- O `ai-service` consome as mesmas variáveis de ambiente do modo de desenvolvimento (`.env`), garantindo que o LangChain seja instanciado utilizando o motor de LLMs e de Embeddings local, conectando pela rede interna do docker via `http://ollama:11434`.
- **Zero Custos, 100% Autonomia**: Os seus dados de chat e os PDFs/Markdown lidos pelo RAG nunca saem da sua máquina hospedeira!

## 6. Checklist do Sênior (Perguntas de Entrevista)

1. *"A janela de contexto (Context Window) de um LLM é limitada. O que acontece se o nosso RAG retornar 5.000 páginas de PDFs como resultado e nós enviarmos tudo para o GPT-4 tentar responder?"*
2. *"Em buscas tradicionais nós usamos a 'Busca Lexical' (Keyword). O RAG usa 'Busca Semântica'. Como a busca semântica consegue achar um resultado se o usuário escrever 'dinheiro', mas o texto do PDF só usa a palavra 'capital monetário'?" (Dica: Posição vetorial)*
3. *"O que são Agentes (AI Agents) e como eles se diferenciam de uma cadeia LLM engessada?"*
