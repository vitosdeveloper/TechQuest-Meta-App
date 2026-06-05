import request from 'supertest';
import { app } from './app';

// Mocking the KafkaJS module so tests don't try to connect to a real broker
jest.mock('./kafka/client', () => {
  return {
    kafkaClient: {
      producer: jest.fn(() => ({
        connect: jest.fn().mockResolvedValue(true),
        send: jest.fn().mockResolvedValue(true),
        disconnect: jest.fn().mockResolvedValue(true),
      })),
    },
  };
});

describe('User Controller - Creation', () => {
  it('should create a new user successfully and return 201', async () => {
    const newUser = {
      username: 'tech_quester',
      email: 'quester@tech.com',
      password: 'supersecretpassword',
    };

    const response = await request(app)
      .post('/users')
      .send(newUser)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe(newUser.username);
    expect(response.body.email).toBe(newUser.email);
    expect(response.body).not.toHaveProperty('password'); // Password shouldn't be returned
  });

  it('should return 400 if email is missing', async () => {
    const newUser = {
      username: 'tech_quester',
      password: 'supersecretpassword',
    };

    const response = await request(app)
      .post('/users')
      .send(newUser)
      .expect(400);
      
    expect(response.body).toHaveProperty('error');
  });
});
