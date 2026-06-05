import express from 'express';
import cors from 'cors';
import * as path from 'path';
import * as fs from 'fs';
import { FileSystemLessonRepository } from './infrastructure/repositories/FileSystemLessonRepository';
import { ListLessonsUseCase } from './application/use-cases/ListLessonsUseCase';
import { GetLessonUseCase } from './application/use-cases/GetLessonUseCase';
import { SearchLessonsUseCase } from './application/use-cases/SearchLessonsUseCase';
import { LessonController } from './infrastructure/controllers/LessonController';

const app = express();
const PORT = process.env.PORT || 3002;


app.use(express.json());

// ==========================================
// WIRING (Injeção de Dependências Manual)
// ==========================================
const repository = new FileSystemLessonRepository();

const listLessonsUseCase = new ListLessonsUseCase(repository);
const getLessonUseCase = new GetLessonUseCase(repository);
const searchLessonsUseCase = new SearchLessonsUseCase(repository);

const lessonController = new LessonController(listLessonsUseCase, getLessonUseCase, searchLessonsUseCase);

// ==========================================
// ROTAS
// ==========================================
// Binding `this` do controller
app.get('/', (req, res) => lessonController.list(req, res));
app.get('/search', (req, res) => lessonController.search(req, res));
app.get('/:id', (req, res) => lessonController.getById(req, res));

// Endpoint para ler arquivos físicos do workspace de forma segura
app.get('/api/files', async (req, res) => {
  const filePath = req.query.path as string;
  if (!filePath) {
    return res.status(400).json({ error: 'Caminho não fornecido.' });
  }

  // Raiz do monorepo (2 níveis acima do diretório src do course-service)
  const workspaceRoot = path.resolve(__dirname, '../../../../');
  
  // Resolve o caminho absoluto de forma segura
  const targetPath = path.resolve(workspaceRoot, filePath.replace(/^\/+/, ''));

  // Previne Path Traversal garantindo que o targetPath inicia com workspaceRoot
  if (!targetPath.startsWith(workspaceRoot)) {
    return res.status(403).json({ error: 'Acesso negado: Path Traversal detectado.' });
  }

  // Previne acesso a arquivos sensíveis
  const sensitivePatterns = ['.env', 'node_modules', '.git', 'package-lock.json'];
  if (sensitivePatterns.some(pattern => targetPath.includes(pattern))) {
    return res.status(403).json({ error: 'Acesso negado: Leitura de arquivo sensível ou de sistema.' });
  }

  if (!fs.existsSync(targetPath)) {
    return res.status(404).json({ error: 'Arquivo não encontrado.' });
  }

  try {
    const stat = await fs.promises.stat(targetPath);
    if (!stat.isFile()) {
      return res.status(400).json({ error: 'O caminho não aponta para um arquivo.' });
    }

    const content = await fs.promises.readFile(targetPath, 'utf-8');
    return res.json({ content });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao ler arquivo do sistema.' });
  }
});

app.listen(PORT, () => {
  console.log(`📚 Course Service (Clean Arch) rodando na porta ${PORT}`);
});
