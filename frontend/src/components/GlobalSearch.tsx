import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { apiFetch } from '../utils/api';

interface SearchResult {
  lessonId: string;
  title: string;
  snippet: string;
}

export const GlobalSearch = ({ onSelectLesson }: { onSelectLesson: (id: string) => void }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const ITEMS_PER_PAGE = 3;

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounce e chamada a API
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    // Ativa o loading IMEDIATAMENTE ao digitar
    setIsLoading(true);

    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await apiFetch(`${import.meta.env.VITE_API_GATEWAY_URL}/api/lessons/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
        setPage(1);
      } catch (err) {
        console.error("Falha na busca", err);
      } finally {
        setIsLoading(false);
      }
    }, 600); // 600ms após terminar de digitar, fica muito mais responsivo

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Se o usuário der enter
  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!query || query.trim().length < 2) return;
      setIsLoading(true);
      setIsOpen(true);
      try {
        const res = await apiFetch(`${import.meta.env.VITE_API_GATEWAY_URL}/api/lessons/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
        setPage(1);
      } catch (err) {
        console.error("Falha na busca", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const paginatedResults = results.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '300px' }}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Pesquisar nos Módulos..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          style={{
            width: '100%',
            padding: '10px 10px 10px 36px',
            borderRadius: '20px',
            border: '1px solid var(--border-color)',
            background: 'rgba(0,0,0,0.4)',
            color: '#fff',
            outline: 'none'
          }}
        />
        <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
        </div>
      </div>

      {isOpen && (query.trim().length >= 2) && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '8px',
          background: 'var(--panel-bg)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          zIndex: 9999,
          maxHeight: '400px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {isLoading && results.length === 0 ? (
            <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)' }}>Buscando em todo o curso...</div>
          ) : results.length === 0 ? (
            <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)' }}>Nenhum resultado encontrado.</div>
          ) : (
            <>
              <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: '0.8rem', color: 'var(--primary)' }}>
                {results.length} resultados encontrados
              </div>
              <div style={{ overflowY: 'auto', flex: 1 }}>
                {paginatedResults.map((res, i) => (
                  <div 
                    key={i} 
                    onClick={() => {
                      onSelectLesson(res.lessonId);
                      setIsOpen(false);
                    }}
                    style={{
                      padding: '12px',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: '#fff', fontWeight: 'bold' }}>
                      <FileText size={14} color="var(--accent)" />
                      {res.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                      <span dangerouslySetInnerHTML={{ __html: res.snippet.replace(new RegExp(`(${query})`, 'gi'), '<strong style="color: var(--primary); background: rgba(0,255,204,0.1)">$1</strong>') }} />
                    </div>
                  </div>
                ))}
              </div>
              
              {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)' }}>
                  <button 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    style={{ background: 'transparent', border: 'none', color: page === 1 ? 'rgba(255,255,255,0.2)' : '#fff', cursor: page === 1 ? 'default' : 'pointer' }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Página {page} de {totalPages}</span>
                  <button 
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    style={{ background: 'transparent', border: 'none', color: page === totalPages ? 'rgba(255,255,255,0.2)' : '#fff', cursor: page === totalPages ? 'default' : 'pointer' }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
