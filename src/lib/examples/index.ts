import { CodeExample } from '@/types/typing';
import { javascriptExamples } from './javascript';
import { pythonExamples } from './python';

// Export all examples
export const examples: CodeExample[] = [
  ...javascriptExamples,
  ...pythonExamples,
]; 