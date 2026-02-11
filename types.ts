
export interface Flashcard {
  id: string;
  korean: string;
  english: string;
  category: string;
  example?: string;
}

export interface GrammarPoint {
  pattern: string;
  explanation: string;
  usage: string;
  examples: { korean: string; english: string }[];
}

export interface PracticeQuestion {
  id: string;
  type: 'reading' | 'listening';
  rangeKey: string; // Key to map to the Exam Map sections
  content: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  translation: string;
  points: number;
  script?: string;
}

export type View = 'dashboard' | 'info' | 'flashcards' | 'grammar' | 'practice' | 'ai-tutor';
