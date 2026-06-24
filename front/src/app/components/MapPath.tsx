import { motion } from "motion/react";

interface MapPathProps {
  positions: { x: number; y: number }[];
  completedUntil: number;
}

export function MapPath({ positions, completedUntil }: MapPathProps) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <linearGradient id="completedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#41b8d5" />
          <stop offset="100%" stopColor="#6ce5e8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {positions.map((pos, index) => {
        if (index === positions.length - 1) return null;

        const nextPos = positions[index + 1];
        const isCompleted = index < completedUntil;

        return (
          <motion.line
            key={`line-${index}`}
            x1={pos.x}
            y1={pos.y}
            x2={nextPos.x}
            y2={nextPos.y}
            stroke={isCompleted ? "url(#completedGradient)" : "#d7fdc7"}
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            filter={isCompleted ? "url(#glow)" : undefined}
          />
        );
      })}
    </svg>
  );
}
