import React, { useEffect, useState, Suspense } from 'react';
import { KanbanBoard } from './components/KanbanBoard';
import { AiMentorSidebar } from './components/AiMentorSidebar';
import { CyberProfile } from './components/CyberProfile';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Terminal } from 'lucide-react';
import { GlobalSearch } from './components/GlobalSearch';
import { LessonModal } from './components/LessonModal';
const ObservabilityTerminal = React.lazy(() => import('mfe_terminal/ObservabilityTerminal'));
import { CloudDeployModal } from './components/CloudDeployModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { apiFetch } from './utils/api';
import { Cloud } from 'lucide-react';
import './index.css';
import './markdown.css';

export interface UserData {
  id: string;
  name: string;
  xp: number;
  level: number;
  title?: string;
}

function App() {
  const [user, setUser] = useState<UserData | null>(() => {
    const saved = localStorage.getItem('techquest_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [globalLessonId, setGlobalLessonId] = useState<string | null>(null);
  const [showCloudDeploy, setShowCloudDeploy] = useState<boolean>(false);

  useEffect(() => {
    // Validação de sessão no carregamento
    const validateSession = async () => {
      const token = localStorage.getItem('techquest_token');
      if (user && token) {
        try {
          const graphqlQuery = {
            query: `query { user(id: "${user.id}") { id } }`
          };
          const res = await apiFetch(`${import.meta.env.VITE_API_GATEWAY_URL}/graphql`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(graphqlQuery)
          });
          const gqlData = await res.json();
          if (!res.ok || !gqlData.data || !gqlData.data.user) {
            throw new Error('Sessão inválida');
          }
          // Sessão válida, salva cache
          localStorage.setItem('techquest_user', JSON.stringify(user));
        } catch (e) {
          console.error('Sessão inválida ou expirada, deslogando...', e);
          handleLogout();
        }
      }
    };
    validateSession();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('techquest_user');
    localStorage.removeItem('techquest_token');
    setUser(null);
  };

  const handleInitialize = async (isLogin: boolean, formData: any) => {
    try {
      const endpoint = isLogin ? '/api/users/login' : '/api/users';
      
      const res = await fetch(`${import.meta.env.VITE_API_GATEWAY_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        const data = await res.json();
        // data = { token: '...', userId: '123' }
        localStorage.setItem('techquest_token', data.token);

        // [NOVO] Sincronização e recálculo síncrono do XP (bypassing the async flows for instant UI update)
        const userRestRes = await apiFetch(`${import.meta.env.VITE_API_GATEWAY_URL}/api/users/${data.userId}`);
        const userRestData = await userRestRes.json();
        const kanbanState = typeof userRestData.kanbanState === 'string' ? JSON.parse(userRestData.kanbanState) : (userRestData.kanbanState || {});

        const syncRes = await apiFetch(`${import.meta.env.VITE_API_GATEWAY_URL}/api/xp/sync`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: data.userId, kanbanState })
        });
        const syncData = await syncRes.json();

        // Fetch user info with GraphQL (BFF) para puxar profile information
        const graphqlQuery = {
          query: `
            query GetUserProfile($id: String!) {
              user(id: $id) {
                id
                name
              }
            }
          `,
          variables: { id: data.userId }
        };

        const userRes = await apiFetch(`${import.meta.env.VITE_API_GATEWAY_URL}/graphql`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(graphqlQuery)
        });
        
        const gqlData = await userRes.json();
        const userData = gqlData.data?.user;
        
        const finalUser = { 
          id: userData?.id || userRestData.id, 
          name: userData?.name || userRestData.name, 
          xp: syncData.xp, // O XP agora vem direto do recálculo síncrono!
          level: syncData.level, 
          title: syncData.title 
        };
        
        setUser(finalUser);
        localStorage.setItem('techquest_user', JSON.stringify(finalUser));
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Falha na Autenticação');
      }
    } catch (err: any) {
      alert(err.message || 'Erro ao conectar com API Gateway.');
      throw err;
    }
  };

  if (!user) {
    return <WelcomeScreen onInitialize={handleInitialize} />;
  }

  return (
    <div className="app-container">
      <header className="app-header glass-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Terminal size={24} color="var(--primary)" />
          <h1 style={{ margin: 0, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', textShadow: '0 0 10px var(--primary-glow)' }}>
            TechQuest <span style={{ color: 'var(--accent)' }}>Meta-App</span>
          </h1>
        </div>
        <GlobalSearch onSelectLesson={setGlobalLessonId} />
        <CyberProfile user={user} setUser={setUser} />
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <KanbanBoard userId={user.id} />
      </main>
      
        <AiMentorSidebar userId={user.id} />
        <ErrorBoundary fallback={<div style={{position: 'fixed', bottom: 20, left: 20, color: 'var(--primary)', padding: '10px', background: 'rgba(0,0,0,0.5)', borderRadius: '8px', zIndex: 1000}}>🔌 MFE Terminal Offline (Micro-frontend não iniciado)</div>}>
          <Suspense fallback={<div style={{position: 'fixed', bottom: 20, left: 20, color: 'var(--accent)'}}>Carregando MFE Terminal...</div>}>
            <ObservabilityTerminal />
          </Suspense>
        </ErrorBoundary>

      {globalLessonId && <LessonModal lessonId={globalLessonId} onClose={() => setGlobalLessonId(null)} />}
      {showCloudDeploy && <CloudDeployModal onClose={() => setShowCloudDeploy(false)} />}

      <button
        onClick={() => setShowCloudDeploy(true)}
        style={{
          position: 'fixed', bottom: '20px', right: '20px', zIndex: 9000,
          background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)', backdropFilter: 'blur(10px)',
          border: 'none', color: '#fff',
          padding: '10px 16px', borderRadius: '30px', display: 'flex', gap: '8px', alignItems: 'center',
          boxShadow: '0 0 15px rgba(37, 117, 252, 0.5)', cursor: 'pointer', fontWeight: 'bold'
        }}
      >
        <Cloud size={18} /> Cloud Deploy
      </button>

      {/* Footer Credits */}
      <div style={{
        position: 'fixed', bottom: '15px', left: '50%', transform: 'translateX(-50%)',
        fontSize: '0.85rem', color: 'var(--text-muted)', zIndex: 8000,
        display: 'flex', gap: '15px', background: 'rgba(0,0,0,0.6)', 
        padding: '8px 20px', borderRadius: '30px', backdropFilter: 'blur(5px)',
        border: '1px solid var(--border-color)', alignItems: 'center'
      }}>
        <span>Developed by <strong style={{ color: '#fff' }}>vitosdeveloper</strong></span>
        <span style={{ opacity: 0.3 }}>|</span>
        <a href="https://github.com/vitosdeveloper" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
          GitHub
        </a>
        <span style={{ opacity: 0.3 }}>|</span>
        <a href="https://linkedin.com/in/vitosdeveloper" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
          LinkedIn
        </a>
        <span style={{ opacity: 0.3 }}>|</span>
        <a href="https://vitosdeveloper.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
          Website
        </a>
      </div>
    </div>
  );
}

export default App;
