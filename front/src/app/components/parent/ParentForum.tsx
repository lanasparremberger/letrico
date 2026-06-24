import { useState } from "react";
import { motion } from "motion/react";
import { MessageSquare, Heart, Bookmark, Search, ChevronDown, Send, X } from "lucide-react";

type ForumTab = "posts" | "duvidas";

interface Post {
  id: number;
  author: string;
  role: string;
  roleColor: string;
  avatar: string;
  time: string;
  category: string;
  categoryColor: string;
  title: string;
  body: string;
  likes: number;
  comments: number;
  saved: boolean;
  liked: boolean;
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Dra. Camila Rocha",
    role: "Fonoaudióloga",
    roleColor: "#41b8d5",
    avatar: "👩‍⚕️",
    time: "2h atrás",
    category: "Fala",
    categoryColor: "#ffde59",
    title: "Como estimular a fala em casa — 5 dicas práticas",
    body: "A estimulação da fala no ambiente familiar é fundamental para o desenvolvimento da criança. Aqui estão 5 estratégias simples que qualquer responsável pode aplicar no dia a dia: leitura compartilhada, música, jogos de nomeação, repetição afetiva e tempo de tela controlado.",
    likes: 48,
    comments: 12,
    saved: false,
    liked: false,
  },
  {
    id: 2,
    author: "Prof. Rafael Lima",
    role: "Pedagogo",
    roleColor: "#b197fc",
    avatar: "👨‍🏫",
    time: "5h atrás",
    category: "Leitura",
    categoryColor: "#b197fc",
    title: "Sinais de dislexia que todo responsável deve conhecer",
    body: "A dislexia afeta cerca de 10% das crianças em idade escolar. Identificar os sinais precocemente faz toda a diferença. Fique atento a dificuldades persistentes com rimas, confusão de letras similares (b/d, p/q) e resistência à leitura.",
    likes: 92,
    comments: 31,
    saved: true,
    liked: true,
  },
  {
    id: 3,
    author: "Dra. Patrícia Souza",
    role: "Psicopedagoga",
    roleColor: "#ff6b9a",
    avatar: "👩‍🎓",
    time: "1 dia atrás",
    category: "Desenvolvimento",
    categoryColor: "#6ce5e8",
    title: "A importância do jogo no processo de alfabetização",
    body: "Pesquisas mostram que crianças aprendem até 4x mais quando o conteúdo é apresentado de forma lúdica. O Letrico usa essa abordagem para tornar a alfabetização uma aventura. Como responsáveis, vocês podem reforçar isso em casa de forma simples.",
    likes: 67,
    comments: 19,
    saved: false,
    liked: false,
  },
  {
    id: 4,
    author: "Prof.ª Ana Beatriz",
    role: "Professora",
    roleColor: "#ffe990",
    avatar: "👩‍🏫",
    time: "2 dias atrás",
    category: "Escrita",
    categoryColor: "#41b8d5",
    title: "Caligrafia x digitação: o que priorizar na infância?",
    body: "A escrita à mão ativa regiões do cérebro ligadas ao aprendizado de forma que a digitação não consegue substituir. Mesmo na era digital, manter a prática da escrita manuscrita é essencial para crianças de 4 a 8 anos.",
    likes: 34,
    comments: 8,
    saved: false,
    liked: false,
  },
];

const initialQuestions = [
  {
    id: 1,
    author: "Marcos Tavares",
    avatar: "👨",
    time: "3h atrás",
    question: "Meu filho de 5 anos ainda não fala claramente algumas sílabas. Isso é normal?",
    answer: "Dra. Camila Rocha",
    answerRole: "Fonoaudióloga",
    answerColor: "#41b8d5",
    answerText: "Sim, é comum até os 6 anos. Se houver dificuldade com mais de 3 fonemas, recomendo uma avaliação presencial.",
    likes: 15,
    answered: true,
  },
  {
    id: 2,
    author: "Juliana Costa",
    avatar: "👩",
    time: "1 dia atrás",
    question: "Como saber se minha filha está progredindo bem no Letrico em relação à média?",
    answer: null,
    answerRole: null,
    answerColor: null,
    answerText: null,
    likes: 7,
    answered: false,
  },
  {
    id: 3,
    author: "Roberto Mendes",
    avatar: "👨",
    time: "2 dias atrás",
    question: "Quanto tempo por dia uma criança de 6 anos deve usar o aplicativo?",
    answer: "Prof. Rafael Lima",
    answerRole: "Pedagogo",
    answerColor: "#b197fc",
    answerText: "Recomendamos sessões de 15-20 minutos, uma ou duas vezes ao dia, com pausas entre elas.",
    likes: 29,
    answered: true,
  },
];

