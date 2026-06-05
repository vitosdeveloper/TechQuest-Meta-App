import React, { useState } from 'react';
import { Terminal, Cpu, Database, Cloud, Zap, ArrowRight, Loader2 } from 'lucide-react';

interface WelcomeScreenProps {
  onInitialize: (isLogin: boolean, data: any) => Promise<void>;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onInitialize }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onInitialize(mode === 'login', formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="welcome-screen">
      <div className="welcome-container glass-panel">
        <div className="welcome-header">
          <Terminal size={48} color="var(--primary)" className="glow-icon" />
          <h1 className="hero-title">
            TechQuest <span className="highlight">Meta-App</span>
          </h1>
          <p className="hero-subtitle">v2.0 Enterprise Protocol</p>
        </div>

        <div className="welcome-body" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <p className="lead-text">
              O primeiro sistema educacional que é, em si mesmo, o objeto de estudo.
            </p>
            
            <div className="features-grid" style={{ gridTemplateColumns: '1fr', gap: '1rem' }}>
              <div className="feature-card" style={{ padding: '15px' }}>
                <Database color="var(--accent)" size={20} />
                <h3 style={{ margin: '5px 0' }}>Autenticação Real</h3>
                <p style={{ fontSize: '0.8rem' }}>Sistema protegido por JWT e Bcrypt.</p>
              </div>
              <div className="feature-card" style={{ padding: '15px' }}>
                <Cpu color="var(--primary)" size={20} />
                <h3 style={{ margin: '5px 0' }}>Clean Architecture</h3>
                <p style={{ fontSize: '0.8rem' }}>Separação de Domínio, Infra e Casos de Uso.</p>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: '300px', background: 'rgba(0,0,0,0.5)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <button 
                type="button"
                onClick={() => setMode('login')}
                style={{ flex: 1, padding: '10px', background: mode === 'login' ? 'var(--primary)' : 'transparent', color: mode === 'login' ? '#000' : 'var(--text-muted)', border: '1px solid var(--primary)', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                LOGIN
              </button>
              <button 
                type="button"
                onClick={() => setMode('register')}
                style={{ flex: 1, padding: '10px', background: mode === 'register' ? 'var(--accent)' : 'transparent', color: mode === 'register' ? '#000' : 'var(--text-muted)', border: '1px solid var(--accent)', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                CRIAR CONTA
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--primary)', fontSize: '0.85rem' }}>USUÁRIO (Login)</label>
                <input 
                  type="text" 
                  required
                  value={formData.username}
                  onChange={e => setFormData({...formData, username: e.target.value})}
                  placeholder="Seu nick de agente"
                  style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--primary)', fontSize: '0.85rem' }}>SENHA</label>
                <input 
                  type="password" 
                  required
                  maxLength={16}
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  placeholder="********"
                  style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px' }}
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="action-btn massive-btn"
                style={{ marginTop: '10px' }}
              >
                {isLoading ? (
                  <><Loader2 className="animate-spin" size={20} /> PROCESSANDO...</>
                ) : (
                  <>{mode === 'login' ? 'ACESSAR SISTEMA' : 'REGISTRAR ACESSO'} <ArrowRight size={20} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
