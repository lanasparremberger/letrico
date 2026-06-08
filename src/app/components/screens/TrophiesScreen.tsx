import { motion } from "motion/react";
import { Trophy, Star, Award, Target, Zap, BookOpen, Mic, PencilLine } from "lucide-react";

interface Trophy {
  id: number;
  name: string;
  description: string;
  icon: any;
  color: string;
  unlocked: boolean;
  date?: string;
}

export function TrophiesScreen() {
  const trophies: Trophy[] = [
    {
      id: 1,
      name: "Primeira Estrela",
      description: "Complete sua primeira fase",
      icon: Star,
      color: "#ffde59",
      unlocked: true,
      date: "05/06/2026",
    },
    {
      id: 2,
      name: "Falante",
      description: "Complete 5 fases de Fala",
      icon: Mic,
      color: "#ffe990",
      unlocked: true,
      date: "06/06/2026",
    },
    {
      id: 3,
      name: "Leitor Iniciante",
      description: "Complete 3 fases de Leitura",
      icon: BookOpen,
      color: "#b197fc",
      unlocked: true,
      date: "07/06/2026",
    },
    {
      id: 4,
      name: "Escritor Novato",
      description: "Complete 2 fases de Escrita",
      icon: PencilLine,
      color: "#41b8d5",
      unlocked: false,
    },
    {
      id: 5,
      name: "Dedicação",
      description: "7 dias consecutivos jogando",
      icon: Zap,
      color: "#ff6b9a",
      unlocked: true,
      date: "08/06/2026",
    },
    {
      id: 6,
      name: "Perfeccionista",
      description: "Ganhe 3 estrelas em 10 fases",
      icon: Target,
      color: "#6ce5e8",
      unlocked: false,
    },
    {
      id: 7,
      name: "Campeão",
      description: "Complete todas as 45 fases",
      icon: Trophy,
      color: "#ffde59",
      unlocked: false,
    },
    {
      id: 8,
      name: "Mestre das Palavras",
      description: "Complete todas fases de Leitura",
      icon: Award,
      color: "#b197fc",
      unlocked: false,
    },
  ];

  const unlockedCount = trophies.filter((t) => t.unlocked).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffdf7] via-[#ffde59]/10 to-[#ffe990]/10 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#ffde59] to-[#ffe990] px-6 py-8 shadow-lg">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <Trophy className="w-12 h-12 mx-auto mb-3 text-white" fill="white" />
          <h1 className="text-3xl font-bold text-white">Troféus</h1>
          <p className="text-white/90 text-sm mt-1">
            {unlockedCount} de {trophies.length} troféus conquistados
          </p>
          <div className="mt-4 bg-white/30 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(unlockedCount / trophies.length) * 100}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Trophies grid */}
      <div className="max-w-md mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-4">
          {trophies.map((trophy, index) => {
            const Icon = trophy.icon;

            return (
              <motion.div
                key={trophy.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className={`relative rounded-2xl p-4 shadow-lg ${
                  trophy.unlocked ? "bg-white" : "bg-gray-200"
                }`}
              >
                {/* Trophy icon */}
                <div
                  className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${
                    trophy.unlocked ? "shadow-xl" : "opacity-50"
                  }`}
                  style={{
                    backgroundColor: trophy.unlocked
                      ? `${trophy.color}30`
                      : "#e0e0e0",
                  }}
                >
                  <Icon
                    className="w-8 h-8"
                    style={{
                      color: trophy.unlocked ? trophy.color : "#999",
                    }}
                    fill={trophy.unlocked ? trophy.color : "none"}
                  />
                </div>

                {/* Trophy info */}
                <div className="text-center">
                  <h3
                    className={`font-bold text-sm mb-1 ${
                      trophy.unlocked ? "text-[#494949]" : "text-gray-500"
                    }`}
                  >
                    {trophy.name}
                  </h3>
                  <p
                    className={`text-xs ${
                      trophy.unlocked ? "text-[#494949]/70" : "text-gray-400"
                    }`}
                  >
                    {trophy.description}
                  </p>
                  {trophy.unlocked && trophy.date && (
                    <p className="text-xs text-[#494949]/50 mt-2">
                      {trophy.date}
                    </p>
                  )}
                </div>

                {/* Lock overlay */}
                {!trophy.unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 rounded-2xl">
                    <span className="text-4xl">🔒</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
