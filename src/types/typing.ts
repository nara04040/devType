export interface CodeToken {
  text: string;
  type: 'keyword' | 'string' | 'number' | 'comment' | 'function' | 'type' | 'variable' | 'property' | 'operator' | 'plain';
}

export type Difficulty = 'beginner' | 'intermediate';
export type ProgrammingLanguage = 'javascript' | 'python';

export interface CodeExample {
  id: string;
  title: string;
  language: ProgrammingLanguage;
  difficulty: Difficulty;
  description: string;
  tags: string[];
  code: CodeToken[];
  estimatedTime: number;
} 