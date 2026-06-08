import { motion } from "motion/react";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";

interface RankingUser {
  id: number;
  name: string;
  points: number;
  avatar: string;
  level: number;
}

export function RankingScreen() {
  const topUsers: RankingUser[] = [
    { id: 1, name: "Gael", points: 850, avatar: "🐻", level: 8 },
    { id: 2, name: "Maria", points: 720, avatar: "🦊", level: 7 },
    { id: 3, name: "João", points: 650, avatar: "🐰", level: 6 },
    { id: 4, name: "Ana", points: 580, avatar: "🐼", level: 6 },
    { id: 5, name: "Pedro", points: 520, avatar: "🐨", level: 5 },
    { id: 6, name: "Sofia", points: 480, avatar: "🦁", level: 5 },
    { id: 7, name: "Lucas", points: 420, avatar: "🐸", level: 4 },
    { id: 8, name: "Beatriz", points: 380, avatar: "🐙", level: 4 },
  ];

  const getMedalColor = (position: number) => {
    if (position === 1) return { bg: "#ffde59", text: "#494949", icon: Trophy };
    if (position === 2) return { bg: "#d7d7d7", text: "#494949", icon: Medal };
    if (position === 3) return { bg: "#cd7f32", text: "#ffffff", icon: Award };
    return { bg: "#f0f0f0", text: "#494949", icon: TrendingUp };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffdf7] via-[#ffe990]/20 to-[#ffde59]/10 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#ffde59] to-[#ffe990] px-6 py-8 shadow-lg">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <Trophy className="w-12 h-12 mx-auto mb-3 text-white" fill="white" />
          <h1 className="text-3xl font-bold text-white">Ranking</h1>
          <p className="text-white/90 text-sm mt-1">
            Melhores aprendizes do Letrico
          </p>
        </motion.div>
      </div>

      {/* Podium - Top 3 */}
      <div className="max-w-md mx-auto px-6 py-8">
        <div className="flex items-end justify-center gap-4">
          {/* 2nd place */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-3xl shadow-lg mb-2">
              {topUsers[1].avatar}
            </div>
            <div className="bg-gradient-to-br from-gray-300 to-gray-400 px-4 py-6 rounded-t-2xl shadow-xl text-center min-w-[80px]">
              <Medal className="w-6 h-6 mx-auto mb-1 text-white" />
              <p className="text-xs font-bold text-white">2º</p>
              <p className="text-sm font-bold text-white mt-1">
                {topUsers[1].name}
              </p>
              <p className="text-xs text-white/90">{topUsers[1].points} pts</p>
            </div>
          </motion.div>

          {/* 1st place */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center -mt-4"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ffde59] to-[#ffe990] flex items-center justify-center text-4xl shadow-xl mb-2 ring-4 ring-white">
              {topUsers[0].avatar}
            </div>
            <div className="bg-gradient-to-br from-[#ffde59] to-[#ffe990] px-4 py-8 rounded-t-2xl shadow-2xl text-center min-w-[90px]">
              <Trophy className="w-8 h-8 mx-auto mb-1 text-white" fill="white" />
              <p className="text-sm font-bold text-white">1º</p>
              <p className="text-base font-bold text-white mt-1">
                {topUsers[0].name}
              </p>
              <p className="text-sm text-white/90">{topUsers[0].points} pts</p>
            </div>
          </motion.div>

          {/* 3rd place */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#cd7f32] to-[#a0522d] flex items-center justify-center text-3xl shadow-lg mb-2">
              {topUsers[2].avatar}
            </div>
            <div className="bg-gradient-to-br from-[#cd7f32] to-[#a0522d] px-4 py-5 rounded-t-2xl shadow-xl text-center min-w-[80px]">
              <Award className="w-6 h-6 mx-auto mb-1 text-white" />
              <p className="text-xs font-bold text-white">3º</p>
              <p className="text-sm font-bold text-white mt-1">
                {topUsers[2].name}
              </p>
              <p className="text-xs text-white/90">{topUsers[2].points} pts</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Rest of ranking */}
      <div className="max-w-md mx-auto px-6 pb-8">
        <div className="space-y-3">
          {topUsers.slice(3).map((user, index) => {
            const position = index + 4;
            const config = getMedalColor(position);

            return (
              <motion.div
                key={user.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-2xl p-4 shadow-md flex items-center gap-4"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ backgroundColor: config.bg, color: config.text }}
                >
                  {position}
                </div>
                <div className="text-3xl">{user.avatar}</div>
                <div className="flex-1">
                  <p className="font-bold text-[#494949]">{user.name}</p>
                  <p className="text-xs text-[#494949]/70">Nível {user.level}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#ffde59]">{user.points}</p>
                  <p className="text-xs text-[#494949]/70">pontos</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
