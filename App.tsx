
import React from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import InfoView from './components/InfoView';
import FlashcardsView from './components/FlashcardsView';
import GrammarView from './components/GrammarView';
import PracticeView from './components/PracticeView';
import AITutorView from './components/AITutorView';
import WordBankView from './components/WordBankView';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = React.useState<View>('dashboard');
  const [practiceFilter, setPracticeFilter] = React.useState<string | null>(null);

  const handleNavigateToPractice = (rangeKey: string) => {
    setPracticeFilter(rangeKey);
    setCurrentView('practice');
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard setView={setCurrentView} />;
      case 'info': return <InfoView onSelectRange={handleNavigateToPractice} />;
      case 'flashcards': return <FlashcardsView />;
      case 'word-bank': return <WordBankView />;
      case 'grammar': return <GrammarView />;
      case 'practice': 
        return (
          <PracticeView 
            filter={practiceFilter} 
            onClearFilter={() => setPracticeFilter(null)} 
          />
        );
      case 'ai-tutor': return <AITutorView />;
      default: return <Dashboard setView={setCurrentView} />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      {renderView()}
    </Layout>
  );
};

export default App;
