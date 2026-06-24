import { Trophy, Flame, Zap } from "lucide-react";
import * as Progress from "@radix-ui/react-progress";

interface ProgressHeaderProps {
  streak: number;
  points: number;
  level: number;
  currentXP: number;
  nextLevelXP: number;
}

export function ProgressHeader({ streak, points, level, currentXP, nextLevelXP }: ProgressHeaderProps) {
  const progress = (currentXP / nextLevelXP) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-4">
      {/* Stats */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-[#ff6b9a]/20 px-4 py-2 rounded-full">
            <Flame className="w-5 h-5 text-[#ff6b9a]" />
            <span className="font-bold text-[#494949]">{streak} dias</span>
          </div>

          <div className="flex items-center gap-2 bg-[#b197fc]/20 px-4 py-2 rounded-full">
            <Zap className="w-5 h-5 text-[#b197fc]" />
            <span className="font-bold text-[#494949]">{points} pts</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#ffde59]/30 px-4 py-2 rounded-full">
          <Trophy className="w-5 h-5 text-[#ffe990]" />
          <span className="font-bold text-[#494949]">Nível {level}</span>
        </div>
      </div>

      {/* XP Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium text-[#494949]">
          <span>Progresso do Nível</span>
          <span>
            {currentXP} / {nextLevelXP} XP
          </span>
        </div>
        <Progress.Root
          className="relative overflow-hidden bg-gray-200 rounded-full h-4 shadow-inner"
          value={progress}
        >
          <Progress.Indicator
            className="h-full bg-gradient-to-r from-[#41b8d5] via-[#6ec6ff] to-[#b197fc] transition-transform duration-500 ease-out rounded-full"
            style={{ transform: `translateX(-${100 - progress}%)` }}
          />
        </Progress.Root>
      </div>
    </div>
  );
}
