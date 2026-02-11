
import React from 'react';
import { Volume2, RotateCcw, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { VOCABULARY_DATA } from '../constants';
import { generateTTS, playPCM } from '../services/geminiService';

const FlashcardsView: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const currentCard = VOCABULARY_DATA[currentIndex];

  const handleFlip = () => setIsFlipped(!isFlipped);
  
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev === 0 ? VOCABULARY_DATA.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev === VOCABULARY_DATA.length - 1 ? 0 : prev + 1));
  };

  const handleAudio = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) return;
    setIsPlaying(true);
    const audioData = await generateTTS(currentCard.korean);
    if (audioData) {
      await playPCM(audioData, () => setIsPlaying(false));
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-10 pb-20">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-indigo-100">
           <Sparkles size={12} /> Active Recall Mode
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Vocabulary Mastery</h2>
        <p className="text-slate-500 mt-2 font-medium">Build your core word bank for Levels 1 & 2</p>
      </div>

      <div className="flex items-center justify-between px-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
        <span className="bg-slate-100 px-3 py-1 rounded-lg">{currentCard.category}</span>
        <span className="text-indigo-500">{currentIndex + 1} / {VOCABULARY_DATA.length}</span>
      </div>

      <div 
        className="group perspective h-[420px] cursor-pointer active:scale-[0.98] transition-transform duration-300"
        onClick={handleFlip}
      >
        <div className={`
          relative w-full h-full transition-all duration-700 preserve-3d
          ${isFlipped ? 'rotate-y-180' : ''}
        `}>
          {/* Front */}
          <div className="absolute inset-0 bg-white rounded-[3rem] border-2 border-slate-50 shadow-2xl shadow-slate-200/50 flex flex-col items-center justify-center p-12 backface-hidden ring-8 ring-slate-50/50">
            <div className="flex flex-col items-center gap-8">
              <span className="text-7xl font-black text-slate-900 tracking-tight">{currentCard.korean}</span>
              <button 
                onClick={handleAudio}
                className={`w-20 h-20 bg-indigo-600 text-white rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-90 ${isPlaying ? 'animate-pulse' : ''}`}
                title="Hear Pronunciation"
              >
                <Volume2 size={32} />
              </button>
            </div>
            <p className="absolute bottom-12 text-slate-300 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <Eye size={16} /> Tap to flip card
            </p>
          </div>

          {/* Back */}
          <div className="absolute inset-0 bg-indigo-600 text-white rounded-[3rem] shadow-2xl flex flex-col items-center justify-center p-12 rotate-y-180 backface-hidden ring-8 ring-indigo-500/10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300 mb-4">English Meaning</span>
            <span className="text-5xl font-black mb-10 tracking-tight">{currentCard.english}</span>
            
            <div className="w-full bg-white/10 p-6 rounded-3xl border border-white/10 text-center">
              <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-widest mb-3">Context Example</p>
              <p className="text-xl font-bold leading-relaxed">{currentCard.example}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-10">
        <button 
          onClick={handlePrev}
          className="w-16 h-16 rounded-[1.5rem] bg-white border border-slate-100 flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50 transition-all shadow-sm active:scale-90"
        >
          <ChevronLeft size={32} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
          className="px-6 py-3 rounded-2xl bg-slate-100 text-slate-600 font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-colors flex items-center gap-2 active:scale-95"
        >
          <RotateCcw size={16} /> Reset
        </button>
        <button 
          onClick={handleNext}
          className="w-16 h-16 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-90"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      <style>{`
        .perspective { perspective: 1500px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default FlashcardsView;
