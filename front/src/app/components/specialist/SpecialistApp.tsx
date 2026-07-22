import { useState } from "react";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse, faChartLine, faComments, faPen, faUser,
  faBell, faPlus, faPaperPlane, faSearch, faFilter,
  faStethoscope, faGraduationCap, faChalkboardTeacher,
  faCheck, faTimes, faImage, faLink, faBookOpen,
  faEye, faHeart, faBookmark, faReply, faCalendarDays,
  faLock, faCircleUser, faArrowLeft, faEnvelope,
  faChartBar, faBrain, faMicrophone, faFileAlt,
  faSchool, faUsers
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartReg,
  faBookmark as faBookmarkReg,
  faComment as faCommentReg,
} from "@fortawesome/free-regular-svg-icons";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend,
} from "recharts";

type SpecTab = "feed" | "messages" | "learners" | "profile";

// ── Data ─────────────────────────────────────────────────────────────────────

const conversations = [
  {
    id: 1, name: "Ana Paula Silva", role: "Mãe do Gael", avatar: "👩", last: "Gael está avançando bem em Fala!", time: "14h32", unread: 2, type: "parent",
  },
  {
    id: 2, name: "Escola M. Monteiro Lobato", role: "Instituição", avatar: "🏫", last: "Obrigada pelo relatório enviado.", time: "13h10", unread: 0, type: "school",
  },
  {
    id: 3, name: "Carlos Eduardo Silva", role: "Pai do Gael", avatar: "👨", last: "Ele disse que adorou a última atividade!", time: "Ontem", unread: 1, type: "parent",
  },
  {
    id: 4, name: "Colégio Viva a Vida", role: "Instituição", avatar: "🎒", last: "Podemos agendar uma reunião?", time: "Ter", unread: 0, type: "school",
  },
];

const chatMessages = [
  { id: 1, from: "them", text: "Olá Dra. Camila! Queria saber como o Gael está evoluindo na fala.", time: "13h50" },
  { id: 2, from: "me", text: "Oi Ana Paula! Ele teve uma ótima semana. Completou a fase de Sons de Animais com 2 estrelas.", time: "13h52" },
  { id: 3, from: "them", text: "Que boa notícia! Em casa ele está tentando mais também. 😊", time: "13h55" },
  { id: 4, from: "me", text: "Perfeito! Continue incentivando sessões curtas de 10 min. Vou enviar um relatório detalhado.", time: "14h00" },
  { id: 5, from: "them", text: "Gael está avançando bem em Fala!", time: "14h32" },
];

const authorizedLearners = [
  {
    id: 1, name: "Gael Silva", age: 6, avatar: "🐻", guardian: "Ana Paula Silva",
    school: "E.M. Monteiro Lobato",
    fala: { completed: 4, total: 15, points: 320, weekMins: [20, 35, 15, 40, 25, 50, 30] },
    leitura: { completed: 2, total: 15, points: 250, weekMins: [15, 20, 30, 25, 40, 35, 20] },
    escrita: { completed: 1, total: 15, points: 280, weekMins: [10, 25, 20, 15, 30, 40, 25] },
    radar: [
      { subject: "Fala", value: 75 }, { subject: "Leitura", value: 45 },
      { subject: "Escrita", value: 55 }, { subject: "Pronúncia", value: 80 }, { subject: "Vocab.", value: 60 },
    ],
  },
  {
    id: 2, name: "Beatriz Melo", age: 7, avatar: "🐙", guardian: "Roberto Melo",
    school: "Colégio Viva a Vida",
    fala: { completed: 6, total: 15, points: 440, weekMins: [30, 40, 50, 35, 45, 60, 40] },
    leitura: { completed: 5, total: 15, points: 380, weekMins: [25, 35, 40, 45, 30, 50, 35] },
    escrita: { completed: 3, total: 15, points: 280, weekMins: [15, 20, 25, 30, 20, 35, 25] },
    radar: [
      { subject: "Fala", value: 85 }, { subject: "Leitura", value: 72 },
      { subject: "Escrita", value: 60 }, { subject: "Pronúncia", value: 78 }, { subject: "Vocab.", value: 75 },
    ],
  },
];

