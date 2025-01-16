import { CodeExample, Difficulty, ProgrammingLanguage, TokenType } from '@/types/typing';

export const advancedPythonExamples: CodeExample[] = [
  {
    id: 'py_adv_1',
    title: '데코레이터 패턴 구현',
    difficulty: 'advanced' as Difficulty,
    language: 'python' as ProgrammingLanguage,
    description: '함수와 클래스 데코레이터를 활용한 메모이제이션과 로깅 구현',
    estimatedTime: 180,
    tags: ['decorator', 'memoization', 'logging'],
    code: [
      { type: 'keyword', text: 'from ' },
      { type: 'variable', text: 'functools ' },
      { type: 'keyword', text: 'import ' },
      { type: 'variable', text: 'wraps\n' },
      { type: 'keyword', text: 'from ' },
      { type: 'variable', text: 'typing ' },
      { type: 'keyword', text: 'import ' },
      { type: 'variable', text: 'Callable, Any\n\n' },
      { type: 'keyword', text: 'def ' },
      { type: 'function', text: 'memoize' },
      { type: 'operator', text: '(' },
      { type: 'variable', text: 'func: Callable' },
      { type: 'operator', text: ') -> ' },
      { type: 'variable', text: 'Callable' },
      { type: 'operator', text: ':\n    ' },
      { type: 'variable', text: 'cache ' },
      { type: 'operator', text: '= {}\n\n    ' },
      { type: 'operator', text: '@' },
      { type: 'function', text: 'wraps' },
      { type: 'operator', text: '(' },
      { type: 'variable', text: 'func' },
      { type: 'operator', text: ')\n    ' },
      { type: 'keyword', text: 'def ' },
      { type: 'function', text: 'wrapper' },
      { type: 'operator', text: '(*' },
      { type: 'variable', text: 'args' },
      { type: 'operator', text: ', **' },
      { type: 'variable', text: 'kwargs' },
      { type: 'operator', text: ') -> ' },
      { type: 'variable', text: 'Any' },
      { type: 'operator', text: ':\n        ' },
      { type: 'variable', text: 'key ' },
      { type: 'operator', text: '= ' },
      { type: 'function', text: 'str' },
      { type: 'operator', text: '((' },
      { type: 'variable', text: 'args' },
      { type: 'operator', text: ', ' },
      { type: 'function', text: 'tuple' },
      { type: 'operator', text: '(' },
      { type: 'function', text: 'sorted' },
      { type: 'operator', text: '(' },
      { type: 'variable', text: 'kwargs' },
      { type: 'operator', text: '.' },
      { type: 'function', text: 'items' },
      { type: 'operator', text: '()))))\n\n        ' },
      { type: 'keyword', text: 'if ' },
      { type: 'variable', text: 'key ' },
      { type: 'keyword', text: 'not in ' },
      { type: 'variable', text: 'cache' },
      { type: 'operator', text: ':\n            ' },
      { type: 'variable', text: 'cache' },
      { type: 'operator', text: '[' },
      { type: 'variable', text: 'key' },
      { type: 'operator', text: '] = ' },
      { type: 'variable', text: 'func' },
      { type: 'operator', text: '(*' },
      { type: 'variable', text: 'args' },
      { type: 'operator', text: ', **' },
      { type: 'variable', text: 'kwargs' },
      { type: 'operator', text: ')\n\n        ' },
      { type: 'keyword', text: 'return ' },
      { type: 'variable', text: 'cache' },
      { type: 'operator', text: '[' },
      { type: 'variable', text: 'key' },
      { type: 'operator', text: ']\n\n    ' },
      { type: 'keyword', text: 'return ' },
      { type: 'variable', text: 'wrapper\n' },
    ]
  },
  {
    id: 'py_adv_2',
    title: '비동기 컨텍스트 매니저',
    difficulty: 'advanced' as Difficulty,
    language: 'python' as ProgrammingLanguage,
    description: 'async/await를 활용한 비동기 컨텍스트 매니저 구현',
    estimatedTime: 180,
    tags: ['async/await', 'context manager', 'resource management'],
    code: [
      { type: 'keyword', text: 'from ' },
      { type: 'variable', text: 'types ' },
      { type: 'keyword', text: 'import ' },
      { type: 'variable', text: 'TracebackType\n' },
      { type: 'keyword', text: 'from ' },
      { type: 'variable', text: 'typing ' },
      { type: 'keyword', text: 'import ' },
      { type: 'variable', text: 'Optional, Type\n\n' },
      { type: 'keyword', text: 'class ' },
      { type: 'type', text: 'AsyncResource' },
      { type: 'operator', text: ':\n    ' },
      { type: 'keyword', text: 'async def ' },
      { type: 'function', text: '__aenter__' },
      { type: 'operator', text: '(' },
      { type: 'keyword', text: 'self' },
      { type: 'operator', text: '):\n        ' },
      { type: 'keyword', text: 'await ' },
      { type: 'keyword', text: 'self' },
      { type: 'operator', text: '.' },
      { type: 'function', text: '_connect' },
      { type: 'operator', text: '()\n        ' },
      { type: 'keyword', text: 'return ' },
      { type: 'keyword', text: 'self\n\n    ' },
      { type: 'keyword', text: 'async def ' },
      { type: 'function', text: '__aexit__' },
      { type: 'operator', text: '(' },
      { type: 'keyword', text: 'self' },
      { type: 'operator', text: ',\n        ' },
      { type: 'variable', text: 'exc_type: Optional' },
      { type: 'operator', text: '[' },
      { type: 'type', text: 'Type' },
      { type: 'operator', text: '[' },
      { type: 'type', text: 'BaseException' },
      { type: 'operator', text: ']] = ' },
      { type: 'keyword', text: 'None' },
      { type: 'operator', text: ',\n        ' },
      { type: 'variable', text: 'exc_val: Optional' },
      { type: 'operator', text: '[' },
      { type: 'type', text: 'BaseException' },
      { type: 'operator', text: '] = ' },
      { type: 'keyword', text: 'None' },
      { type: 'operator', text: ',\n        ' },
      { type: 'variable', text: 'exc_tb: Optional' },
      { type: 'operator', text: '[' },
      { type: 'type', text: 'TracebackType' },
      { type: 'operator', text: '] = ' },
      { type: 'keyword', text: 'None' },
      { type: 'operator', text: ') -> ' },
      { type: 'keyword', text: 'None' },
      { type: 'operator', text: ':\n        ' },
      { type: 'keyword', text: 'await ' },
      { type: 'keyword', text: 'self' },
      { type: 'operator', text: '.' },
      { type: 'function', text: '_cleanup' },
      { type: 'operator', text: '()\n' },
    ]
  }
]; 