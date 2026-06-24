import { motion } from "motion/react";
import { Star, Lock } from "lucide-react";

interface LevelNodeProps {
  level: number;
  status: "completed" | "current" | "locked";
  stars: number;
  icon: string;
  color: string;
  onClick?: () => void;
}

export function LevelNode({ level, status, stars, icon, color, onClick }: LevelNodeProps) {
  const isLocked = status === "locked";
  const isCurrent = status === "current";
  const isCompleted = status === "completed";

  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: level * 0.05 }}
    >

      {/* Level button */}
      <motion.button
        onClick={!isLocked ? onClick : undefined}
        disabled={isLocked}
        className={`relative w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-300 ${
          isLocked
            ? "bg-gray-300 cursor-not-allowed"
            : isCurrent
            ? "shadow-lg scale-110 ring-4 ring-white ring-offset-2"
            : isCompleted
            ? "shadow-md"
            : ""
        }`}
        style={{
          backgroundColor: isLocked ? undefined : color,
        }}
        whileHover={!isLocked ? { scale: 1.15, rotate: 5 } : {}}
        whileTap={!isLocked ? { scale: 0.95 } : {}}
      >
        {isLocked ? (
          <Lock className="w-8 h-8 text-gray-500" />
        ) : isCompleted ? (
          <div className="relative flex items-center justify-center">
            <Star className="w-12 h-12 text-[#ffde59] fill-[#ffde59]" strokeWidth={2} />
            <span className="absolute text-sm font-bold text-[#494949]">{level}</span>
          </div>
        ) : (
          <span className="drop-shadow-md">{icon}</span>
        )}

        {/* Pulse animation for current level */}
        {isCurrent && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-white"
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        {/* Level number badge - only show if not completed */}
        {!isCompleted && !isLocked && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-[#494949] shadow-md">
            {level}
          </div>
        )}
      </motion.button>

      {/* Stars display */}
      {!isLocked && (
        <div className="flex gap-1 mt-2">
          {[1, 2, 3].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= stars
                  ? "fill-[#ffde59] text-[#ffde59]"
                  : "fill-gray-300 text-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
