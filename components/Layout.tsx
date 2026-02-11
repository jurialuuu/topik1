
import React, { useState, useEffect, useRef } from 'react';
import { 
  Home,
  Info, 
  BookOpen, 
  Languages, 
  GraduationCap, 
  MessageCircle,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Clock
} from 'lucide-react';
import { View } from '../types';

interface LayoutProps {
  currentView: View;
  setView: (view: View) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentView, setView, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  const menuItems = [
    { id: 'dashboard', label: 'Study Hub', icon: Home },
    { id: 'info', label: 'Test Guide', icon: Info },
    { id: 'flashcards', label: 'Vocabulary', icon: Languages },
    { id: 'grammar', label: 'Grammar', icon: BookOpen },
    { id: 'practice', label: 'Practice Tests', icon: GraduationCap },
    { id: 'ai-tutor', label: 'AI Study Tutor', icon: MessageCircle },
  ];

  const currentViewItem = menuItems.find(item => item.id === currentView);
  const currentViewLabel = currentViewItem?.label || 'TOPIK I Master';

  // Timer Logic
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = window.setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setSeconds(0);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-8 pb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 overflow-hidden ring-4 ring-indigo-50">
                <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=TopikBuddy&backgroundColor=6366f1" alt="Logo" className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-800 tracking-tight leading-none italic">TOPIK I</h1>
                <span className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.2em]">Companion</span>
              </div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id as View);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-4 px-5 py-4 rounded-[1.25rem] transition-all duration-300 group
                  ${currentView === item.id 
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 -translate-y-0.5' 
                    : 'text-slate-500 hover:bg-indigo-50 hover:text-indigo-600'}
                `}
              >
                <item.icon size={20} className={`transition-transform duration-300 ${currentView === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="font-bold tracking-tight text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-6">
            <div className="bg-gradient-to-br from-indigo-50 to-white rounded-3xl p-5 border border-indigo-100/50 shadow-sm text-center relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex justify-center mb-3">
                  <div className="p-2 bg-white rounded-xl shadow-sm">
                    <Sparkles size={16} className="text-indigo-500" />
                  </div>
                </div>
                <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.2em] mb-1">Study Mode</p>
                <p className="text-xs text-indigo-900 font-bold">Standard Exam Focus</p>
              </div>
              <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-indigo-100/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Enhanced Header */}
        <header className="bg-white/70 backdrop-blur-xl border-b border-slate-100 px-6 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          
          {/* Enhanced Breadcrumb Navigation */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
            <button 
              className="lg:hidden p-3 bg-white text-slate-600 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all active:scale-95 flex-shrink-0"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            
            <nav className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold truncate">
              <button 
                onClick={() => setView('dashboard')}
                className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors"
              >
                <Home size={16} />
                <span className="hidden xs:inline">Master</span>
              </button>
              <ChevronRight size={14} className="text-slate-300 flex-shrink-0" />
              <div className="flex items-center gap-2 text-slate-800 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 truncate shadow-inner">
                {currentViewItem && <currentViewItem.icon size={14} className="text-indigo-500" />}
                <span className="truncate">{currentViewLabel}</span>
              </div>
            </nav>
          </div>
          
          {/* Useful Feature: Study Session Timer */}
          <div className="flex items-center gap-2 sm:gap-4 ml-4">
            <div className={`
              flex items-center gap-2 sm:gap-4 px-3 sm:px-5 py-2 rounded-2xl border transition-all duration-500
              ${isTimerRunning ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-100' : 'bg-slate-50 text-slate-500 border-slate-100 shadow-inner'}
            `}>
              <div className="flex items-center gap-2">
                <Clock size={16} className={isTimerRunning ? 'animate-pulse' : ''} />
                <span className="font-black tabular-nums text-sm sm:text-base leading-none">
                  {formatTime(seconds)}
                </span>
              </div>
              <div className="h-4 w-px bg-current opacity-20" />
              <div className="flex items-center gap-1">
                <button 
                  onClick={toggleTimer}
                  className={`p-1.5 rounded-lg transition-colors ${isTimerRunning ? 'hover:bg-white/20' : 'hover:bg-indigo-50 text-indigo-600'}`}
                  title={isTimerRunning ? "Pause Timer" : "Start Study Session"}
                >
                  {isTimerRunning ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                </button>
                <button 
                  onClick={resetTimer}
                  className={`p-1.5 rounded-lg transition-colors ${isTimerRunning ? 'hover:bg-white/20' : 'hover:bg-slate-200 text-slate-400'}`}
                  title="Reset Timer"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable View Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 lg:p-14">
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 cubic-bezier(0.4, 0, 0.2, 1)">
            {children}
          </div>
        </div>
      </main>
      
      <style>{`
        @media (max-width: 400px) {
          .xs\\:inline { display: none; }
        }
      `}</style>
    </div>
  );
};

export default Layout;
