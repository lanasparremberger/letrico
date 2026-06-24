import { Home, BarChart2, MessageSquare, Bell, User } from "lucide-react";
import { motion } from "motion/react";

type ParentTab = "home" | "stats" | "forum" | "notifications" | "profile";

interface ParentBottomNavProps {
  activeTab: ParentTab;
  onTabChange: (tab: ParentTab) => void;
  notificationCount?: number;
}

export function ParentBottomNav({ activeTab, onTabChange, notificationCount = 0 }: ParentBottomNavProps) {
  const tabs = [
    { id: "home" as ParentTab, icon: Home, label: "Início" },
    { id: "stats" as ParentTab, icon: BarChart2, label: "Progresso" },
    { id: "forum" as ParentTab, icon: MessageSquare, label: "Fórum" },
    { id: "notifications" as ParentTab, icon: Bell, label: "Avisos", badge: notificationCount },
    { id: "profile" as ParentTab, icon: User, label: "Perfil" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-100">
      <div className="max-w-md mx-auto px-2 py-2">
        <div className="flex justify-around items-center">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-2xl transition-all ${
                  isActive ? "bg-[#ff6b9a]/10" : ""
                }`}
                whileTap={{ scale: 0.9 }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="relative">
                  <Icon
                    className={`w-6 h-6 transition-colors ${
                      isActive ? "text-[#ff6b9a]" : "text-[#494949]/50"
                    }`}
                    fill={isActive ? "#ff6b9a" : "none"}
                  />
                  {tab.badge && tab.badge > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#ff6b9a] rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                      {tab.badge > 9 ? "9+" : tab.badge}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] font-semibold transition-colors ${
                    isActive ? "text-[#ff6b9a]" : "text-[#494949]/50"
                  }`}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="parentNavIndicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#ff6b9a] rounded-full"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
