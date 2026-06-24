import { useState } from "react";
import { motion } from "motion/react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line, Legend,
} from "recharts";
import { TrendingUp, Star, Clock, Flame, Award } from "lucide-react";

type StatTab = "overview" | "fala" | "leitura" | "escrita";

const weekData = [
  { day: "Seg", fala: 20, leitura: 15, escrita: 10 },
  { day: "Ter", fala: 35, leitura: 20, escrita: 25 },
  { day: "Qua", fala: 15, leitura: 30, escrita: 20 },
  { day: "Qui", fala: 40, leitura: 25, escrita: 15 },
  { day: "Sex", fala: 25, leitura: 40, escrita: 30 },
  { day: "Sáb", fala: 50, leitura: 35, escrita: 40 },
  { day: "Dom", fala: 30, leitura: 20, escrita: 25 },
];

const radarData = [
  { subject: "Fala", value: 75, fullMark: 100 },
  { subject: "Leitura", subject2: "Leitura", value: 45, fullMark: 100 },
  { subject: "Escrita", value: 55, fullMark: 100 },
  { subject: "Pronúncia", value: 80, fullMark: 100 },
  { subject: "Vocabulário", value: 60, fullMark: 100 },
];

const comparisonData = [
  { name: "Gael", fala: 320, leitura: 250, escrita: 280 },
  { name: "Média turma", fala: 280, leitura: 220, escrita: 240 },
  { name: "Top aluno", fala: 420, leitura: 380, escrita: 350 },
];

const phaseDetails: Record<string, { phase: string; stars: number; date: string; time: string }[]> = {
  fala: [
    { phase: "Sons Iniciais", stars: 3, date: "02/06", time: "8 min" },
    { phase: "Vogais A-E-I", stars: 2, date: "04/06", time: "12 min" },
    { phase: "Vogais O-U", stars: 3, date: "06/06", time: "7 min" },
    { phase: "Sons de Animais", stars: 1, date: "10/06", time: "15 min" },
  ],
  leitura: [
    { phase: "Conhecer Vogais", stars: 3, date: "03/06", time: "10 min" },
    { phase: "Letras do Nome", stars: 2, date: "08/06", time: "14 min" },
  ],
  escrita: [
    { phase: "Traçar Letras", stars: 3, date: "05/06", time: "11 min" },
  ],
};

const areaConfig = {
  fala: { label: "Fala", emoji: "🗣️", color: "#ffde59", bg: "from-[#ffde59] to-[#ffe990]", completed: 4, total: 15, points: 320 },
  leitura: { label: "Leitura", emoji: "📖", color: "#b197fc", bg: "from-[#b197fc] to-[#d4c4fe]", completed: 2, total: 15, points: 250 },
  escrita: { label: "Escrita", emoji: "✍️", color: "#41b8d5", bg: "from-[#41b8d5] to-[#6ec6ff]", completed: 1, total: 15, points: 280 },
};

