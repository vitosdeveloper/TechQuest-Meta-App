import express, { Request, Response } from 'express';
import { publishUserCreatedEvent } from './kafka/producer';

const app = express();

app.use(express.json());

// Rota de Health Check para o Kubernetes Probes
app.get('/health', (req: Request, res: Response) => {
  return res.status(200).json({ status: 'UP' });
});

// In-memory mock database for now
const users: any[] = [];

app.post('/users', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ error: 'Missing required fields: email, username, and password are required.' });
  }

  const newUser = {
    id: users.length + 1,
    username,
    email,
    password, // In a real app, hash this!
  };

  users.push(newUser);

  // Exclude password from the response
  const { password: _, ...userResponse } = newUser;
  
  // Publicar o evento de criação de usuário no Kafka
  await publishUserCreatedEvent(userResponse);
  
  return res.status(201).json(userResponse);
});

export { app };