const myPosts = [
  { id: 1, title: "Como estimular a fala em casa — 5 dicas", category: "Fala", categoryColor: "#ffde59", views: 142, likes: 48, date: "15/06/2026", status: "published" },
  { id: 2, title: "Sinais de dislexia que todo responsável deve conhecer", category: "Leitura", categoryColor: "#b197fc", views: 310, likes: 92, date: "18/06/2026", status: "published" },
  { id: 3, title: "Exercícios de coordenação motora para a escrita", category: "Escrita", categoryColor: "#41b8d5", views: 0, likes: 0, date: "—", status: "draft" },
];

const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

// ── Sub-screens ───────────────────────────────────────────────────────────────

function SpecFeed({ onNewPost }: { onNewPost: () => void }) {
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [saved, setSaved] = useState<Record<number, boolean>>({});

  return (
    <div className="min-h-screen bg-[#fffdf7] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#41b8d5] to-[#6ec6ff] px-6 pt-10 pb-6 shadow-lg">
        <motion.div initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Bem-vinda,</p>
              <h1 className="text-2xl font-bold text-white">Dra. Camila Rocha</h1>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/25 flex items-center justify-center text-xl">
              👩‍⚕️
            </div>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/25 px-3 py-1.5 rounded-full mt-3">
            <FontAwesomeIcon icon={faStethoscope} className="text-white w-3 h-3" />
            <span className="text-white text-xs font-bold">Fonoaudióloga</span>
          </div>
        </motion.div>
      </div>

      <div className="max-w-md mx-auto px-4 py-5 space-y-4">
        {/* New post CTA */}
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onNewPost}
          className="w-full bg-gradient-to-r from-[#41b8d5] to-[#6ec6ff] text-white rounded-2xl py-3.5 font-bold text-sm shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all"
          whileTap={{ scale: 0.97 }}
        >
          <FontAwesomeIcon icon={faPlus} />
          Nova publicação
        </motion.button>

        {/* My posts */}
        <div>
          <h2 className="font-bold text-[#494949] text-sm mb-3">Minhas publicações</h2>
          <div className="space-y-3">
            {myPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-4 shadow-md"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${post.categoryColor}20`, color: post.categoryColor }}
                    >
                      {post.category}
                    </span>
                    <p className="font-bold text-sm text-[#494949] mt-1.5">{post.title}</p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0 ${
                      post.status === "published" ? "bg-[#d7fdc7] text-[#2d7a3d]" : "bg-[#ffe990] text-[#7a6000]"
                    }`}
                  >
                    {post.status === "published" ? "✓ Publicado" : "Rascunho"}
                  </span>
                </div>
                {post.status === "published" && (
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1.5 text-[#494949]/50">
                      <FontAwesomeIcon icon={faEye} className="w-3 h-3" />
                      <span className="text-xs">{post.views}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#ff6b9a]/70">
                      <FontAwesomeIcon icon={faHeart} className="w-3 h-3" />
                      <span className="text-xs">{post.likes}</span>
                    </div>
                    <span className="text-xs text-[#494949]/40 ml-auto">{post.date}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Community feed */}
        <div>
          <h2 className="font-bold text-[#494949] text-sm mb-3">Feed da comunidade</h2>
          {[
            { author: "Prof. Rafael Lima", role: "Pedagogo", roleColor: "#b197fc", avatar: "👨‍🏫", time: "3h", category: "Leitura", catColor: "#b197fc", title: "A importância do jogo no processo de alfabetização", likes: 67, comments: 19 },
            { author: "Dra. Patrícia Souza", role: "Psicopedagoga", roleColor: "#ff6b9a", avatar: "👩‍🎓", time: "1d", category: "Desenvolvimento", catColor: "#6ce5e8", title: "Estratégias para motivar crianças com dificuldades de atenção", likes: 54, comments: 11 },
          ].map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-white rounded-2xl shadow-md mb-3 overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xl">{p.avatar}</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#494949]">{p.author}</p>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: p.roleColor }}>{p.role}</span>
                      <span className="text-[10px] text-[#494949]/50">{p.time} atrás</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ backgroundColor: `${p.catColor}20`, color: p.catColor }}>{p.category}</span>
                </div>
                <p className="font-bold text-sm text-[#494949] mb-3">{p.title}</p>
                <div className="flex items-center gap-4 pt-2 border-t border-gray-50">
                  <button
                    onClick={() => setLiked(l => ({ ...l, [i]: !l[i] }))}
                    className={`flex items-center gap-1.5 transition-colors ${liked[i] ? "text-[#ff6b9a]" : "text-[#494949]/40"}`}
                  >
                    <FontAwesomeIcon icon={liked[i] ? faHeart : faHeartReg} className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold">{p.likes + (liked[i] ? 1 : 0)}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-[#494949]/40">
                    <FontAwesomeIcon icon={faCommentReg} className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold">{p.comments}</span>
                  </button>
                  <button
                    onClick={() => setSaved(s => ({ ...s, [i]: !s[i] }))}
                    className={`ml-auto transition-colors ${saved[i] ? "text-[#41b8d5]" : "text-[#494949]/40"}`}
                  >
                    <FontAwesomeIcon icon={saved[i] ? faBookmark : faBookmarkReg} className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SpecMessages() {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(chatMessages);
  const [filter, setFilter] = useState<"all" | "parent" | "school">("all");

  const filtered = conversations.filter(c => filter === "all" || c.type === filter);
  const activeConv = conversations.find(c => c.id === activeChat);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), from: "me", text: message, time: "agora" }]);
    setMessage("");
  };

  if (activeChat && activeConv) {
    return (
      <div className="flex flex-col h-screen bg-[#fffdf7]">
        {/* Chat header */}
        <div className="bg-gradient-to-r from-[#41b8d5] to-[#6ec6ff] px-4 pt-10 pb-4 shadow-lg">
          <div className="flex items-center gap-3">
            <button onClick={() => setActiveChat(null)} className="w-9 h-9 bg-white/25 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faArrowLeft} className="text-white w-4 h-4" />
            </button>
            <div className="w-10 h-10 rounded-full bg-white/25 flex items-center justify-center text-2xl">
              {activeConv.avatar}
            </div>
            <div>
              <p className="font-bold text-white text-sm">{activeConv.name}</p>
              <p className="text-white/70 text-xs">{activeConv.role}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-24">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                  msg.from === "me"
                    ? "bg-gradient-to-br from-[#41b8d5] to-[#6ec6ff] text-white rounded-br-sm"
                    : "bg-white text-[#494949] rounded-bl-sm"
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>
                <p className={`text-[10px] mt-1 ${msg.from === "me" ? "text-white/70" : "text-[#494949]/50"}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3">
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Escreva uma mensagem..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#41b8d5] transition-colors"
          />
          <motion.button
            onClick={sendMessage}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 bg-gradient-to-br from-[#41b8d5] to-[#6ec6ff] rounded-full flex items-center justify-center shadow-md"
          >
            <FontAwesomeIcon icon={faPaperPlane} className="text-white w-4 h-4" />
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffdf7] pb-24">
      <div className="bg-gradient-to-r from-[#41b8d5] to-[#6ec6ff] px-6 pt-10 pb-6 shadow-lg">
        <motion.div initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="flex items-center gap-2 mb-1">
            <FontAwesomeIcon icon={faComments} className="text-white w-5 h-5" />
            <h1 className="text-2xl font-bold text-white">Mensagens</h1>
          </div>
          <p className="text-white/80 text-sm">Pais e instituições de ensino</p>
        </motion.div>
        <div className="flex gap-2 mt-4">
          {[{ id: "all", label: "Todos" }, { id: "parent", label: "👨‍👩‍👧 Pais" }, { id: "school", label: "🏫 Escolas" }].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${filter === tab.id ? "bg-white text-[#41b8d5] shadow" : "bg-white/25 text-white hover:bg-white/40"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4 space-y-2">
        {filtered.map((conv, i) => (
          <motion.button
            key={conv.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            onClick={() => setActiveChat(conv.id)}
            className="w-full bg-white rounded-2xl p-4 shadow-md flex items-center gap-3 hover:shadow-lg transition-all text-left"
            whileTap={{ scale: 0.98 }}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${conv.type === "school" ? "bg-[#d7fdc7]" : "bg-[#fce4ec]"}`}>
              {conv.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <p className="font-bold text-sm text-[#494949] truncate">{conv.name}</p>
                <span className="text-[10px] text-[#494949]/50 flex-shrink-0 ml-2">{conv.time}</span>
              </div>
              <p className="text-xs text-[#494949]/60">{conv.role}</p>
              <p className="text-xs text-[#494949]/70 truncate mt-0.5">{conv.last}</p>
            </div>
            {conv.unread > 0 && (
              <span className="w-5 h-5 bg-[#ff6b9a] rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                {conv.unread}
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function SpecLearners() {
  const [selected, setSelected] = useState<typeof authorizedLearners[0] | null>(null);
  const [chartTab, setChartTab] = useState<"fala" | "leitura" | "escrita">("fala");

  if (selected) {
    const area = selected[chartTab];
    const weekData = days.map((day, i) => ({ day, minutos: area.weekMins[i] }));
    const areaColor = chartTab === "fala" ? "#ffde59" : chartTab === "leitura" ? "#b197fc" : "#41b8d5";

    return (
      <div className="min-h-screen bg-[#fffdf7] pb-24">
        <div className="bg-gradient-to-r from-[#41b8d5] to-[#6ec6ff] px-6 pt-10 pb-6 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={() => setSelected(null)} className="w-9 h-9 bg-white/25 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faArrowLeft} className="text-white w-4 h-4" />
            </button>
            <div className="w-10 h-10 rounded-full bg-white/25 flex items-center justify-center text-2xl">{selected.avatar}</div>
            <div>
              <h1 className="text-lg font-bold text-white">{selected.name}</h1>
              <p className="text-white/75 text-xs">{selected.age} anos • {selected.school}</p>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 py-5 space-y-5">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Fala", pts: selected.fala.points, done: selected.fala.completed, color: "#ffde59", emoji: "🗣️" },
              { label: "Leitura", pts: selected.leitura.points, done: selected.leitura.completed, color: "#b197fc", emoji: "📖" },
              { label: "Escrita", pts: selected.escrita.points, done: selected.escrita.completed, color: "#41b8d5", emoji: "✍️" },
            ].map(a => (
              <div key={a.label} className="bg-white rounded-2xl p-3 shadow-md text-center">
                <span className="text-xl">{a.emoji}</span>
                <p className="font-bold text-sm text-[#494949] mt-1">{a.pts} pts</p>
                <p className="text-[10px] text-[#494949]/60">{a.done}/15 fases</p>
              </div>
            ))}
          </div>

          {/* Radar */}
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <p className="font-bold text-sm text-[#494949] mb-3">Mapa de habilidades</p>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={selected.radar}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#494949" }} />
                <Radar dataKey="value" stroke="#41b8d5" fill="#41b8d5" fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Area tabs + chart */}
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <p className="font-bold text-sm text-[#494949] mb-3">Minutos por área esta semana</p>
            <div className="flex gap-2 mb-4">
              {(["fala", "leitura", "escrita"] as const).map(a => (
                <button
                  key={a}
                  onClick={() => setChartTab(a)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${chartTab === a ? "text-white shadow" : "bg-gray-100 text-[#494949]/60"}`}
                  style={chartTab === a ? { backgroundColor: areaColor } : {}}
                >
                  {a === "fala" ? "🗣️" : a === "leitura" ? "📖" : "✍️"} {a.charAt(0).toUpperCase() + a.slice(1)}
                </button>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={weekData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="minutos" fill={areaColor} radius={[6, 6, 0, 0]} name="Minutos" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Observation */}
          <div className="bg-gradient-to-br from-[#d7fdc7] to-[#b8f0c7] rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FontAwesomeIcon icon={faBrain} className="text-[#2d7a3d] w-4 h-4" />
              <p className="text-xs font-bold text-[#2d7a3d]">Adicionar observação clínica</p>
            </div>
            <textarea
              placeholder={`Escreva suas observações sobre ${selected.name}...`}
              className="w-full bg-white/60 rounded-xl p-3 text-xs text-[#494949] placeholder-gray-400 focus:outline-none resize-none border border-white/80"
              rows={3}
            />
            <button className="mt-2 flex items-center gap-2 bg-[#2d7a3d] text-white text-xs font-bold px-4 py-2 rounded-xl">
              <FontAwesomeIcon icon={faPaperPlane} className="w-3 h-3" />
              Salvar observação
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffdf7] pb-24">
      <div className="bg-gradient-to-r from-[#41b8d5] to-[#6ec6ff] px-6 pt-10 pb-6 shadow-lg">
        <motion.div initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="flex items-center gap-2 mb-1">
            <FontAwesomeIcon icon={faChartLine} className="text-white w-5 h-5" />
            <h1 className="text-2xl font-bold text-white">Aprendizes</h1>
          </div>
          <p className="text-white/80 text-sm">Autorizados para acompanhamento</p>
        </motion.div>
      </div>

      <div className="max-w-md mx-auto px-4 py-5 space-y-3">
        {authorizedLearners.map((learner, i) => (
          <motion.button
            key={learner.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelected(learner)}
            className="w-full bg-white rounded-2xl p-5 shadow-md text-left hover:shadow-lg transition-all"
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ffe990] to-[#ffde59] flex items-center justify-center text-3xl shadow">
                {learner.avatar}
              </div>
              <div>
                <p className="font-bold text-[#494949]">{learner.name}</p>
                <p className="text-xs text-[#494949]/60">{learner.age} anos</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <FontAwesomeIcon icon={faSchool} className="text-[#41b8d5] w-3 h-3" />
                  <p className="text-xs text-[#494949]/60">{learner.school}</p>
                </div>
              </div>
              <div className="ml-auto">
                <span className="text-[10px] bg-[#d7fdc7] text-[#2d7a3d] font-bold px-2 py-1 rounded-full">
                  <FontAwesomeIcon icon={faLock} className="w-2.5 h-2.5 mr-1" />
                  Autorizado
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Fala", pts: learner.fala.points, color: "#ffde59" },
                { label: "Leitura", pts: learner.leitura.points, color: "#b197fc" },
                { label: "Escrita", pts: learner.escrita.points, color: "#41b8d5" },
              ].map(a => (
                <div key={a.label} className="bg-gray-50 rounded-xl p-2 text-center">
                  <p className="text-xs font-bold" style={{ color: a.color }}>{a.pts}</p>
                  <p className="text-[10px] text-[#494949]/60">{a.label}</p>
                </div>
              ))}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function NewPostScreen({ onBack }: { onBack: () => void }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("Fala");
  const [published, setPublished] = useState(false);

  if (published) {
    return (
      <div className="min-h-screen bg-[#fffdf7] flex flex-col items-center justify-center px-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-[#494949] mb-2">Publicado!</h2>
          <p className="text-sm text-[#494949]/60 mb-6">Seu artigo foi enviado para revisão e será publicado em breve.</p>
          <button onClick={onBack} className="bg-gradient-to-r from-[#41b8d5] to-[#6ec6ff] text-white font-bold px-6 py-3 rounded-2xl shadow-lg">
            Voltar ao feed
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffdf7] pb-10">
      <div className="bg-gradient-to-r from-[#41b8d5] to-[#6ec6ff] px-6 pt-10 pb-6 shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 bg-white/25 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faArrowLeft} className="text-white w-4 h-4" />
          </button>
          <h1 className="text-xl font-bold text-white">Nova Publicação</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-5 space-y-4">
        {/* Category */}
        <div>
          <label className="text-xs font-bold text-[#494949]/70 block mb-2">Categoria</label>
          <div className="flex gap-2 flex-wrap">
            {[
              { label: "Fala", color: "#ffde59" }, { label: "Leitura", color: "#b197fc" },
              { label: "Escrita", color: "#41b8d5" }, { label: "Desenvolvimento", color: "#6ce5e8" },
              { label: "Dicas Gerais", color: "#ff6b9a" },
            ].map(cat => (
              <button
                key={cat.label}
                onClick={() => setCategory(cat.label)}
                className="px-3 py-1.5 rounded-full text-xs font-bold transition-all"
                style={
                  category === cat.label
                    ? { backgroundColor: cat.color, color: "#fff" }
                    : { backgroundColor: `${cat.color}20`, color: cat.color }
                }
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="text-xs font-bold text-[#494949]/70 block mb-1.5">Título</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Ex: 5 dicas para estimular a leitura..."
            className="w-full bg-white border-2 border-gray-200 rounded-2xl px-4 py-3 text-sm text-[#494949] focus:outline-none focus:border-[#41b8d5] transition-colors"
          />
        </div>

        {/* Body */}
        <div>
          <label className="text-xs font-bold text-[#494949]/70 block mb-1.5">Conteúdo</label>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Escreva seu artigo ou dica aqui..."
            rows={8}
            className="w-full bg-white border-2 border-gray-200 rounded-2xl px-4 py-3 text-sm text-[#494949] focus:outline-none focus:border-[#41b8d5] transition-colors resize-none"
          />
        </div>

        {/* Toolbar */}
        <div className="flex gap-3">
          {[faImage, faLink, faFileAlt].map((icon, i) => (
            <button key={i} className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-[#494949]/50 hover:text-[#41b8d5] transition-colors shadow-sm">
              <FontAwesomeIcon icon={icon} className="w-4 h-4" />
            </button>
          ))}
        </div>

        {/* Publish */}
        <div className="flex gap-3">
          <button onClick={onBack} className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-sm font-bold text-[#494949] hover:bg-gray-50 transition-colors">
            Salvar rascunho
          </button>
          <motion.button
            onClick={() => setPublished(true)}
            disabled={!title || !body}
            whileTap={{ scale: 0.97 }}
            className={`flex-1 py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${
              title && body
                ? "bg-gradient-to-r from-[#41b8d5] to-[#6ec6ff] text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FontAwesomeIcon icon={faPaperPlane} className="w-3.5 h-3.5" />
            Publicar
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function SpecProfileScreen({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-[#fffdf7] pb-24">
      <div className="bg-gradient-to-r from-[#41b8d5] to-[#6ec6ff] px-6 pt-10 pb-14 shadow-xl">
        <motion.div initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center">
          <div className="w-20 h-20 rounded-full bg-white mx-auto mb-3 flex items-center justify-center text-5xl shadow-2xl ring-4 ring-white/50">👩‍⚕️</div>
          <h1 className="text-2xl font-bold text-white">Dra. Camila Rocha</h1>
          <p className="text-white/80 text-sm">CRFa 12345-SP</p>
          <div className="inline-flex items-center gap-2 bg-white/25 px-4 py-1.5 rounded-full mt-2">
            <FontAwesomeIcon icon={faStethoscope} className="text-white w-3.5 h-3.5" />
            <span className="text-white text-xs font-bold">Fonoaudióloga</span>
          </div>
        </motion.div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-8">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-5 shadow-2xl space-y-3">
          {[
            { icon: faEnvelope, label: "camila.rocha@fono.com.br", color: "#41b8d5" },
            { icon: faGraduationCap, label: "USP — Fonoaudiologia (2018)", color: "#b197fc" },
            { icon: faCalendarDays, label: "Membro desde 01/01/2026", color: "#ffde59" },
            { icon: faUsers, label: "2 aprendizes acompanhados", color: "#ff6b9a" },
          ].map(({ icon, label, color }, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                <FontAwesomeIcon icon={icon} className="w-4 h-4" style={{ color }} />
              </div>
              <span className="text-sm text-[#494949]">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-md mx-auto px-6 mt-5">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={onLogout}
          className="w-full border-2 border-[#ff6b9a]/30 rounded-2xl py-3.5 text-sm font-bold text-[#ff6b9a] flex items-center justify-center gap-2 hover:bg-[#ff6b9a]/5 transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
          Sair da conta
        </motion.button>
      </div>
    </div>
  );
}

// ── Bottom Nav ────────────────────────────────────────────────────────────────

function SpecBottomNav({ active, onChange }: { active: SpecTab; onChange: (t: SpecTab) => void }) {
  const tabs = [
    { id: "feed" as SpecTab, icon: faHouse, label: "Feed" },
    { id: "messages" as SpecTab, icon: faComments, label: "Mensagens" },
    { id: "learners" as SpecTab, icon: faChartLine, label: "Aprendizes" },
    { id: "profile" as SpecTab, icon: faUser, label: "Perfil" },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-100 z-50">
      <div className="max-w-md mx-auto px-2 py-2 flex justify-around">
        {tabs.map((tab, i) => {
          const isActive = active === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-2xl transition-all ${isActive ? "bg-[#41b8d5]/10" : ""}`}
              whileTap={{ scale: 0.9 }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <FontAwesomeIcon icon={tab.icon} className={`w-5 h-5 transition-colors ${isActive ? "text-[#41b8d5]" : "text-[#494949]/40"}`} />
              <span className={`text-[10px] font-semibold ${isActive ? "text-[#41b8d5]" : "text-[#494949]/40"}`}>{tab.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function SpecialistApp({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<SpecTab>("feed");
  const [newPost, setNewPost] = useState(false);

  if (newPost) return <NewPostScreen onBack={() => setNewPost(false)} />;

  return (
    <div>
      {tab === "feed" && <SpecFeed onNewPost={() => setNewPost(true)} />}
      {tab === "messages" && <SpecMessages />}
      {tab === "learners" && <SpecLearners />}
      {tab === "profile" && <SpecProfileScreen onLogout={onLogout} />}
      <SpecBottomNav active={tab} onChange={setTab} />
    </div>
  );
}
