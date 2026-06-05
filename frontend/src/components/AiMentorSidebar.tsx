import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Loader2, Copy, Check, Trash2, Maximize2, Minimize2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { apiFetch } from '../utils/api';

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

const INITIAL_MESSAGES = [
  { id: 1, role: 'ai', text: 'Olá! Sou o Mestre do Código. Estou conectado aos nossos microserviços através do API Gateway! Faça uma pergunta sobre nossa arquitetura.' }
];

export const AiMentorSidebar = ({ userId }: { userId: string }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(`techquest_ai_chat_${userId}`);
    if (saved) return JSON.parse(saved);
    return INITIAL_MESSAGES;
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(`techquest_ai_chat_${userId}`, JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, userId]);

  const handleClearChat = () => {
    if (confirm("Tem certeza que deseja excluir esta conversa e começar sem contexto?")) {
      setMessages(INITIAL_MESSAGES);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    
    // Constrói o histórico da conversa em texto para passar de contexto para a IA
    const chatHistoryStr = messages.map((m: any) => `${m.role === 'ai' ? 'Mestre' : 'Aluno'}: ${m.text}`).join('\n');
    
    setMessages((prev: any) => [...prev, { id: Date.now(), role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await apiFetch(`${import.meta.env.VITE_API_GATEWAY_URL}/api/ai/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMsg, chatHistory: chatHistoryStr })
      });
      
      const data = await response.json();
      
      setMessages((prev: any) => [...prev, { 
        id: Date.now(), 
        role: 'ai', 
        text: data.answer || 'Erro: O Mestre da IA não conseguiu formular uma resposta.'
      }]);
    } catch (err) {
      setMessages((prev: any) => [...prev, { 
        id: Date.now(), 
        role: 'ai', 
        text: `Erro de Conexão: Não consegui alcançar o AI Service no Gateway. Verifique se os serviços na porta 3000 e 3004 estão rodando.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`glass-panel ai-sidebar ${isMaximized ? 'maximized' : ''}`}>
      <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0 }}><Bot size={24} color="var(--accent)" /> Mestre do Código</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--accent)', marginTop: '4px' }}>Conectado (API Gateway)</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setIsMaximized(!isMaximized)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            title={isMaximized ? "Sair do Modo Foco" : "Modo Foco (Tela Cheia)"}
          >
            {isMaximized ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button 
            onClick={handleClearChat}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            title="Excluir Conversa e Limpar Contexto"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="chat-history">
        {messages.map((msg: any) => (
          <div key={msg.id} className={`chat-bubble ${msg.role}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', opacity: 0.7 }}>
              {msg.role === 'ai' ? <Bot size={14} /> : <User size={14} />}
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{msg.role === 'ai' ? 'IA (RAG)' : 'Você'}</span>
            </div>
            {msg.role === 'ai' ? (
              <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <CodeBlock language={match[1]} {...props}>
                          {children}
                        </CodeBlock>
                      ) : (
                        <code className={className} {...props} style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 4px', borderRadius: '4px' }}>
                          {children}
                        </code>
                      );
                    }
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>
            ) : (
              msg.text
            )}
          </div>
        ))}
        {isLoading && (
          <div className="chat-bubble ai" style={{ opacity: 0.6 }}>
            <Loader2 className="animate-spin" size={16} /> Processando Contexto...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <input 
          type="text" 
          className="chat-input" 
          placeholder="Pergunte sobre Kafka, NestJS..." 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
        />
        <button className="chat-send-btn" onClick={handleSend} disabled={isLoading}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};
