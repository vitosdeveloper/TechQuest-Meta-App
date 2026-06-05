import React, { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { X, Code2, Loader2 } from 'lucide-react';
import { apiFetch } from '../utils/api';

interface CodeViewerModalProps {
  filePath: string;
  onClose: () => void;
}

export const CodeViewerModal: React.FC<CodeViewerModalProps> = ({ filePath, onClose }) => {
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Busca o arquivo físico via Course Service (ou API Gateway roteando para o Course Service)
    const fetchCode = async () => {
      try {
        setLoading(true);
        const res = await apiFetch(`${import.meta.env.VITE_API_GATEWAY_URL}/api/files?path=${encodeURIComponent(filePath)}`);
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Erro ao carregar arquivo');
        }
        const data = await res.json();
        setCode(data.content);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCode();
  }, [filePath]);

  // Inferir a linguagem pela extensão
  const extension = filePath.split('.').pop() || 'typescript';
  const languageMap: Record<string, string> = {
    'ts': 'typescript',
    'tsx': 'tsx',
    'js': 'javascript',
    'jsx': 'jsx',
    'json': 'json',
    'css': 'css',
    'html': 'html',
    'md': 'markdown',
    'yml': 'yaml',
    'yaml': 'yaml',
  };
  const language = languageMap[extension] || 'typescript';

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div className="modal-content glass-panel" onClick={e => e.stopPropagation()} style={{ maxWidth: '900px' }}>
        <div className="modal-header">
          <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Code2 color="var(--primary)" /> Visualizador de Código
          </h2>
          <button className="close-btn" onClick={onClose}><X /></button>
        </div>
        
        <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span style={{ color: 'var(--primary)' }}>Caminho do Arquivo:</span> {filePath}
        </div>

        <div className="modal-body" style={{ padding: 0 }}>
          {loading && (
            <div style={{ padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', color: 'var(--accent)' }}>
              <Loader2 className="animate-spin" /> Carregando código-fonte...
            </div>
          )}
          
          {error && (
            <div style={{ padding: '40px', color: '#ff4444', textAlign: 'center' }}>
              <strong>Acesso Negado ou Arquivo Inexistente:</strong><br/>
              {error}
            </div>
          )}

          {!loading && !error && (
            <SyntaxHighlighter
              style={vscDarkPlus as any}
              language={language}
              customStyle={{ margin: 0, borderRadius: 0, maxHeight: '60vh' }}
              showLineNumbers
            >
              {code}
            </SyntaxHighlighter>
          )}
        </div>
      </div>
    </div>
  );
};
