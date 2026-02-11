
import React from 'react';
import { GRAMMAR_DATA } from '../constants';
import { HelpCircle, ChevronRight } from 'lucide-react';

const GrammarView: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 text-center">Essential Grammar</h2>
        <p className="text-slate-500 text-center mt-2">Key patterns required for TOPIK I Level 1 & 2</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {GRAMMAR_DATA.map((item, idx) => (
          <div key={idx} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold mb-3 tracking-wide uppercase">Pattern</span>
                  <h3 className="text-4xl font-black text-slate-900 tracking-tight">{item.pattern}</h3>
                </div>
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                  <HelpCircle size={24} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-3">Explanation</h4>
                  <p className="text-slate-800 font-medium text-lg leading-relaxed">{item.explanation}</p>
                  <div className="mt-4 p-4 bg-slate-50 rounded-2xl text-slate-600 text-sm leading-relaxed border border-slate-100">
                    {item.usage}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-3">Live Examples</h4>
                  {item.examples.map((ex, i) => (
                    <div key={i} className="group p-4 bg-indigo-50/50 rounded-2xl border border-transparent hover:border-indigo-200 transition-all">
                      <p className="text-xl font-bold text-slate-800 mb-1 flex items-center gap-3">
                        <ChevronRight size={20} className="text-indigo-400" />
                        {ex.korean}
                      </p>
                      <p className="text-slate-500 font-medium ml-8">{ex.english}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrammarView;
