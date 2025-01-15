import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { vscodeDarkTheme } from '@/lib/editor/themes';
import { Label } from "@/components/ui/label";

interface SettingsPanelProps {
  fontSize: number;
  onFontSizeChange: (value: number) => void;
  soundEnabled: boolean;
  onSoundEnabledChange: (enabled: boolean) => void;
  volume: number;
  onVolumeChange: (value: number) => void;
}

export default function SettingsPanel({
  fontSize,
  onFontSizeChange,
  soundEnabled,
  onSoundEnabledChange,
  volume,
  onVolumeChange
}: SettingsPanelProps) {
  return (
    <Card className="w-full" style={{ backgroundColor: vscodeDarkTheme.background }}>
      <CardHeader>
        <CardTitle className="text-xl" style={{ color: vscodeDarkTheme.foreground }}>
          설정
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Font Size Control */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label 
              htmlFor="font-size" 
              className="text-sm"
              style={{ color: vscodeDarkTheme.foreground }}
            >
              폰트 크기: {fontSize}px
            </Label>
          </div>
          <Slider
            id="font-size"
            min={12}
            max={24}
            step={1}
            value={[fontSize]}
            onValueChange={(value: number[]) => onFontSizeChange(value[0])}
            className="w-full"
          />
        </div>

        {/* Sound Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label 
              htmlFor="sound-toggle"
              className="text-sm"
              style={{ color: vscodeDarkTheme.foreground }}
            >
              소리 효과
            </Label>
            <Switch
              id="sound-toggle"
              checked={soundEnabled}
              onCheckedChange={onSoundEnabledChange}
            />
          </div>

          {soundEnabled && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label 
                  htmlFor="volume"
                  className="text-sm"
                  style={{ color: vscodeDarkTheme.foreground }}
                >
                  볼륨: {volume}%
                </Label>
              </div>
              <Slider
                id="volume"
                min={0}
                max={100}
                step={1}
                value={[volume]}
                onValueChange={(value: number[]) => onVolumeChange(value[0])}
                className="w-full"
                disabled={!soundEnabled}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 