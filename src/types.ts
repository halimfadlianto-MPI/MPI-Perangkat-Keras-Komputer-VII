export type HardwareCategory = 'input' | 'process' | 'output' | 'storage';

export interface CategoryInfo {
  id: HardwareCategory;
  name: string;
  nameId: string;
  shortDesc: string;
  humanAnalogy: string;
  analogyIcon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

export interface HardwareItem {
  id: string;
  name: string;
  category: HardwareCategory;
  humanAnalogy: string;
  functionDesc: string;
  howItWorks: string;
  examples: string[];
  funFact: string;
  ports: string;
  badgeTag: string;
  specs: string;
  iconName: string;
  soundNarration: string;
}

export type QuestionType = 'multiple-choice' | 'true-false' | 'matching' | 'drag-drop' | 'case-study';

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface MatchingPair {
  id: string;
  item: string;
  category: HardwareCategory;
}

export interface QuizQuestion {
  id: number;
  type: QuestionType;
  question: string;
  audioPrompt?: string;
  options?: string[];
  correctAnswer: string | number | boolean | Record<string, string>;
  explanation: string;
  hint: string;
  points: number;
  // Specific for matching/drag-drop
  itemsToMatch?: { id: string; name: string }[];
  categoriesToMatch?: HardwareCategory[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserProgress {
  studentName: string;
  avatar: string;
  score: number;
  stars: number;
  completedSections: string[];
  quizAnswers: Record<number, any>;
  quizPassed: boolean;
  quizScorePercent: number;
  pcBuilt: boolean;
  reflection: {
    mindful: string;
    meaningful: string;
    joyful: string;
  };
}

export type SectionId = 
  | 'start'
  | 'menu'
  | 'guide'
  | 'objectives'
  | 'aperception'
  | 'material'
  | 'exploration'
  | 'simulation'
  | 'practice'
  | 'quiz'
  | 'summary'
  | 'reflection'
  | 'certificate';
