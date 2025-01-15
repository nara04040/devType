import { CodeExample } from '@/types/typing';

// Example 1: Basic Function
export const basicFunction: CodeExample = {
  id: 'js-basic-function',
  title: '기본 함수',
  language: 'javascript',
  difficulty: 'beginner',
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
};

// Example 2: Class Definition
export const classExample: CodeExample = {
  id: 'js-class-definition',
  title: '클래스 정의',
  language: 'javascript',
  difficulty: 'intermediate',
  description: '클래스 선언과 메서드 구현을 연습합니다.',
  tags: ['class', 'constructor', 'method'],
  estimatedTime: 60,
  code: [
    { text: 'class', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'User', type: 'type' },
    { text: ' ', type: 'plain' },
    { text: '{\n  ', type: 'plain' },
    { text: 'private', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'name', type: 'property' },
    { text: ':', type: 'operator' },
    { text: ' string', type: 'type' },
    { text: ';\n\n  ', type: 'plain' },
    { text: 'constructor', type: 'function' },
    { text: '(', type: 'operator' },
    { text: 'name', type: 'variable' },
    { text: ':', type: 'operator' },
    { text: ' string', type: 'type' },
    { text: ') ', type: 'operator' },
    { text: '{\n    ', type: 'plain' },
    { text: 'this', type: 'keyword' },
    { text: '.', type: 'operator' },
    { text: 'name', type: 'property' },
    { text: ' = ', type: 'operator' },
    { text: 'name', type: 'variable' },
    { text: ';\n  ', type: 'plain' },
    { text: '}\n\n  ', type: 'plain' },
    { text: 'getName', type: 'function' },
    { text: '(', type: 'operator' },
    { text: ')', type: 'operator' },
    { text: ' ', type: 'plain' },
    { text: '{\n    ', type: 'plain' },
    { text: 'return', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'this', type: 'keyword' },
    { text: '.', type: 'operator' },
    { text: 'name', type: 'property' },
    { text: ';\n  ', type: 'plain' },
    { text: '}\n}', type: 'plain' },
  ]
};

// Example 3: Array Methods
export const arrayExample: CodeExample = {
  id: 'js-array-methods',
  title: '배열 메서드',
  language: 'javascript',
  difficulty: 'beginner',
  description: '배열과 map 메서드 사용을 연습합니다.',
  tags: ['array', 'map', 'arrow-function'],
  estimatedTime: 45,
  code: [
    { text: 'const', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'numbers', type: 'variable' },
    { text: ' = ', type: 'operator' },
    { text: '[', type: 'operator' },
    { text: '1', type: 'number' },
    { text: ', ', type: 'plain' },
    { text: '2', type: 'number' },
    { text: ', ', type: 'plain' },
    { text: '3', type: 'number' },
    { text: ', ', type: 'plain' },
    { text: '4', type: 'number' },
    { text: ', ', type: 'plain' },
    { text: '5', type: 'number' },
    { text: ']', type: 'operator' },
    { text: ';\n\n', type: 'plain' },
    { text: 'const', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'doubled', type: 'variable' },
    { text: ' = ', type: 'operator' },
    { text: 'numbers', type: 'variable' },
    { text: '.', type: 'operator' },
    { text: 'map', type: 'function' },
    { text: '(', type: 'operator' },
    { text: 'num', type: 'variable' },
    { text: ' => ', type: 'operator' },
    { text: 'num', type: 'variable' },
    { text: ' * ', type: 'operator' },
    { text: '2', type: 'number' },
    { text: ')', type: 'operator' },
    { text: ';\n', type: 'plain' },
  ]
};

// Example 4: Async/Await
export const asyncExample: CodeExample = {
  id: 'js-async-await',
  title: '비동기 함수',
  language: 'javascript',
  difficulty: 'intermediate',
  description: 'async/await를 사용한 비동기 처리를 연습합니다.',
  tags: ['async', 'await', 'try-catch', 'fetch'],
  estimatedTime: 90,
  code: [
    { text: 'async', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'function', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'fetchUser', type: 'function' },
    { text: '(', type: 'operator' },
    { text: 'id', type: 'variable' },
    { text: ':', type: 'operator' },
    { text: ' number', type: 'type' },
    { text: ')', type: 'operator' },
    { text: ' ', type: 'plain' },
    { text: '{\n  ', type: 'plain' },
    { text: 'try', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: '{\n    ', type: 'plain' },
    { text: 'const', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'response', type: 'variable' },
    { text: ' = ', type: 'operator' },
    { text: 'await', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'fetch', type: 'function' },
    { text: '(', type: 'operator' },
    { text: '`/api/users/${', type: 'string' },
    { text: 'id', type: 'variable' },
    { text: '}`', type: 'string' },
    { text: ')', type: 'operator' },
    { text: ';\n    ', type: 'plain' },
    { text: 'return', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'response', type: 'variable' },
    { text: '.', type: 'operator' },
    { text: 'json', type: 'function' },
    { text: '(', type: 'operator' },
    { text: ')', type: 'operator' },
    { text: ';\n  ', type: 'plain' },
    { text: '} ', type: 'plain' },
    { text: 'catch', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: '(', type: 'operator' },
    { text: 'error', type: 'variable' },
    { text: ')', type: 'operator' },
    { text: ' ', type: 'plain' },
    { text: '{\n    ', type: 'plain' },
    { text: 'console', type: 'variable' },
    { text: '.', type: 'operator' },
    { text: 'error', type: 'function' },
    { text: '(', type: 'operator' },
    { text: 'error', type: 'variable' },
    { text: ')', type: 'operator' },
    { text: ';\n  ', type: 'plain' },
    { text: '}\n}', type: 'plain' },
  ]
};

// Export all JavaScript examples
export const javascriptExamples: CodeExample[] = [
  basicFunction,
  classExample,
  arrayExample,
  asyncExample,
]; 