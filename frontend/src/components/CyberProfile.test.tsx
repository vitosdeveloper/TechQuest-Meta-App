import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CyberProfile } from './CyberProfile';
import { vi } from 'vitest';

const mockUser = {
  id: 'user-123',
  name: 'Test Agent',
  xp: 150,
  level: 2,
  title: 'Hacker'
};

describe('CyberProfile Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ xp: 400, level: 3, title: 'Tech Mage' })
      })
    ));
    import.meta.env.VITE_API_GATEWAY_URL = 'http://localhost:3001';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the initial user correctly', () => {
    const setUserMock = vi.fn();
    render(<CyberProfile user={mockUser} setUser={setUserMock} />);
    
    expect(screen.getByText('Test Agent')).toBeInTheDocument();
    expect(screen.getByText('150 / 400 XP')).toBeInTheDocument();
  });

  it('fetches new XP data automatically and calls setUser', async () => {
    const setUserMock = vi.fn();
    
    await act(async () => {
      render(<CyberProfile user={mockUser} setUser={setUserMock} />);
    });

    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/xp/user-123');
    expect(setUserMock).toHaveBeenCalled();
    
    // Testa a atualização de estado simulada
    const updateFn = setUserMock.mock.calls[0][0];
    const newState = updateFn(mockUser);
    expect(newState.xp).toBe(400);
    expect(newState.level).toBe(3);
    expect(newState.title).toBe('Tech Mage');
  });
});
