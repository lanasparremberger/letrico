import { Home, TrendingUp, Trophy, User } from "lucide-react";
import { motion } from "motion/react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: "home" | "ranking" | "trophies" | "profile") => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home" as const, icon: Home, label: "Início" },
    { id: "ranking" as const, icon: TrendingUp, label: "Ranking" },
    { id: "trophies" as const, icon: Trophy, label: "Troféus" },
    { id: "profile" as const, icon: User, label: "Perfil" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#ffe990] to-[#ffde59] shadow-2xl border-t-4 border-[#ffde59]">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex justify-around items-center">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                  isActive ? "bg-white shadow-lg scale-110" : ""
                }`}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Icon
                  className={`w-6 h-6 ${
                    isActive ? "text-[#41b8d5]" : "text-[#494949]"
                  }`}
                  fill={isActive ? "#41b8d5" : "none"}
                />
                <span
                  className={`text-xs font-semibold ${
                    isActive ? "text-[#494949]" : "text-[#494949]/70"
                  }`}
                >
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
