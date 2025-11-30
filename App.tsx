import React, { useState, useEffect, useMemo } from 'react';
import { KEYBINDS, THEMES, MANUAL_HOTKEYS } from './constants';
import { Category } from './types';
import { KeyCap } from './components/KeyCap';
import { WorkspaceSimulator } from './components/WorkspaceSimulator';
import { Search, Terminal, Command, ChevronRight, Menu, Palette, Book, Monitor, LayoutGrid, ArrowLeft, Disc, HardDrive, Keyboard, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Page = 'Getting Started' | 'Navigation' | 'Themes' | 'Hotkeys';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [showIntro, setShowIntro] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<string>('Gruvbox');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState<Page>('Getting Started');

  // Apply Theme
  useEffect(() => {
    const root = document.documentElement;
    const theme = THEMES[currentTheme];
    if (theme) {
      Object.entries(theme).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
    }
  }, [currentTheme]);

  // Filter keybinds
  const filteredKeybinds = useMemo(() => {
    return KEYBINDS.filter(kb => {
      const matchesSearch = kb.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            kb.keys.join(' ').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || kb.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (page: Page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-omarchy-bg text-omarchy-fg font-mono selection:bg-omarchy-accent selection:text-omarchy-bg flex flex-col transition-colors duration-500">
      
      {/* Intro Overlay / Hero */}
      <AnimatePresence>
      {showIntro && (
        <motion.div 
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed inset-0 z-[100] bg-omarchy-bg flex flex-col items-center justify-center p-8 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-3xl w-full border-2 border-omarchy-accent p-8 md:p-12 relative bg-omarchy-dark/50 shadow-2xl"
          >
             <div className="text-omarchy-green mb-4 text-xs tracking-widest uppercase flex items-center gap-2">
                <div className="w-2 h-2 bg-omarchy-green animate-pulse rounded-full"></div>
                SYSTEM_BOOT :: INITIALIZED
             </div>
             <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none">
                OMARCHY<span className="text-omarchy-accent">.MANUAL</span>
             </h1>
             <p className="text-xl md:text-2xl text-omarchy-fg/80 mb-8 leading-relaxed">
                <span className="text-omarchy-fg font-bold">Forget the mouse.</span><br/>
                Everything happens via <span className="bg-omarchy-accent text-omarchy-bg px-2 py-0.5 font-bold">Super</span> + <span className="bg-omarchy-fg text-omarchy-bg px-2 py-0.5 font-bold">Key</span>.
             </p>
             <div className="flex gap-4">
                <button 
                    onClick={() => setShowIntro(false)}
                    className="bg-omarchy-green text-omarchy-bg px-8 py-4 font-bold hover:bg-omarchy-fg hover:text-omarchy-bg transition-all flex items-center gap-3 text-lg group"
                >
                    <Terminal size={24} />
                    <span>ENTER_SYSTEM</span>
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Top Bar / Breadcrumb */}
      <header className="border-b border-omarchy-gray/30 bg-omarchy-dark/50 px-4 py-3 flex items-center justify-between sticky top-0 z-40 backdrop-blur-sm">
        <div className="flex items-center gap-4 overflow-hidden">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-omarchy-gray hover:text-omarchy-accent">
                {isSidebarOpen ? <Menu size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center text-xs md:text-sm text-omarchy-gray whitespace-nowrap overflow-x-auto no-scrollbar">
                <span className="hover:text-omarchy-fg cursor-pointer font-bold text-omarchy-fg">The Omarchy Manual</span>
                <ChevronRight size={12} className="mx-2" />
                <span className="text-omarchy-accent">{activePage}</span>
            </div>
        </div>
        <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2 text-xs text-omarchy-gray">
                 <KeyCap label="Super" size="sm" /> + <KeyCap label="F" size="sm" /> <span className="hidden lg:inline">to Fullscreen</span>
             </div>
             <div className="relative group">
                 <button className="flex items-center gap-2 text-xs border border-omarchy-gray/50 px-2 py-1 rounded hover:border-omarchy-accent hover:text-omarchy-accent transition-colors text-omarchy-fg">
                     <Palette size={14} />
                     <span className="hidden sm:inline">Theme: {currentTheme}</span>
                 </button>
                 {/* Theme Dropdown */}
                 <div className="absolute right-0 top-full mt-2 w-48 bg-omarchy-dark border border-omarchy-gray shadow-xl rounded hidden group-hover:block z-50 max-h-64 overflow-y-auto">
                     {Object.keys(THEMES).map(t => (
                         <button 
                            key={t}
                            onClick={() => setCurrentTheme(t)}
                            className={`w-full text-left px-4 py-2 text-xs hover:bg-omarchy-bg hover:text-omarchy-accent transition-colors flex items-center justify-between
                                ${currentTheme === t ? 'text-omarchy-accent font-bold' : 'text-omarchy-gray'}
                            `}
                         >
                             {t}
                             {currentTheme === t && <div className="w-2 h-2 bg-omarchy-accent rounded-full" />}
                         </button>
                     ))}
                 </div>
             </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex max-w-full overflow-hidden">
        
        {/* Left Col: Sidebar / Nav */}
        <AnimatePresence>
        {isSidebarOpen && (
            <>
            {/* Mobile backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 300, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="border-r border-omarchy-gray/30 bg-omarchy-dark md:bg-omarchy-dark/30 overflow-y-auto fixed md:relative inset-y-0 left-0 z-50 md:z-auto"
            >
               <div className="p-6 space-y-8">
                <div className="space-y-4">
                    <div className="text-xs text-omarchy-gray font-bold uppercase tracking-widest mb-4">Manual Contents</div>
                    <ul className="space-y-1 text-sm text-omarchy-fg/70">
                        <li 
                             onClick={() => handleNavClick('Getting Started')}
                             className={`pl-2 border-l-2 cursor-pointer py-1 transition-colors ${activePage === 'Getting Started' ? 'border-omarchy-accent text-omarchy-accent font-bold bg-omarchy-accent/5' : 'border-transparent hover:border-omarchy-accent hover:text-omarchy-fg'}`}
                        >
                            Getting Started
                        </li>
                        <li 
                            onClick={() => handleNavClick('Navigation')}
                            className={`pl-2 border-l-2 cursor-pointer py-1 transition-colors ${activePage === 'Navigation' ? 'border-omarchy-accent text-omarchy-accent font-bold bg-omarchy-accent/5' : 'border-transparent hover:border-omarchy-accent hover:text-omarchy-fg'}`}
                        >
                            Navigation
                        </li>
                        <li 
                            onClick={() => handleNavClick('Themes')}
                            className={`pl-2 border-l-2 cursor-pointer py-1 transition-colors ${activePage === 'Themes' ? 'border-omarchy-accent text-omarchy-accent font-bold bg-omarchy-accent/5' : 'border-transparent hover:border-omarchy-accent hover:text-omarchy-fg'}`}
                        >
                            Themes
                        </li>
                        <li 
                            onClick={() => handleNavClick('Hotkeys')}
                            className={`pl-2 border-l-2 cursor-pointer py-1 transition-colors ${activePage === 'Hotkeys' ? 'border-omarchy-accent text-omarchy-accent font-bold bg-omarchy-accent/5' : 'border-transparent hover:border-omarchy-accent hover:text-omarchy-fg'}`}
                        >
                            Hotkeys
                        </li>
                    </ul>
                </div>

                {activePage === 'Navigation' && (
                  <div>
                    <h3 className="text-omarchy-purple font-bold mb-4 flex items-center gap-2 text-sm">
                      <Command size={14} /> CATEGORIES
                    </h3>
                    <ul className="space-y-1 text-sm">
                      {['All', ...Object.values(Category)].map((cat) => (
                          <li key={cat}>
                            <button 
                                onClick={() => { setActiveCategory(cat as any); }}
                                className={`w-full text-left px-3 py-1.5 rounded transition-colors flex items-center justify-between group
                                  ${activeCategory === cat ? 'bg-omarchy-accent text-omarchy-bg font-bold' : 'text-omarchy-fg/70 hover:text-omarchy-fg hover:bg-omarchy-gray/20'}
                                `}
                            >
                                <span>{cat}</span>
                                {activeCategory === cat && <ChevronRight size={14} />}
                            </button>
                          </li>
                      ))}
                    </ul>
                  </div>
                )}
               </div>
            </motion.aside>
            </>
        )}
        </AnimatePresence>

        {/* Center Col: Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-50px)] scroll-smooth">
          <div className="max-w-5xl mx-auto space-y-12 pb-24">
            
            {/* Header Text */}
            <div className="space-y-4 border-b border-omarchy-gray/20 pb-8">
                <div className="flex items-center gap-2 text-omarchy-accent mb-2">
                    <Book size={20} />
                    <span className="font-bold text-sm tracking-widest uppercase">The Manual</span>
                </div>
                <h1 className="text-4xl font-bold text-omarchy-fg">{activePage}</h1>
                
                {activePage === 'Navigation' && (
                  <p className="text-lg text-omarchy-fg/80 leading-relaxed max-w-3xl">
                      Everything in Omarchy happens via the keyboard — <span className="text-omarchy-red font-bold">EVERYTHING!</span> 
                      <br/>You start the terminal with <span className="text-omarchy-fg font-bold">Super + Return</span> and a browser with <span className="text-omarchy-fg font-bold">Super + Shift + B</span>.
                  </p>
                )}

                {activePage === 'Themes' && (
                  <div className="space-y-4">
                     <p className="text-lg text-omarchy-fg/80 leading-relaxed max-w-3xl">
                        Omarchy comes with fourteen beautiful themes. You can select between them from <span className="text-omarchy-fg font-bold">Style {'>'} Theme</span> in the Omarchy Menu (<KeyCap label="Super" size="sm"/> + <KeyCap label="Alt" size="sm"/> + <KeyCap label="Space" size="sm"/>) or hop directly to the selector using <KeyCap label="Super" size="sm"/> + <KeyCap label="Ctrl" size="sm"/> + <KeyCap label="Shift" size="sm"/> + <KeyCap label="Space" size="sm"/>.
                     </p>
                     <p className="text-omarchy-fg/80">
                        Most themes have a set of background images that you can rotate between using <KeyCap label="Super" size="sm"/> + <KeyCap label="Ctrl" size="sm"/> + <KeyCap label="Space" size="sm"/>.
                     </p>
                  </div>
                )}

                {activePage === 'Hotkeys' && (
                  <p className="text-lg text-omarchy-fg/80 leading-relaxed max-w-3xl">
                      You can see all the main keyboard bindings by hitting <KeyCap label="Super" size="sm" /> + <KeyCap label="K" size="sm" />.
                  </p>
                )}
            </div>

            {/* PAGE: GETTING STARTED CONTENT */}
            {activePage === 'Getting Started' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="prose prose-invert max-w-none text-omarchy-fg/80">
                      <p className="text-lg leading-relaxed">
                          Omarchy is installed using an ISO. It's designed for a dedicated drive, so dual-booting requires two disks in your machine (unless you do a manual install to work around this). The installation will wipe the selected drive and use <span className="text-omarchy-red font-bold">full-disk encryption</span>, so be sure to take a backup before using an existing drive!
                      </p>
                      
                      <div className="flex flex-col md:flex-row gap-6 my-8 items-start">
                          <div className="flex-1 space-y-4">
                              <p>
                                  Download the Omarchy ISO first, put it on a USB stick (use <span className="text-omarchy-accent font-bold">balenaEtcher</span> on Mac/Windows or <span className="text-omarchy-accent font-bold">caligula</span> on Linux), and boot off the stick.
                              </p>
                              <div className="bg-omarchy-yellow/10 border-l-4 border-omarchy-yellow p-4 text-sm">
                                  <strong className="text-omarchy-yellow block mb-1">WARNING: Secure Boot & TPM</strong>
                                  Remember that many PCs ship with Secure Boot and/or TPM on in the BIOS. You have to turn these off to be able to install Omarchy. They're Microsoft security schemes meant for Windows and Microsoft-affiliated Linux distributions.
                              </div>
                              <p>Then answer the configuration questions, and confirm them like this:</p>
                          </div>
                          <div className="w-full md:w-1/3 flex flex-col items-center gap-2">
                              <Disc size={64} className="text-omarchy-accent animate-spin-slow" style={{ animationDuration: '10s' }}/>
                              <span className="text-xs text-omarchy-gray font-mono">omarchy-live.iso</span>
                          </div>
                      </div>

                      {/* Mock Image: omarchy-install.png */}
                      <div className="my-8 rounded overflow-hidden border border-omarchy-gray/50 shadow-2xl max-w-2xl mx-auto bg-black font-mono text-sm relative">
                           <div className="bg-omarchy-dark px-2 py-1 flex items-center gap-2 border-b border-omarchy-gray/30">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                              <span className="ml-2 text-xs text-gray-400">Omarchy Installer</span>
                           </div>
                           <div className="p-6 text-gray-300">
                               <div className="text-omarchy-accent mb-4">? Confirm Installation Settings</div>
                               <div className="space-y-1 pl-4 border-l-2 border-omarchy-gray/30">
                                   <div><span className="text-omarchy-green">✔</span> Disk: /dev/nvme0n1 (1TB)</div>
                                   <div><span className="text-omarchy-green">✔</span> Encryption: LUKS2 (Enabled)</div>
                                   <div><span className="text-omarchy-green">✔</span> Swap: 16GB</div>
                                   <div><span className="text-omarchy-green">✔</span> Hostname: omarchy-desktop</div>
                               </div>
                               <div className="mt-6 flex justify-end gap-4">
                                   <span className="text-gray-500">[ Back ]</span>
                                   <span className="bg-omarchy-accent text-black px-2 font-bold">[ Install ]</span>
                               </div>
                           </div>
                           <div className="absolute bottom-2 right-2 text-[10px] text-gray-600">omarchy-install.png</div>
                      </div>

                      <p>Then select a drive for your installation, and sit back and watch the installation show go. It takes between 2-10 minutes, depending on the speed of your computer.</p>

                      {/* Mock Image: omarchy-installed.png */}
                      <div className="my-8 rounded overflow-hidden border border-omarchy-gray/50 shadow-2xl max-w-2xl mx-auto bg-black font-mono text-sm relative">
                           <div className="h-48 flex flex-col items-center justify-center relative overflow-hidden">
                               <div className="absolute inset-0 bg-omarchy-accent/10 animate-pulse"></div>
                               <div className="text-green-500 font-bold text-xl mb-2">INSTALLATION COMPLETE</div>
                               <div className="w-64 h-2 bg-gray-800 rounded overflow-hidden">
                                   <div className="h-full bg-green-500 w-full"></div>
                               </div>
                               <div className="mt-4 text-xs text-gray-400">Please remove installation media and reboot.</div>
                           </div>
                           <div className="absolute bottom-2 right-2 text-[10px] text-gray-600">omarchy-installed.png</div>
                      </div>

                      <p className="text-xl font-bold text-omarchy-fg text-center mt-8">Now you're ready to Omarchy!</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mt-12">
                      <div className="bg-omarchy-dark p-6 rounded border border-omarchy-gray/20 hover:border-omarchy-accent transition-colors">
                          <h3 className="text-xl font-bold text-omarchy-fg flex items-center gap-2 mb-4">
                              <Keyboard className="text-omarchy-purple" />
                              Use a wired or 2.4ghz keyboard!
                              <span className="text-omarchy-gray/50 text-sm">#</span>
                          </h3>
                          <p className="text-sm text-omarchy-fg/70 leading-relaxed">
                              The full-disk encryption won't allow you to enter the password from a Bluetooth keyboard at startup. Just like you can't use a Bluetooth keyboard to enter the BIOS on a PC. You'll need a keyboard that either uses a 2.4ghz dongle or a cable (which is much nicer for latency anyway!). I personally love the Lofree Flow84!
                          </p>
                      </div>

                      <div className="bg-omarchy-dark p-6 rounded border border-omarchy-gray/20 hover:border-omarchy-accent transition-colors">
                           <h3 className="text-xl font-bold text-omarchy-fg flex items-center gap-2 mb-4">
                              <HelpCircle className="text-omarchy-blue" />
                              Help if you're stuck
                              <span className="text-omarchy-gray/50 text-sm">#</span>
                          </h3>
                          <p className="text-sm text-omarchy-fg/70 leading-relaxed mb-4">
                              If you get stuck, you can usually find someone willing to help in the <span className="text-omarchy-accent">#omarchy-help</span> channel on the community Discord.
                          </p>
                          <div className="border-t border-omarchy-gray/20 pt-4 mt-4">
                              <h4 className="font-bold text-omarchy-yellow mb-2 text-sm">Special Needs?</h4>
                              <p className="text-xs text-omarchy-fg/70">
                                  If you have special needs, like installing Omarchy onto M-Series MacBooks Asahi Alarm or because you want to try dual-booting on a single drive, you should follow the instructions for a <span className="text-omarchy-fg underline decoration-dashed">manual installation</span>.
                              </p>
                          </div>
                      </div>
                  </div>

                  <div className="flex justify-between pt-8 border-t border-omarchy-gray/20 mt-12">
                     <button className="flex items-center gap-2 text-omarchy-gray hover:text-omarchy-fg transition-colors group opacity-50 cursor-not-allowed">
                        <ArrowLeft size={16} />
                        <span>Previous: The Basics</span>
                     </button>
                     <button onClick={() => handleNavClick('Navigation')} className="flex items-center gap-2 text-omarchy-gray hover:text-omarchy-fg transition-colors group">
                        <span>Next: Navigation</span>
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                     </button>
                  </div>
              </div>
            )}

            {/* PAGE: NAVIGATION CONTENT */}
            {activePage === 'Navigation' && (
              <>
                {/* Interactive Visualizer */}
                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-omarchy-yellow flex items-center gap-2">
                          <Monitor size={20} />
                          Interactive Playground
                      </h2>
                      <span className="text-[10px] md:text-xs text-omarchy-bg bg-omarchy-green px-2 py-1 rounded font-bold animate-pulse">LIVE ENV</span>
                   </div>
                   <p className="text-sm text-omarchy-fg/70">
                       Click inside the box below to focus, then try typing the commands! 
                       (e.g., <KeyCap label="Super" size="sm" /> + <KeyCap label="Enter" size="sm" /> to spawn a terminal)
                   </p>
                   <WorkspaceSimulator />
                </div>

                {/* Keybind Search & List */}
                <div className="space-y-6 pt-8">
                   <div className="flex items-center justify-between border-b border-omarchy-gray pb-2">
                      <h2 className="text-2xl font-bold text-omarchy-green">Keybindings Reference</h2>
                   </div>

                   {/* Search Bar */}
                   <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-omarchy-gray" />
                      </div>
                      <input
                        id="search-input"
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border border-omarchy-gray rounded-md leading-5 bg-omarchy-dark text-omarchy-fg placeholder-omarchy-gray/50 focus:outline-none focus:ring-2 focus:ring-omarchy-accent sm:text-sm transition-all shadow-inner font-mono"
                        placeholder="Search commands (e.g., 'terminal', 'workspace')..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-omarchy-gray/30 text-xs border border-omarchy-gray/30 px-1 rounded">/</span>
                      </div>
                   </div>

                   {/* Grid of Cards */}
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <AnimatePresence>
                      {filteredKeybinds.map((kb) => (
                         <motion.div 
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            key={kb.id}
                            className="bg-omarchy-dark border border-omarchy-gray/30 p-4 rounded hover:border-omarchy-accent transition-all group relative overflow-hidden shadow-lg hover:shadow-omarchy-accent/10"
                         >
                            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
                              <div className="text-[10px] uppercase text-omarchy-accent border border-omarchy-accent px-1 rounded">
                                  {kb.category}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mb-3 min-h-[32px] items-center">
                               {kb.keys.map((k, i) => (
                                  <React.Fragment key={i}>
                                      <KeyCap label={k} />
                                      {i < kb.keys.length - 1 && <span className="self-center text-omarchy-fg/40">+</span>}
                                  </React.Fragment>
                               ))}
                            </div>
                            <h3 className="font-bold text-lg text-omarchy-fg group-hover:text-omarchy-accent transition-colors">
                              {kb.description}
                            </h3>
                            {kb.longDescription && (
                              <p className="text-xs text-omarchy-fg/70 mt-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                                  {kb.longDescription}
                              </p>
                            )}
                         </motion.div>
                      ))}
                      </AnimatePresence>

                      {filteredKeybinds.length === 0 && (
                          <div className="col-span-full text-center py-12 border-2 border-dashed border-omarchy-gray/20 rounded">
                              <p className="text-omarchy-gray text-lg">No keybinds found matching "{searchTerm}"</p>
                              <button 
                                  onClick={() => setSearchTerm('')}
                                  className="mt-4 text-omarchy-accent hover:underline"
                              >
                                  Clear search
                              </button>
                          </div>
                      )}
                   </div>
                </div>
                
                <div className="flex justify-between pt-8 border-t border-omarchy-gray/20 mt-8">
                     <button onClick={() => handleNavClick('Getting Started')} className="flex items-center gap-2 text-omarchy-gray hover:text-omarchy-fg transition-colors group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Previous: Getting Started</span>
                     </button>
                     <button onClick={() => handleNavClick('Themes')} className="flex items-center gap-2 text-omarchy-gray hover:text-omarchy-fg transition-colors group">
                        <span>Next: Themes</span>
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                     </button>
                  </div>
              </>
            )}

            {/* PAGE: THEMES CONTENT */}
            {activePage === 'Themes' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Object.entries(THEMES).map(([name, colors]) => (
                      <button
                        key={name}
                        onClick={() => setCurrentTheme(name)}
                        className={`
                           group relative flex flex-col items-center bg-omarchy-dark border-2 rounded-lg overflow-hidden transition-all duration-300
                           ${currentTheme === name ? 'border-omarchy-accent scale-105 shadow-xl shadow-omarchy-accent/20' : 'border-omarchy-gray/20 hover:border-omarchy-gray hover:scale-105'}
                        `}
                      >
                         {/* Visual Preview */}
                         <div className="w-full h-32 relative" style={{ backgroundColor: `rgb(${colors.bg})` }}>
                             {/* Fake Terminal Window */}
                             <div className="absolute top-4 left-4 right-4 bottom-4 rounded overflow-hidden shadow-lg border border-white/10 flex flex-col">
                                 <div className="h-4 w-full flex items-center gap-1 px-2" style={{ backgroundColor: `rgb(${colors.dark})` }}>
                                     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `rgb(${colors.red})` }}></div>
                                     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `rgb(${colors.yellow})` }}></div>
                                     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `rgb(${colors.green})` }}></div>
                                 </div>
                                 <div className="flex-1 p-2 font-mono text-[8px]" style={{ color: `rgb(${colors.fg})` }}>
                                     <span style={{ color: `rgb(${colors.accent})` }}>~</span>$ neofetch<br/>
                                     <span style={{ color: `rgb(${colors.purple})` }}>OS</span>: Omarchy<br/>
                                     <span style={{ color: `rgb(${colors.green})` }}>WM</span>: Hyprland<br/>
                                     <div className="mt-2 flex gap-1">
                                         <div className="w-2 h-2" style={{ backgroundColor: `rgb(${colors.red})` }}></div>
                                         <div className="w-2 h-2" style={{ backgroundColor: `rgb(${colors.green})` }}></div>
                                         <div className="w-2 h-2" style={{ backgroundColor: `rgb(${colors.yellow})` }}></div>
                                         <div className="w-2 h-2" style={{ backgroundColor: `rgb(${colors.accent})` }}></div>
                                         <div className="w-2 h-2" style={{ backgroundColor: `rgb(${colors.purple})` }}></div>
                                     </div>
                                 </div>
                             </div>
                             {currentTheme === name && (
                               <div className="absolute top-2 right-2 bg-omarchy-accent text-omarchy-bg rounded-full p-1">
                                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                               </div>
                             )}
                         </div>
                         <div className="w-full p-3 text-center border-t border-omarchy-gray/10 bg-omarchy-dark">
                             <span className={`font-bold text-sm ${currentTheme === name ? 'text-omarchy-accent' : 'text-omarchy-fg group-hover:text-omarchy-fg'}`}>
                               {name}
                             </span>
                         </div>
                      </button>
                    ))}
                  </div>

                  <div className="bg-omarchy-dark border border-omarchy-gray/20 rounded-lg p-6 space-y-4">
                      <div className="flex items-center gap-3 text-omarchy-accent">
                          <LayoutGrid size={24} />
                          <h3 className="text-xl font-bold">More Themes?</h3>
                      </div>
                      <p className="text-omarchy-fg/80 text-sm">
                          You can find even more themes on the extra themes page or even make your own theme.
                          The community is constantly adding new color schemes to the repository.
                      </p>
                  </div>

                  <div className="flex justify-between pt-8 border-t border-omarchy-gray/20">
                     <button onClick={() => handleNavClick('Navigation')} className="flex items-center gap-2 text-omarchy-gray hover:text-omarchy-fg transition-colors group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Previous: Navigation</span>
                     </button>
                     <button onClick={() => handleNavClick('Hotkeys')} className="flex items-center gap-2 text-omarchy-gray hover:text-omarchy-fg transition-colors group">
                        <span>Next: Hotkeys</span>
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                     </button>
                  </div>
              </div>
            )}

            {/* PAGE: HOTKEYS CONTENT */}
            {activePage === 'Hotkeys' && (
              <div className="space-y-12 animate-in fade-in duration-500">
                  {MANUAL_HOTKEYS.map((section, idx) => (
                    <div key={idx} className="space-y-4">
                      <div className="border-b border-omarchy-gray/30 pb-2">
                         <h2 className="text-2xl font-bold text-omarchy-fg flex items-center gap-2">
                            {section.title}
                            <span className="text-omarchy-gray/30 text-base font-normal">#</span>
                         </h2>
                      </div>
                      
                      {section.description && (
                        <p className="text-omarchy-fg/80 text-sm leading-relaxed max-w-3xl">
                          {section.description}
                        </p>
                      )}

                      <div className="overflow-x-auto">
                        <div className="inline-block min-w-full align-middle">
                          <div className="border border-omarchy-gray/30 rounded-lg overflow-hidden bg-omarchy-dark/30">
                              <table className="min-w-full divide-y divide-omarchy-gray/30">
                                <thead className="bg-omarchy-dark/80">
                                  <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-omarchy-accent uppercase tracking-wider w-1/2">Hotkey</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-omarchy-accent uppercase tracking-wider">Function</th>
                                    {section.items.some(i => i.clue) && (
                                       <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-omarchy-accent uppercase tracking-wider">Clue</th>
                                    )}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-omarchy-gray/20">
                                  {section.items.map((item, i) => (
                                    <tr key={i} className="hover:bg-omarchy-gray/10 transition-colors">
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-omarchy-fg font-medium">
                                          <div className="flex gap-1.5 items-center flex-wrap">
                                            {item.keys.map((k, kIdx) => (
                                               <React.Fragment key={kIdx}>
                                                 <KeyCap label={k} />
                                                 {kIdx < item.keys.length - 1 && <span className="text-omarchy-fg/40">+</span>}
                                               </React.Fragment>
                                            ))}
                                          </div>
                                      </td>
                                      <td className="px-6 py-4 text-sm text-omarchy-fg/90 group-hover:text-omarchy-fg">
                                        {item.action}
                                      </td>
                                      {item.clue && (
                                          <td className="px-6 py-4 text-sm text-omarchy-fg/70 italic">
                                            {item.clue}
                                          </td>
                                      )}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-between pt-8 border-t border-omarchy-gray/20">
                     <button onClick={() => handleNavClick('Themes')} className="flex items-center gap-2 text-omarchy-gray hover:text-omarchy-fg transition-colors group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Previous: Themes</span>
                     </button>
                  </div>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Footer / Status Bar */}
      <footer className="border-t border-omarchy-gray bg-omarchy-dark text-[10px] md:text-xs py-1 px-4 flex justify-between items-center sticky bottom-0 z-50">
         <div className="flex gap-4">
            <span className="font-bold text-omarchy-bg bg-omarchy-green px-1">NORMAL</span>
            <span className="text-omarchy-gray">omarchy-manual</span>
         </div>
         <div className="flex-1 overflow-hidden mx-4 hidden md:block">
            <div className="whitespace-nowrap animate-marquee text-omarchy-gray/50 text-[8px] italic">
               This website was made for Sambit mainly for him to remind himself of the goddamn Omarchy keybinds
            </div>
         </div>
         <div className="flex gap-4 text-omarchy-gray">
            <span className="hidden sm:inline">utf-8</span>
            <span className="uppercase">{currentTheme}</span>
            <span>100%</span>
         </div>
      </footer>
    </div>
  );
};

export default App;