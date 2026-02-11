
import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, Sparkles, MessageSquarePlus, Trash2 } from 'lucide-react';
import { getTutorResponse } from '../services/geminiService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AITutorView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Annyeonghaseyo! 👋 I am your personal TOPIK Buddy. Whether it is a tricky grammar point or a vocabulary query, I am here to help. What is on your mind?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || isLoading) return;
    
    const userMsg = textToSend.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const aiResponse = await getTutorResponse(userMsg);
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    setIsLoading(false);
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: 'Chat reset! How else can I assist your TOPIK studies today?' }]);
  };

  const suggestions = [
    { label: 'Explain -아요/어요', icon: '✍️' },
    { label: 'Level 1 Practice', icon: '🎓' },
    { label: 'Translate "Where is the bank?"', icon: '🏦' },
    { label: 'Polite greetings', icon: '🙇' }
  ];

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col max-w-4xl mx-auto space-y-6">
      <div className="flex-1 overflow-y-auto bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 p-8 sm:p-12 space-y-8 scroll-smooth" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
            <div className={`flex gap-5 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`
                w-12 h-12 rounded-[1.25rem] flex-shrink-0 flex items-center justify-center shadow-sm border-4
                ${m.role === 'user' ? 'bg-indigo-600 text-white border-indigo-50' : 'bg-slate-50 text-indigo-600 border-white'}
              `}>
                {m.role === 'user' ? <User size={24} /> : <Bot size={24} />}
              </div>
              <div className={`
                p-6 rounded-[2rem] text-base sm:text-lg leading-relaxed whitespace-pre-wrap font-medium shadow-sm
                ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100'}
              `}>
                {m.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-[1.25rem] bg-slate-50 text-indigo-600 flex items-center justify-center border-4 border-white shadow-sm">
                <Bot size={24} />
              </div>
              <div className="p-6 bg-slate-50 text-slate-400 rounded-[2rem] rounded-tl-none border border-slate-100 italic flex items-center gap-3 font-medium">
                <Loader2 size={20} className="animate-spin text-indigo-400" /> Thinking...
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {messages.length < 3 && !isLoading && (
          <div className="flex flex-wrap gap-3 justify-center">
            {suggestions.map((s, i) => (
              <button 
                key={i} 
                onClick={() => handleSend(s.label)}
                className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-sm active:scale-95 flex items-center gap-2"
              >
                <span className="text-base">{s.icon}</span> {s.label}
              </button>
            ))}
          </div>
        )}

        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask your tutor anything..."
            className="w-full bg-white border-4 border-slate-50 rounded-[2.5rem] px-10 py-6 pr-32 focus:outline-none focus:border-indigo-600 transition-all shadow-2xl shadow-slate-200/50 text-xl font-bold placeholder:text-slate-300"
          />
          <div className="absolute right-4 top-4 bottom-4 flex gap-2">
            <button
              onClick={clearChat}
              title="Clear Chat"
              className="w-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all active:scale-90"
            >
              <Trash2 size={20} />
            </button>
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="w-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-xl shadow-indigo-100 active:scale-90"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 text-slate-400">
           <div className="h-px w-12 bg-slate-100" />
           <p className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
             <Sparkles size={14} className="text-amber-400" /> Gemini AI Buddy
           </p>
           <div className="h-px w-12 bg-slate-100" />
        </div>
      </div>
    </div>
  );
};

export default AITutorView;
