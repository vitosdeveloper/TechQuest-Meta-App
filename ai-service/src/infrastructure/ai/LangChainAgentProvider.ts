import { IAiProvider } from '../../domain/interfaces/IAiProvider';
import { IVectorStore } from '../../domain/interfaces/IVectorStore';
import { WebBrowserTool } from './tools/WebBrowserTool';
import { KnowledgeBaseTool } from './tools/KnowledgeBaseTool';

import { ChatOpenAI } from '@langchain/openai';
import { ChatOllama } from '@langchain/ollama';
import { AgentExecutor, createToolCallingAgent } from 'langchain/agents';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { BaseMessage } from '@langchain/core/messages';

export class LangChainAgentProvider implements IAiProvider {
  private agentExecutor: AgentExecutor | null = null;
  private isMockMode: boolean = false;
  private chatModel: any;
  private tools: any[] = [];

  constructor(private vectorStore: IVectorStore) {
    const apiKey = process.env.OPENAI_API_KEY || '';
    const useOllama = process.env.USE_OLLAMA === 'true';
    
    if (useOllama) {
      const ollamaBaseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
      const ollamaModel = process.env.OLLAMA_MODEL || 'llama3.2';
      console.log(`🤖 Iniciando Agent Local via Ollama! Modelo: [${ollamaModel}] | URL: [${ollamaBaseUrl}]`);
      this.chatModel = new ChatOllama({
        baseUrl: ollamaBaseUrl,
        model: ollamaModel,
        temperature: 0.3,
      });
    } else if (!apiKey || apiKey.includes('sua-c') || apiKey.includes('sua_c')) {
      console.warn('⚠️ Nenhuma API key ou Ollama detectados. Rodando em Mock Mode.');
      this.isMockMode = true;
    } else {
      console.log('☁️ Iniciando Agent em Nuvem via OpenAI! (GPT-3.5)');
      this.chatModel = new ChatOpenAI({
        modelName: 'gpt-3.5-turbo',
        temperature: 0.3,
        openAIApiKey: apiKey,
      });
    }

    this.initializeAgent();
  }

  private initializeAgent() {
    if (this.isMockMode) return;

    // Registra as ferramentas que o agente poderá usar
    this.tools = [
      new WebBrowserTool(),
      new KnowledgeBaseTool(this.vectorStore)
    ];

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", `Você é o "Mestre do Código", um arquiteto sênior e mentor IA do jogo TechQuest Meta-App.
Sua missão é ajudar os desenvolvedores a entenderem a arquitetura do projeto e tirar dúvidas de programação.

REGRAS:
1. Sempre responda em português do Brasil e use Markdown com trechos de código quando aplicável.
2. Se o usuário perguntar sobre o TechQuest, Aulas, ou conceitos da plataforma, use a ferramenta 'techquest_knowledge_base' para buscar no VectorDB.
3. Se o usuário pedir para ler um site ou fornecer uma URL, use a ferramenta 'web_browser'.
4. Se nenhuma ferramenta for necessária, responda usando seu conhecimento global.
5. Nunca exponha informações sensíveis do sistema.`],
      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"],
      new MessagesPlaceholder("agent_scratchpad"),
    ]);

    const agent = createToolCallingAgent({
      llm: this.chatModel,
      tools: this.tools,
      prompt: prompt as any,
    });

    this.agentExecutor = new AgentExecutor({
      agent,
      tools: this.tools,
      verbose: true,
      maxIterations: 5,
    });
  }

  isInitialized(): boolean {
    return this.isMockMode || (this.agentExecutor !== null);
  }

  async askQuestion(question: string, chatHistory: string = ''): Promise<string> {
    if (this.isMockMode) {
      return `[Mock Mode] Para usar o Agente e acessar a web ou a base de conhecimento, configure uma IA local ou no .env!`;
    }

    if (!this.agentExecutor) {
      throw new Error('Agent Executor não foi inicializado corretamente.');
    }

    // Simplificando o histórico de chat para string neste exemplo.
    // O Langchain aceita um array de BaseMessage, mas se for string o prompt vai engolir como texto injetado ou a gente pode ignorar por enquanto
    const result = await this.agentExecutor.invoke({
      input: question,
      chat_history: [] // Aqui poderíamos parsear a string chatHistory para instâncias de HumanMessage/AIMessage
    });

    return result.output;
  }
}
