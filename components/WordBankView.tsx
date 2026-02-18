
import React, { useState, useEffect } from 'react';
import { Bookmark, Search, Trash2, CheckCircle, Circle, Volume2, Sparkles, Languages, Loader2, BookOpen } from 'lucide-react';
import { UserVocab } from '../types';
import { generateTTS, playPCM } from '../services/geminiService';

const WordBankView: React.FC = () => {
  const [words, setWords] = useState<UserVocab[]>([]);
  const [search, setSearch] = useState('');
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('user_word_bank');
    if (saved) setWords(JSON.parse(saved));
  }, []);

  const saveWords = (newWords: UserVocab[]) => {
    setWords(newWords);
    localStorage.setItem('user_word_bank', JSON.stringify(newWords));
  };

  const toggleLearned = (id: string) => {
    const newWords = words.map(w => w.id === id ? { ...w, learned: !w.learned } : w);
    saveWords(newWords);
  };

  const deleteWord = (id: string) => {
    const newWords = words.filter(w => w.id !== id);
    saveWords(newWords);
  };

  const playAudio = async (text: string, id: string) => {
    if (isPlaying) return;
    setIsPlaying(id);
    const data = await generateTTS(text);
    if (data) {
      await playPCM(data, () => setIsPlaying(null));
    } else {
      setIsPlaying(null);
    }
  };

  const filteredWords = words.filter(w => 
    w.korean.toLowerCase().includes(search.toLowerCase()) || 
    w.english.toLowerCase().includes(search.toLowerCase())
  );

  const learnedCount = words.filter(w => w.learned).length;
  const progressPercent = words.length > 0 ? Math.round((learnedCount / words.length) * 100) : 0;

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 group-hover:opacity-100 transition-opacity duration-1000" />
        
        <div className="relative z-10">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4">
            <Bookmark className="text-indigo-600" size={36} /> My Word Bank
          </h2>
          <p className="text-slate-500 mt-2 font-medium">Study {words.length} custom words you found in practice tests.</p>
        </div>
        
        <div className="relative z-10 w-full lg:w-72 bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Mastery Progress</span>
            <span className="text-sm font-black text-slate-800">{progressPercent}%</span>
          </div>
          <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1)"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[9px] mt-3 text-slate-400 font-bold uppercase tracking-widest text-center">
            {learnedCount} of {words.length} items mastered
          </p>
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
        <input 
          type="text"
          placeholder="Search through your collected words..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border-4 border-slate-50 rounded-[2rem] px-16 py-5 focus:outline-none focus:border-indigo-600 transition-all shadow-xl shadow-slate-200/50 text-lg font-bold placeholder:text-slate-300"
        />
      </div>

      {words.length === 0 ? (
        <div className="bg-white p-20 rounded-[3rem] border border-slate-100 text-center space-y-6">
          <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto text-slate-200">
            <Languages size={48} />
          </div>
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">Your Bank is Empty</h3>
          <p className="text-slate-500 max-w-sm mx-auto font-medium leading-relaxed">Head over to the <span className="text-indigo-600 font-bold">Practice Tests</span> and highlight any Korean word to build your personal study list here!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWords.map((word) => (
            <div 
              key={word.id}
              className={`
                group bg-white p-8 rounded-[2.5rem] border-2 transition-all hover:shadow-2xl hover:shadow-indigo-100 relative overflow-hidden
                ${word.learned ? 'border-emerald-100 bg-emerald-50/10' : 'border-slate-50'}
              `}
            >
              <div className="flex justify-between items-start mb-6">
                <button 
                  onClick={() => toggleLearned(word.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm
                    ${word.learned 
                      ? 'bg-emerald-500 text-white shadow-emerald-100' 
                      : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}
                  `}
                >
                  {word.learned ? <CheckCircle size={14} /> : <Circle size={14} />}
                  {word.learned ? 'Learned' : 'Need Review'}
                </button>
                <button 
                  onClick={() => deleteWord(word.id)}
                  className="p-2 text-slate-200 hover:text-red-500 transition-colors"
                  title="Remove from Bank"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <h3 className={`text-3xl font-black tracking-tight ${word.learned ? 'text-emerald-900' : 'text-slate-900'}`}>{word.korean}</h3>
                  <button 
                    onClick={() => playAudio(word.korean, word.id)}
                    className={`p-2.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm ${isPlaying === word.id ? 'animate-pulse' : ''}`}
                  >
                    {isPlaying === word.id ? <Loader2 size={18} className="animate-spin" /> : <Volume2 size={18} />}
                  </button>
                </div>
                <div className="h-px w-8 bg-indigo-200 rounded-full" />
                <p className={`text-lg font-bold ${word.learned ? 'text-emerald-700/70' : 'text-slate-500'}`}>{word.english}</p>
              </div>

              {word.learned && (
                <div className="absolute -bottom-6 -right-6 opacity-5 pointer-events-none rotate-12">
                   <Sparkles size={120} className="text-emerald-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WordBankView;
