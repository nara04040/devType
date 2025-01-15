import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TypingResult } from "@/types/typing"
import { vscodeDarkTheme } from '@/lib/editor/themes'
import { motion } from 'framer-motion'

interface BasicStatsProps {
  result: TypingResult;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const calculateCPM = (keystrokes: number, timeInSeconds: number): number => {
  const timeInMinutes = timeInSeconds / 60;
  return Math.round(keystrokes / timeInMinutes);
};

const StatItem = ({ label, value, unit = '' }: { label: string; value: number | string; unit?: string }) => (
  <div className="flex flex-col items-center p-4 rounded-lg" style={{ backgroundColor: 'rgba(47, 51, 55, 0.5)' }}>
    <div className="text-2xl font-bold" style={{ color: vscodeDarkTheme.lineNumberActive }}>
      {value}{unit}
    </div>
    <div className="text-sm opacity-80" style={{ color: vscodeDarkTheme.foreground }}>
      {label}
    </div>
  </div>
);

export default function BasicStats({ result }: BasicStatsProps) {
  const { stats, averageWPM, totalExamplesCompleted } = result;
  const cpm = calculateCPM(stats.keystrokes, stats.time);
  
  return (
    <Card className="w-full" style={{ backgroundColor: vscodeDarkTheme.background }}>
      <CardHeader>
        <CardTitle className="text-xl" style={{ color: vscodeDarkTheme.foreground }}>
          기본 통계
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StatItem 
            label="WPM" 
            value={stats.wpm} 
          />
          <StatItem 
            label="CPM" 
            value={cpm}
          />
          <StatItem 
            label="정확도" 
            value={stats.accuracy} 
            unit="%" 
          />
          <StatItem 
            label="소요 시간" 
            value={formatTime(stats.time)} 
          />
          <StatItem 
            label="평균 WPM" 
            value={averageWPM} 
          />
          <StatItem 
            label="총 키입력" 
            value={stats.keystrokes} 
          />
          <StatItem 
            label="정확한 키입력" 
            value={stats.correctKeystrokes} 
          />
          <StatItem 
            label="오타율" 
            value={Math.round((1 - stats.correctKeystrokes / stats.keystrokes) * 100)} 
            unit="%" 
          />
          <StatItem 
            label="완료한 예제" 
            value={totalExamplesCompleted} 
          />
        </motion.div>
      </CardContent>
    </Card>
  );
} 