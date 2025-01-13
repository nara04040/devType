export interface CodeToken {
  text: string;
  type: 'keyword' | 'string' | 'number' | 'comment' | 'function' | 'type' | 'variable' | 'property' | 'operator' | 'plain';
} 