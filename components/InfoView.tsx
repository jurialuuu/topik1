
import React, { useState, useEffect } from 'react';
import { BookOpen, Headphones, Award, Target, ExternalLink, HelpCircle, CheckCircle2, Calculator, FileText, ArrowRightCircle, Circle, CheckCircle, MousePointerClick, Sparkles } from 'lucide-react';

interface InfoViewProps {
  onSelectRange?: (rangeKey: string) => void;
}

const InfoView: React.FC<InfoViewProps> = ({ onSelectRange }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('topik_study_progress');
    if (saved) setCheckedItems(JSON.parse(saved));
  }, []);

  const toggleItem = (id: string) => {
    const newChecked = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(newChecked);
    localStorage.setItem('topik_study_progress', JSON.stringify(newChecked));
  };

  const checklistItems = [
    { id: 'vocab1', label: '1,500+ Basic Vocabulary Words', category: 'Vocab' },
    { id: 'part1', label: 'Subject/Topic/Object Particles (-이/가, -은/는, -을/를)', category: 'Grammar' },
    { id: 'part2', label: 'Place & Direction Particles (-에, -에서, -으로)', category: 'Grammar' },
    { id: 'tense1', label: 'Past/Present/Future Tenses', category: 'Grammar' },
    { id: 'honor1', label: 'Honorifics (-시-, -으세요, -습니다)', category: 'Grammar' },
    { id: 'num1', label: 'Native & Sino-Korean Number Systems', category: 'Essentials' },
    { id: 'time1', label: 'Telling Time, Days, and Dates', category: 'Essentials' },
    { id: 'listen1', label: 'Listening Practice: Matching Pictures (Q1-Q4)', category: 'Exam' },
    { id: 'read1', label: 'Reading Practice: Finding Main Idea (Q43-Q70)', category: 'Exam' }
  ];

  const progressPercent = Math.round((Object.values(checkedItems).filter(Boolean).length / checklistItems.length) * 100);

  const externalResources = [
    { name: 'Official TOPIK Site', url: 'https://www.topik.go.kr', desc: 'Schedule and registration' },
    { name: 'TOPIK Guide', url: 'https://www.topikguide.com', desc: 'Mock tests and study materials' },
    { name: 'King Sejong Institute', url: 'https://www.iksi.or.kr', desc: 'Government-funded learning' },
    { name: 'National Institute List', url: 'https://www.korean.go.kr', desc: 'Official vocabulary lists' }
  ];

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
    { range: 'Q43 - Q70', topic: 'Paragraph Comprehension', note: 'Long texts, finding main ideas, logic order.' }
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Aesthetic Hero Banner */}
      <div className="relative group overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600 rounded-[3rem] shadow-2xl shadow-indigo-200/50 transform group-hover:scale-[1.01] transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/50 to-transparent rounded-[3rem]" />
        
        {/* Abstract Shapes/Pattern */}
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <Sparkles size={180} />
        </div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-10 sm:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-indigo-100 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-white/10">
              <Sparkles size={12} /> Official Examination Guide
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
              TOPIK I <br/> <span className="text-indigo-200 italic">Blueprint</span>
            </h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="px-6 py-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest mb-1">Time Limit</p>
                <p className="text-xl font-black text-white">100 MINS</p>
              </div>
              <div className="px-6 py-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest mb-1">Max Score</p>
                <p className="text-xl font-black text-white">200 PTS</p>
              </div>
            </div>
          </div>
          
          <div className="flex-shrink-0 relative group/pixel">
            <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-75 group-hover/pixel:scale-110 transition-transform duration-1000" />
            <div className="relative w-56 h-56 bg-white rounded-[2.5rem] p-6 shadow-2xl transform hover:rotate-2 transition-transform duration-500 flex items-center justify-center ring-8 ring-white/10">
               <img 
                 src="https://api.dicebear.com/7.x/pixel-art/svg?seed=TopikBuddy&backgroundColor=ffffff" 
                 alt="Mascot" 
                 className="w-40 h-40 drop-shadow-xl"
               />
               <div className="absolute -bottom-4 -right-4 bg-indigo-600 text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-lg shadow-indigo-200 uppercase tracking-widest border-4 border-white">
                 Level Up!
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Study Checklist - Aesthetic Update */}
          <section className="bg-white p-10 sm:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-50 transition-colors duration-1000" />
            
            <div className="flex items-center justify-between mb-10 relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-3xl group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">Study Progress</h3>
                  <p className="text-xs text-slate-400 font-medium">Keep tracking your mastery milestones</p>
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <div className="relative">
                   <p className="text-4xl font-black text-emerald-600 leading-none tabular-nums">{progressPercent}%</p>
                   <div className="absolute -top-1 -right-4">
                     <Sparkles size={16} className="text-amber-400 animate-pulse" />
                   </div>
                </div>
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-2">Checklist Mastery</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              {checklistItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`
                    flex items-center gap-4 p-5 rounded-3xl text-left transition-all border-2
                    ${checkedItems[item.id] 
                      ? 'bg-emerald-50/50 border-emerald-100 text-emerald-900' 
                      : 'bg-white border-slate-50 text-slate-700 hover:border-slate-200 hover:shadow-md'}
                  `}
                >
                  <div className={`flex-shrink-0 transition-all duration-500 ${checkedItems[item.id] ? 'text-emerald-500 scale-110' : 'text-slate-200'}`}>
                    {checkedItems[item.id] ? <CheckCircle size={28} fill="#10b981" className="fill-emerald-50" /> : <Circle size={28} />}
                  </div>
                  <div className="min-w-0">
                    <span className={`text-[9px] font-black uppercase tracking-[0.15em] block mb-1 ${checkedItems[item.id] ? 'text-emerald-500/70' : 'text-slate-400'}`}>
                      {item.category}
                    </span>
                    <p className={`font-bold text-sm leading-tight transition-all truncate ${checkedItems[item.id] ? 'line-through opacity-50' : ''}`}>
                      {item.label}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Interactive Exam Map - Aesthetic Update */}
          <section className="bg-white p-10 sm:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-amber-50 text-amber-600 rounded-3xl group-hover:rotate-6 transition-transform">
                  <FileText size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">Interactive Map</h3>
                  <p className="text-xs text-slate-400 font-medium">Click to practice specific ranges</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-100">
                <MousePointerClick size={14} className="animate-bounce" /> Select to Begin
              </div>
            </div>
            
            <div className="space-y-10">
              <div>
                <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <div className="h-px w-6 bg-blue-200" /> Listening Track (Q1 - Q30)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {listeningRanges.map((item, i) => (
                    <button 
                      key={i} 
                      onClick={() => onSelectRange?.(item.range)}
                      className="group/item relative p-6 rounded-[2rem] bg-blue-50/20 border-2 border-transparent hover:border-blue-400 text-left hover:bg-white transition-all hover:shadow-2xl hover:shadow-blue-100 overflow-hidden"
                    >
                      <div className="relative z-10">
                        <span className="inline-block text-[10px] font-black text-blue-700 bg-white px-3 py-1 rounded-xl border border-blue-100 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">{item.range}</span>
                        <p className="font-black text-slate-800 mt-4 text-base tracking-tight">{item.topic}</p>
                        <p className="text-xs text-slate-400 mt-2 font-medium leading-relaxed">{item.note}</p>
                      </div>
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/item:opacity-10 transition-opacity">
                         <Headphones size={48} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <div className="h-px w-6 bg-indigo-200" /> Reading Track (Q31 - Q70)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {readingRanges.map((item, i) => (
                    <button 
                      key={i} 
                      onClick={() => onSelectRange?.(item.range)}
                      className="group/item relative p-6 rounded-[2rem] bg-indigo-50/20 border-2 border-transparent hover:border-indigo-400 text-left hover:bg-white transition-all hover:shadow-2xl hover:shadow-indigo-100 overflow-hidden"
                    >
                      <div className="relative z-10">
                        <span className="inline-block text-[10px] font-black text-indigo-700 bg-white px-3 py-1 rounded-xl border border-indigo-100 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-colors">{item.range}</span>
                        <p className="font-black text-slate-800 mt-4 text-base tracking-tight">{item.topic}</p>
                        <p className="text-xs text-slate-400 mt-2 font-medium leading-relaxed">{item.note}</p>
                      </div>
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/item:opacity-10 transition-opacity">
                         <BookOpen size={48} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-10">
          {/* Point System Section - More Aesthetic */}
          <section className="bg-slate-900 p-10 rounded-[2.5rem] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16 group-hover:opacity-40 transition-opacity duration-1000" />
            
            <div className="relative z-10">
              <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                <Calculator size={22} className="text-indigo-400" /> Grading Scheme
              </h3>
              
              <div className="space-y-6 mb-10">
                <div className="p-5 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-between group/card hover:bg-white/10 transition-colors">
                  <div>
                    <h4 className="font-bold text-indigo-200 text-sm mb-1">Listening</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">30 Questions</p>
                  </div>
                  <div className="text-right">
                    <span className="block font-black text-2xl text-white">100</span>
                  </div>
                </div>
                <div className="p-5 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-between group/card hover:bg-white/10 transition-colors">
                  <div>
                    <h4 className="font-bold text-indigo-200 text-sm mb-1">Reading</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">40 Questions</p>
                  </div>
                  <div className="text-right">
                    <span className="block font-black text-2xl text-white">100</span>
                  </div>
                </div>
              </div>

              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Passing Levels</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 group/level hover:bg-emerald-500/20 transition-all">
                  <div>
                    <p className="text-base font-black text-white">Level 1</p>
                    <p className="text-[10px] text-emerald-400/80 font-bold uppercase tracking-widest">Survival Skills</p>
                  </div>
                  <p className="text-2xl font-black text-emerald-400">80+</p>
                </div>
                <div className="flex justify-between items-center p-5 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 group/level hover:bg-indigo-500/20 transition-all">
                  <div>
                    <p className="text-base font-black text-white">Level 2</p>
                    <p className="text-[10px] text-indigo-400/80 font-bold uppercase tracking-widest">Basic Social</p>
                  </div>
                  <p className="text-2xl font-black text-indigo-400">140+</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
              <ExternalLink size={20} className="text-indigo-500" /> Resources
            </h3>
            <div className="space-y-4">
              {externalResources.map((res, i) => (
                <a key={i} href={res.url} target="_blank" className="block p-5 rounded-3xl bg-slate-50 border border-transparent hover:border-indigo-200 hover:bg-white transition-all group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-sm text-slate-800 group-hover:text-indigo-600 transition-colors">{res.name}</span>
                    <ArrowRightCircle size={14} className="text-slate-300 group-hover:text-indigo-600 transition-all group-hover:translate-x-1" />
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium group-hover:text-slate-500">{res.desc}</p>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InfoView;
