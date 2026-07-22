import { useState } from "react";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShield, faFileAlt, faUsers, faChartBar, faGear,
  faSearch, faFilter, faCheck, faBan, faTrash, faEye,
  faFlag, faArrowLeft, faTimes, faChevronDown,
  faStethoscope, faGraduationCap, faChalkboardTeacher,
  faCircleCheck, faCircleXmark, faHourglass,
  faPen, faComments, faTriangleExclamation,
  faUser, faClock, faSort, faArrowsUpDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";

type AdminTab = "posts" | "specialists" | "metrics" | "profile";

// ── Data ─────────────────────────────────────────────────────────────────────

const allPosts = [
  { id: 1, title: "Como estimular a fala em casa — 5 dicas práticas", author: "Dra. Camila Rocha", role: "Fonoaudióloga", roleColor: "#41b8d5", category: "Fala", catColor: "#ffde59", date: "15/06/2026", status: "published", likes: 48, reports: 0, flagged: false },
  { id: 2, title: "Sinais de dislexia que todo responsável deve conhecer", author: "Prof. Rafael Lima", role: "Pedagogo", roleColor: "#b197fc", category: "Leitura", catColor: "#b197fc", date: "18/06/2026", status: "published", likes: 92, reports: 0, flagged: false },
  { id: 3, title: "A importância do jogo no processo de alfabetização", author: "Dra. Patrícia Souza", role: "Psicopedagoga", roleColor: "#ff6b9a", category: "Desenvolvimento", catColor: "#6ce5e8", date: "20/06/2026", status: "pending", likes: 0, reports: 0, flagged: false },
  { id: 4, title: "Caligrafia x digitação: o que priorizar na infância?", author: "Prof.ª Ana Beatriz", role: "Professora", roleColor: "#ffe990", category: "Escrita", catColor: "#41b8d5", date: "21/06/2026", status: "published", likes: 34, reports: 1, flagged: true },
  { id: 5, title: "Exercícios de respiração para melhorar a fala", author: "Dra. Camila Rocha", role: "Fonoaudióloga", roleColor: "#41b8d5", category: "Fala", catColor: "#ffde59", date: "22/06/2026", status: "pending", likes: 0, reports: 0, flagged: false },
  { id: 6, title: "Como identificar dificuldades de escrita precocemente", author: "Prof. Rafael Lima", role: "Pedagogo", roleColor: "#b197fc", category: "Escrita", catColor: "#41b8d5", date: "22/06/2026", status: "rejected", likes: 0, reports: 2, flagged: true },
];

const allSpecialists = [
  { id: 1, name: "Dra. Camila Rocha", role: "Fonoaudióloga", roleColor: "#41b8d5", avatar: "👩‍⚕️", reg: "CRFa 12345-SP", email: "camila@fono.com", posts: 2, learners: 2, since: "01/01/2026", status: "active", verified: true },
  { id: 2, name: "Prof. Rafael Lima", role: "Pedagogo", roleColor: "#b197fc", avatar: "👨‍🏫", reg: "CRP 67890-SP", email: "rafael@pedagogo.com", posts: 2, learners: 3, since: "15/02/2026", status: "active", verified: true },
  { id: 3, name: "Dra. Patrícia Souza", role: "Psicopedagoga", roleColor: "#ff6b9a", avatar: "👩‍🎓", reg: "CRP 54321-SP", email: "patricia@psi.com", posts: 1, learners: 0, since: "10/03/2026", status: "pending", verified: false },
  { id: 4, name: "Prof.ª Ana Beatriz", role: "Professora", roleColor: "#ffe990", avatar: "👩‍🏫", reg: "MEC-BR-2021", email: "ana@escola.com", posts: 1, learners: 1, since: "01/06/2026", status: "suspended", verified: true },
];

const metricsData = {
  weekly: [
    { day: "Seg", posts: 2, users: 18, sessions: 45 },
    { day: "Ter", posts: 4, users: 24, sessions: 62 },
    { day: "Qua", posts: 1, users: 31, sessions: 78 },
    { day: "Qui", posts: 3, users: 27, sessions: 55 },
    { day: "Sex", posts: 5, users: 42, sessions: 91 },
    { day: "Sáb", posts: 2, users: 38, sessions: 83 },
    { day: "Dom", posts: 1, users: 22, sessions: 47 },
  ],
  roleDistribution: [
    { name: "Fonoaudiólogos", value: 4, color: "#41b8d5" },
    { name: "Pedagogos", value: 3, color: "#b197fc" },
    { name: "Psicopedagogos", value: 2, color: "#ff6b9a" },
    { name: "Professores", value: 5, color: "#ffde59" },
  ],
};

