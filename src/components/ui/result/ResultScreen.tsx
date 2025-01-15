import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { vscodeDarkTheme } from '@/lib/editor/themes'
import { TypingResult, TypingStats, CodeExample } from '@/types/typing'
import BasicStats from './BasicStats'

interface ResultScreenProps {
  onRetry: () => void;
  currentExample: CodeExample;
  completedExamples: TypingStats[];
}

export default function ResultScreen({ onRetry, currentExample, completedExamples }: ResultScreenProps) {
  const [result, setResult] = useState<TypingResult | null>(null);

  useEffect(() => {
    // 종합 통계 계산
    const calculateAggregateStats = () => {
      const totalWPM = completedExamples.reduce((sum, stat) => sum + stat.wpm, 0);
      const totalAccuracy = completedExamples.reduce((sum, stat) => sum + stat.accuracy, 0);
      const totalTime = completedExamples.reduce((sum, stat) => sum + stat.time, 0);
      const totalKeystrokes = completedExamples.reduce((sum, stat) => sum + stat.keystrokes, 0);
      const totalCorrectKeystrokes = completedExamples.reduce((sum, stat) => sum + stat.correctKeystrokes, 0);

      const aggregateStats: TypingStats = {
        wpm: Math.round(totalWPM / completedExamples.length),
        accuracy: Math.round(totalAccuracy / completedExamples.length),
        time: totalTime,
        keystrokes: totalKeystrokes,
        correctKeystrokes: totalCorrectKeystrokes,
        exampleId: 'aggregate',
        timestamp: Date.now()
      };

      setResult({
        stats: aggregateStats,
        example: currentExample,
        averageWPM: Math.round(totalWPM / completedExamples.length),
        totalExamplesCompleted: completedExamples.length
      });
    };

    calculateAggregateStats();
  }, [completedExamples, currentExample]);

  if (!result) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-4xl mx-auto p-4 space-y-4"
    >
      <BasicStats result={result} />
      
      <Card className="w-full p-4" style={{ backgroundColor: vscodeDarkTheme.background }}>
        <div className="flex justify-between items-center">
          <div style={{ color: vscodeDarkTheme.foreground }}>
            <h3 className="text-lg font-medium">연습 완료!</h3>
            <p className="text-sm opacity-80">총 {completedExamples.length}개의 예제를 완료했습니다.</p>
          </div>
          <Button
            onClick={onRetry}
            className="hover:bg-opacity-70"
            style={{ 
              backgroundColor: vscodeDarkTheme.lineHighlight,
              color: vscodeDarkTheme.foreground 
            }}
          >
            다시 시작하기
          </Button>
        </div>
      </Card>
    </motion.div>
  );
} 