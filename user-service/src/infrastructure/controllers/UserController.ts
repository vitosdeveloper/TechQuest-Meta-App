import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/CreateUserUseCase';

import { SaveKanbanUseCase } from '../../application/SaveKanbanUseCase';
import { CompleteLessonUseCase } from '../../application/CompleteLessonUseCase';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-senior-techquest';

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly saveKanbanUseCase: SaveKanbanUseCase,
    private readonly completeLessonUseCase: CompleteLessonUseCase,
    private readonly prisma: any // Injetamos prisma apenas para MVP GetUser
  ) {}

  public async create(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const email = `${username.toLowerCase().replace(/\s+/g, '')}@techquest.com`;
      if (!password || password.length > 16) {
        return res.status(400).json({ error: 'Senha inválida ou muito longa (máx 16 caracteres).' });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.createUserUseCase.execute(username, email, hashedPassword);
      
      const token = jwt.sign({ id: user.id, role: 'user' }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({ token, userId: user.id, user });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body; // frontend will send username and password
      
      // Busca usuário pelo email ou pelo nome
      const user = await this.prisma.user.findFirst({
        where: {
          OR: [
            { email: username },
            { name: username }
          ]
        }
      });
      
      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }
      
      // Assinatura JWT
      const token = jwt.sign({ id: user.id, role: 'user' }, JWT_SECRET, { expiresIn: '7d' });
      
      return res.status(200).json({ token, userId: user.id });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async saveKanbanState(req: Request, res: Response) {
    try {
      const userId = req.params.id || 'neo-logado'; 
      const state = req.body.state || req.body;
      await this.saveKanbanUseCase.execute(userId, state);
      return res.status(200).json({ success: true });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async completeLesson(req: Request, res: Response) {
    try {
      const userId = req.params.id || 'neo-logado';
      const { lessonId } = req.body;
      await this.completeLessonUseCase.execute(userId, lessonId);
      return res.status(200).json({ success: true });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const userId = req.params.id || 'neo-logado';
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return res.json({ id: userId, name: 'Neo', email: 'neo@techquest.com', kanbanState: {} }); // Retorna fallback para evitar quebra do GraphQL
      }
      return res.json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
