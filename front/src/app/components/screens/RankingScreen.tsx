import { useState } from "react";
import { motion } from "motion/react";
import { Trophy, Medal, Award } from "lucide-react";

interface RankingUser {
  id: number;
  name: string;
  points: number;
  avatar: string;
}

type RankingArea = "geral" | "fala" | "leitura" | "escrita";

const rankingData: Record<RankingArea, RankingUser[]> = {
  geral: [
    { id: 1, name: "Gael", points: 850, avatar: "🐻" },
    { id: 2, name: "Maria", points: 720, avatar: "🦊" },
    { id: 3, name: "João", points: 650, avatar: "🐰" },
    { id: 4, name: "Ana", points: 580, avatar: "🐼" },
    { id: 5, name: "Pedro", points: 520, avatar: "🐨" },
    { id: 6, name: "Sofia", points: 480, avatar: "🦁" },
    { id: 7, name: "Lucas", points: 420, avatar: "🐸" },
    { id: 8, name: "Beatriz", points: 380, avatar: "🐙" },
  ],
  fala: [
    { id: 1, name: "Gael", points: 320, avatar: "🐻" },
    { id: 2, name: "Sofia", points: 290, avatar: "🦁" },
    { id: 3, name: "João", points: 240, avatar: "🐰" },
    { id: 4, name: "Maria", points: 210, avatar: "🦊" },
    { id: 5, name: "Pedro", points: 180, avatar: "🐨" },
    { id: 6, name: "Ana", points: 160, avatar: "🐼" },
    { id: 7, name: "Lucas", points: 140, avatar: "🐸" },
    { id: 8, name: "Beatriz", points: 110, avatar: "🐙" },
  ],
  leitura: [
    { id: 1, name: "Maria", points: 310, avatar: "🦊" },
    { id: 2, name: "Beatriz", points: 270, avatar: "🐙" },
    { id: 3, name: "Gael", points: 250, avatar: "🐻" },
    { id: 4, name: "Ana", points: 220, avatar: "🐼" },
    { id: 5, name: "Lucas", points: 190, avatar: "🐸" },
    { id: 6, name: "João", points: 170, avatar: "🐰" },
    { id: 7, name: "Sofia", points: 130, avatar: "🦁" },
    { id: 8, name: "Pedro", points: 100, avatar: "🐨" },
  ],
  escrita: [
    { id: 1, name: "Ana", points: 290, avatar: "🐼" },
    { id: 2, name: "Gael", points: 280, avatar: "🐻" },
    { id: 3, name: "Pedro", points: 240, avatar: "🐨" },
    { id: 4, name: "Maria", points: 200, avatar: "🦊" },
    { id: 5, name: "Sofia", points: 160, avatar: "🦁" },
    { id: 6, name: "Beatriz", points: 140, avatar: "🐙" },
    { id: 7, name: "João", points: 120, avatar: "🐰" },
    { id: 8, name: "Lucas", points: 90, avatar: "🐸" },
  ],
};

const areaConfig: Record<RankingArea, { label: string; emoji: string; color: string; gradient: string }> = {
  geral: { label: "Geral", emoji: "🏆", color: "#ffde59", gradient: "from-[#ffde59] to-[#ffe990]" },
  fala: { label: "Fala", emoji: "🗣️", color: "#ff6b9a", gradient: "from-[#ff6b9a] to-[#ffb3cc]" },
  leitura: { label: "Leitura", emoji: "📖", color: "#b197fc", gradient: "from-[#b197fc] to-[#d4c4fe]" },
  escrita: { label: "Escrita", emoji: "✍️", color: "#41b8d5", gradient: "from-[#41b8d5] to-[#6ec6ff]" },
};

