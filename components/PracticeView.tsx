
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { PRACTICE_QUESTIONS } from '../constants';
import { CheckCircle2, XCircle, RefreshCw, Volume2, Star, X, Filter, Languages, Sparkles, PlusCircle, Loader2, BookOpen, Check } from 'lucide-react';
import { generateTTS, playPCM, getQuickTranslation } from '../services/geminiService';
import { UserVocab } from '../types';

interface PracticeViewProps {
  filter?: string | null;
  onClearFilter?: () => void;
}

const PracticeView: React.FC<PracticeViewProps> = ({ filter, onClearFilter }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [selectedExamSet, setSelectedExamSet] = useState<number>(1);
  
  // Vocab Highlight State
  const [selection, setSelection] = useState<{ text: string; x: number; y: number } | null>(null);
  const [isAddingVocab, setIsAddingVocab] = useState(false);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const selectionTimerRef = useRef<number | null>(null);

  const filteredQuestions = useMemo(() => {
    let qs = PRACTICE_QUESTIONS;
    if (filter) {
      qs = qs.filter(q => q.rangeKey === filter);
    }
    return qs.filter(q => q.examSet === selectedExamSet);
  }, [filter, selectedExamSet]);

  const q = filteredQuestions[currentIdx];
  const examSets = Array.from(new Set(PRACTICE_QUESTIONS.map(q => q.examSet))).sort();

  useEffect(() => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowResult(false);
    setTotalPoints(0);
    setFinished(false);
    setShowTranslation(false);
  }, [filter, selectedExamSet]);

  useEffect(() => {
    const handleSelectionChange = () => {
      if (selectionTimerRef.current) window.clearTimeout(selectionTimerRef.current);
      
      selectionTimerRef.current = window.setTimeout(() => {
        const sel = window.getSelection();
        const text = sel?.toString().trim();
        const containsKorean = /[\u3131-\uD79D]/.test(text || '');

        if (text && text.length > 0 && text.length < 30 && containsKorean) {
          const range = sel?.getRangeAt(0).getBoundingClientRect();
          if (range) {
            setSelection({
              text,
              x: range.left + window.scrollX + range.width / 2,
              y: range.top + window.scrollY - 80 // Offset for the new bigger tooltip
            });
            setTranslatedText(null);
            setIsSaved(false);
            
            // Auto-translate on highlight
            getQuickTranslation(text).then(setTranslatedText);
          }
        } else {
          setSelection(null);
        }
      }, 250);
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      if (selectionTimerRef.current) window.clearTimeout(selectionTimerRef.current);
    };
  }, []);

  const addToWordBank = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selection) return;
    setIsAddingVocab(true);
    
    try {
      const translation = translatedText || await getQuickTranslation(selection.text);
      const existing = JSON.parse(localStorage.getItem('user_word_bank') || '[]');
      const newVocab: UserVocab = {
        id: Date.now().toString(),
        korean: selection.text,
        english: translation,
        learned: false,
        addedAt: Date.now()
      };
      localStorage.setItem('user_word_bank', JSON.stringify([...existing, newVocab]));
      setIsSaved(true);
      setTimeout(() => {
        setSelection(null);
        window.getSelection()?.removeAllRanges();
      }, 1000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAddingVocab(false);
    }
  };

  const handleAudioPlayback = async () => {
    if (isAudioPlaying || !q.script) return;
    setIsAudioPlaying(true);
    const audioData = await generateTTS(q.script);
    if (audioData) {
      await playPCM(audioData, () => setIsAudioPlaying(false));
    } else {
      setIsAudioPlaying(false);
    }
  };

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelectedOption(idx);
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    if (selectedOption === q.correctAnswer) {
      setTotalPoints(totalPoints + q.points);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIdx < filteredQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setShowResult(false);
      setShowTranslation(false);
    } else {
      setFinished(true);
    }
  };

  if (filteredQuestions.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20 relative">
      {selection && (
        <div 
          style={{ left: selection.x, top: selection.y, transform: 'translateX(-50%)' }}
          className="fixed z-[100] flex flex-col items-center gap-4 animate-in zoom-in-50 duration-200"
        >
          {/* Enhanced Selection Tooltip with Translation */}
          <div className="flex flex-col items-center p-4 bg-slate-900 text-white rounded-[1.5rem] shadow-2xl relative min-w-[120px]">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Translation</span>
            <div className="font-bold text-sm mb-3">
              {translatedText || <Loader2 size={12} className="animate-spin" />}
            </div>
            
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={addToWordBank}
              disabled={isAddingVocab || isSaved}
              className={`w-full py-2 px-4 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${isSaved ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
            >
              {isAddingVocab ? <Loader2 size={12} className="animate-spin" /> : isSaved ? <Check size={12} /> : <PlusCircle size={12} />}
              {isSaved ? "Saved" : "Save to Bank"}
            </button>
            
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900" />
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Mock Exam {selectedExamSet}</h2>
            {filter && <span className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-[10px] font-black uppercase tracking-widest border border-amber-100"><Filter size={12} /> {filter}</span>}
          </div>
          <div className="flex gap-2">
            {examSets.map(set => (
              <button 
                key={set} 
                onClick={() => setSelectedExamSet(set)}
                className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${selectedExamSet === set ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-400 border-slate-100 hover:border-indigo-200'}`}
              >
                Set {set}
              </button>
            ))}
          </div>
        </div>
        <div className="px-6 py-3 bg-white border border-slate-100 rounded-2xl font-black text-lg shadow-sm text-indigo-600">
          {totalPoints} <span className="text-[10px] text-slate-400 ml-1">PTS</span>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden relative p-10 sm:p-14">
        <div className="absolute top-8 right-8 flex items-center gap-1.5 px-4 py-2 bg-amber-50 text-amber-600 rounded-xl font-black text-xs border border-amber-100 shadow-sm z-10">
          <Star size={12} fill="currentColor" /> {q.points} POINTS
        </div>

        <div className="flex items-center gap-4 mb-10">
          <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm ${q.type === 'reading' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
            {q.type} Section
          </span>
          {q.type === 'listening' && (
            <button onClick={handleAudioPlayback} disabled={isAudioPlaying} className={`p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-90 ${isAudioPlaying ? 'animate-pulse opacity-50' : ''}`}>
              <Volume2 size={24} />
            </button>
          )}
        </div>

        <div className="mb-12">
          {q.type === 'listening' && q.script && (
            <div className="mb-8 p-8 bg-slate-50 rounded-[2rem] font-medium text-slate-600 border border-slate-100 italic leading-relaxed whitespace-pre-wrap text-lg select-text">
              {q.script}
            </div>
          )}
          <h3 className="text-3xl sm:text-4xl font-black text-slate-900 leading-[1.2] tracking-tight whitespace-pre-wrap select-text">
            {q.content}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {q.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`p-6 rounded-[2rem] text-left font-black transition-all border-4 text-base sm:text-lg relative
                ${selectedOption === idx ? 'bg-indigo-50 border-indigo-600 text-indigo-900' : 'bg-white border-slate-50 text-slate-500 hover:border-slate-200 shadow-sm'}
                ${showResult && idx === q.correctAnswer ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : ''}
                ${showResult && selectedOption === idx && idx !== q.correctAnswer ? 'bg-red-50 border-red-500 text-red-900' : ''}
              `}
            >
              <span className="select-text">{idx + 1}. {option}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          {!showResult ? (
            <button onClick={handleCheck} disabled={selectedOption === null} className="flex-[2] py-6 bg-indigo-600 text-white font-black rounded-3xl disabled:opacity-50 hover:bg-indigo-700 shadow-2xl transition-all uppercase tracking-[0.2em] text-sm">Submit Response</button>
          ) : (
            <button onClick={handleNext} className="flex-[2] py-6 bg-indigo-600 text-white font-black rounded-3xl hover:bg-indigo-700 shadow-2xl transition-all uppercase tracking-[0.2em] text-sm">Continue <Sparkles size={16} className="inline ml-2" /></button>
          )}
          <button onClick={() => setShowTranslation(!showTranslation)} className="flex-1 py-6 bg-slate-50 text-slate-500 font-black rounded-3xl hover:bg-slate-100 border border-slate-100 transition-all uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2">
            <Languages size={18} /> {showTranslation ? 'Hide Aid' : 'Translate'}
          </button>
        </div>

        {showTranslation && (
          <div className="mt-10 p-8 bg-indigo-50/50 rounded-[2.5rem] border border-indigo-100 text-indigo-900 animate-in fade-in slide-in-from-top-4 duration-500">
            <p className="leading-relaxed font-bold text-lg">{q.translation}</p>
          </div>
        )}

        {showResult && (
          <div className={`mt-10 p-8 rounded-[2.5rem] flex gap-6 animate-in zoom-in-95 duration-500 border-2 ${selectedOption === q.correctAnswer ? 'bg-emerald-50 border-emerald-100 text-emerald-900' : 'bg-red-50 border-red-100 text-red-900'}`}>
            <div>{selectedOption === q.correctAnswer ? <CheckCircle2 size={32} /> : <XCircle size={32} />}</div>
            <div>
              <h4 className="font-black text-xl mb-2 tracking-tight">{selectedOption === q.correctAnswer ? `Correct! (+${q.points} PTS)` : 'Good Try!'}</h4>
              <p className="text-base leading-relaxed font-medium opacity-80">{q.explanation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeView;
