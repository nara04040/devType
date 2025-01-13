'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { vscodeDarkTheme } from '@/lib/editor/themes'
import { Bold } from 'lucide-react'

interface CodeToken {
  text: string;
  type: 'keyword' | 'string' | 'number' | 'comment' | 'function' | 'type' | 'variable' | 'property' | 'operator' | 'plain';
}

const sampleCode: CodeToken[] = [
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
];

// text 프로퍼티만 합쳐서 전체 텍스트 생성
const sampleText = sampleCode.map(token => token.text).join('');

// 특수문자 변환 함수
const renderSpecialChar = (char: string) => {
  switch (char) {
    case ' ':
      return (
        <span className="opacity-50 text-lg font-bold">·</span>
      );
    case '\t':
      return (
        <span className="opacity-50 text-lg">→</span>
      );
    case '\n':
      return (
        <span className="opacity-50 text-sm">↵{'\n'}</span>
      );
    default:
      return char;
  }
};

type CharStatus = 'correct' | 'incorrect' | 'current' | 'upcoming';

interface CharState {
  char: string;
  status: CharStatus;
  expected: string;
}

export default function TypingPractice() {
  const [text] = useState(sampleText)
  const [userInput, setUserInput] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [accuracy, setAccuracy] = useState(100)
  const [speed, setSpeed] = useState(0)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [charStates, setCharStates] = useState<CharState[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setUserInput(input);

    // 문자별 상태 업데이트
    const newCharStates = text.split('').map((char, index): CharState => {
      const inputChar = input[index];
      
      if (index >= input.length) {
        return { char, status: 'upcoming' as CharStatus, expected: char };
      }
      
      if (index === input.length - 1) {
        return { 
          char: inputChar,
          status: (inputChar === char ? 'correct' : 'incorrect') as CharStatus,
          expected: char
        };
      }
      
      return {
        char: inputChar,
        status: (inputChar === char ? 'correct' : 'incorrect') as CharStatus,
        expected: char
      };
    });

    setCharStates(newCharStates);

    if (!startTime) {
      setStartTime(Date.now())
    }

    if (input === text) {
      setEndTime(Date.now())
    }

    // Calculate accuracy
    const correctChars = input.split('').filter((char, index) => char === text[index]).length
    setAccuracy(Math.round((correctChars / input.length) * 100) || 100)
  }

  const calculateSpeed = useCallback(() => {
    if (startTime && endTime) {
      const timeInMinutes = (endTime - startTime) / 60000
      const wordsTyped = text.split(' ').length
      setSpeed(Math.round(wordsTyped / timeInMinutes))
    }
  }, [startTime, endTime, text])

  useEffect(() => {
    if (endTime) {
      calculateSpeed()
    }
  }, [endTime, calculateSpeed])

  const resetPractice = () => {
    setUserInput('')
    setStartTime(null)
    setEndTime(null)
    setAccuracy(100)
    setSpeed(0)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const renderText = () => {
    let currentIndex = 0;
    
    return sampleCode.map((token, tokenIndex) => {
      const tokenChars = token.text.split('').map((char, charIndex) => {
        const absoluteIndex = currentIndex + charIndex;
        const charState = charStates[absoluteIndex];
        const isCurrent = absoluteIndex === userInput.length; // 현재 입력 위치 확인
        
        if (isCurrent) {
          // 현재 입력 위치의 커서
          return (
            <span
              key={`${tokenIndex}-${charIndex}`}
              className="relative"
            >
              <span style={{ color: vscodeDarkTheme.upcoming }}>
                {renderSpecialChar(char)}
              </span>
              <span 
                className="absolute left-0 top-0 animate-cursor"
                style={{ 
                  backgroundColor: vscodeDarkTheme.cursor,
                  boxShadow: `0 0 2px ${vscodeDarkTheme.cursor}, 0 0 5px ${vscodeDarkTheme.cursor}`,
                  width: '2px',
                  height: char === '\n' ? '1.2em' : '100%'
                }}
              />
            </span>
          );
        }
        
        if (!charState || charState.status === 'upcoming') {
          return (
            <span
              key={`${tokenIndex}-${charIndex}`}
              style={{ color: vscodeDarkTheme.upcoming }}
            >
              {renderSpecialChar(char)}
            </span>
          );
        }

        const style = {
          color: charState.status === 'correct' 
            ? vscodeDarkTheme.syntax[token.type]
            : vscodeDarkTheme.typing.incorrect.text,
          backgroundColor: charState.status === 'incorrect' 
            ? vscodeDarkTheme.typing.incorrect.background 
            : undefined,
          borderBottom: charState.status === 'incorrect'
            ? `2px solid ${vscodeDarkTheme.typing.incorrect.border}`
            : undefined,
        };

        return (
          <span
            key={`${tokenIndex}-${charIndex}`}
            style={style}
          >
            {renderSpecialChar(charState.char)}
          </span>
        );
      });

      currentIndex += token.text.length;
      return <span key={tokenIndex}>{tokenChars}</span>;
    });
  };

  // Tab 키 이벤트 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      
      const cursorPosition = e.currentTarget.selectionStart;
      const expectedChar = text[cursorPosition];
      
      // 공백 2칸을 삽입
      const tabSpaces = '  '; // 2칸 공백
      const newValue = userInput.slice(0, cursorPosition) + tabSpaces + userInput.slice(cursorPosition);
      setUserInput(newValue);

      // 정확도 재계산
      const correctChars = newValue.split('').filter((char, index) => {
        // 탭 위치에서는 공백 2칸도 정확한 입력으로 처리
        if (text[index] === '\t' && newValue.slice(index, index + 2) === '  ') {
          return true;
        }
        return char === text[index];
      }).length;
      
      setAccuracy(Math.round((correctChars / newValue.length) * 100) || 100);
    }
  };

  // 현재 라인 계산 함수를 컴포넌트 내부로 이동
  const getCurrentLine = () => {
    const lines = text.split('\n');
    let currentPos = userInput.length;
    let lineNumber = 1;
    
    for (const line of lines) {
      if (currentPos <= line.length) {
        return lineNumber;
      }
      currentPos -= line.length + 1;
      lineNumber++;
    }
    return lineNumber;
  };


