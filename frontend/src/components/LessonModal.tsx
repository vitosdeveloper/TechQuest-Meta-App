import React, { useEffect, useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { X, BookOpen, Copy, Check, Maximize2 } from 'lucide-react';
import mermaid from 'mermaid';
import { CodeViewerModal } from './CodeViewerModal';
import { apiFetch } from '../utils/api';

mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'loose' });

const MermaidDiagram = ({ chart }: { chart: string }) => {
  const [svg, setSvg] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    mermaid.render(`mermaid-${Math.random().toString(36).substring(7)}`, chart)
      .then((result) => {
        setSvg(result.svg);
      })
      .catch(err => {
        console.error(err);
        setSvg(`<pre style="color:red">Erro ao renderizar diagrama: ${err.message}</pre>`);
      });
  }, [chart]);

  if (isFullscreen) {
    return (
      <div className="fullscreen-mermaid" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto' }}>
        <button onClick={() => setIsFullscreen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '10px', borderRadius: '50%', cursor: 'pointer', zIndex: 10000 }} title="Fechar tela cheia">
          <X size={24} />
        </button>
        <div dangerouslySetInnerHTML={{ __html: svg }} style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 20px rgba(0, 255, 204, 0.2)', width: '95vw', height: '95vh', overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', margin: '20px 0', maxWidth: '100%', overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px', background: 'rgba(0,0,0,0.2)' }}>
      <button onClick={() => setIsFullscreen(true)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '6px', borderRadius: '4px', cursor: 'pointer', zIndex: 10 }} title="Ver em tela cheia">
        <Maximize2 size={16} />
      </button>
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
};

interface LessonModalProps {
  lessonId: string;
  onClose: () => void;
}

const CodeBlock = ({ language, children, ...props }: any) => {
  const [copied, setCopied] = useState(false);
  const codeString = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: 'relative', marginTop: '8px', marginBottom: '8px' }}>
      <button 
        onClick={handleCopy}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#fff',
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '0.7rem',
          zIndex: 10
        }}
        title="Copiar código"
      >
        {copied ? <Check size={12} color="#00ffcc" /> : <Copy size={12} />}
        {copied ? 'Copiado' : 'Copiar'}
      </button>
      <SyntaxHighlighter
        style={vscDarkPlus as any}
        language={language}
        PreTag="div"
        customStyle={{ margin: 0, borderRadius: '6px' }}
        {...props}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export const LessonModal: React.FC<LessonModalProps> = ({ lessonId, onClose }) => {
  const [content, setContent] = useState<string>('Carregando conteúdo da aula...');
  const [viewingFile, setViewingFile] = useState<string | null>(null);

  useEffect(() => {
    // Injeta classe global para avisar o sistema (ex: parar o XP polling)
    document.body.classList.add('modal-open');

    const fetchContent = async () => {
      try {
        const res = await apiFetch(`${import.meta.env.VITE_API_GATEWAY_URL}/api/lessons/${lessonId}`);
        const data = await res.json();
        if (data.content) {
          setContent(data.content);
        } else {
          setContent('Erro: Lição não encontrada no servidor.');
        }
      } catch (err: any) {
        setContent(`**Erro de Conexão:** Não foi possível conectar ao Course Service. Certifique-se de que o backend na pasta course-service está rodando na porta 3002. \n\n Detalhes: ${err.message}`);
      }
    };

    fetchContent();

    return () => {
      // Remove classe quando o leitor fechar
      document.body.classList.remove('modal-open');
    };
  }, [lessonId]);

  const markdownComponents = useMemo(() => ({
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      if (!inline && match) {
        if (match[1] === 'mermaid') {
          return <MermaidDiagram chart={String(children)} />;
        }
        return (
          <CodeBlock language={match[1]} {...props}>
            {children}
          </CodeBlock>
        );
      }
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    a({ node, href, children, ...props }: any) {
      if (href?.startsWith('file://')) {
        return (
          <a
            href={href}
            onClick={(e) => {
              e.preventDefault();
              // Remove o file:// para pegar apenas o caminho
              const path = href.replace('file://', '');
              setViewingFile(path);
            }}
            {...props}
            style={{ color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {children}
          </a>
        );
      }
      return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
    }
  }), []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ margin: 0 }}><BookOpen color="var(--primary)" /> Leitor de Lição</h2>
          <button className="close-btn" onClick={onClose}><X /></button>
        </div>
        <div className="modal-body markdown-body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
            urlTransform={(url) => url}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
      
      {/* Code Viewer Sub-Modal */}
      {viewingFile && (
        <CodeViewerModal filePath={viewingFile} onClose={() => setViewingFile(null)} />
      )}
    </div>
  );
};