export function ParentForum() {
  const [activeTab, setActiveTab] = useState<ForumTab>("posts");
  const [posts, setPosts] = useState(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [showNewQuestion, setShowNewQuestion] = useState(false);

  const toggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  };

  const toggleSave = (id: number) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, saved: !p.saved } : p)));
  };

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffdf7] to-[#fce4ec]/10 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#ff6b9a] to-[#ffb3cc] px-6 pt-10 pb-6 shadow-lg">
        <motion.div initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-5 h-5 text-white" />
            <h1 className="text-2xl font-bold text-white">Comunidade</h1>
          </div>
          <p className="text-white/80 text-sm">Posts e dúvidas de profissionais e responsáveis</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mt-4">
          {[
            { id: "posts" as ForumTab, label: "📝 Artigos e Dicas" },
            { id: "duvidas" as ForumTab, label: "❓ Dúvidas" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-white text-[#ff6b9a] shadow-md"
                  : "bg-white/25 text-white hover:bg-white/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        {activeTab === "posts" && (
          <>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar artigos, profissionais..."
                className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-9 pr-4 text-sm text-[#494949] placeholder-gray-400 focus:outline-none focus:border-[#ff6b9a] shadow-sm"
              />
            </div>

            {/* Post cards */}
            {filtered.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                {/* Post header */}
                <div className="px-4 pt-4 pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                        {post.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#494949]">{post.author}</p>
                        <div className="flex items-center gap-1.5">
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: post.roleColor }}
                          >
                            {post.role}
                          </span>
                          <span className="text-[10px] text-[#494949]/50">{post.time}</span>
                        </div>
                      </div>
                    </div>
                    <span
                      className="text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: `${post.categoryColor}20`, color: post.categoryColor }}
                    >
                      {post.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-[#494949] mb-1.5">{post.title}</h3>
                  <p className={`text-xs text-[#494949]/70 leading-relaxed ${expandedPost === post.id ? "" : "line-clamp-2"}`}>
                    {post.body}
                  </p>
                  <button
                    onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                    className="flex items-center gap-1 text-xs text-[#ff6b9a] font-semibold mt-1"
                  >
                    {expandedPost === post.id ? "Ver menos" : "Ler mais"}
                    <ChevronDown className={`w-3 h-3 transition-transform ${expandedPost === post.id ? "rotate-180" : ""}`} />
                  </button>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between px-4 py-2 border-t border-gray-50">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 transition-colors ${post.liked ? "text-[#ff6b9a]" : "text-[#494949]/40"}`}
                    >
                      <Heart className={`w-4 h-4 ${post.liked ? "fill-[#ff6b9a]" : ""}`} />
                      <span className="text-xs font-semibold">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-[#494949]/40">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-xs font-semibold">{post.comments}</span>
                    </button>
                  </div>
                  <button
                    onClick={() => toggleSave(post.id)}
                    className={`transition-colors ${post.saved ? "text-[#41b8d5]" : "text-[#494949]/40"}`}
                  >
                    <Bookmark className={`w-4 h-4 ${post.saved ? "fill-[#41b8d5]" : ""}`} />
                  </button>
                </div>
              </motion.div>
            ))}
          </>
        )}

        {activeTab === "duvidas" && (
          <>
            {/* New question button */}
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setShowNewQuestion(true)}
              className="w-full bg-gradient-to-r from-[#ff6b9a] to-[#ffb3cc] text-white rounded-2xl py-3 font-bold text-sm shadow-lg hover:shadow-xl transition-all"
            >
              + Fazer uma pergunta
            </motion.button>

            {/* New question input */}
            {showNewQuestion && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-4 shadow-md"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="font-bold text-sm text-[#494949]">Nova pergunta</p>
                  <button onClick={() => setShowNewQuestion(false)}>
                    <X className="w-4 h-4 text-[#494949]/50" />
                  </button>
                </div>
                <textarea
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Descreva sua dúvida sobre o desenvolvimento do seu filho..."
                  className="w-full bg-gray-50 rounded-xl p-3 text-sm text-[#494949] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b9a]/30 resize-none"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => { setNewQuestion(""); setShowNewQuestion(false); }}
                    className="flex items-center gap-2 bg-[#ff6b9a] text-white px-4 py-2 rounded-xl text-sm font-bold"
                  >
                    <Send className="w-3.5 h-3.5" /> Enviar
                  </button>
                </div>
              </motion.div>
            )}

            {/* Questions */}
            {initialQuestions.map((q, i) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                      {q.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#494949]">{q.author}</p>
                      <p className="text-[10px] text-[#494949]/50">{q.time}</p>
                    </div>
                    <div className="ml-auto">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          q.answered ? "bg-[#d7fdc7] text-[#2d7a3d]" : "bg-[#ffe990] text-[#7a6000]"
                        }`}
                      >
                        {q.answered ? "✓ Respondida" : "Aguardando"}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-[#494949]">{q.question}</p>

                  {q.answered && q.answerText && (
                    <div
                      className="mt-3 rounded-xl p-3"
                      style={{ backgroundColor: `${q.answerColor}15`, borderLeft: `3px solid ${q.answerColor}` }}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] font-bold" style={{ color: q.answerColor }}>
                          {q.answer}
                        </span>
                        <span className="text-[10px] text-[#494949]/50">• {q.answerRole}</span>
                      </div>
                      <p className="text-xs text-[#494949]/80 leading-relaxed">{q.answerText}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-3">
                    <button className="flex items-center gap-1 text-[#494949]/40">
                      <Heart className="w-3.5 h-3.5" />
                      <span className="text-xs">{q.likes}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