// 줄 번호 렌더링 컴포넌트
const LineNumbers = ({ text }: { text: string }) => {
  const lineCount = text.split('\n').length;
  
  return (
    <div 
      className="select-none pr-4 text-right border-r border-opacity-20"
      style={{ 
        color: vscodeDarkTheme.lineNumber,
        borderColor: vscodeDarkTheme.foreground,
        minWidth: '3rem'
      }}
    >
      {Array.from({ length: lineCount }, (_, i) => (
        <div 
          key={i + 1}
          className="leading-relaxed"
          style={{
            color: i + 1 === getCurrentLine() 
              ? vscodeDarkTheme.lineNumberActive 
              : vscodeDarkTheme.lineNumber
          }}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
};

  return (
    <div 
      className="min-h-screen flex items-center justify-center" 
      style={{ background: vscodeDarkTheme.background }}
    >
      <Card className="w-full max-w-3xl mx-auto backdrop-filter backdrop-blur-lg border rounded-xl shadow-xl"
        style={{ 
          backgroundColor: 'rgba(30, 30, 30, 0.9)',
          borderColor: '#404040' 
        }}
      >
        <CardHeader>
          <CardTitle 
            className="text-2xl font-bold text-center"
            style={{ color: vscodeDarkTheme.foreground }}
          >
            타자 연습
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-md relative"
            style={{ backgroundColor: 'rgba(47, 51, 55, 0.5)' }}
          >
            <div className="flex">
              <LineNumbers text={text} />
              <p className="text-lg font-medium whitespace-pre-wrap leading-relaxed flex-1 pl-4"
                style={{ color: vscodeDarkTheme.foreground }}
              >
                {renderText()}
              </p>
            </div>
            <textarea
              ref={inputRef}
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-default resize-none"
              autoFocus
              spellCheck={false}
            />
          </div>
          <div className="flex justify-between items-center"
            style={{ color: vscodeDarkTheme.foreground }}
          >
            <p>정확도: {accuracy}%</p>
            <p>속도: {speed} WPM</p>
          </div>
          <Button 
            onClick={resetPractice} 
            className="w-full hover:bg-opacity-70"
            style={{ 
              backgroundColor: vscodeDarkTheme.lineHighlight,
              color: vscodeDarkTheme.foreground 
            }}
          >
            다시 시작
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}