export function ParentStats() {
  const [activeTab, setActiveTab] = useState<StatTab>("overview");

  const tabs: { id: StatTab; label: string; emoji: string }[] = [
    { id: "overview", label: "Visão Geral", emoji: "📊" },
    { id: "fala", label: "Fala", emoji: "🗣️" },
    { id: "leitura", label: "Leitura", emoji: "📖" },
    { id: "escrita", label: "Escrita", emoji: "✍️" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffdf7] to-[#fce4ec]/10 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#ff6b9a] to-[#ffb3cc] px-6 pt-10 pb-6 shadow-lg">
        <motion.div initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-white" />
            <h1 className="text-2xl font-bold text-white">Desenvolvimento</h1>
          </div>
          <p className="text-white/80 text-sm">Progresso detalhado do Gael</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-white text-[#ff6b9a] shadow-md"
                  : "bg-white/25 text-white hover:bg-white/40"
              }`}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-5 space-y-5">
        {activeTab === "overview" && (
          <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            {/* Summary cards */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Pontos totais", value: "850", icon: Star, color: "#ffde59" },
                { label: "Sequência", value: "7 dias", icon: Flame, color: "#ff6b9a" },
                { label: "Fases OK", value: "12/45", icon: Award, color: "#b197fc" },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="bg-white rounded-2xl p-3 shadow-md text-center">
                    <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: `${s.color}20` }}>
                      <Icon className="w-4 h-4" style={{ color: s.color }} fill={s.color} />
                    </div>
                    <p className="font-bold text-sm text-[#494949]">{s.value}</p>
                    <p className="text-[10px] text-[#494949]/60 leading-tight">{s.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Radar chart */}
            <div className="bg-white rounded-2xl p-4 shadow-md">
              <h3 className="font-bold text-[#494949] mb-3 text-sm">Mapa de habilidades</h3>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#494949" }} />
                  <Radar dataKey="value" stroke="#ff6b9a" fill="#ff6b9a" fillOpacity={0.25} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Weekly activity */}
            <div className="bg-white rounded-2xl p-4 shadow-md">
              <h3 className="font-bold text-[#494949] mb-3 text-sm">Minutos estudados esta semana</h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={weekData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="fala" stroke="#ffde59" strokeWidth={2} dot={false} name="Fala" />
                  <Line type="monotone" dataKey="leitura" stroke="#b197fc" strokeWidth={2} dot={false} name="Leitura" />
                  <Line type="monotone" dataKey="escrita" stroke="#41b8d5" strokeWidth={2} dot={false} name="Escrita" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Comparison */}
            <div className="bg-white rounded-2xl p-4 shadow-md">
              <h3 className="font-bold text-[#494949] mb-1 text-sm">Comparativo com outros alunos</h3>
              <p className="text-xs text-[#494949]/50 mb-3">Pontos por área</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={comparisonData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                  <Bar dataKey="fala" fill="#ffde59" name="Fala" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="leitura" fill="#b197fc" name="Leitura" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="escrita" fill="#41b8d5" name="Escrita" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {(activeTab === "fala" || activeTab === "leitura" || activeTab === "escrita") && (
          <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            {(() => {
              const cfg = areaConfig[activeTab];
              const phases = phaseDetails[activeTab];
              const pct = (cfg.completed / cfg.total) * 100;
              return (
                <>
                  {/* Area header card */}
                  <div
                    className="rounded-2xl p-5 shadow-lg text-white"
                    style={{ background: `linear-gradient(135deg, ${cfg.color}, ${cfg.color}cc)` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-white/80 text-sm">Área de</p>
                        <h2 className="text-2xl font-bold">{cfg.label} {cfg.emoji}</h2>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold">{cfg.points}</p>
                        <p className="text-white/80 text-xs">pontos</p>
                      </div>
                    </div>
                    <div className="bg-white/30 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-white rounded-full"
                      />
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="text-white/80 text-xs">{cfg.completed} fases completas</span>
                      <span className="text-white/80 text-xs">{cfg.total - cfg.completed} restantes</span>
                    </div>
                  </div>

                  {/* Weekly chart for this area */}
                  <div className="bg-white rounded-2xl p-4 shadow-md">
                    <h3 className="font-bold text-[#494949] mb-3 text-sm">Minutos por dia — {cfg.label}</h3>
                    <ResponsiveContainer width="100%" height={160}>
                      <BarChart data={weekData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                        <Bar dataKey={activeTab === "fala" ? "fala" : activeTab === "leitura" ? "leitura" : "escrita"} fill={cfg.color} radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Phase list */}
                  <div className="bg-white rounded-2xl p-4 shadow-md">
                    <h3 className="font-bold text-[#494949] mb-3 text-sm">Fases completadas</h3>
                    <div className="space-y-3">
                      {phases.map((p, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                            style={{ backgroundColor: cfg.color }}
                          >
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-[#494949]">{p.phase}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <div className="flex gap-0.5">
                                {[1, 2, 3].map((s) => (
                                  <Star
                                    key={s}
                                    className={`w-3 h-3 ${s <= p.stars ? "fill-[#ffde59] text-[#ffde59]" : "fill-gray-200 text-gray-200"}`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-[#494949]/50">{p.date} • {p.time}</span>
                            </div>
                          </div>
                          <Clock className="w-4 h-4 text-[#494949]/30" />
                        </div>
                      ))}
                      {phases.length === 0 && (
                        <p className="text-sm text-[#494949]/50 text-center py-4">Nenhuma fase completada ainda</p>
                      )}
                    </div>
                  </div>

                  {/* Observation box */}
                  <div className="bg-[#d7fdc7] rounded-2xl p-4 shadow-sm">
                    <p className="text-xs font-bold text-[#494949] mb-1">💡 Observação do sistema</p>
                    <p className="text-xs text-[#494949]/80 leading-relaxed">
                      {activeTab === "fala"
                        ? "Gael demonstra boa progressão na área de Fala. As fases com sons de animais e repetição de palavras podem receber mais atenção nas próximas sessões."
                        : activeTab === "leitura"
                        ? "O ritmo de leitura está abaixo da média esperada para a faixa etária. Recomendamos sessões mais frequentes de 10-15 minutos."
                        : "Gael está no início da jornada de Escrita. O traçado de letras está sendo bem trabalhado. Continue incentivando!"}
                    </p>
                  </div>
                </>
              );
            })()}
          </motion.div>
        )}
      </div>
    </div>
  );
}
