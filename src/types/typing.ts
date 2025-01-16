export type TokenType = 'keyword' | 'string' | 'number' | 'comment' | 'function' | 'type' | 'variable' | 'property' | 'operator' | 'plain';

export interface CodeToken {
  text: string;
  type: TokenType;
}

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type ProgrammingLanguage = 'javascript' | 'python';

export interface CodeExample {
  id: string;
  title: string;
  language: ProgrammingLanguage;
  difficulty: Difficulty;
  description: string;
  tags: string[];
  estimatedTime: number;
  code: CodeToken[];
}

export interface TypingStats {
  wpm: number;
  accuracy: number;
  time: number;
  keystrokes: number;
  correctKeystrokes: number;
  exampleId: string;
  timestamp: number;
}

export interface TypingResult {
  stats: TypingStats;
  example: CodeExample;
  averageWPM: number;
  totalExamplesCompleted: number;
}

export interface DetailedStats {
  totalCharacters: number;
  correctCharacters: number;
  errorCount: number;
  specialCharAccuracy: number;
  averageCPM: number;
}

export interface ExampleStats {
  id: string;
  title: string;
  difficulty: Difficulty;
  time: number;
  accuracy: number;
  wpm: number;
} 