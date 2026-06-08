import { motion } from "motion/react";
import { Book, MessageCircle, PencilLine } from "lucide-react";

interface MascotBadgeProps {
  type: "reading" | "speech" | "writing";
  size?: "sm" | "md" | "lg";
}

export function MascotBadge({ type, size = "md" }: MascotBadgeProps) {
  const configs = {
    reading: {
      name: "Matilda",
      icon: Book,
      color: "#b197fc",
      bgColor: "#b197fc20",
      emoji: "📖",
      label: "Leitura",
    },
    speech: {
      name: "Chiquinho",
      icon: MessageCircle,
      color: "#ffde59",
      bgColor: "#ffde5920",
      emoji: "🗣️",
      label: "Fala",
    },
    writing: {
      name: "Perseu",
      icon: PencilLine,
      color: "#41b8d5",
      bgColor: "#41b8d520",
      emoji: "✍️",
      label: "Escrita",
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  const sizes = {
    sm: { container: "w-8 h-8", icon: "w-4 h-4", text: "text-xs" },
    md: { container: "w-10 h-10", icon: "w-5 h-5", text: "text-sm" },
    lg: { container: "w-12 h-12", icon: "w-6 h-6", text: "text-base" },
  };

  const sizeClass = sizes[size];

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`${sizeClass.container} rounded-full flex items-center justify-center shadow-md`}
      style={{ backgroundColor: config.bgColor }}
      title={`${config.name} - ${config.label}`}
    >
      <Icon className={sizeClass.icon} style={{ color: config.color }} />
    </motion.div>
  );
}
