import { useState, useEffect } from 'react';
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { LessonModal } from './LessonModal';
import { SortableItem } from './SortableItem';
import { apiFetch } from '../utils/api';

const DroppableColumn = ({ id, title, children, activeTab }: any) => {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`kanban-column ${activeTab === id ? 'active-tab' : ''}`} id={id}>
      <div className="column-title">{title}</div>
      {children}
    </div>
  );
};

const initialCols = [
  { id: 'todo', title: 'BACKLOG DE ESTUDOS' },
  { id: 'doing', title: 'NEURÔNIOS FRITANDO (DOING)' },
  { id: 'done', title: 'DOMINADO (DONE)' },
];

const fallbackItems: {id: string, title: string, desc: string, badge: string, status: string, lessonFile: string}[] = [
  // { id: '1', title: 'Auth Service (NestJS)', desc: 'Clean Arch + JWT', badge: 'Mundo 2', status: 'todo', lessonFile: 'user-service.lesson.md' },
  // { id: '2', title: 'EKS Terraform', desc: 'A Nuvem de Verdade', badge: 'Mundo 1', status: 'done', lessonFile: 'devops.lesson.md' },
];

const lessonRewards: Record<string, number> = {
  'intro.lesson.md': 50,
  'agile.lesson.md': 80,
  'user-service.lesson.md': 100,
  'solid.lesson.md': 110,
  'devops.lesson.md': 120,
  'auth.lesson.md': 120,
  'ci.lesson.md': 120,
  'microfrontends.lesson.md': 130,
  'caching.lesson.md': 140,
  'tests.lesson.md': 150,
  'mensageria.lesson.md': 150,
  'observability.lesson.md': 150,
  'security.lesson.md': 160,
  'system-design.lesson.md': 170,
  'cloud-native.lesson.md': 180,
  'grpc-graphql.lesson.md': 190,
  'eda-advanced.lesson.md': 200,
  'ai-engineering.lesson.md': 250,
};

export const KanbanBoard = ({ userId }: { userId: string }) => {
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>('todo'); 

  useEffect(() => {
    const loadData = async () => {
      try {
        const [lessonsRes, userRes] = await Promise.all([
          apiFetch(`${import.meta.env.VITE_API_GATEWAY_URL}/api/lessons`),
          apiFetch(`${import.meta.env.VITE_API_GATEWAY_URL}/api/users/${userId}`)
        ]);
        
        const apiData = await lessonsRes.json();
        let savedState: Record<string, string> = {};
        
        if (userRes.ok) {
           const userData = await userRes.json();
           if (userData.kanbanState) {
             savedState = typeof userData.kanbanState === 'string' ? JSON.parse(userData.kanbanState) : userData.kanbanState;
           }
        }

        setItems(apiData.length === 0 ? fallbackItems : apiData.map((lesson: any, index: number) => ({
           id: String(index + 1),
           title: lesson.id.replace('.lesson.md', '').toUpperCase().replace('-', ' '),
           desc: `Recompensa: +${lessonRewards[lesson.id] || 50} XP`,
           badge: `Módulo ${index + 1}`,
           status: savedState[lesson.id] || 'todo', 
           lessonFile: lesson.id
         })).sort((a: any, b: any) => Number(a.id) - Number(b.id)));
      } catch (err) {
        console.warn('Erro ao carregar do Course Service.', err);
        setItems(fallbackItems);
      }
    };
    loadData();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), 
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    let newItems = [...items];
    const isOverColumn = initialCols.some(col => col.id === overId);
    
    if (isOverColumn) {
      newItems = items.map(item => {
        if (item.id === activeId) return { ...item, status: overId as string };
        return item;
      });
    } else {
      const activeItem = items.find(i => i.id === activeId);
      const overItem = items.find(i => i.id === overId);

      if (activeItem && overItem && activeItem.status !== overItem.status) {
        newItems = items.map(item => {
          if (item.id === activeId) return { ...item, status: overItem.status };
          return item;
        });
      } else if (activeItem && overItem && activeItem.id !== overItem.id) {
        const oldIndex = items.findIndex(i => i.id === activeId);
        const newIndex = items.findIndex(i => i.id === overId);
        newItems = arrayMove(items, oldIndex, newIndex);
      }
    }
    
    newItems.sort((a, b) => Number(a.id) - Number(b.id));

    setItems(newItems);

    const stateToSave = newItems.reduce((acc, item) => {
      acc[item.lessonFile] = item.status;
      return acc;
    }, {} as Record<string, string>);

    apiFetch(`${import.meta.env.VITE_API_GATEWAY_URL}/api/users/${userId}/kanban`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ state: stateToSave })
    }).catch(console.error);

    const isStatusChanged = newItems.find(i => i.id === activeId)?.status !== items.find(i => i.id === activeId)?.status;
    if (isStatusChanged) {
      // Chama o endpoint síncrono do Gamification Service para resposta em tempo real
      apiFetch(`${import.meta.env.VITE_API_GATEWAY_URL}/api/xp/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, kanbanState: stateToSave })
      }).then(res => res.json()).then(syncData => {
         window.dispatchEvent(new CustomEvent('xp-synced', { detail: syncData }));
      }).catch(console.error);
      
      // Mantemos force-xp-update como fallback caso o sync acima falhe
      setTimeout(() => window.dispatchEvent(new Event('force-xp-update')), 3000);
    }
  };

  return (
    <>
      <div className="glass-panel kanban-board">
        <div style={{ padding: '20px', borderBottom: '1px dashed var(--border-color)' }}>
          <h2>CYBER-BOARD DE MISSÕES</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '8px' }}>
            [SISTEMA ATIVO] Arraste as missões. Seu progresso é salvo no dispositivo.
          </p>
        </div>
        
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <div className="kanban-columns">
            {/* Seletor de abas só aparece no mobile via CSS */}
            <div className="mobile-tabs">
              {initialCols.map(col => (
                <button 
                  key={`tab-${col.id}`}
                  className={`mobile-tab ${activeTab === col.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(col.id)}
                >
                  {col.title}
                </button>
              ))}
            </div>

            {initialCols.map(col => {
              const colItems = items.filter(i => i.status === col.id);
              return (
                <DroppableColumn 
                  key={col.id} 
                  id={col.id} 
                  title={`${col.title} (${colItems.length})`} 
                  activeTab={activeTab}
                >
                  <SortableContext items={colItems.map(i => i.id)} strategy={verticalListSortingStrategy}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '100px' }}>
                      {colItems.map(card => (
                        <SortableItem 
                          key={card.id}
                          id={card.id}
                          title={card.title}
                          desc={card.desc}
                          badge={card.badge}
                          lessonFile={card.lessonFile}
                          onOpenLesson={setActiveLesson}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DroppableColumn>
              );
            })}
          </div>
        </DndContext>
      </div>
      
      {activeLesson && (
        <LessonModal lessonId={activeLesson} onClose={() => setActiveLesson(null)} />
      )}
    </>
  );
};
