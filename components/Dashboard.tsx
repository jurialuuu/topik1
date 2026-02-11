
import React from 'react';
import { BookOpen, Headphones, Languages, GraduationCap, ChevronRight, Sparkles, BookMarked, CheckCircle2 } from 'lucide-react';
import { View } from '../types';

interface DashboardProps {
  setView: (v: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
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
      desc: 'Review 2,000+ basic nouns, verbs, and adjectives required for Levels 1 & 2.', 
      icon: Languages, 
      color: 'bg-amber-50 text-amber-600',
      tag: 'Review'
    },
    { 
      id: 'grammar', 
      title: '3. Grammar Patterns', 
      desc: 'Study sentence endings (-아요/어요), particles, and connectors (-고, -지만).', 
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

      <div className="grid grid-cols-1 gap-6">
        <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] px-2 flex items-center gap-4">
          <div className="h-px flex-1 bg-indigo-100" />
          Study Curriculum
          <div className="h-px flex-1 bg-indigo-100" />
        </h3>
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-slate-900 rounded-[3rem] p-12 text-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-10 group-hover:opacity-20 transition-opacity duration-1000" />
          
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-10 tracking-tight">Key Learning <span className="text-indigo-400 italic">Checklist</span></h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                'Self-introductions & Greetings',
                'Ordering at Restaurants',
                'Shopping & Price Queries',
                'Public Transport Directions',
                'Basic Email & Text Reading',
                'Using Honorifics correctly',
                'Telling Date & Time',
                'Describing Weekly Routines'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-slate-300 text-sm font-bold group/item hover:text-white transition-colors">
                  <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all">
                    <CheckCircle2 size={16} />
                  </div>
                  {item}
                </div>
              ))}
            </div>
            <button 
              onClick={() => setView('info')}
              className="mt-12 px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-black uppercase tracking-widest transition-all inline-flex items-center gap-3 border border-white/10 group/btn"
            >
              Update Tracker 
              <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-1000 rotate-12">
            <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Grad&backgroundColor=ffffff" alt="Icon" className="w-64 h-64" />
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col group">
          <h3 className="font-black text-xl mb-8 tracking-tight">Essential Downloads</h3>
          <div className="flex-1 space-y-4">
            {[
              { label: 'Official Past Papers', sub: 'PDF Downloads', color: 'bg-red-50 text-red-600' },
              { label: 'Vocabulary PDF', sub: 'Level 1 & 2 List', color: 'bg-emerald-50 text-emerald-600' },
              { label: 'Listening Audio', sub: 'MP3 Mock Tests', color: 'bg-blue-50 text-blue-600' }
            ].map((res, i) => (
              <div key={i} className="flex items-center justify-between p-5 rounded-3xl bg-slate-50 border border-transparent hover:border-slate-200 hover:bg-white transition-all cursor-pointer group/item">
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
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-slate-50 rounded-3xl border border-slate-200 border-dashed text-center">
             <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-relaxed italic">Curated Study Materials</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