export function RankingScreen() {
  const [activeArea, setActiveArea] = useState<RankingArea>("geral");
  const users = rankingData[activeArea];
  const config = areaConfig[activeArea];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffdf7] via-[#ffe990]/20 to-[#ffde59]/10 pb-24">
      {/* Header */}
      <div className={`bg-gradient-to-r ${config.gradient} px-6 py-8 shadow-lg`}>
        <motion.div
          key={activeArea}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <span className="text-4xl">{config.emoji}</span>
          <h1 className="text-3xl font-bold text-white mt-1">Ranking</h1>
          <p className="text-white/90 text-sm mt-1">
            {config.label === "Geral" ? "Melhores aprendizes do Letrico" : `Ranking de ${config.label}`}
          </p>
        </motion.div>

        {/* Area tabs */}
        <div className="flex gap-2 mt-5 justify-center">
          {(Object.keys(areaConfig) as RankingArea[]).map((area) => {
            const ac = areaConfig[area];
            const isActive = activeArea === area;
            return (
              <button
                key={area}
                onClick={() => setActiveArea(area)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? "bg-white text-[#494949] shadow-md scale-105"
                    : "bg-white/30 text-white hover:bg-white/50"
                }`}
              >
                {ac.emoji} {ac.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Podium - Top 3 */}
      <motion.div
        key={activeArea}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto px-6 py-8"
      >
        <div className="flex items-end justify-center gap-4">
          {/* 2nd place */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-3xl shadow-lg mb-2">
              {users[1].avatar}
            </div>
            <div className="bg-gradient-to-br from-gray-300 to-gray-400 px-4 py-6 rounded-t-2xl shadow-xl text-center min-w-[80px]">
              <Medal className="w-6 h-6 mx-auto mb-1 text-white" />
              <p className="text-xs font-bold text-white">2º</p>
              <p className="text-sm font-bold text-white mt-1">{users[1].name}</p>
              <p className="text-xs text-white/90">{users[1].points} pts</p>
            </div>
          </div>

          {/* 1st place */}
          <div className="flex flex-col items-center -mt-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-xl mb-2 ring-4 ring-white"
              style={{ background: `linear-gradient(135deg, ${config.color}, ${config.color}aa)` }}
            >
              {users[0].avatar}
            </div>
            <div
              className="px-4 py-8 rounded-t-2xl shadow-2xl text-center min-w-[90px]"
              style={{ background: `linear-gradient(135deg, ${config.color}, ${config.color}cc)` }}
            >
              <Trophy className="w-8 h-8 mx-auto mb-1 text-white" fill="white" />
              <p className="text-sm font-bold text-white">1º</p>
              <p className="text-base font-bold text-white mt-1">{users[0].name}</p>
              <p className="text-sm text-white/90">{users[0].points} pts</p>
            </div>
          </div>

          {/* 3rd place */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#cd7f32] to-[#a0522d] flex items-center justify-center text-3xl shadow-lg mb-2">
              {users[2].avatar}
            </div>
            <div className="bg-gradient-to-br from-[#cd7f32] to-[#a0522d] px-4 py-5 rounded-t-2xl shadow-xl text-center min-w-[80px]">
              <Award className="w-6 h-6 mx-auto mb-1 text-white" />
              <p className="text-xs font-bold text-white">3º</p>
              <p className="text-sm font-bold text-white mt-1">{users[2].name}</p>
              <p className="text-xs text-white/90">{users[2].points} pts</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Rest of ranking */}
      <motion.div
        key={`list-${activeArea}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="max-w-md mx-auto px-6 pb-8 space-y-3"
      >
        {users.slice(3).map((user, index) => {
          const position = index + 4;
          return (
            <motion.div
              key={user.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.07 }}
              className="bg-white rounded-2xl p-4 shadow-md flex items-center gap-4"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-[#494949]"
                style={{ backgroundColor: "#f0f0f0" }}
              >
                {position}
              </div>
              <div className="text-3xl">{user.avatar}</div>
              <div className="flex-1">
                <p className="font-bold text-[#494949]">{user.name}</p>
              </div>
              <div className="text-right">
                <p className="font-bold" style={{ color: config.color }}>{user.points}</p>
                <p className="text-xs text-[#494949]/70">pontos</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
