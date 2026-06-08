import { Trophy, Clock, Star } from "lucide-react";
import { motion } from "motion/react";

interface TopStatsProps {
  userName: string;
  badges: number;
  timeToday: number;
}

export function TopStats({ userName, badges, timeToday }: TopStatsProps) {
  return (
    <div className="space-y-4">
      {/* Greeting */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-[#ffe990] to-[#ffde59] rounded-3xl px-6 py-5 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-[#494949]">Olá, {userName}! 👋</h2>
      </motion.div>

      {/* Stats badges */}
      <div className="flex gap-3 justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="bg-white rounded-2xl px-5 py-3 shadow-md flex items-center gap-2 border-2 border-[#ffde59]"
        >
          <Trophy className="w-5 h-5 text-[#ffde59]" fill="#ffde59" />
          <span className="font-bold text-[#494949]">{badges}</span>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="bg-white rounded-2xl px-5 py-3 shadow-md flex items-center gap-2 border-2 border-[#6ce5e8]"
        >
          <Clock className="w-5 h-5 text-[#41b8d5]" />
          <span className="font-bold text-[#494949]">{timeToday} min</span>
        </motion.div>
      </div>
    </div>
  );
}
