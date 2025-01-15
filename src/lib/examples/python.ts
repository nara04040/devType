import { CodeExample } from '@/types/typing';

// Example 1: Basic Function
export const basicFunction: CodeExample = {
  id: 'python-basic-function',
  title: '기본 함수',
  language: 'python',
  difficulty: 'beginner',
  description: 'Python의 기본적인 함수 선언과 문자열 반환 예제.',
  tags: ['function', 'string'],
  estimatedTime: 30,
  code: [
    { text: 'def', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'greet', type: 'function' },
    { text: '(', type: 'operator' },
    { text: 'name', type: 'variable' },
    { text: ':', type: 'operator' },
    { text: ' ', type: 'plain' },
    { text: 'str', type: 'type' },
    { text: ') -> ', type: 'operator' },
    { text: 'str', type: 'type' },
    { text: ':\n    ', type: 'plain' },
    { text: 'return', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'f"Hello, {', type: 'string' },
    { text: 'name', type: 'variable' },
    { text: '}"', type: 'string' },
  ]
};

// Example 2: Class Definition
export const classExample: CodeExample = {
  id: 'python-class-definition',
  title: '클래스 정의',
  language: 'python',
  difficulty: 'intermediate',
  description: 'Python의 기본 클래스 선언과 메서드 구현 예제.',
  tags: ['class', 'constructor'],
  estimatedTime: 60,
  code: [
    { text: 'class', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'User', type: 'type' },
    { text: ':\n    ', type: 'plain' },
    { text: 'def', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: '__init__', type: 'function' },
    { text: '(', type: 'operator' },
    { text: 'self', type: 'keyword' },
    { text: ', ', type: 'plain' },
    { text: 'name', type: 'variable' },
    { text: ':', type: 'operator' },
    { text: ' ', type: 'plain' },
    { text: 'str', type: 'type' },
    { text: ') -> ', type: 'operator' },
    { text: 'None', type: 'type' },
    { text: ':\n        ', type: 'plain' },
    { text: 'self', type: 'keyword' },
    { text: '.', type: 'operator' },
    { text: '_name', type: 'property' },
    { text: ' = ', type: 'operator' },
    { text: 'name', type: 'variable' },
    { text: '\n\n    ', type: 'plain' },
    { text: 'def', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'get_name', type: 'function' },
    { text: '(', type: 'operator' },
    { text: 'self', type: 'keyword' },
    { text: ')', type: 'operator' },
    { text: ' -> ', type: 'operator' },
    { text: 'str', type: 'type' },
    { text: ':\n        ', type: 'plain' },
    { text: 'return', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'self', type: 'keyword' },
    { text: '.', type: 'operator' },
    { text: '_name', type: 'property' },
  ]
};

// Example 3: List Comprehension
export const listComprehensionExample: CodeExample = {
  id: 'python-list-comprehension',
  title: '리스트 컴프리헨션',
  language: 'python',
  difficulty: 'beginner',
  description: 'Python의 리스트 컴프리헨션을 사용한 리스트 생성 예제.',
  tags: ['list', 'comprehension'],
  estimatedTime: 45,
  code: [
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
    { text: ']\n\n', type: 'operator' },
    { text: 'doubled', type: 'variable' },
    { text: ' = ', type: 'operator' },
    { text: '[', type: 'operator' },
    { text: 'num', type: 'variable' },
    { text: ' * ', type: 'operator' },
    { text: '2', type: 'number' },
    { text: ' ', type: 'plain' },
    { text: 'for', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'num', type: 'variable' },
    { text: ' ', type: 'plain' },
    { text: 'in', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'numbers', type: 'variable' },
    { text: ']', type: 'operator' },
  ]
};

// Example 4: Async/Await
export const asyncExample: CodeExample = {
  id: 'python-async-await',
  title: '비동기 함수',
  language: 'python',
  difficulty: 'intermediate',
  description: 'Python의 async/await를 사용한 비동기 처리 코드 예제.',
  tags: ['async', 'await', 'try-except'],
  estimatedTime: 90,
  code: [
    { text: 'import', type: 'keyword' },
    { text: ' aiohttp\n\n', type: 'plain' },
    { text: 'async', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'def', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'fetch_user', type: 'function' },
    { text: '(', type: 'operator' },
    { text: 'user_id', type: 'variable' },
    { text: ':', type: 'operator' },
    { text: ' ', type: 'plain' },
    { text: 'int', type: 'type' },
    { text: ')', type: 'operator' },
    { text: ' -> ', type: 'operator' },
    { text: 'dict', type: 'type' },
    { text: ':\n    ', type: 'plain' },
    { text: 'try', type: 'keyword' },
    { text: ':\n        ', type: 'plain' },
    { text: 'async', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'with', type: 'keyword' },
    { text: ' aiohttp.', type: 'plain' },
    { text: 'ClientSession', type: 'type' },
    { text: '() ', type: 'operator' },
    { text: 'as', type: 'keyword' },
    { text: ' session:\n            ', type: 'plain' },
    { text: 'async', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'with', type: 'keyword' },
    { text: ' session.', type: 'plain' },
    { text: 'get', type: 'function' },
    { text: '(', type: 'operator' },
    { text: 'f"/api/users/{', type: 'string' },
    { text: 'user_id', type: 'variable' },
    { text: '}"', type: 'string' },
    { text: ') ', type: 'operator' },
    { text: 'as', type: 'keyword' },
    { text: ' response:\n                ', type: 'plain' },
    { text: 'return', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'await', type: 'keyword' },
    { text: ' response.', type: 'plain' },
    { text: 'json', type: 'function' },
    { text: '()\n    ', type: 'operator' },
    { text: 'except', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'Exception', type: 'type' },
    { text: ' ', type: 'plain' },
    { text: 'as', type: 'keyword' },
    { text: ' e:\n        ', type: 'plain' },
    { text: 'print', type: 'function' },
    { text: '(', type: 'operator' },
    { text: 'f"Error: {', type: 'string' },
    { text: 'e', type: 'variable' },
    { text: '}"', type: 'string' },
    { text: ')', type: 'operator' },
  ]
};

// Export all Python examples
export const pythonExamples = [
  basicFunction,
  classExample,
  listComprehensionExample,
  asyncExample,
]; 