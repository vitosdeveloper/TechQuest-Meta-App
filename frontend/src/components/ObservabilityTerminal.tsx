import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Activity } from 'lucide-react';

export const ObservabilityTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Conecta no endpoint SSE do Observability Service
    const eventSource = new EventSource('http://localhost:3006/stream');

    eventSource.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      if (parsed.type === 'history') {
        setLogs(parsed.logs);
      } else if (parsed.type === 'live') {
        setLogs(prev => {
          const newLogs = [...prev, parsed.log];
          if (newLogs.length > 50) newLogs.shift();
          return newLogs;
        });
      }
    };

    return () => eventSource.close();
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: '20px', left: '20px', zIndex: 9000,
          background: 'var(--panel-bg)', backdropFilter: 'blur(10px)',
          border: '1px solid var(--accent)', color: 'var(--accent)',
          padding: '10px 16px', borderRadius: '30px', display: 'flex', gap: '8px', alignItems: 'center',
          boxShadow: '0 0 15px rgba(0, 255, 204, 0.3)', cursor: 'pointer', fontWeight: 'bold'
        }}
      >
        <Terminal size={18} /> Matrix Mode
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed', bottom: '20px', left: '20px', right: '20px', height: '300px', zIndex: 9000,
      background: 'rgba(10, 15, 20, 0.95)', border: '1px solid var(--border-color)', borderRadius: '12px',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(0, 255, 204, 0.2)'
    }}>
      <div style={{
        padding: '10px 16px', background: 'rgba(0,0,0,0.5)', borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 'bold' }}>
          <Activity size={16} className="animate-pulse" /> 
          STREAM DE OBSERVABILIDADE (SSE + KAFKA)
        </div>
        <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>
          <X size={18} />
        </button>
      </div>

      <div ref={scrollRef} style={{ padding: '12px', overflowY: 'auto', flex: 1, fontFamily: 'monospace', fontSize: '0.8rem' }}>
        {logs.length === 0 ? (
          <div style={{ color: 'var(--text-muted)' }}>Aguardando eventos do cluster...</div>
        ) : (
          logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '6px', lineHeight: '1.4' }}>
              <span style={{ color: '#888' }}>[{new Date(log.timestamp).toLocaleTimeString()}]</span>{' '}
              <span style={{ color: log.topic.includes('http') ? '#ffcc00' : '#ff00ff', fontWeight: 'bold' }}>
                [{log.topic}]
              </span>{' '}
              <span style={{ color: log.data?.level === 'error' ? '#ff4444' : '#00ffcc' }}>
                {log.data?.message ? log.data.message : JSON.stringify(log.data)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
