import express from 'express';
import cors from 'cors';
import path from 'path';
import * as dotenv from 'dotenv';

// Dependências da Clean Architecture
import { MemoryVectorStoreImpl } from './infrastructure/ai/vector-store/MemoryVectorStoreImpl';
import { LangChainAgentProvider } from './infrastructure/ai/LangChainAgentProvider';
import { AskQuestionUseCase } from './application/use-cases/AskQuestionUseCase';
import { IngestKnowledgeUseCase } from './application/use-cases/IngestKnowledgeUseCase';
import { AiController } from './infrastructure/controllers/AiController';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ==========================================
// Injeção de Dependências Manual (DI Setup)
// ==========================================
const vectorStore = new MemoryVectorStoreImpl();
const aiProvider = new LangChainAgentProvider(vectorStore);

const ingestKnowledgeUseCase = new IngestKnowledgeUseCase(vectorStore);
const askQuestionUseCase = new AskQuestionUseCase(aiProvider);

const aiController = new AiController(askQuestionUseCase);

// ==========================================
// Rotas
// ==========================================
app.post(['/ask', '/api/ai/ask'], (req, res) => aiController.ask(req, res));

// ==========================================
// Inicialização do Servidor e Dados Iniciais
// ==========================================
const PORT = process.env.PORT || 3004;
app.listen(PORT, async () => {
  console.log(`🧠 AI Service (Agente Autônomo) escutando na porta ${PORT}`);
  
  // Opcionalmente, já carregar a base de conhecimento no boot
  try {
    const workspaceRoot = path.resolve(__dirname, '../../');
    await ingestKnowledgeUseCase.execute(workspaceRoot);
  } catch (e: any) {
    console.error('⚠️ Falha ao ingerir conhecimentos iniciais:', e.message);
  }
});
