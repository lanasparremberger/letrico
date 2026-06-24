import { useState } from "react";
import { motion } from "motion/react";
import { Bell, Star, Flame, BookOpen, Trophy, AlertCircle, CheckCircle, X } from "lucide-react";

interface Notification {
  id: number;
  type: "achievement" | "progress" | "alert" | "tip" | "forum";
  icon: string;
  color: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: "achievement",
    icon: "🏆",
    color: "#ffde59",
    title: "Gael conquistou um troféu!",
    body: "Ele completou 7 dias seguidos de estudo e ganhou o troféu Dedicação.",
    time: "Agora",
    read: false,
  },
  {
    id: 2,
    type: "progress",
    icon: "🗣️",
    color: "#ff6b9a",
    title: "Nova fase completada em Fala",
    body: "Gael completou a fase 5 — Sons Iniciais com 2 estrelas. Continue incentivando!",
    time: "2h atrás",
    read: false,
  },
  {
    id: 3,
    type: "tip",
    icon: "💡",
    color: "#b197fc",
    title: "Dica da Fonoaudióloga",
    body: "\"Ler em voz alta por 10 minutos ao dia acelera o desenvolvimento da fala e vocabulário da criança.\" — Dra. Camila Rocha",
    time: "5h atrás",
    read: false,
  },
  {
    id: 4,
    type: "alert",
    icon: "⚠️",
    color: "#ff6b9a",
    title: "Gael não estudou hoje",
    body: "Ainda não houve atividade hoje. Que tal motivá-lo a praticar pelo menos 10 minutos?",
    time: "Ontem, 20h",
    read: true,
  },
  {
    id: 5,
    type: "forum",
    icon: "📝",
    color: "#41b8d5",
    title: "Nova postagem no Fórum",
    body: "Prof. Rafael Lima publicou: \"Sinais de dislexia que todo responsável deve conhecer\".",
    time: "Ontem, 15h",
    read: true,
  },
  {
    id: 6,
    type: "progress",
    icon: "📖",
    color: "#b197fc",
    title: "Progresso em Leitura",
    body: "Gael completou 2 fases de Leitura esta semana. Ele está indo muito bem!",
    time: "2 dias atrás",
    read: true,
  },
  {
    id: 7,
    type: "achievement",
    icon: "⭐",
    color: "#ffde59",
    title: "3 estrelas na fase 1 de Fala!",
    body: "Gael obteve a pontuação máxima em Sons Iniciais. Que orgulho!",
    time: "3 dias atrás",
    read: true,
  },
];

const typeLabels: Record<string, string> = {
  achievement: "Conquista",
  progress: "Progresso",
  alert: "Alerta",
  tip: "Dica",
  forum: "Fórum",
};

const typeIcons: Record<string, any> = {
  achievement: Trophy,
  progress: Star,
  alert: AlertCircle,
  tip: BookOpen,
  forum: Bell,
};

export function ParentNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const dismiss = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const displayed = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffdf7] to-[#fce4ec]/10 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#ff6b9a] to-[#ffb3cc] px-6 pt-10 pb-6 shadow-lg">
        <motion.div initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-white" fill="white" />
              <h1 className="text-2xl font-bold text-white">Notificações</h1>
              {unreadCount > 0 && (
                <span className="bg-white text-[#ff6b9a] text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1.5 bg-white/25 hover:bg-white/40 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                Marcar todas como lidas
              </button>
            )}
          </div>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex gap-2 mt-4">
          {[
            { id: "all" as const, label: "Todas" },
            { id: "unread" as const, label: `Não lidas${unreadCount > 0 ? ` (${unreadCount})` : ""}` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === tab.id
                  ? "bg-white text-[#ff6b9a] shadow-md"
                  : "bg-white/25 text-white hover:bg-white/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4">
        {displayed.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-3 py-20"
          >
            <span className="text-6xl">🎉</span>
            <p className="font-bold text-[#494949]">Tudo em dia!</p>
            <p className="text-sm text-[#494949]/60 text-center">Nenhuma notificação não lida.</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {displayed.map((notif, i) => {
              const IconComp = typeIcons[notif.type];
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => markRead(notif.id)}
                  className={`relative bg-white rounded-2xl p-4 shadow-md cursor-pointer transition-all ${
                    !notif.read ? "ring-2 ring-[#ff6b9a]/30 shadow-lg" : ""
                  }`}
                >
                  {/* Unread dot */}
                  {!notif.read && (
                    <div className="absolute top-4 right-10 w-2 h-2 rounded-full bg-[#ff6b9a]" />
                  )}

                  {/* Dismiss */}
                  <button
                    onClick={(e) => { e.stopPropagation(); dismiss(notif.id); }}
                    className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center text-gray-300 hover:text-gray-500"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm"
                      style={{ backgroundColor: `${notif.color}20` }}
                    >
                      {notif.icon}
                    </div>
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${notif.color}20`, color: notif.color }}
                        >
                          {typeLabels[notif.type]}
                        </span>
                        <span className="text-[10px] text-[#494949]/50">{notif.time}</span>
                      </div>
                      <p className={`text-sm font-bold mb-1 ${notif.read ? "text-[#494949]" : "text-[#494949]"}`}>
                        {notif.title}
                      </p>
                      <p className="text-xs text-[#494949]/70 leading-relaxed">{notif.body}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
