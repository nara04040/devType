import { CodeExample, Difficulty, ProgrammingLanguage, TokenType } from '@/types/typing';

export const advancedJavaScriptExamples: CodeExample[] = [
  {
    id: 'js_adv_1',
    title: '비동기 제어 패턴',
    difficulty: 'advanced' as Difficulty,
    language: 'javascript' as ProgrammingLanguage,
    description: 'Promise와 async/await를 활용한 비동기 처리 패턴',
    estimatedTime: 180,
    tags: ['async/await', 'Promise', 'error handling'],
    code: [
      { type: 'keyword', text: 'const ' },
      { type: 'function', text: 'sequentialAsync ' },
      { type: 'operator', text: '= ' },
      { type: 'keyword', text: 'async ' },
      { type: 'operator', text: '(' },
      { type: 'variable', text: 'tasks' },
      { type: 'operator', text: ') => {\n  ' },
      { type: 'keyword', text: 'const ' },
      { type: 'variable', text: 'results ' },
      { type: 'operator', text: '= [];\n\n  ' },
      { type: 'keyword', text: 'for ' },
      { type: 'operator', text: '(' },
      { type: 'keyword', text: 'const ' },
      { type: 'variable', text: 'task ' },
      { type: 'keyword', text: 'of ' },
      { type: 'variable', text: 'tasks' },
      { type: 'operator', text: ') {\n    ' },
      { type: 'keyword', text: 'try ' },
      { type: 'operator', text: '{\n      ' },
      { type: 'keyword', text: 'const ' },
      { type: 'variable', text: 'result ' },
      { type: 'operator', text: '= ' },
      { type: 'keyword', text: 'await ' },
      { type: 'variable', text: 'task' },
      { type: 'operator', text: '();\n      ' },
      { type: 'variable', text: 'results' },
      { type: 'operator', text: '.' },
      { type: 'function', text: 'push' },
      { type: 'operator', text: '(' },
      { type: 'variable', text: 'result' },
      { type: 'operator', text: ');\n    } ' },
      { type: 'keyword', text: 'catch ' },
      { type: 'operator', text: '(' },
      { type: 'variable', text: 'error' },
      { type: 'operator', text: ') {\n      ' },
      { type: 'variable', text: 'console' },
      { type: 'operator', text: '.' },
      { type: 'function', text: 'error' },
      { type: 'operator', text: '(' },
      { type: 'string', text: "'Task failed:'" },
      { type: 'operator', text: ', ' },
      { type: 'variable', text: 'error' },
      { type: 'operator', text: ');\n    }\n  }\n\n  ' },
      { type: 'keyword', text: 'return ' },
      { type: 'variable', text: 'results' },
      { type: 'operator', text: ';\n}' },
    ]
  },
  {
    id: 'js_adv_2',
    title: '프록시 패턴 구현',
    difficulty: 'advanced' as Difficulty,
    language: 'javascript' as ProgrammingLanguage,
    description: 'Proxy를 사용한 객체 접근 제어 및 유효성 검사',
    estimatedTime: 180,
    tags: ['Proxy', 'validation', 'design pattern'],
    code: [
      { type: 'keyword', text: 'const ' },
      { type: 'function', text: 'createValidatedObject ' },
      { type: 'operator', text: '= (' },
      { type: 'variable', text: 'schema' },
      { type: 'operator', text: ') => {\n  ' },
      { type: 'keyword', text: 'return ' },
      { type: 'variable', text: 'target ' },
      { type: 'operator', text: '=> ' },
      { type: 'keyword', text: 'new ' },
      { type: 'function', text: 'Proxy' },
      { type: 'operator', text: '(' },
      { type: 'variable', text: 'target' },
      { type: 'operator', text: ', {\n    ' },
      { type: 'function', text: 'set' },
      { type: 'operator', text: '(' },
      { type: 'variable', text: 'obj, prop, value' },
      { type: 'operator', text: ') {\n      ' },
      { type: 'keyword', text: 'const ' },
      { type: 'variable', text: 'validator ' },
      { type: 'operator', text: '= ' },
      { type: 'variable', text: 'schema' },
      { type: 'operator', text: '[' },
      { type: 'variable', text: 'prop' },
      { type: 'operator', text: '];\n\n      ' },
      { type: 'keyword', text: 'if ' },
      { type: 'operator', text: '(' },
      { type: 'operator', text: '!' },
      { type: 'variable', text: 'validator' },
      { type: 'operator', text: ') {\n        ' },
      { type: 'keyword', text: 'throw ' },
      { type: 'keyword', text: 'new ' },
      { type: 'function', text: 'Error' },
      { type: 'operator', text: '(' },
      { type: 'string', text: '`Invalid property: ${prop}`' },
      { type: 'operator', text: ');\n      }\n\n      ' },
      { type: 'keyword', text: 'if ' },
      { type: 'operator', text: '(' },
      { type: 'operator', text: '!' },
      { type: 'variable', text: 'validator' },
      { type: 'operator', text: '(' },
      { type: 'variable', text: 'value' },
      { type: 'operator', text: ')) {\n        ' },
      { type: 'keyword', text: 'throw ' },
      { type: 'keyword', text: 'new ' },
      { type: 'function', text: 'Error' },
      { type: 'operator', text: '(' },
      { type: 'string', text: '`Invalid value for ${prop}: ${value}`' },
      { type: 'operator', text: ');\n      }\n\n      ' },
      { type: 'variable', text: 'obj' },
      { type: 'operator', text: '[' },
      { type: 'variable', text: 'prop' },
      { type: 'operator', text: '] = ' },
      { type: 'variable', text: 'value' },
      { type: 'operator', text: ';\n      ' },
      { type: 'keyword', text: 'return ' },
      { type: 'variable', text: 'true' },
      { type: 'operator', text: ';\n    }\n  });\n}' },
    ]
  }
]; 