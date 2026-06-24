import { motion } from "motion/react";
import { Star, Flame, Clock, Mic, BookOpen, PencilLine, ChevronRight, Bell, TrendingUp } from "lucide-react";
import * as Progress from "@radix-ui/react-progress";

interface ParentHomeProps {
  onNavigate: (tab: "stats" | "forum" | "notifications" | "profile") => void;
}

export function ParentHome({ onNavigate }: ParentHomeProps) {
  const child = {
    name: "Gael",
    age: 6,
    avatar: "🐻",
    streak: 7,
    totalPoints: 850,
    timeToday: 15,
    completedLevels: 12,
    totalLevels: 45,
    lastActive: "Hoje, 14h30",
  };

  const areas = [
    {
      key: "fala",
      label: "Fala",
      emoji: "🗣️",
      mascot: "Chiquinho",
      color: "#ffde59",
      bg: "#fffde7",
      completed: 4,
      total: 15,
      points: 320,
      icon: Mic,
    },
    {
      key: "leitura",
      label: "Leitura",
      emoji: "📖",
      mascot: "Matilda",
      color: "#b197fc",
      bg: "#f3f0ff",
      completed: 2,
      total: 15,
      points: 250,
      icon: BookOpen,
    },
    {
      key: "escrita",
      label: "Escrita",
      emoji: "✍️",
      mascot: "Perseu",
      color: "#41b8d5",
      bg: "#e8f7fb",
      completed: 1,
      total: 15,
      points: 280,
      icon: PencilLine,
    },
  ];

  const recentActivities = [
    { text: "Completou fase 5 de Fala", time: "Hoje, 14h30", emoji: "🗣️", color: "#ffde59" },
    { text: "Ganhou troféu Dedicação", time: "Hoje, 13h00", emoji: "🏆", color: "#ff6b9a" },
    { text: "7 dias seguidos de estudo!", time: "Ontem", emoji: "🔥", color: "#ff6b9a" },
    { text: "Completou fase 2 de Leitura", time: "Ontem", emoji: "📖", color: "#b197fc" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffdf7] via-[#fce4ec]/20 to-[#e8f5e9]/10 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#ff6b9a] to-[#ffb3cc] px-6 pt-10 pb-14 shadow-xl">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between"
        >
          <div>
            <p className="text-white/80 text-sm font-medium">Bom dia,</p>
            <h1 className="text-2xl font-bold text-white">Ana Paula 👋</h1>
          </div>
          <button
            onClick={() => onNavigate("notifications")}
            className="relative w-11 h-11 bg-white/25 rounded-full flex items-center justify-center"
          >
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-[#ffde59] rounded-full border-2 border-[#ff6b9a]" />
          </button>
        </motion.div>
      </div>

      {/* Child card — overlaps header */}
      <div className="max-w-md mx-auto px-6 -mt-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring" }}
          className="bg-white rounded-3xl p-5 shadow-2xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ffe990] to-[#ffde59] flex items-center justify-center text-4xl shadow-lg">
              {child.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#494949]">{child.name}</h2>
                <span className="text-xs text-[#494949]/50 bg-gray-100 px-2 py-0.5 rounded-full">
                  {child.lastActive}
                </span>
              </div>
              <p className="text-sm text-[#494949]/60">{child.age} anos • Aprendiz</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <Flame className="w-4 h-4 text-[#ff6b9a]" />
                  <span className="text-xs font-bold text-[#494949]">{child.streak}d</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-[#ffde59]" fill="#ffde59" />
                  <span className="text-xs font-bold text-[#494949]">{child.totalPoints} pts</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-[#41b8d5]" />
                  <span className="text-xs font-bold text-[#494949]">{child.timeToday} min hoje</span>
                </div>
              </div>
            </div>
          </div>

          {/* Overall progress */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-semibold text-[#494949]/70">Progresso geral</span>
              <span className="text-xs font-bold text-[#494949]">
                {child.completedLevels}/{child.totalLevels} fases
              </span>
            </div>
            <Progress.Root
              className="relative overflow-hidden bg-gray-100 rounded-full h-3"
              value={(child.completedLevels / child.totalLevels) * 100}
            >
              <Progress.Indicator
                className="h-full bg-gradient-to-r from-[#ff6b9a] to-[#ffde59] transition-transform duration-700 ease-out rounded-full"
                style={{ transform: `translateX(-${100 - (child.completedLevels / child.totalLevels) * 100}%)` }}
              />
            </Progress.Root>
          </div>
        </motion.div>
      </div>

      {/* Area cards */}
      <div className="max-w-md mx-auto px-6 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-[#494949]">Progresso por área</h3>
          <button
            onClick={() => onNavigate("stats")}
            className="flex items-center gap-1 text-xs text-[#ff6b9a] font-semibold"
          >
            Ver tudo <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-3">
          {areas.map((area, i) => {
            const pct = (area.completed / area.total) * 100;
            return (
              <motion.div
                key={area.key}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-white rounded-2xl p-4 shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{area.emoji}</span>
                    <div>
                      <p className="font-bold text-sm text-[#494949]">{area.label}</p>
                      <p className="text-xs text-[#494949]/50">Mascote: {area.mascot}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm" style={{ color: area.color }}>{area.points} pts</p>
                    <p className="text-xs text-[#494949]/50">{area.completed}/{area.total} fases</p>
                  </div>
                </div>
                <Progress.Root className="relative overflow-hidden bg-gray-100 rounded-full h-2.5" value={pct}>
                  <Progress.Indicator
                    className="h-full transition-transform duration-700 ease-out rounded-full"
                    style={{
                      backgroundColor: area.color,
                      transform: `translateX(-${100 - pct}%)`,
                    }}
                  />
                </Progress.Root>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent activity */}
      <div className="max-w-md mx-auto px-6 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-[#494949]">Atividade recente</h3>
          <button
            onClick={() => onNavigate("stats")}
            className="flex items-center gap-1 text-xs text-[#ff6b9a] font-semibold"
          >
            <TrendingUp className="w-3 h-3" /> Detalhes
          </button>
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-md overflow-hidden"
        >
          {recentActivities.map((act, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-3 ${
                i !== recentActivities.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                style={{ backgroundColor: `${act.color}20` }}
              >
                {act.emoji}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#494949]">{act.text}</p>
                <p className="text-xs text-[#494949]/50">{act.time}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
