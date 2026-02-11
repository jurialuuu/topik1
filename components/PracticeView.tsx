
import React, { useMemo, useState } from 'react';
import { PRACTICE_QUESTIONS } from '../constants';
import { CheckCircle2, XCircle, RefreshCw, Volume2, Star, X, Filter, Languages, Sparkles } from 'lucide-react';
import { generateTTS, playPCM } from '../services/geminiService';

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

  // Filter questions based on rangeKey if a filter is provided
  const filteredQuestions = useMemo(() => {
    if (!filter) return PRACTICE_QUESTIONS;
    return PRACTICE_QUESTIONS.filter(q => q.rangeKey === filter);
  }, [filter]);

  const q = filteredQuestions[currentIdx];

  // Reset state when filter changes
  React.useEffect(() => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowResult(false);
    setTotalPoints(0);
    setFinished(false);
    setShowTranslation(false);
  }, [filter]);

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

  const reset = () => {
    setCurrentIdx(0);
    setTotalPoints(0);
    setFinished(false);
    setSelectedOption(null);
    setShowResult(false);
    setShowTranslation(false);
  };

  if (filteredQuestions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 space-y-6">
        <div className="p-16 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
          <Filter size={64} className="mx-auto text-slate-200 mb-8" />
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Range Not Found</h2>
          <p className="text-slate-500 mb-10 font-medium">We are currently preparing more questions for this specific section.</p>
          <button 
            onClick={onClearFilter}
            className="px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
          >
            Practice Full Exam
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 space-y-8">
        <div className="bg-white p-16 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
          <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-xl shadow-emerald-100">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Mission Accomplished!</h2>
          <p className="text-slate-500 mb-10 text-lg font-medium">You scored <span className="font-black text-indigo-600">{totalPoints}</span> points in this session.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={reset}
              className="flex items-center justify-center gap-3 px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
            >
              <RefreshCw size={20} /> Restart Session
            </button>
            {filter && (
              <button 
                onClick={onClearFilter}
                className="flex items-center justify-center gap-3 px-10 py-5 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all active:scale-95"
              >
                Exit Section
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Quiz Arena</h2>
            {filter && (
              <span className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-[10px] font-black uppercase tracking-widest border border-amber-100">
                <Filter size={12} /> {filter}
              </span>
            )}
          </div>
          <p className="text-slate-400 font-black text-xs uppercase tracking-[0.2em]">Section Question {currentIdx + 1} / {filteredQuestions.length}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-6 py-3 bg-white border border-slate-100 rounded-2xl font-black text-lg shadow-sm text-indigo-600">
            {totalPoints} <span className="text-[10px] text-slate-400 ml-1">PTS</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden relative group">
        <div className="absolute top-8 right-8 flex items-center gap-1.5 px-4 py-2 bg-amber-50 text-amber-600 rounded-xl font-black text-xs border border-amber-100 shadow-sm z-10">
          <Star size={12} fill="currentColor" /> {q.points} POINTS
        </div>

        <div className="p-10 sm:p-14">
          <div className="flex items-center gap-4 mb-10">
            <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm ${q.type === 'reading' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
              {q.type} Section
            </span>
            {q.type === 'listening' && (
              <button 
                onClick={handleAudioPlayback}
                disabled={isAudioPlaying}
                className={`p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-90 ${isAudioPlaying ? 'animate-pulse opacity-50' : ''}`}
                title="Play Audio"
              >
                <Volume2 size={24} />
              </button>
            )}
          </div>

          <div className="mb-12">
            {q.type === 'listening' && q.script && (
              <div className="mb-8 p-8 bg-slate-50 rounded-[2rem] font-medium text-slate-600 border border-slate-100 italic leading-relaxed whitespace-pre-wrap text-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                {q.script}
              </div>
            )}
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 leading-[1.2] tracking-tight whitespace-pre-wrap">
              {q.content}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            {q.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`
                  p-6 rounded-[2rem] text-left font-black transition-all border-4 text-base sm:text-lg relative group/opt
                  ${selectedOption === idx 
                    ? 'bg-indigo-50 border-indigo-600 text-indigo-900' 
                    : 'bg-white border-slate-50 text-slate-500 hover:border-slate-200 shadow-sm'}
                  ${showResult && idx === q.correctAnswer ? 'bg-emerald-50 border-emerald-500 text-emerald-900 !text-emerald-900' : ''}
                  ${showResult && selectedOption === idx && idx !== q.correctAnswer ? 'bg-red-50 border-red-500 text-red-900' : ''}
                `}
              >
                <div className="flex items-center gap-6">
                  <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black shadow-sm transition-colors
                    ${selectedOption === idx ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 group-hover/opt:bg-slate-200'}
                    ${showResult && idx === q.correctAnswer ? 'bg-emerald-500 text-white' : ''}
                  `}>
                    {idx + 1}
                  </span>
                  {option}
                </div>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            {!showResult ? (
              <button
                onClick={handleCheck}
                disabled={selectedOption === null}
                className="flex-[2] py-6 bg-indigo-600 text-white font-black rounded-3xl disabled:opacity-50 hover:bg-indigo-700 shadow-2xl shadow-indigo-100 transition-all uppercase tracking-[0.2em] text-sm active:scale-95"
              >
                Submit Response
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-[2] py-6 bg-indigo-600 text-white font-black rounded-3xl hover:bg-indigo-700 shadow-2xl shadow-indigo-100 transition-all uppercase tracking-[0.2em] text-sm active:scale-95"
              >
                Continue <Sparkles size={16} className="inline ml-2" />
              </button>
            )}
            <button 
              onClick={() => setShowTranslation(!showTranslation)}
              className="flex-1 py-6 bg-slate-50 text-slate-500 font-black rounded-3xl hover:bg-slate-100 border border-slate-100 transition-all uppercase tracking-[0.2em] text-xs active:scale-95 flex items-center justify-center gap-2"
            >
              <Languages size={18} /> {showTranslation ? 'Hide Aid' : 'Translate'}
            </button>
          </div>

          {showTranslation && (
            <div className="mt-10 p-8 bg-indigo-50/50 rounded-[2.5rem] border border-indigo-100 text-indigo-900 animate-in fade-in slide-in-from-top-4 duration-500">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-3">Translation & Context</h4>
              <p className="leading-relaxed font-bold text-lg">{q.translation}</p>
            </div>
          )}

          {showResult && (
            <div className={`mt-10 p-8 rounded-[2.5rem] flex gap-6 animate-in zoom-in-95 duration-500 border-2 ${selectedOption === q.correctAnswer ? 'bg-emerald-50 border-emerald-100 text-emerald-900' : 'bg-red-50 border-red-100 text-red-900'}`}>
              <div className="mt-1 flex-shrink-0">
                {selectedOption === q.correctAnswer ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
              </div>
              <div>
                <h4 className="font-black text-xl mb-2 tracking-tight">{selectedOption === q.correctAnswer ? `Fantastic! (+${q.points} PTS)` : 'Good Try!'}</h4>
                <p className="text-base leading-relaxed font-medium opacity-80">{q.explanation}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticeView;
