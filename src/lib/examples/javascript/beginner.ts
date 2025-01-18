import { CodeExample, Difficulty, ProgrammingLanguage } from '@/types/typing';

export const beginnerJavaScriptExamples: CodeExample[] = [
  {
    id: 'js-basic-function',
    title: '기본 함수',
    language: 'javascript' as ProgrammingLanguage,
    difficulty: 'beginner' as Difficulty,
    description: '기본적인 함수 선언과 문자열 반환을 연습합니다.',
    tags: ['function', 'string', 'return'],
    estimatedTime: 30,
    code: [
      { text: 'function', type: 'keyword' },
      { text: ' ', type: 'plain' },
      { text: 'greet', type: 'function' },
      { text: '(', type: 'operator' },
      { text: 'name', type: 'variable' },
      { text: ':', type: 'operator' },
      { text: ' string', type: 'type' },
      { text: ') ', type: 'operator' },
      { text: '{\n  ', type: 'plain' },
      { text: 'return', type: 'keyword' },
      { text: ' ', type: 'plain' },
      { text: '"Hello, "', type: 'string' },
      { text: ' + ', type: 'operator' },
      { text: 'name', type: 'variable' },
      { text: ';\n}', type: 'plain' },
    ]
  },
  {
    id: 'js-variables',
    title: '변수 선언',
    language: 'javascript' as ProgrammingLanguage,
    difficulty: 'beginner' as Difficulty,
    description: '변수 선언과 할당을 연습합니다. (let, const)',
    tags: ['variables', 'let', 'const'],
    estimatedTime: 30,
    code: [
      { text: 'let', type: 'keyword' },
      { text: ' ', type: 'plain' },
      { text: 'count', type: 'variable' },
      { text: ' = ', type: 'operator' },
      { text: '0', type: 'number' },
      { text: ';\n', type: 'plain' },
      { text: 'const', type: 'keyword' },
      { text: ' ', type: 'plain' },
      { text: 'PI', type: 'variable' },
      { text: ' = ', type: 'operator' },
      { text: '3.14', type: 'number' },
      { text: ';\n\n', type: 'plain' },
      { text: 'count', type: 'variable' },
      { text: ' = ', type: 'operator' },
      { text: 'count', type: 'variable' },
      { text: ' + ', type: 'operator' },
      { text: '1', type: 'number' },
      { text: ';', type: 'plain' },
    ]
  },
  {
    id: 'js-conditional',
    title: '조건문',
    language: 'javascript' as ProgrammingLanguage,
    difficulty: 'beginner' as Difficulty,
    description: 'if-else 조건문 사용을 연습합니다.',
    tags: ['if', 'else', 'condition'],
    estimatedTime: 40,
    code: [
      { text: 'const', type: 'keyword' },
      { text: ' ', type: 'plain' },
      { text: 'age', type: 'variable' },
      { text: ' = ', type: 'operator' },
      { text: '18', type: 'number' },
      { text: ';\n\n', type: 'plain' },
      { text: 'if', type: 'keyword' },
      { text: ' (', type: 'operator' },
      { text: 'age', type: 'variable' },
      { text: ' >= ', type: 'operator' },
      { text: '18', type: 'number' },
      { text: ') {\n  ', type: 'plain' },
      { text: 'console', type: 'variable' },
      { text: '.', type: 'operator' },
      { text: 'log', type: 'function' },
      { text: '(', type: 'operator' },
      { text: '"성인입니다."', type: 'string' },
      { text: ')', type: 'operator' },
      { text: ';\n} ', type: 'plain' },
      { text: 'else', type: 'keyword' },
      { text: ' {\n  ', type: 'plain' },
      { text: 'console', type: 'variable' },
      { text: '.', type: 'operator' },
      { text: 'log', type: 'function' },
      { text: '(', type: 'operator' },
      { text: '"미성년자입니다."', type: 'string' },
      { text: ')', type: 'operator' },
      { text: ';\n}', type: 'plain' },
    ]
  },
  {
    id: 'js-array-methods-basic',
    title: '배열 메서드',
    language: 'javascript' as ProgrammingLanguage,
    difficulty: 'beginner' as Difficulty,
    description: '기본적인 배열 메서드(push, pop) 사용을 연습합니다.',
    tags: ['array', 'push', 'pop'],
    estimatedTime: 35,
    code: [
      { text: 'const', type: 'keyword' },
      { text: ' ', type: 'plain' },
      { text: 'stack', type: 'variable' },
      { text: ' = [', type: 'operator' },
      { text: '1', type: 'number' },
      { text: ', ', type: 'plain' },
      { text: '2', type: 'number' },
      { text: '];\n\n', type: 'plain' },
      { text: 'stack', type: 'variable' },
      { text: '.', type: 'operator' },
      { text: 'push', type: 'function' },
      { text: '(', type: 'operator' },
      { text: '3', type: 'number' },
      { text: ')', type: 'operator' },
      { text: ';\n', type: 'plain' },
      { text: 'const', type: 'keyword' },
      { text: ' ', type: 'plain' },
      { text: 'last', type: 'variable' },
      { text: ' = ', type: 'operator' },
      { text: 'stack', type: 'variable' },
      { text: '.', type: 'operator' },
      { text: 'pop', type: 'function' },
      { text: '()', type: 'operator' },
      { text: ';', type: 'plain' },
    ]
  }
]; 