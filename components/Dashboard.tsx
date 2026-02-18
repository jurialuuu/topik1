
import React, { useState, useEffect } from 'react';
import { BookOpen, Languages, GraduationCap, ChevronRight, Sparkles, BookMarked, CheckCircle2, Circle, CheckCircle } from 'lucide-react';
import { View } from '../types';
import { STUDY_CHECKLIST_DATA } from '../constants';

interface DashboardProps {
  setView: (v: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const loadProgress = () => {
    const saved = localStorage.getItem('topik_study_progress');
    if (saved) setCheckedItems(JSON.parse(saved));
  };

  useEffect(() => {
    loadProgress();
    // Use a custom event to sync between Dashboard and InfoView within the same tab
    const handleSync = () => loadProgress();
    window.addEventListener('studyProgressUpdated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('studyProgressUpdated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const toggleItem = (id: string) => {
    const newChecked = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(newChecked);
    localStorage.setItem('topik_study_progress', JSON.stringify(newChecked));
    window.dispatchEvent(new Event('studyProgressUpdated'));
  };

  const checklistItems = STUDY_CHECKLIST_DATA;
  const progressPercent = Math.round((Object.values(checkedItems).filter(Boolean).length / checklistItems.length) * 100);

  const studyModules = [
    { 
      id: 'info', 
      title: '1. Exam Blueprint', 
      desc: 'Understand the test structure, timing, and passing scores (80/140 pts).', 
      icon: BookMarked, 
      color: 'bg-emerald-50 text-emerald-600',
      tag: 'Essentials'
    },
    { 
      id: 'flashcards', 
      title: '2. Vocabulary Mastery', 
      desc: 'Review basic nouns, verbs, and adjectives required for Level 1.', 
      icon: Languages, 
      color: 'bg-amber-50 text-amber-600',
      tag: 'Review'
    },
    { 
      id: 'grammar', 
      title: '3. Grammar Patterns', 
      desc: 'Study sentence endings (-아요/어요), particles, and connectors.', 
      icon: BookOpen, 
      color: 'bg-indigo-50 text-indigo-600',
      tag: 'Study'
    },
    { 
      id: 'practice', 
      title: '4. Practice Exam', 
      desc: 'Take timed simulation tests for Reading and Listening sections.', 
      icon: GraduationCap, 
      color: 'bg-blue-50 text-blue-600',
      tag: 'Exam'
    }
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 group-hover:opacity-100 transition-opacity duration-1000" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="relative">
            <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] p-4 shadow-xl shadow-indigo-100 ring-4 ring-indigo-50 overflow-hidden transform group-hover:rotate-6 transition-transform duration-500">
               <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=TopikBuddy&backgroundColor=6366f1" alt="Mascot" className="w-full h-full" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center animate-bounce">
              <Sparkles size={12} className="text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Annyeong! 👋</h2>
            <p className="text-slate-500 text-lg font-medium">Ready to focus on your TOPIK I study goal today?</p>
          </div>
        </div>

        <button 
          onClick={() => setView('ai-tutor')}
          className="relative z-10 flex items-center gap-4 px-8 py-5 bg-indigo-600 text-white font-black rounded-[1.5rem] hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 active:scale-95 group/btn overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
          <Sparkles size={20} className="animate-pulse" />
          <span>Talk to AI Tutor</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {studyModules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => setView(mod.id as View)}
            className="group relative flex flex-col sm:flex-row items-center sm:items-start gap-8 bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all text-center sm:text-left"
          >
            <div className={`${mod.color} p-6 rounded-[2rem] group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 flex-shrink-0 shadow-sm`}>
              <mod.icon size={36} />
            </div>
            <div className="flex-1">
              <span className="inline-block text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400 bg-indigo-50/50 px-3 py-1 rounded-lg border border-indigo-100/50 mb-4">{mod.tag}</span>
              <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">{mod.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">{mod.desc}</p>
              <div className="inline-flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                Get Started <ChevronRight size={16} />
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-slate-900 rounded-[3rem] p-12 text-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-10 group-hover:opacity-20 transition-opacity duration-1000" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-3xl font-black tracking-tight">Key Learning <span className="text-indigo-400 italic">Checklist</span></h3>
              <div className="flex flex-col items-end">
                <span className="text-2xl font-black text-indigo-400">{progressPercent}%</span>
                <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-indigo-500 transition-all duration-700" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {checklistItems.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => toggleItem(item.id)}
                  className="flex items-center gap-4 text-slate-300 text-sm font-bold group/item hover:text-white transition-colors cursor-pointer"
                >
                  <div className={`w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-all ${checkedItems[item.id] ? 'bg-indigo-600 text-white border-indigo-600' : 'text-indigo-400 group-hover/item:bg-white/10'}`}>
                    {checkedItems[item.id] ? <CheckCircle size={16} /> : <Circle size={16} />}
                  </div>
                  <span className={checkedItems[item.id] ? 'line-through text-slate-500' : ''}>{item.label}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setView('info')}
              className="mt-12 px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-black uppercase tracking-widest transition-all inline-flex items-center gap-3 border border-white/10 group/btn"
            >
              Update Full Tracker 
              <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col group">
          <h3 className="font-black text-xl mb-8 tracking-tight">Official Resources</h3>
          <div className="flex-1 space-y-4">
            {[
              { label: 'Past Papers Repo', sub: 'TOPIK Guide Archive', color: 'bg-red-50 text-red-600', url: 'https://www.topikguide.com/previous-papers/' },
              { label: 'Vocabulary List', sub: 'PDF Standard', color: 'bg-emerald-50 text-emerald-600', url: 'https://www.topikguide.com/topik-beginner-vocabulary-list/' },
              { label: 'Study Tips Blog', url: 'https://talktomeinkorean.com/blog/' , sub: 'TTMIK Insights', color: 'bg-blue-50 text-blue-600' }
            ].map((res, i) => (
              <a 
                key={i} 
                href={res.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-between p-5 rounded-3xl bg-slate-50 border border-transparent hover:border-slate-200 hover:bg-white transition-all cursor-pointer group/item"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${res.color} rounded-xl flex items-center justify-center shadow-sm font-black text-xs`}>
                    {res.label.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-sm text-slate-800 tracking-tight">{res.label}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{res.sub}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-200 group-hover/item:text-indigo-500 group-hover/item:translate-x-1 transition-all" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
