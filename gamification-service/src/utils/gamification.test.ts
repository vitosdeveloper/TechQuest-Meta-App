import { calculateLevel, getTitle } from './gamification';

describe('Gamification Logic', () => {
  it('should start at level 1 for 0 XP', () => {
    expect(calculateLevel(0)).toBe(1);
  });

  it('should level up to 4 at 900 XP', () => {
    expect(calculateLevel(900)).toBe(4);
  });

  it('should be level 6 at 2500 XP', () => {
    expect(calculateLevel(2500)).toBe(6);
  });

  it('should return correct title for level 1', () => {
    expect(getTitle(1)).toBe('Iniciante');
  });

  it('should return correct title for level 21', () => {
    expect(getTitle(21)).toBe('Arquiteto Cloud Native');
  });
});
