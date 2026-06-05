import { useEffect } from 'react';
import { Zap, User as UserIcon } from 'lucide-react';
import type { UserData } from '../App';
import { apiFetch } from '../utils/api';

interface CyberProfileProps {
  user: UserData;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  title?: string;
}

export const CyberProfile: React.FC<CyberProfileProps> = ({ user, setUser }) => {
  const fetchXp = async () => {
    if (!user) return;
    try {
      const graphqlQuery = {
        query: `query { user(id: "${user.id}") { gamification { xp level title } } }`
      };

      const res = await apiFetch(`${import.meta.env.VITE_API_GATEWAY_URL}/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(graphqlQuery)
      });

      if (res.ok) {
        const gqlData = await res.json();
        const gamification = gqlData.data.user.gamification;
        setUser((prev: any) => prev ? { ...prev, xp: gamification.xp, level: gamification.level, title: gamification.title } : null);
      }
    } catch (err) {
      console.error('Erro ao buscar XP:', err);
    }
  };

  useEffect(() => {
    // Busca inicial imediata
    fetchXp();
    const interval = setInterval(async () => {
      if (document.hidden || document.body.classList.contains('modal-open')) return;
      await fetchXp();
    }, 60000); // Alterado de 15s para 60s para economizar rede/CPU, já que o Kanban emite evento instantâneo

    // Listener para o gatilho instantâneo do Kanban (Fallback)
    const handleInstantFetch = () => fetchXp();
    window.addEventListener('force-xp-update', handleInstantFetch);

    // Listener para o recálculo síncrono do Kanban (Bypass Kafka)
    const handleXpSynced = (e: any) => {
      const syncData = e.detail;
      setUser(prev => prev ? { ...prev, xp: syncData.xp, level: syncData.level, title: syncData.title } : null);
    };
    window.addEventListener('xp-synced', handleXpSynced as EventListener);

    return () => {
      clearInterval(interval);
      window.removeEventListener('force-xp-update', handleInstantFetch);
      window.removeEventListener('xp-synced', handleXpSynced as EventListener);
    };
  }, [user.id, setUser]);

  // Cálculo da barra de progresso do Nível
  // Exemplo de curva de Nível: L1=100, L2=300, L3=600, L4=1000...
  // xpNext = (level * level * 100) / 2 + 50 (fórmula aproximada arbitrária que o backend fará)
  // Vamos buscar do backend a prop xpToNextLevel ou inferir. O backend retornará xpTarget.
  const xpTarget = (user as any).xpTarget || (user.level * user.level * 100); 
  const progressPercent = Math.min(100, Math.max(0, (user.xp / xpTarget) * 100));

  const handleLogout = () => {
    localStorage.removeItem('techquest_user');
    localStorage.removeItem('techquest_token');
    window.location.reload(); // Aciona o reload para limpar o estado e voltar para a WelcomeScreen
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ background: 'var(--accent)', padding: '8px', borderRadius: '50%', color: '#000' }}>
          <UserIcon size={20} />
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>[{user.title?.toUpperCase() || 'AGENTE LOGADO'}]</div>
          <div style={{ fontWeight: 'bold', color: '#fff', letterSpacing: '1px' }}>{user.name}</div>
        </div>
      </div>
      
      <div style={{ background: 'rgba(0,0,0,0.5)', padding: '12px 20px', border: '1px solid var(--primary)', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: 'inset 0 0 10px rgba(0, 255, 204, 0.1)', minWidth: '200px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap color="var(--primary)" size={16} className="glow-icon" />
            <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 'bold' }}>NÍVEL {user.level}</span>
          </div>
          <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#fff' }}>{user.xp} / {xpTarget} XP</div>
        </div>
        
        {/* Barra de XP */}
        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary-glow)', transition: 'width 0.5s ease' }} />
        </div>
      </div>

      <button
        onClick={handleLogout}
        style={{
          background: 'rgba(255, 50, 50, 0.1)',
          border: '1px solid rgba(255, 50, 50, 0.5)',
          color: '#ff6b6b',
          padding: '8px 12px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '0.8rem',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 50, 50, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 50, 50, 0.1)';
        }}
      >
        <UserIcon size={14} /> DESLOGAR
      </button>
    </div>
  );
};