// ── Post Moderation ───────────────────────────────────────────────────────────

function PostModeration() {
  const [posts, setPosts] = useState(allPosts);
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "published" | "rejected" | "flagged">("all");
  const [catFilter, setCatFilter] = useState("Todas");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState<typeof allPosts[0] | null>(null);

  const approve = (id: number) => setPosts(p => p.map(x => x.id === id ? { ...x, status: "published", flagged: false } : x));
  const reject = (id: number) => setPosts(p => p.map(x => x.id === id ? { ...x, status: "rejected" } : x));
  const remove = (id: number) => setPosts(p => p.filter(x => x.id !== id));

  const filtered = posts.filter(p => {
    if (statusFilter === "flagged" && !p.flagged) return false;
    if (statusFilter !== "all" && statusFilter !== "flagged" && p.status !== statusFilter) return false;
    if (catFilter !== "Todas" && p.category !== catFilter) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.author.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = {
    all: posts.length,
    pending: posts.filter(p => p.status === "pending").length,
    published: posts.filter(p => p.status === "published").length,
    rejected: posts.filter(p => p.status === "rejected").length,
    flagged: posts.filter(p => p.flagged).length,
  };

  const statusConfig = {
    published: { label: "Publicado", color: "#d7fdc7", text: "#2d7a3d", icon: faCircleCheck },
    pending: { label: "Pendente", color: "#ffe990", text: "#7a6000", icon: faHourglass },
    rejected: { label: "Rejeitado", color: "#fce4ec", text: "#c0392b", icon: faCircleXmark },
  };

  if (selected) {
    const cfg = statusConfig[selected.status as keyof typeof statusConfig];
    return (
      <div className="min-h-screen bg-[#fffdf7] pb-10">
        <div className="bg-gradient-to-r from-[#494949] to-[#6b6b6b] px-6 pt-10 pb-5 shadow-lg">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelected(null)} className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faArrowLeft} className="text-white w-4 h-4" />
            </button>
            <h1 className="text-lg font-bold text-white">Revisão do Post</h1>
          </div>
        </div>
        <div className="max-w-md mx-auto px-4 py-5 space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ backgroundColor: `${selected.catColor}20`, color: selected.catColor }}>{selected.category}</span>
              <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ backgroundColor: cfg.color, color: cfg.text }}>
                <FontAwesomeIcon icon={cfg.icon} className="w-2.5 h-2.5 mr-1" />{cfg.label}
              </span>
            </div>
            <h2 className="font-bold text-[#494949] text-base mb-3">{selected.title}</h2>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg">👤</div>
              <div>
                <p className="text-xs font-bold text-[#494949]">{selected.author}</p>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ backgroundColor: selected.roleColor }}>{selected.role}</span>
              </div>
              <span className="text-xs text-[#494949]/50 ml-auto">{selected.date}</span>
            </div>
            {selected.flagged && (
              <div className="bg-[#fce4ec] rounded-xl p-3 flex items-center gap-2 mb-4">
                <FontAwesomeIcon icon={faTriangleExclamation} className="text-[#c0392b] w-4 h-4" />
                <div>
                  <p className="text-xs font-bold text-[#c0392b]">Post denunciado</p>
                  <p className="text-xs text-[#c0392b]/80">{selected.reports} denúncia(s) recebida(s)</p>
                </div>
              </div>
            )}
            <p className="text-sm text-[#494949]/70 leading-relaxed">
              Lorem ipsum — este seria o conteúdo completo do post para revisão pelo administrador. O conteúdo apareceria aqui na íntegra antes da aprovação.
            </p>
          </div>

          {selected.status !== "published" && (
            <div className="flex gap-3">
              <motion.button
                onClick={() => { approve(selected.id); setSelected(null); }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#41b8d5] to-[#6ec6ff] text-white py-3 rounded-2xl font-bold text-sm shadow-lg"
              >
                <FontAwesomeIcon icon={faCheck} /> Aprovar
              </motion.button>
              <motion.button
                onClick={() => { reject(selected.id); setSelected(null); }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 flex items-center justify-center gap-2 bg-[#fce4ec] text-[#c0392b] py-3 rounded-2xl font-bold text-sm border-2 border-[#ff6b9a]/20"
              >
                <FontAwesomeIcon icon={faBan} /> Rejeitar
              </motion.button>
            </div>
          )}
          <motion.button
            onClick={() => { remove(selected.id); setSelected(null); }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 border-2 border-red-200 text-red-400 py-3 rounded-2xl font-bold text-sm hover:bg-red-50 transition-colors"
          >
            <FontAwesomeIcon icon={faTrash} /> Remover permanentemente
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Status filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {(["all", "pending", "published", "rejected", "flagged"] as const).map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              statusFilter === s ? "bg-[#494949] text-white shadow" : "bg-white text-[#494949]/60 border border-gray-200"
            }`}
          >
            {s === "all" ? `Todos (${counts.all})`
              : s === "pending" ? `⏳ Pendentes (${counts.pending})`
              : s === "published" ? `✓ Publicados (${counts.published})`
              : s === "rejected" ? `✗ Rejeitados (${counts.rejected})`
              : `🚩 Flagged (${counts.flagged})`}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar posts ou autores..."
          className="w-full bg-white border border-gray-200 rounded-2xl py-2.5 pl-9 pr-4 text-sm text-[#494949] placeholder-gray-400 focus:outline-none focus:border-[#494949] transition-colors shadow-sm"
        />
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["Todas", "Fala", "Leitura", "Escrita", "Desenvolvimento"].map(c => (
          <button
            key={c}
            onClick={() => setCatFilter(c)}
            className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all ${catFilter === c ? "bg-[#494949]/90 text-white" : "bg-gray-100 text-[#494949]/60"}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Post list */}
      <div className="space-y-3">
        {filtered.map((post, i) => {
          const cfg = statusConfig[post.status as keyof typeof statusConfig];
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`bg-white rounded-2xl p-4 shadow-md ${post.flagged ? "ring-2 ring-red-300" : ""}`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${post.catColor}20`, color: post.catColor }}>{post.category}</span>
                  {post.flagged && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-500 flex items-center gap-1">
                      <FontAwesomeIcon icon={faFlag} className="w-2 h-2" /> Denunciado
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: cfg.color, color: cfg.text }}>{cfg.label}</span>
              </div>

              <p className="font-bold text-sm text-[#494949] mb-1.5 line-clamp-2">{post.title}</p>
              <div className="flex items-center gap-1.5 mb-3">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ backgroundColor: post.roleColor }}>{post.role}</span>
                <span className="text-xs text-[#494949]/60">{post.author}</span>
                <span className="text-xs text-[#494949]/40 ml-auto">{post.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => setSelected(post)} className="flex-1 flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl py-2 text-xs font-bold text-[#494949] transition-colors">
                  <FontAwesomeIcon icon={faEye} className="w-3 h-3" /> Revisar
                </button>
                {post.status === "pending" && (
                  <>
                    <button onClick={() => approve(post.id)} className="flex-1 flex items-center justify-center gap-1.5 bg-[#d7fdc7] hover:bg-[#b8f0c7] rounded-xl py-2 text-xs font-bold text-[#2d7a3d] transition-colors">
                      <FontAwesomeIcon icon={faCheck} className="w-3 h-3" /> Aprovar
                    </button>
                    <button onClick={() => reject(post.id)} className="flex-1 flex items-center justify-center gap-1.5 bg-[#fce4ec] hover:bg-[#fbb6cc] rounded-xl py-2 text-xs font-bold text-[#c0392b] transition-colors">
                      <FontAwesomeIcon icon={faBan} className="w-3 h-3" /> Rejeitar
                    </button>
                  </>
                )}
                <button onClick={() => remove(post.id)} className="w-9 h-9 flex items-center justify-center bg-red-50 hover:bg-red-100 rounded-xl text-red-400 transition-colors flex-shrink-0">
                  <FontAwesomeIcon icon={faTrash} className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#494949]/40">
            <FontAwesomeIcon icon={faFileAlt} className="w-10 h-10 mb-3" />
            <p className="text-sm font-semibold">Nenhum post encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Specialist Management ─────────────────────────────────────────────────────

