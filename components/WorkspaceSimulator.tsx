import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WindowNode, WorkspaceState } from '../types';
import { Terminal, Globe, Folder, Activity, Power, Layers, MousePointer2 } from 'lucide-react';
import { KeyCap } from './KeyCap';

export const WorkspaceSimulator: React.FC = () => {
  const [state, setState] = useState<WorkspaceState>({
    windows: [
      { id: '1', type: 'browser', title: 'Firefox' },
      { id: '2', type: 'terminal', title: 'Alacritty' }
    ],
    layout: 'horizontal',
    activeWindowId: '2'
  });

  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [activeHint, setActiveHint] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper to add windows
  const addWindow = (type: WindowNode['type']) => {
    if (state.windows.length >= 6) {
        triggerHint('Max windows reached!');
        return;
    }
    const newId = Math.random().toString(36).substr(2, 9);
    const title = type === 'terminal' ? 'Alacritty' : type === 'browser' ? 'Firefox' : type === 'files' ? 'Thunar' : 'Btop';
    setState(prev => ({
      ...prev,
      windows: [...prev.windows, { id: newId, type, title }],
      activeWindowId: newId
    }));
    triggerHint(`Opened ${title}`);
  };

  const closeActiveWindow = () => {
    if (!state.activeWindowId) {
        if (state.windows.length === 0) {
           triggerHint('Already empty!');
        } else {
           triggerHint('No active window');
        }
        return;
    }
    setState(prev => {
        const remaining = prev.windows.filter(w => w.id !== prev.activeWindowId);
        return {
            ...prev,
            windows: remaining,
            activeWindowId: remaining.length > 0 ? remaining[remaining.length - 1].id : null
        };
    });
    triggerHint('Window Closed (Super+W)');
  };

  const exitSession = () => {
      setState(prev => ({ ...prev, windows: [], activeWindowId: null }));
      triggerHint('Session Reset (Super+Shift+Q)');
  };

  const toggleLayout = () => {
    setState(prev => ({
      ...prev,
      layout: prev.layout === 'horizontal' ? 'vertical' : 'horizontal'
    }));
    triggerHint(`Layout: ${state.layout === 'horizontal' ? 'Vertical' : 'Horizontal'} (Super+J)`);
  };

  const cycleFocus = (direction: 'next' | 'prev') => {
      if (state.windows.length < 2) return;
      const currentIndex = state.windows.findIndex(w => w.id === state.activeWindowId);
      let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      
      if (nextIndex >= state.windows.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = state.windows.length - 1;
      
      setState(prev => ({ ...prev, activeWindowId: prev.windows[nextIndex].id }));
  };

  const swapWindow = () => {
       if (state.windows.length < 2 || !state.activeWindowId) return;
       const idx = state.windows.findIndex(w => w.id === state.activeWindowId);
       // Simple swap with next
       const nextIdx = (idx + 1) % state.windows.length;
       const newWindows = [...state.windows];
       const temp = newWindows[idx];
       newWindows[idx] = newWindows[nextIdx];
       newWindows[nextIdx] = temp;
       
       setState(prev => ({ ...prev, windows: newWindows }));
       triggerHint('Swapped Windows');
  };

  const triggerHint = (text: string) => {
    setActiveHint(text);
    // Clear existing timeout if any (simple debounce)
    setTimeout(() => setActiveHint(null), 2000);
  };

  // Keyboard Handler
  useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
          if (!isActive) return;
          
          const newKeys = new Set(activeKeys);
          newKeys.add(e.key);
          setActiveKeys(newKeys);

          // Meta is "Super"
          if (e.metaKey || e.altKey) { 
              e.preventDefault();

              // Actions
              if (e.key === 'Enter') addWindow('terminal');
              if (e.key === 'B' && e.shiftKey) addWindow('browser'); // Browser
              if (e.key === 'F' && e.shiftKey) addWindow('files'); // Files
              if (e.key === 'T' && e.shiftKey) addWindow('monitor'); // Monitor
              
              if (e.key === 'q' || e.key === 'Q') {
                 if (e.shiftKey) exitSession();
                 else closeActiveWindow();
              }
              if (e.key === 'w' || e.key === 'W') closeActiveWindow();
              if (e.key === 'j' || e.key === 'J') toggleLayout();
              
              if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                  if (e.shiftKey) swapWindow();
                  else cycleFocus('next');
              }
              if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                   if (e.shiftKey) swapWindow();
                   else cycleFocus('prev');
              }
          }
      };

      const handleKeyUp = (e: KeyboardEvent) => {
          const newKeys = new Set(activeKeys);
          newKeys.delete(e.key);
          setActiveKeys(newKeys);
      };

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      return () => {
          window.removeEventListener('keydown', handleKeyDown);
          window.removeEventListener('keyup', handleKeyUp);
      };
  }, [isActive, state, activeKeys]);


  const getIcon = (type: string) => {
    switch (type) {
      case 'terminal': return <Terminal size={14} />;
      case 'browser': return <Globe size={14} />;
      case 'files': return <Folder size={14} />;
      case 'monitor': return <Activity size={14} />;
      default: return <Terminal size={14} />;
    }
  };

  return (
    <div 
        ref={containerRef}
        onClick={() => { setIsActive(true); containerRef.current?.focus(); }}
        onBlur={() => setIsActive(false)}
        tabIndex={0}
        className={`
            border-2 transition-colors duration-300 outline-none
            ${isActive ? 'border-omarchy-accent ring-2 ring-omarchy-accent/20' : 'border-omarchy-gray/50 hover:border-omarchy-gray'} 
            bg-omarchy-dark rounded-lg p-4 w-full max-w-4xl mx-auto shadow-2xl overflow-hidden relative group cursor-default
        `}
    >
      {/* Top Bar (Waybar simulation) */}
      <div className="flex justify-between items-center bg-omarchy-bg px-3 py-1 mb-4 border-b border-omarchy-gray/30 font-mono text-xs select-none">
        <div className="flex gap-4">
          <span className={`font-bold px-2 rounded ${state.windows.length > 0 ? 'bg-omarchy-accent text-omarchy-bg' : 'text-omarchy-gray'}`}>1</span>
          <span className="text-omarchy-gray">2</span>
          <span className="text-omarchy-gray">3</span>
          <span className="text-omarchy-gray">4</span>
        </div>
        <div className="flex gap-4 items-center">
             <span className="text-omarchy-purple hidden sm:inline">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
             <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-omarchy-green animate-pulse' : 'bg-omarchy-red'}`}></div>
        </div>
      </div>

      {/* Helper Keys Display */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center items-center min-h-8">
         <button onClick={(e) => { e.stopPropagation(); addWindow('terminal'); setIsActive(true); }} className="scale-90 sm:scale-100 flex items-center gap-1 text-[10px] bg-omarchy-bg px-2 py-1 border border-omarchy-gray/50 hover:border-omarchy-accent hover:text-omarchy-accent transition-colors rounded">
          <KeyCap label="Super" size="sm" />+<KeyCap label="Enter" size="sm" />
        </button>
        <button onClick={(e) => { e.stopPropagation(); addWindow('browser'); setIsActive(true); }} className="scale-90 sm:scale-100 flex items-center gap-1 text-[10px] bg-omarchy-bg px-2 py-1 border border-omarchy-gray/50 hover:border-omarchy-accent hover:text-omarchy-accent transition-colors rounded">
            <KeyCap label="Sup" size="sm" />+<KeyCap label="Sft" size="sm" />+<KeyCap label="B" size="sm" />
        </button>
         <button onClick={(e) => { e.stopPropagation(); closeActiveWindow(); setIsActive(true); }} className="scale-90 sm:scale-100 flex items-center gap-1 text-[10px] bg-omarchy-bg px-2 py-1 border border-omarchy-gray/50 hover:border-omarchy-red hover:text-omarchy-red transition-colors rounded">
            <KeyCap label="Sup" size="sm" />+<KeyCap label="W" size="sm" /> Close
        </button>
        <button onClick={(e) => { e.stopPropagation(); exitSession(); setIsActive(true); }} className="scale-90 sm:scale-100 flex items-center gap-1 text-[10px] bg-omarchy-bg px-2 py-1 border border-omarchy-gray/50 hover:border-omarchy-red hover:text-omarchy-red transition-colors rounded">
            <KeyCap label="Sup" size="sm" />+<KeyCap label="Sft" size="sm" />+<KeyCap label="Q" size="sm" /> Exit
        </button>
      </div>

      {/* Visual Workspace Area */}
      <div className="relative h-80 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] bg-omarchy-bg border border-omarchy-gray/30 rounded p-2 overflow-hidden flex flex-col justify-center">
        
        {/* Interaction Overlay - Centered over the screen area */}
        <AnimatePresence>
            {!isActive && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 flex items-center justify-center bg-omarchy-dark/80 backdrop-blur-sm"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsActive(true);
                            containerRef.current?.focus();
                        }}
                        className="flex items-center gap-3 bg-omarchy-bg border-2 border-omarchy-accent px-6 py-3 rounded-lg text-omarchy-accent font-bold shadow-lg shadow-omarchy-accent/20 group/btn"
                    >
                        <MousePointer2 className="animate-bounce" />
                        <span>CLICK TO INTERACT</span>
                        <div className="absolute inset-0 border-omarchy-accent/50 rounded-lg animate-ping opacity-20"></div>
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>

        <AnimatePresence>
            {activeHint && (
                <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-omarchy-yellow text-omarchy-bg font-bold px-4 py-2 rounded shadow-lg text-sm border-2 border-omarchy-bg pointer-events-none"
                >
                    {activeHint}
                </motion.div>
            )}
        </AnimatePresence>

        {state.windows.length === 0 && isActive && (
            <div className="absolute inset-0 flex items-center justify-center text-omarchy-gray/30 italic pointer-events-none">
                <div className="text-center">
                    <Power className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-xl font-bold mb-2">Session Empty</p>
                    <p className="text-xs font-mono">
                        <KeyCap label="Super" size="sm" /> + <KeyCap label="Enter" size="sm" /> to launch Terminal
                    </p>
                </div>
            </div>
        )}

        <div className={`flex ${state.layout === 'horizontal' ? 'flex-row' : 'flex-col'} gap-2 h-full w-full`}>
            <AnimatePresence mode='popLayout'>
            {state.windows.map((win) => (
                <motion.div
                    key={win.id}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0, filter: 'blur(10px)' }}
                    onClick={(e) => { e.stopPropagation(); setState(s => ({ ...s, activeWindowId: win.id })); }}
                    className={`
                        relative flex-1 min-w-[50px] min-h-[50px] rounded border-2 overflow-hidden shadow-lg
                        ${state.activeWindowId === win.id ? 'border-omarchy-accent z-10 ring-1 ring-omarchy-accent/50' : 'border-omarchy-gray/30 bg-omarchy-dark brightness-75 z-0'}
                        cursor-pointer transition-all duration-200 group
                    `}
                >
                    {/* Fake Window Header */}
                    <div className={`px-2 py-1 text-[10px] flex items-center justify-between transition-colors ${state.activeWindowId === win.id ? 'bg-omarchy-accent text-omarchy-bg' : 'bg-omarchy-dark text-omarchy-gray border-b border-omarchy-gray/20'}`}>
                        <div className="flex items-center gap-2">
                            {getIcon(win.type)}
                            <span className="font-bold truncate">{win.title}</span>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                             <div className="w-2 h-2 rounded-full bg-omarchy-red cursor-pointer hover:scale-125" onClick={(e) => { e.stopPropagation(); closeActiveWindow(); }} />
                        </div>
                    </div>
                    {/* Fake Content */}
                    <div className="p-3 font-mono text-[10px] text-omarchy-fg h-full bg-omarchy-bg opacity-90 overflow-hidden leading-tight relative">
                        {win.type === 'terminal' && (
                            <>
                                <span className="text-omarchy-green">usr@omarchy</span>:<span className="text-omarchy-purple">~</span>$ neofetch<br/>
                                <div className="flex gap-2 mt-2">
                                   <div className="text-omarchy-accent font-bold">
                                      /\\<br/>
                                      (oo)<br/>
                                      (__)<br/>
                                   </div>
                                   <div>
                                      OS: Omarchy<br/>
                                      WM: Hyprland<br/>
                                      Shell: zsh<br/>
                                   </div>
                                </div>
                                <br/>
                                <span className="text-omarchy-green">usr@omarchy</span>:<span className="text-omarchy-purple">~</span>$ <span className="animate-blink bg-omarchy-fg w-1.5 h-3 inline-block align-middle"></span>
                            </>
                        )}
                         {win.type === 'browser' && (
                            <div className="flex flex-col gap-2 opacity-60">
                                <div className="flex gap-2 items-center bg-omarchy-dark p-1 rounded">
                                    <div className="w-2 h-2 rounded-full bg-omarchy-red"></div>
                                    <div className="w-2 h-2 rounded-full bg-omarchy-yellow"></div>
                                    <div className="w-2 h-2 rounded-full bg-omarchy-green"></div>
                                    <div className="flex-1 bg-omarchy-bg h-3 rounded ml-2"></div>
                                </div>
                                <div className="h-full bg-omarchy-gray/10 rounded w-full border border-omarchy-gray/20 flex items-center justify-center">
                                    <Globe className="text-omarchy-gray/20" size={32} />
                                </div>
                            </div>
                        )}
                         {win.type === 'files' && (
                            <div className="grid grid-cols-3 gap-2 opacity-60">
                                <div className="aspect-square bg-omarchy-purple/20 rounded flex items-center justify-center hover:bg-omarchy-purple/40 transition-colors"><Folder size={16} className="text-omarchy-purple"/></div>
                                <div className="aspect-square bg-omarchy-purple/20 rounded flex items-center justify-center hover:bg-omarchy-purple/40 transition-colors"><Folder size={16} className="text-omarchy-purple"/></div>
                                <div className="aspect-square bg-omarchy-purple/20 rounded flex items-center justify-center hover:bg-omarchy-purple/40 transition-colors"><Folder size={16} className="text-omarchy-purple"/></div>
                                <div className="aspect-square bg-omarchy-gray/20 rounded flex items-center justify-center"><Layers size={16} className="text-omarchy-gray"/></div>
                            </div>
                        )}
                        {win.type === 'monitor' && (
                             <div className="space-y-1 opacity-70">
                                 <div className="flex justify-between text-omarchy-red text-[8px]"><span>CPU</span><span>34%</span></div>
                                 <div className="w-full bg-omarchy-dark h-1"><div className="w-[34%] bg-omarchy-red h-full animate-pulse"></div></div>
                                 <div className="flex justify-between text-omarchy-green text-[8px] mt-2"><span>MEM</span><span>2.4G</span></div>
                                 <div className="w-full bg-omarchy-dark h-1"><div className="w-[40%] bg-omarchy-green h-full"></div></div>
                                 <div className="mt-4 flex gap-1">
                                    <div className="h-8 w-1 bg-omarchy-accent/50 self-end"></div>
                                    <div className="h-6 w-1 bg-omarchy-accent/50 self-end"></div>
                                    <div className="h-10 w-1 bg-omarchy-accent/80 self-end"></div>
                                    <div className="h-4 w-1 bg-omarchy-accent/50 self-end"></div>
                                 </div>
                             </div>
                        )}
                    </div>
                </motion.div>
            ))}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
};