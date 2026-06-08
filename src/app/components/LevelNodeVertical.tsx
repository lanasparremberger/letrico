import { motion } from "motion/react";
import { Lock, Star } from "lucide-react";
import { MascotBadge } from "./MascotBadge";

interface LevelNodeVerticalProps {
  level: number;
  status: "completed" | "current" | "locked";
  stars: number;
  color: string;
  position: { x: number; y: number };
  type?: "reading" | "speech" | "writing";
  name?: string;
  onClick?: () => void;
}

export function LevelNodeVertical({
  level,
  status,
  stars,
  color,
  position,
  type,
  name,
  onClick,
}: LevelNodeVerticalProps) {
  const isLocked = status === "locked";
  const isCurrent = status === "current";
  const isCompleted = status === "completed";

  return (
    <div
      className="absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.div
        className="relative flex flex-col items-center"
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: level * 0.1,
        }}
      >
        {/* Level button */}
        <motion.button
          onClick={!isLocked ? onClick : undefined}
          disabled={isLocked}
          className={`relative w-20 h-20 rounded-full flex items-center justify-center font-bold transition-all duration-300 shadow-xl ${
            isLocked
              ? "bg-gray-300 cursor-not-allowed"
              : isCurrent
              ? "ring-4 ring-white ring-offset-4 scale-110"
              : ""
          }`}
          style={{
            backgroundColor: isLocked ? undefined : color,
            boxShadow: isLocked
              ? undefined
              : `0 8px 24px ${color}40, 0 4px 8px ${color}30`,
          }}
          whileHover={!isLocked ? { scale: 1.2, rotate: 8 } : {}}
          whileTap={!isLocked ? { scale: 0.9 } : {}}
        >
          {isLocked ? (
            <Lock className="w-8 h-8 text-gray-500" />
          ) : (
            <span className="text-3xl font-bold text-white drop-shadow-lg">
              {level}
            </span>
          )}

          {/* Pulse animation for current level */}
          {isCurrent && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: color }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 text-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                👆
              </motion.div>
            </>
          )}

          {/* Checkmark for completed */}
          {isCompleted && (
            <motion.div
              className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: level * 0.1 + 0.3, type: "spring" }}
            >
              <Star className="w-5 h-5 text-[#ffde59]" fill="#ffde59" />
            </motion.div>
          )}

          {/* Mascot badge */}
          {!isLocked && type && (
            <motion.div
              className="absolute -bottom-2 -right-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: level * 0.1 + 0.4, type: "spring" }}
            >
              <MascotBadge type={type} size="sm" />
            </motion.div>
          )}
        </motion.button>

        {/* Level name */}
        {!isLocked && name && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: level * 0.1 + 0.5 }}
            className="absolute top-full mt-2 whitespace-nowrap bg-white px-3 py-1 rounded-full shadow-md text-xs font-semibold text-[#494949]"
          >
            {name}
          </motion.div>
        )}

        {/* Stars display */}
        {!isLocked && !isCurrent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: level * 0.1 + 0.2 }}
            className="flex gap-1 mt-3 bg-white px-3 py-1.5 rounded-full shadow-md"
          >
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
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
