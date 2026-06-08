import { motion } from "motion/react";
import { Book, MessageCircle, PencilLine } from "lucide-react";

interface MascotSelectorProps {
  activeMascot: "speech" | "reading" | "writing";
  onSelectMascot: (mascot: "speech" | "reading" | "writing") => void;
  progress?: {
    speech: number;
    reading: number;
    writing: number;
  };
}

export function MascotSelector({ activeMascot, onSelectMascot, progress }: MascotSelectorProps) {
  const mascots = [
    {
      type: "speech" as const,
      name: "Chiquinho",
      icon: MessageCircle,
      color: "#ffde59",
      bgColor: "#ffde5920",
      activeBg: "#ffde59",
      emoji: "🐶",
      label: "Fala",
    },
    {
      type: "reading" as const,
      name: "Matilda",
      icon: Book,
      color: "#b197fc",
      bgColor: "#b197fc20",
      activeBg: "#b197fc",
      emoji: "🐱",
      label: "Leitura",
    },
    {
      type: "writing" as const,
      name: "Perseu",
      icon: PencilLine,
      color: "#41b8d5",
      bgColor: "#41b8d520",
      activeBg: "#41b8d5",
      emoji: "🐹",
      label: "Escrita",
    },
  ];

  return (
    <div className="flex justify-center gap-3">
      {mascots.map((mascot) => {
        const Icon = mascot.icon;
        const isActive = activeMascot === mascot.type;

        return (
          <motion.button
            key={mascot.type}
            onClick={() => onSelectMascot(mascot.type)}
            className={`flex flex-col items-center gap-2 px-5 py-3 rounded-2xl shadow-lg transition-all ${
              isActive ? "ring-4 ring-white ring-offset-2 scale-110" : "hover:scale-105"
            }`}
            style={{
              backgroundColor: isActive ? mascot.activeBg : "white",
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: mascots.indexOf(mascot) * 0.1 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{mascot.emoji}</span>
              <Icon
                className="w-5 h-5"
                style={{ color: isActive ? "white" : mascot.color }}
              />
            </div>
            <div className="text-center">
              <p
                className={`text-sm font-bold ${
                  isActive ? "text-white" : "text-[#494949]"
                }`}
              >
                {mascot.name}
              </p>
              <p
                className={`text-xs ${
                  isActive ? "text-white/90" : "text-[#494949]/70"
                }`}
              >
                {mascot.label}
              </p>
            </div>
            {/* Progress indicator */}
            {progress && progress[mascot.type] > 0 && (
              <div
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
                style={{
                  backgroundColor: isActive ? "white" : mascot.color,
                  color: isActive ? mascot.color : "white",
                }}
              >
                {progress[mascot.type]}
              </div>
            )}

            {isActive && (
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full"
                layoutId="activeMascot"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
