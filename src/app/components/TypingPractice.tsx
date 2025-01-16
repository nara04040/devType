'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { vscodeDarkTheme } from '@/lib/editor/themes'
import { CodeToken, Difficulty, ProgrammingLanguage, TypingStats } from '@/types/typing'
import { examples } from '@/lib/examples'
import { motion, AnimatePresence } from 'framer-motion';
import ResultScreen from '@/components/ui/result/ResultScreen'
import SettingsPanel from '@/components/ui/settings/SettingsPanel'
import { soundManager } from '@/lib/utils/sound';

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
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [text, setText] = useState(examples[0].code.map(token => token.text).join(''));
  const [currentExample, setCurrentExample] = useState(examples[0]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('beginner');
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>('javascript');
  const [filteredExamples, setFilteredExamples] = useState(examples);
  const [userInput, setUserInput] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [accuracy, setAccuracy] = useState(100)
  const [realtimeAccuracy, setRealtimeAccuracy] = useState(100)
  const [totalKeystrokes, setTotalKeystrokes] = useState(0)
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0)
  const [speed, setSpeed] = useState(0)
  const [averageWPM, setAverageWPM] = useState(0)
  const [realtimeWPM, setRealtimeWPM] = useState(0)
  const [progress, setProgress] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [charStates, setCharStates] = useState<CharState[]>([])
  const wpmUpdateInterval = useRef<NodeJS.Timeout | null>(null)
  const timeInterval = useRef<NodeJS.Timeout | null>(null)
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const ACCURACY_THRESHOLD = 90;
  const [showResults, setShowResults] = useState(false);
  const [completedExamples, setCompletedExamples] = useState<TypingStats[]>([]);
  const [fontSize, setFontSize] = useState<number>(16);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(50);

  // Filter examples by difficulty and language
  useEffect(() => {
    const filtered = examples.filter(example => 
      example.difficulty === selectedDifficulty && 
      example.language === selectedLanguage
    );
    setFilteredExamples(filtered);
    // Reset to first example of new filter if current example doesn't match
    if (currentExample.difficulty !== selectedDifficulty || 
        currentExample.language !== selectedLanguage) {
      const firstExample = filtered[0];
      setCurrentExampleIndex(0);
      setCurrentExample(firstExample);
      setText(firstExample.code.map(token => token.text).join(''));
      resetPractice();
    }
  }, [selectedDifficulty, selectedLanguage, currentExample.difficulty, currentExample.language]);

  // Calculate words in code context
  const calculateWords = (input: string): number => {
    if (!input) return 0;
    // Split by whitespace and filter out empty strings
    const words = input.trim().split(/[\s\n\t]+/).filter(word => word.length > 0);
    return words.length;
  }

  // Calculate real-time WPM
  const calculateRealtimeWPM = useCallback(() => {
    if (!startTime) return 0;
    
    const currentTime = Date.now();
    const timeInMinutes = (currentTime - startTime) / 60000;
    const wordsTyped = calculateWords(userInput);
    
    return Math.round(wordsTyped / timeInMinutes) || 0;
  }, [startTime, userInput]);

  // Update real-time WPM
  useEffect(() => {
    if (startTime && !endTime) {
      wpmUpdateInterval.current = setInterval(() => {
        setRealtimeWPM(calculateRealtimeWPM());
      }, 1000);
    }

    return () => {
      if (wpmUpdateInterval.current) {
        clearInterval(wpmUpdateInterval.current);
      }
    };
  }, [startTime, endTime, calculateRealtimeWPM]);

  // Load and update average WPM
  useEffect(() => {
    const loadAverageWPM = (setWPM: (wpm: number) => void) => {
      const savedWPMs = JSON.parse(localStorage.getItem('typingWPMs') || '[]');
      if (savedWPMs.length > 0) {
        const average = savedWPMs.reduce((a: number, b: number) => a + b, 0) / savedWPMs.length;
        setWPM(Math.round(average));
      }
    };

    loadAverageWPM(setAverageWPM);
  }, []);

  // Calculate accuracy considering special characters
  const calculateAccuracy = useCallback((input: string, target: string, start: number, end: number) => {
    let correct = 0;
    let total = 0;

    for (let i = start; i < end && i < target.length; i++) {
      total++;
      if (target[i] === '\t' && input.slice(i, i + 2) === '  ') {
        correct++;
        continue;
      }
      if (input[i] === target[i]) {
        correct++;
      }
    }

    return total === 0 ? 100 : Math.round((correct / total) * 100);
  }, []);

  // 현재 라인 계산 함수 개선
  const getCurrentLine = useCallback(() => {
    if (!text || !userInput) return 1;  // 기본값 반환
    
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
    return Math.min(lineNumber, lines.length);  // 최대 라인 수를 넘지 않도록
  }, [text, userInput]);

  // Update real-time accuracy for the current line
  const updateRealtimeAccuracy = useCallback(() => {
    const currentLine = getCurrentLine();
    const lines = text.split('\n');
    
    // 안전성 검사 추가
    if (currentLine <= 0 || currentLine > lines.length) {
      setRealtimeAccuracy(100);
      return;
    }

    let startPos = 0;
    for (let i = 0; i < currentLine - 1; i++) {
      if (i >= lines.length) break;  // 배열 범위 체크
      startPos += lines[i].length + 1;
    }

    // 현재 라인이 유효한지 확인
    if (currentLine <= lines.length) {
      const currentLineEnd = startPos + lines[currentLine - 1].length;
      const currentAccuracy = calculateAccuracy(
        userInput,
        text,
        startPos,
        Math.min(userInput.length, currentLineEnd)
      );
      setRealtimeAccuracy(currentAccuracy);
    } else {
      setRealtimeAccuracy(100);
    }
  }, [text, userInput, getCurrentLine, calculateAccuracy]);

  // Update accuracy stats
  useEffect(() => {
    if (startTime && !endTime) {
      updateRealtimeAccuracy();
    }
  }, [userInput, startTime, endTime, updateRealtimeAccuracy]);

  // Check completion criteria
  const checkCompletionCriteria = useCallback(() => {
    // 모든 텍스트가 입력되었는지 확인
    const isTextComplete = userInput === text;
    // 정확도가 기준값을 넘는지 확인
    const isAccuracyMet = accuracy >= ACCURACY_THRESHOLD;
    
    return isTextComplete && isAccuracyMet;
  }, [userInput, text, accuracy]);

  // Handle example completion
  const handleExampleCompletion = useCallback(() => {
    if (soundManager && soundEnabled) {
      soundManager.playComplete();
    }

    // 텍스트 길이가 같을 때만 완료 처리 (정확도와 관계없이)
    if (userInput.length === text.length) {
      setEndTime(Date.now());
      setShowCompletionMessage(true);
      const finalWPM = calculateRealtimeWPM();
      
      // Save stats
      const stats: TypingStats = {
        wpm: finalWPM,
        accuracy,
        time: elapsedTime,
        keystrokes: totalKeystrokes,
        correctKeystrokes,
        exampleId: currentExample.id,
        timestamp: Date.now(),
      };
      
      setCompletedExamples(prev => [...prev, stats]);

      // 7개 이상 완료시 결과 화면 표시
      if (completedExamples.length + 1 >= 7) {
        localStorage.setItem('typingStats', JSON.stringify([...completedExamples, stats]));
        localStorage.setItem('typingWPMs', JSON.stringify([...completedExamples, stats].map(s => s.wpm)));
        setShowResults(true);
        return;
      }

      setShowCompletionMessage(true);
    }
  }, [text.length, userInput.length, calculateRealtimeWPM, accuracy, elapsedTime, totalKeystrokes, correctKeystrokes, currentExample.id, soundEnabled, completedExamples]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // 완료 메시지가 표시 중일 때는 입력 무시
    if (showCompletionMessage) return;
    
    const input = e.target.value;
    const prevInput = userInput;
    setUserInput(input);

    // Update total keystrokes
    setTotalKeystrokes(prev => prev + 1);

    // Check if the new character is correct
    if (input.length > prevInput.length) {
      const newCharIndex = input.length - 1;
      if (input[newCharIndex] === text[newCharIndex]) {
        setCorrectKeystrokes(prev => prev + 1);
      }
    }

    // Calculate overall accuracy
    const overallAccuracy = calculateAccuracy(input, text, 0, input.length);
    setAccuracy(overallAccuracy);

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

    // Check completion
    if (input.length === text.length && input === text) {
      handleExampleCompletion();
    }
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

  // Update elapsed time
  useEffect(() => {
    if (startTime && !endTime) {
      timeInterval.current = setInterval(() => {
        const currentTime = Date.now();
        setElapsedTime(Math.floor((currentTime - startTime) / 1000));
      }, 1000);
    }

    return () => {
      if (timeInterval.current) {
        clearInterval(timeInterval.current);
      }
    };
  }, [startTime, endTime]);

  // Format elapsed time
  const formatElapsedTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const resetPractice = useCallback(() => {
    setUserInput('')
    setStartTime(null)
    setEndTime(null)
    setAccuracy(100)
    setRealtimeAccuracy(100)
    setTotalKeystrokes(0)
    setCorrectKeystrokes(0)
    setSpeed(0)
    setRealtimeWPM(0)
    setProgress(0)
    setElapsedTime(0)
    setShowCompletionMessage(false)
    // 초기 charStates 설정
    setCharStates(text.split('').map((char): CharState => ({
      char,
      status: 'upcoming',
      expected: char
    })));
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [text]);

  const renderText = () => {
    let currentIndex = 0;
    
    return currentExample.code.map((token: CodeToken, tokenIndex: number) => {
      const tokenChars = token.text.split('').map((char: string, charIndex: number) => {
        const absoluteIndex = currentIndex + charIndex;
        const charState = charStates[absoluteIndex];
        const isCurrent = absoluteIndex === userInput.length;
        
        if (isCurrent) {
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

  // 다음 예제로 이동하는 함수를 먼저 선언
  const handleNextExample = useCallback(() => {
    const nextIndex = (currentExampleIndex + 1) % filteredExamples.length;
    const nextExample = filteredExamples[nextIndex];
    const nextText = nextExample.code.map(token => token.text).join('');
    
    setCurrentExampleIndex(nextIndex);
    setCurrentExample(nextExample);
    setText(nextText);
    setCharStates(nextText.split('').map((char): CharState => ({
      char,
      status: 'upcoming',
      expected: char
    })));
    resetPractice();
    setShowCompletionMessage(false);
  }, [currentExampleIndex, filteredExamples, resetPractice]);

  // Tab 키 이벤트 처리
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 완료 메시지가 표시 중일 때는 Enter만 처리
    if (showCompletionMessage) {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleNextExample();
      }
      return;
    }

    // 입력 길이가 예제 텍스트 길이를 초과하면 추가 입력 방지
    if (userInput.length >= text.length && event.key !== 'Enter') {
      event.preventDefault();
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      // 텍스트 길이가 같으면 완료 처리 (정확도와 관계없이)
      if (userInput.length === text.length) {
        handleExampleCompletion();
        return;
      }
      // 일반적인 Enter 키 입력 처리
      const newChar = '\n';
      const expectedChar = text[userInput.length];
      if (newChar === expectedChar) {
        setUserInput(prev => prev + newChar);
        if (soundManager && soundEnabled) {
          soundManager.playKeyPress();
        }
      } else {
        if (soundManager && soundEnabled) {
          soundManager.playError();
        }
      }
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      
      const cursorPosition = (event.currentTarget as HTMLTextAreaElement).selectionStart || 0;
      const expectedChar = text[cursorPosition];
      
      // 2칸 공백으로 탭 처리
      const tabSpaces = '  ';
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

      // 소리 효과
      if (soundManager && soundEnabled) {
        if (expectedChar === '\t') {
          soundManager.playKeyPress();
        } else {
          soundManager.playError();
        }
      }
      return;
    }

    if (event.key.length === 1) {
      const expectedChar = text[userInput.length];
      if (event.key === expectedChar) {
        if (soundManager && soundEnabled) {
          soundManager.playKeyPress();
        }
      } else {
        if (soundManager && soundEnabled) {
          soundManager.playError();
        }
      }
    }
  }, [userInput, text, soundEnabled, handleExampleCompletion, showCompletionMessage, handleNextExample]);

  // 줄 번호 렌더링 컴포넌트
  const LineNumbers = ({ text, getCurrentLine }: { text: string; getCurrentLine: () => number }) => {
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

  // Calculate progress percentage
  const calculateProgress = useCallback(() => {
    const totalLength = text.length;
    const currentLength = Math.min(userInput.length, totalLength); // 진행률이 100%를 초과하지 않도록 제한
    return Math.round((currentLength / totalLength) * 100);
  }, [text.length, userInput.length]);

  // Calculate estimated time remaining
  // const calculateEstimatedTimeRemaining = useCallback(() => {
  //   if (!startTime || userInput.length === 0) return null;
    
  //   const elapsedTime = Date.now() - startTime;
  //   const progress = userInput.length / text.length;
  //   if (progress === 0) return null;
    
  //   const estimatedTotalTime = elapsedTime / progress;
  //   const remainingTime = estimatedTotalTime - elapsedTime;
  //   return Math.round(remainingTime / 1000); // Convert to seconds
  // }, [startTime, text.length, userInput.length]);

  // Update progress and estimated time
  useEffect(() => {
    if (startTime && !endTime) {
      setProgress(calculateProgress());
    }
  }, [userInput, startTime, endTime, calculateProgress]);

  // Handle example transition
  useEffect(() => {
    if (showCompletionMessage) {
      const transitionTimer = setTimeout(() => {
        const nextIndex = (currentExampleIndex + 1) % filteredExamples.length;
        const nextExample = filteredExamples[nextIndex];
        const nextText = nextExample.code.map(token => token.text).join('');
        
        // Start transition
        setTimeout(() => {
          setCurrentExampleIndex(nextIndex);
          setCurrentExample(nextExample);
          setText(nextText);
          // 새 예제의 초기 charStates 설정
          setCharStates(nextText.split('').map((char): CharState => ({
            char,
            status: 'upcoming',
            expected: char
          })));
          resetPractice();
          setShowCompletionMessage(false);
        }, 500);
      }, 2000);

      return () => clearTimeout(transitionTimer);
    }
  }, [showCompletionMessage, currentExampleIndex, filteredExamples, resetPractice]);

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('typingSettings');
    if (savedSettings) {
      const { fontSize: savedFontSize, soundEnabled: savedSoundEnabled, volume: savedVolume } = JSON.parse(savedSettings);
      setFontSize(savedFontSize);
      setSoundEnabled(savedSoundEnabled);
      setVolume(savedVolume);
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = useCallback(() => {
    localStorage.setItem('typingSettings', JSON.stringify({
      fontSize,
      soundEnabled,
      volume
    }));
  }, [fontSize, soundEnabled, volume]);

  // Update settings
  useEffect(() => {
    saveSettings();
  }, [fontSize, soundEnabled, volume, saveSettings]);

  // Handle settings changes
  const handleFontSizeChange = (value: number) => {
    setFontSize(value);
  };

  const handleSoundEnabledChange = (enabled: boolean) => {
    setSoundEnabled(enabled);
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
  };

  // Add font size style to code display
  const codeStyle = {
    fontSize: `${fontSize}px`,
    lineHeight: '1.5',
    fontFamily: 'var(--font-geist-mono)',
  };

  // Update sound settings
  useEffect(() => {
    if (soundManager) {
      soundManager.setEnabled(soundEnabled);
      soundManager.setVolume(volume);
    }
  }, [soundEnabled, volume]);

  return (
    <div className="min-h-screen" style={{ background: vscodeDarkTheme.background }}>
      <div className="container mx-auto min-h-screen flex items-center justify-center">
        {showResults ? (
          <ResultScreen
            onRetry={() => {
              setShowResults(false);
              setCompletedExamples([]);
              resetPractice();
              setCurrentExampleIndex(0);
            }}
            currentExample={currentExample}
            completedExamples={completedExamples}
          />
        ) : (
          <motion.div
            key={currentExample.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl"
          >
            <Card className="backdrop-filter backdrop-blur-lg border rounded-xl shadow-xl"
              style={{ 
                backgroundColor: 'rgba(30, 30, 30, 0.9)',
                borderColor: '#404040' 
              }}
            >
              <CardHeader className="space-y-2">
                <div className="flex justify-between items-center">
                  <CardTitle 
                    className="text-2xl font-bold"
                    style={{ color: vscodeDarkTheme.foreground }}
                  >
                    {currentExample.title}
                  </CardTitle>
                  <div className="flex flex-col gap-2">
                    {/* Language selection */}
                    <div className="flex gap-2">
                      <Button
                        variant={selectedLanguage === 'javascript' ? 'default' : 'outline'}
                        onClick={() => setSelectedLanguage('javascript')}
                        className="text-sm"
                      >
                        JavaScript
                      </Button>
                      <Button
                        variant={selectedLanguage === 'python' ? 'default' : 'outline'}
                        onClick={() => setSelectedLanguage('python')}
                        className="text-sm"
                      >
                        Python
                      </Button>
                    </div>
                    {/* Difficulty selection */}
                    <div className="flex gap-2">
                      <Button
                        variant={selectedDifficulty === 'beginner' ? 'default' : 'outline'}
                        onClick={() => setSelectedDifficulty('beginner')}
                        className="text-sm"
                      >
                        초급
                      </Button>
                      <Button
                        variant={selectedDifficulty === 'intermediate' ? 'default' : 'outline'}
                        onClick={() => setSelectedDifficulty('intermediate')}
                        className="text-sm"
                      >
                        중급
                      </Button>
                    </div>
                  </div>
                </div>
                <p 
                  className="text-sm opacity-80"
                  style={{ color: vscodeDarkTheme.foreground }}
                >
                  {currentExample.description}
                </p>
                <div 
                  className="flex gap-2 flex-wrap"
                  style={{ color: vscodeDarkTheme.foreground }}
                >
                  {currentExample.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
        </CardHeader>
        <CardContent className="space-y-4">
                {/* Completion message */}
                <AnimatePresence>
                  {showCompletionMessage && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 rounded-xl"
                      style={{ backdropFilter: 'blur(4px)' }}
                    >
                      <motion.div
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        className="text-center p-6 rounded-lg bg-opacity-90"
                        style={{ backgroundColor: vscodeDarkTheme.background }}
                      >
                        <motion.h3
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          className="text-2xl font-bold mb-4"
                          style={{ color: vscodeDarkTheme.lineNumberActive }}
                        >
                          🎉 예제 완료!
                        </motion.h3>
                        <div className="space-y-2">
                          <p style={{ color: vscodeDarkTheme.foreground }}>
                            정확도: {accuracy}% • 속도: {speed} WPM
                          </p>
                          <p style={{ color: vscodeDarkTheme.foreground }}>
                            키입력: {totalKeystrokes} • 정확: {correctKeystrokes}
                          </p>
                          <p style={{ color: vscodeDarkTheme.foreground }}>
                            소요 시간: {formatElapsedTime(elapsedTime)}
                          </p>
                        </div>
                        <div className="mt-6 space-y-2">
                          <Button
                            onClick={handleNextExample}
                            className="w-full"
                            style={{
                              backgroundColor: vscodeDarkTheme.lineNumberActive,
                              color: vscodeDarkTheme.background
                            }}
                          >
                            다음 예제로 이동 (Enter)
                          </Button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span style={{ color: vscodeDarkTheme.foreground }}>
                      예제 {currentExampleIndex + 1}/{filteredExamples.length} - 진행률: {progress}%
                    </span>
                    <span style={{ color: vscodeDarkTheme.foreground }}>
                      작성 시간: {formatElapsedTime(elapsedTime)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-opacity-20 rounded-full overflow-hidden"
                    style={{ backgroundColor: vscodeDarkTheme.foreground }}
                  >
                    <div
                      className="h-full transition-all duration-300 ease-in-out rounded-full"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: vscodeDarkTheme.lineNumberActive
                      }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-md relative"
                  style={{ backgroundColor: 'rgba(47, 51, 55, 0.5)' }}
                >
                  <div className="flex">
                    <LineNumbers text={text} getCurrentLine={getCurrentLine} />
                    <div className="text-lg font-medium whitespace-pre-wrap leading-relaxed flex-1 pl-4"
                      style={{ color: vscodeDarkTheme.foreground }}
                    >
                      <div 
                        className="font-mono whitespace-pre-wrap break-all relative"
                        style={codeStyle}
                      >
              {renderText()}
                      </div>
                    </div>
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
                <div className="flex justify-between items-center flex-wrap gap-2"
                  style={{ color: vscodeDarkTheme.foreground }}
                >
                  <div className="flex flex-col">
                    <p>전체 정확도: {accuracy}%</p>
                    <p className="text-sm opacity-80">현재 라인: {realtimeAccuracy}%</p>
                  </div>
                  <div className="flex flex-col">
                    <p>현재 속도: {endTime ? speed : realtimeWPM} WPM</p>
                    <p className="text-sm opacity-80">평균 속도: {averageWPM} WPM</p>
                  </div>
                  <div className="flex flex-col">
                    <p>예상 시간: {currentExample.estimatedTime}초</p>
                    <p className="text-sm opacity-80">경과: {formatElapsedTime(elapsedTime)}</p>
                  </div>
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

                {/* Settings Panel */}
                <SettingsPanel
                  fontSize={fontSize}
                  onFontSizeChange={handleFontSizeChange}
                  soundEnabled={soundEnabled}
                  onSoundEnabledChange={handleSoundEnabledChange}
                  volume={volume}
                  onVolumeChange={handleVolumeChange}
                />
        </CardContent>
      </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}