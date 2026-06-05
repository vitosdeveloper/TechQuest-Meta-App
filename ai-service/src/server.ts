import express from 'express';
import cors from 'cors';
import path from 'path';
import { TechQuestAiMentor } from './rag'; // Nossa classe que já criamos no tutorial de LangChain

const app = express();

app.use(express.json());

// Simulação de in-memory RAG
const mentor = new TechQuestAiMentor();
let isRagInitialized = false;

  app.post(['/ask', '/api/ai/ask'], async (req, res) => {
  try {
    const { question, chatHistory } = req.body;
    
    // Inicializa os documentos no Vector Store na primeira chamada
    if (!isRagInitialized) {
      console.log('🔄 Inicializando base de conhecimento...');
      await mentor.ingestLessons(path.resolve(__dirname, '../../'));
      isRagInitialized = true;
    }

    console.log(`🤖 Pergunta recebida: ${question}`);
    const answer = await mentor.askQuestion(question, chatHistory || '');
    
    res.json({ answer });
  } catch (error: any) {
    console.error('Erro na IA:', error);
    res.status(500).json({ error: 'Falha no servidor de IA', details: error.message });
  }
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`🧠 AI Service (RAG) escutando na porta ${PORT}`);
});
