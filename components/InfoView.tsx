
import React, { useState, useEffect } from 'react';
import { BookOpen, Headphones, Award, Target, ExternalLink, HelpCircle, CheckCircle2, Calculator, FileText, ArrowRightCircle, Circle, CheckCircle, MousePointerClick, Sparkles, X, ChevronRight } from 'lucide-react';
import { STUDY_CHECKLIST_DATA, CHECKLIST_STUDY_RESOURCES } from '../constants';

interface InfoViewProps {
  onSelectRange?: (rangeKey: string) => void;
}

const InfoView: React.FC<InfoViewProps> = ({ onSelectRange }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [selectedResource, setSelectedResource] = useState<string | null>(null);

  const loadProgress = () => {
    const saved = localStorage.getItem('topik_study_progress');
    if (saved) setCheckedItems(JSON.parse(saved));
  };

  useEffect(() => {
    loadProgress();
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

  const listeningRanges = [
    { range: 'Q1 - Q4', topic: 'Matching Picture/Subject', note: 'Choose correct picture based on audio.' },
    { range: 'Q5 - Q10', topic: 'Conversational Response', note: 'Choose what the next person should say.' },
    { range: 'Q11 - Q14', topic: 'Place/Topic Identification', note: 'Where are they? What are they talking about?' },
    { range: 'Q15 - Q30', topic: 'Dialogue Comprehension', note: 'Detailed understanding of conversations.' }
  ];

  const readingRanges = [
    { range: 'Q31 - Q33', topic: 'Topic Identification', note: 'What is this short text about?' },
    { range: 'Q34 - Q39', topic: 'Fill in the Blanks', note: 'Vocabulary and Grammar focus.' },
    { range: 'Q40 - Q42', topic: 'Detailed Information', note: 'Signs, ads, and notice boards.' },
    { range: 'Q43 - Q70', topic: 'Paragraph Comprehension', note: 'Long texts, main ideas, logic order.' }
  ];

  const ResourceModal = ({ id }: { id: string }) => {
    const res = (CHECKLIST_STUDY_RESOURCES as any)[id];
    if (!res) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
          <button onClick={() => setSelectedResource(null)} className="absolute top-8 right-8 p-3 bg-slate-100 text-slate-500 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-colors">
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-[1.5rem]"><HelpCircle size={32} /></div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{res.title}</h3>
          </div>

          <div className="space-y-6">
            <p className="text-lg font-medium text-slate-600 leading-relaxed italic border-l-4 border-indigo-200 pl-6 whitespace-pre-wrap">
              {res.guide}
            </p>
            
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Trusted Study Guides</h4>
              {res.links.map((link: any, i: number) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 group">
                  <span className="font-bold text-slate-800">{link.name}</span>
                  <ExternalLink size={18} className="text-indigo-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-16 pb-24">
      {selectedResource && <ResourceModal id={selectedResource} />}
      
      <div className="relative group overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600 rounded-[3rem] shadow-2xl shadow-indigo-200/50 transform group-hover:scale-[1.01] transition-transform duration-700" />
        <div className="relative z-10 p-10 sm:p-16 flex flex-col md:flex-row items-center justify-between gap-12 text-white">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight leading-[1.1]">TOPIK I <br/> <span className="text-indigo-200 italic">Blueprint</span></h2>
            <p className="text-indigo-100 font-medium text-lg max-w-md">Your complete guide to passing Level 1 and 2. Track your progress below.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section className="bg-white p-10 sm:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm relative group">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Study Milestones</h3>
              <p className="text-4xl font-black text-emerald-600">{progressPercent}%</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {checklistItems.map((item) => (
                <div key={item.id} className="flex gap-2">
                   <button
                    onClick={() => toggleItem(item.id)}
                    className={`flex-1 flex items-center gap-4 p-5 rounded-3xl text-left transition-all border-2
                      ${checkedItems[item.id] ? 'bg-emerald-50/50 border-emerald-100' : 'bg-white border-slate-50 hover:border-indigo-200'}`}
                  >
                    {checkedItems[item.id] ? <CheckCircle size={24} className="text-emerald-500" /> : <Circle size={24} className="text-slate-200" />}
                    <span className={`text-sm font-bold ${checkedItems[item.id] ? 'line-through text-slate-400' : 'text-slate-700'}`}>{item.label}</span>
                  </button>
                  <button 
                    onClick={() => setSelectedResource(item.id)}
                    className="p-5 bg-indigo-50 text-indigo-600 rounded-3xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                    title="Read Study Guide"
                  >
                    <BookOpen size={20} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-10 sm:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-10">Interactive Exam Map</h3>
            <div className="space-y-10">
              <div>
                <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-6">Listening Sections</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {listeningRanges.map((item, i) => (
                    <button key={i} onClick={() => onSelectRange?.(item.range)} className="p-6 rounded-[2rem] bg-blue-50/20 border-2 border-transparent hover:border-blue-400 text-left hover:bg-white transition-all">
                      <span className="text-[10px] font-black text-blue-700 bg-white px-3 py-1 rounded-xl">{item.range}</span>
                      <p className="font-black text-slate-800 mt-4 tracking-tight">{item.topic}</p>
                      <p className="text-xs text-slate-400 mt-2">{item.note}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-6">Reading Sections</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {readingRanges.map((item, i) => (
                    <button key={i} onClick={() => onSelectRange?.(item.range)} className="p-6 rounded-[2rem] bg-indigo-50/20 border-2 border-transparent hover:border-indigo-400 text-left hover:bg-white transition-all">
                      <span className="text-[10px] font-black text-indigo-700 bg-white px-3 py-1 rounded-xl">{item.range}</span>
                      <p className="font-black text-slate-800 mt-4 tracking-tight">{item.topic}</p>
                      <p className="text-xs text-slate-400 mt-2">{item.note}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-10">
           <section className="bg-slate-900 p-10 rounded-[2.5rem] text-white">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3"><Calculator size={22} className="text-indigo-400" /> Grading Scheme</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="font-black">Level 1</span>
                <span className="text-2xl font-black text-emerald-400">80+ Pts</span>
              </div>
              <div className="flex justify-between items-center p-5 rounded-3xl bg-indigo-500/10 border border-indigo-500/20">
                <span className="font-black">Level 2</span>
                <span className="text-2xl font-black text-indigo-400">140+ Pts</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InfoView;
