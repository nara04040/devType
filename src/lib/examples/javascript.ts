import { CodeExample } from '@/types/typing';
import { beginnerJavaScriptExamples } from './javascript/beginner';
import { intermediateJavaScriptExamples } from './javascript/intermediate';
import { advancedJavaScriptExamples } from './javascript/advanced';

// Export all JavaScript examples
export const javascriptExamples: CodeExample[] = [
  ...beginnerJavaScriptExamples,
  ...intermediateJavaScriptExamples,
  ...advancedJavaScriptExamples,
]; 