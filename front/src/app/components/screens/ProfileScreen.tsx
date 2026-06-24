import { motion } from "motion/react";
import {
  User,
  Calendar,
  Award,
  TrendingUp,
  Settings,
  LogOut,
  ChevronRight,
  Star,
  Flame,
  Zap,
  Users,
  School,
} from "lucide-react";
import * as Progress from "@radix-ui/react-progress";

export function ProfileScreen() {
  const userProfile = {
    name: "Gael",
    avatar: "🐻",
    age: 6,
    level: 8,
    currentXP: 450,
    nextLevelXP: 600,
    joinDate: "01/06/2026",
    totalPoints: 850,
    streak: 7,
    completedLevels: 12,
    totalLevels: 45,
    achievements: 4,
    favoriteArea: "Fala",
    guardians: ["Ana Paula Silva", "Carlos Eduardo Silva"],
    institution: "Escola Municipal Monteiro Lobato",
  };

  const stats = [
    {
      label: "Fases Completas",
      value: `${userProfile.completedLevels}/${userProfile.totalLevels}`,
      icon: Star,
      color: "#ffde59",
    },
    {
      label: "Sequência",
      value: `${userProfile.streak} dias`,
      icon: Flame,
      color: "#ff6b9a",
    },
    {
      label: "Pontos Totais",
      value: userProfile.totalPoints,
      icon: Zap,
      color: "#6ce5e8",
    },
    {
      label: "Troféus",
      value: userProfile.achievements,
      icon: Award,
      color: "#b197fc",
    },
  ];

  const menuItems = [
    { label: "Configurações", icon: Settings, color: "#6ec6ff" },
    { label: "Estatísticas", icon: TrendingUp, color: "#b197fc" },
    { label: "Ajuda", icon: User, color: "#41b8d5" },
    { label: "Sair", icon: LogOut, color: "#ff6b9a" },
  ];

  const progress = (userProfile.currentXP / userProfile.nextLevelXP) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffdf7] via-[#d7fdc7]/10 to-[#6ec6ff]/10 pb-24">
      {/* Header with avatar */}
      <div className="bg-gradient-to-r from-[#41b8d5] to-[#6ec6ff] px-6 py-8 shadow-lg">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 rounded-full bg-white mx-auto mb-4 flex items-center justify-center text-6xl shadow-2xl ring-4 ring-white/50">
            {userProfile.avatar}
          </div>
          <h1 className="text-3xl font-bold text-white">{userProfile.name}</h1>
          <p className="text-white/90 text-sm mt-1">{userProfile.age} anos</p>

          {/* Level badge */}
          <div className="inline-flex items-center gap-2 bg-white/30 px-4 py-2 rounded-full mt-3">
            <Award className="w-5 h-5 text-white" />
            <span className="font-bold text-white">Nível {userProfile.level}</span>
          </div>
        </motion.div>
      </div>

      {/* XP Progress */}
      <div className="max-w-md mx-auto px-6 -mt-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-5 shadow-xl"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-[#494949]">
              Progresso do Nível
            </span>
            <span className="text-xs text-[#494949]/70">
              {userProfile.currentXP} / {userProfile.nextLevelXP} XP
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
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-md mx-auto px-6 py-6">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                className="bg-white rounded-2xl p-4 shadow-md"
              >
                <div
                  className="w-10 h-10 rounded-full mb-3 flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <p className="text-xs text-[#494949]/70">{stat.label}</p>
                <p className="text-lg font-bold text-[#494949]">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Profile Info */}
      <div className="max-w-md mx-auto px-6 pb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl p-5 shadow-md space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#41b8d5]" />
              <span className="text-sm text-[#494949]">Membro desde</span>
            </div>
            <span className="text-sm font-bold text-[#494949]">
              {userProfile.joinDate}
            </span>
          </div>
          <div className="h-px bg-gray-200" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-[#ffde59]" fill="#ffde59" />
              <span className="text-sm text-[#494949]">Área favorita</span>
            </div>
            <span className="text-sm font-bold text-[#494949]">
              {userProfile.favoriteArea}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Guardians & Institution */}
      <div className="max-w-md mx-auto px-6 pb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="bg-white rounded-2xl p-5 shadow-md space-y-4"
        >
          <h3 className="font-bold text-[#494949] text-sm">Responsáveis e Instituição</h3>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#ff6b9a20" }}>
                <Users className="w-5 h-5 text-[#ff6b9a]" />
              </div>
              <div>
                <p className="text-xs text-[#494949]/60 mb-1">Responsáveis</p>
                {userProfile.guardians.map((guardian) => (
                  <p key={guardian} className="text-sm font-semibold text-[#494949]">{guardian}</p>
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#41b8d520" }}>
                <School className="w-5 h-5 text-[#41b8d5]" />
              </div>
              <div>
                <p className="text-xs text-[#494949]/60 mb-1">Instituição de Ensino</p>
                <p className="text-sm font-semibold text-[#494949]">{userProfile.institution}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Menu Items */}
      <div className="max-w-md mx-auto px-6 pb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl shadow-md overflow-hidden"
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                  index !== menuItems.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <span className="font-semibold text-[#494949]">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#494949]/30" />
              </button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
