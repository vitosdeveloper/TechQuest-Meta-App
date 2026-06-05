export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function getTitle(level: number): string {
  if (level >= 5) return 'Arquiteto Cloud Native';
  if (level >= 4) return 'Engenheiro Sênior';
  if (level >= 3) return 'Desenvolvedor Pleno';
  if (level >= 2) return 'Tech Explorer';
  return 'Iniciante';
}