function SpecialistManagement() {
  const [specialists, setSpecialists] = useState(allSpecialists);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<typeof allSpecialists[0] | null>(null);

  const updateStatus = (id: number, status: string) =>
    setSpecialists(p => p.map(s => s.id === id ? { ...s, status } : s));

  const toggleVerified = (id: number) =>
    setSpecialists(p => p.map(s => s.id === id ? { ...s, verified: !s.verified } : s));

  const filtered = specialists.filter(s => {
    if (statusFilter !== "all" && s.status !== statusFilter) return false;
    if (roleFilter !== "Todos" && s.role !== roleFilter) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const statusConfig = {
    active: { label: "Ativo", color: "#d7fdc7", text: "#2d7a3d" },
    pending: { label: "Pendente", color: "#ffe990", text: "#7a6000" },
    suspended: { label: "Suspenso", color: "#fce4ec", text: "#c0392b" },
  };

  if (selected) {
    const cfg = statusConfig[selected.status as keyof typeof statusConfig];
    return (
      <div className="min-h-screen bg-[#fffdf7] pb-10">
        <div className="bg-gradient-to-r from-[#494949] to-[#6b6b6b] px-6 pt-10 pb-5 shadow-lg">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelected(null)} className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faArrowLeft} className="text-white w-4 h-4" />
            </button>
            <h1 className="text-lg font-bold text-white">Perfil do Especialista</h1>
          </div>
        </div>
        <div className="max-w-md mx-auto px-4 py-5 space-y-4">
          {/* Profile card */}
          <div className="bg-white rounded-2xl p-5 shadow-md text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 mx-auto mb-3 flex items-center justify-center text-4xl">{selected.avatar}</div>
            <h2 className="font-bold text-lg text-[#494949]">{selected.name}</h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: selected.roleColor }}>{selected.role}</span>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: cfg.color, color: cfg.text }}>{cfg.label}</span>
              {selected.verified && <span className="text-[10px] bg-[#d7fdc7] text-[#2d7a3d] font-bold px-2 py-0.5 rounded-full">✓ Verificado</span>}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-md space-y-2.5">
            {[
              { icon: faUser, label: selected.email },
              { icon: faGraduationCap, label: selected.reg },
              { icon: faClock, label: `Membro desde ${selected.since}` },
              { icon: faFileAlt, label: `${selected.posts} publicação(ões)` },
              { icon: faUsers, label: `${selected.learners} aprendiz(es) acompanhado(s)` },
            ].map(({ icon, label }, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <FontAwesomeIcon icon={icon} className="w-3.5 h-3.5 text-[#494949]/60" />
                </div>
                <span className="text-sm text-[#494949]">{label}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="space-y-2">
            {selected.status === "pending" && (
              <button onClick={() => { updateStatus(selected.id, "active"); setSelected(null); }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#41b8d5] to-[#6ec6ff] text-white py-3 rounded-2xl font-bold text-sm shadow-lg">
                <FontAwesomeIcon icon={faCheck} /> Aprovar especialista
              </button>
            )}
            {selected.status === "active" && (
              <button onClick={() => { updateStatus(selected.id, "suspended"); setSelected(null); }}
                className="w-full flex items-center justify-center gap-2 bg-[#ffe990] text-[#7a6000] py-3 rounded-2xl font-bold text-sm border border-[#ffde59]">
                <FontAwesomeIcon icon={faBan} /> Suspender conta
              </button>
            )}
            {selected.status === "suspended" && (
              <button onClick={() => { updateStatus(selected.id, "active"); setSelected(null); }}
                className="w-full flex items-center justify-center gap-2 bg-[#d7fdc7] text-[#2d7a3d] py-3 rounded-2xl font-bold text-sm border border-green-200">
                <FontAwesomeIcon icon={faCheck} /> Reativar conta
              </button>
            )}
            <button onClick={() => { toggleVerified(selected.id); setSelected(prev => prev ? { ...prev, verified: !prev.verified } : null); }}
              className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-[#494949] py-3 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-colors">
              <FontAwesomeIcon icon={selected.verified ? faCircleXmark : faCircleCheck} />
              {selected.verified ? "Remover verificação" : "Verificar especialista"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar especialistas..."
          className="w-full bg-white border border-gray-200 rounded-2xl py-2.5 pl-9 pr-4 text-sm text-[#494949] placeholder-gray-400 focus:outline-none focus:border-[#494949] transition-colors shadow-sm"
        />
      </div>

      {/* Status filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {[{ id: "all", label: "Todos" }, { id: "active", label: "✓ Ativos" }, { id: "pending", label: "⏳ Pendentes" }, { id: "suspended", label: "🚫 Suspensos" }].map(s => (
          <button key={s.id} onClick={() => setStatusFilter(s.id)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${statusFilter === s.id ? "bg-[#494949] text-white shadow" : "bg-white text-[#494949]/60 border border-gray-200"}`}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Role filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["Todos", "Fonoaudióloga", "Pedagogo", "Psicopedagoga", "Professora"].map(r => (
          <button key={r} onClick={() => setRoleFilter(r)}
            className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all ${roleFilter === r ? "bg-[#494949]/90 text-white" : "bg-gray-100 text-[#494949]/60"}`}>
            {r}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((spec, i) => {
          const cfg = statusConfig[spec.status as keyof typeof statusConfig];
          return (
            <motion.div key={spec.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-4 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl flex-shrink-0">{spec.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <p className="font-bold text-sm text-[#494949] truncate">{spec.name}</p>
                    {spec.verified && <FontAwesomeIcon icon={faCircleCheck} className="text-[#41b8d5] w-3.5 h-3.5 flex-shrink-0" />}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ backgroundColor: spec.roleColor }}>{spec.role}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: cfg.color, color: cfg.text }}>{cfg.label}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-[#494949]/60 mb-3">
                <span><FontAwesomeIcon icon={faFileAlt} className="mr-1 w-3 h-3" />{spec.posts} posts</span>
                <span><FontAwesomeIcon icon={faUsers} className="mr-1 w-3 h-3" />{spec.learners} aprendizes</span>
                <span className="ml-auto">{spec.since}</span>
              </div>
              <button onClick={() => setSelected(spec)}
                className="w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl py-2 text-xs font-bold text-[#494949] transition-colors">
                <FontAwesomeIcon icon={faEye} className="w-3 h-3" /> Ver detalhes
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ── Metrics ───────────────────────────────────────────────────────────────────

function AdminMetrics() {
  return (
    <div className="space-y-5">
      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Usuários totais", value: "248", delta: "+12 esta semana", color: "#41b8d5", icon: faUsers },
          { label: "Posts publicados", value: "34", delta: "+5 esta semana", color: "#b197fc", icon: faFileAlt },
          { label: "Especialistas", value: "14", delta: "+2 pendentes", color: "#ff6b9a", icon: faStethoscope },
          { label: "Sessões hoje", value: "91", delta: "↑ 18% vs ontem", color: "#ffde59", icon: faChartBar },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div key={kpi.label} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.08, type: "spring" }}
              className="bg-white rounded-2xl p-4 shadow-md">
              <div className="w-9 h-9 rounded-full mb-3 flex items-center justify-center" style={{ backgroundColor: `${kpi.color}20` }}>
                <FontAwesomeIcon icon={Icon} className="w-4 h-4" style={{ color: kpi.color }} />
              </div>
              <p className="text-2xl font-bold text-[#494949]">{kpi.value}</p>
              <p className="text-xs text-[#494949]/60 mt-0.5">{kpi.label}</p>
              <p className="text-[10px] font-semibold mt-1" style={{ color: kpi.color }}>{kpi.delta}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Weekly activity */}
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <p className="font-bold text-sm text-[#494949] mb-4">Atividade semanal</p>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={metricsData.weekly} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={{ borderRadius: 12, fontSize: 11 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="users" stroke="#ff6b9a" strokeWidth={2} dot={false} name="Usuários" />
            <Line type="monotone" dataKey="sessions" stroke="#41b8d5" strokeWidth={2} dot={false} name="Sessões" />
            <Line type="monotone" dataKey="posts" stroke="#b197fc" strokeWidth={2} dot={false} name="Posts" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Role distribution */}
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <p className="font-bold text-sm text-[#494949] mb-4">Especialistas por área</p>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={metricsData.roleDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
              {metricsData.roleDistribution.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 12, fontSize: 11 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Weekly posts */}
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <p className="font-bold text-sm text-[#494949] mb-4">Posts por dia</p>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={metricsData.weekly} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={{ borderRadius: 12, fontSize: 11 }} />
            <Bar dataKey="posts" fill="#b197fc" radius={[6, 6, 0, 0]} name="Posts" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── Bottom Nav ────────────────────────────────────────────────────────────────

function AdminBottomNav({ active, onChange }: { active: AdminTab; onChange: (t: AdminTab) => void }) {
  const tabs = [
    { id: "posts" as AdminTab, icon: faFileAlt, label: "Posts" },
    { id: "specialists" as AdminTab, icon: faUsers, label: "Especialistas" },
    { id: "metrics" as AdminTab, icon: faChartBar, label: "Métricas" },
    { id: "profile" as AdminTab, icon: faShield, label: "Admin" },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-100 z-50">
      <div className="max-w-md mx-auto px-2 py-2 flex justify-around">
        {tabs.map((tab, i) => {
          const isActive = active === tab.id;
          return (
            <motion.button key={tab.id} onClick={() => onChange(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-2xl transition-all ${isActive ? "bg-[#494949]/10" : ""}`}
              whileTap={{ scale: 0.9 }} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
              <FontAwesomeIcon icon={tab.icon} className={`w-5 h-5 ${isActive ? "text-[#494949]" : "text-[#494949]/35"}`} />
              <span className={`text-[10px] font-semibold ${isActive ? "text-[#494949]" : "text-[#494949]/35"}`}>{tab.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function AdminApp({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<AdminTab>("posts");

  const headers: Record<AdminTab, { title: string; sub: string }> = {
    posts: { title: "Moderação de Posts", sub: "Revise, aprove ou rejeite publicações" },
    specialists: { title: "Especialistas", sub: "Gerencie profissionais cadastrados" },
    metrics: { title: "Métricas", sub: "Visão geral da plataforma" },
    profile: { title: "Administrador", sub: "Letrico Admin — v1.0" },
  };

  return (
    <div className="min-h-screen bg-[#fffdf7] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#494949] to-[#6b6b6b] px-6 pt-10 pb-6 shadow-xl">
        <motion.div initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <FontAwesomeIcon icon={faShield} className="text-[#ffde59] w-4 h-4" />
                <h1 className="text-xl font-bold text-white">{headers[tab].title}</h1>
              </div>
              <p className="text-white/60 text-xs">{headers[tab].sub}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#ffde59]/30 flex items-center justify-center">
              <FontAwesomeIcon icon={faShield} className="text-[#ffde59] w-5 h-5" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-md mx-auto px-4 py-5">
        {tab === "posts" && <PostModeration />}
        {tab === "specialists" && <SpecialistManagement />}
        {tab === "metrics" && <AdminMetrics />}
        {tab === "profile" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-md text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#494949] to-[#6b6b6b] mx-auto mb-3 flex items-center justify-center shadow-2xl ring-4 ring-gray-200">
                <FontAwesomeIcon icon={faShield} className="text-[#ffde59] w-9 h-9" />
              </div>
              <h2 className="text-xl font-bold text-[#494949]">Admin Letrico</h2>
              <p className="text-sm text-[#494949]/60">admin@letrico.com.br</p>
              <div className="inline-flex items-center gap-2 bg-[#494949]/10 px-4 py-1.5 rounded-full mt-2">
                <FontAwesomeIcon icon={faShield} className="text-[#494949] w-3 h-3" />
                <span className="text-xs font-bold text-[#494949]">Super Administrador</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-md space-y-3">
              {[
                { label: "Posts pendentes", value: "2", color: "#ffe990" },
                { label: "Especialistas pendentes", value: "1", color: "#fce4ec" },
                { label: "Posts denunciados", value: "2", color: "#fce4ec" },
                { label: "Usuários ativos hoje", value: "42", color: "#d7fdc7" },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-[#494949]">{s.label}</span>
                  <span className="text-sm font-bold px-3 py-0.5 rounded-full" style={{ backgroundColor: s.color, color: "#494949" }}>{s.value}</span>
                </div>
              ))}
            </div>

            <button onClick={onLogout}
              className="w-full border-2 border-red-200 rounded-2xl py-3.5 text-sm font-bold text-red-400 flex items-center justify-center gap-2 hover:bg-red-50 transition-colors">
              <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
              Sair da conta admin
            </button>
          </motion.div>
        )}
      </div>

      <AdminBottomNav active={tab} onChange={setTab} />
    </div>
  );
}
