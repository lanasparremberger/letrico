import { useState } from "react";
import { motion } from "motion/react";
import {
  User, Edit2, Save, X, LogOut, Settings, ChevronRight,
  School, Phone, Mail, MapPin, Shield, Star, Flame, Award
} from "lucide-react";

interface ParentProfileProps {
  onLogout: () => void;
}

export function ParentProfile({ onLogout }: ParentProfileProps) {
  const [editingChild, setEditingChild] = useState(false);
  const [childData, setChildData] = useState({
    name: "Gael",
    age: "6",
    avatar: "🐻",
    school: "Escola Municipal Monteiro Lobato",
    grade: "1º ano",
    accessibilityMode: false,
  });
  const [draft, setDraft] = useState({ ...childData });

  const avatarOptions = ["🐻", "🦊", "🐰", "🐼", "🦁", "🐸", "🐨", "🐙", "🦋", "🐯"];

  const parentData = {
    name: "Ana Paula Silva",
    avatar: "👩",
    email: "anapaula@email.com",
    phone: "(11) 98765-4321",
    city: "São Paulo, SP",
    relation: "Mãe",
    since: "01/06/2026",
  };

  const childStats = [
    { label: "Pontos totais", value: "850", color: "#ffde59", icon: Star },
    { label: "Sequência", value: "7 dias", color: "#ff6b9a", icon: Flame },
    { label: "Troféus", value: "4", color: "#b197fc", icon: Award },
  ];

  const saveChildEdits = () => {
    setChildData({ ...draft });
    setEditingChild(false);
  };

  const cancelChildEdits = () => {
    setDraft({ ...childData });
    setEditingChild(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffdf7] via-[#fce4ec]/15 to-[#e8f5e9]/10 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#ff6b9a] to-[#ffb3cc] px-6 pt-10 pb-14 shadow-xl">
        <motion.div initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center">
          <div className="w-20 h-20 rounded-full bg-white mx-auto mb-3 flex items-center justify-center text-5xl shadow-2xl ring-4 ring-white/50">
            {parentData.avatar}
          </div>
          <h1 className="text-2xl font-bold text-white">{parentData.name}</h1>
          <p className="text-white/80 text-sm">{parentData.relation} • {parentData.email}</p>
          <div className="inline-flex items-center gap-2 bg-white/25 px-4 py-1.5 rounded-full mt-2">
            <Shield className="w-4 h-4 text-white" />
            <span className="text-white text-xs font-bold">Responsável verificado</span>
          </div>
        </motion.div>
      </div>

      {/* Child linked card */}
      <div className="max-w-md mx-auto px-6 -mt-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring" }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Child header */}
          <div className="bg-gradient-to-r from-[#ffe990] to-[#ffde59] px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">👧</span>
              <span className="font-bold text-[#494949] text-sm">Perfil vinculado</span>
            </div>
            <button
              onClick={() => setEditingChild(!editingChild)}
              className="flex items-center gap-1.5 bg-white/60 hover:bg-white/80 px-3 py-1 rounded-full text-xs font-bold text-[#494949] transition-colors"
            >
              <Edit2 className="w-3 h-3" />
              {editingChild ? "Cancelar" : "Editar"}
            </button>
          </div>

          {!editingChild ? (
            <div className="p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ffe990] to-[#ffde59] flex items-center justify-center text-4xl shadow-lg">
                  {childData.avatar}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#494949]">{childData.name}</h2>
                  <p className="text-sm text-[#494949]/60">{childData.age} anos • {childData.grade}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <School className="w-3.5 h-3.5 text-[#41b8d5]" />
                    <p className="text-xs text-[#494949]/60">{childData.school}</p>
                  </div>
                </div>
              </div>

              {/* Child stats */}
              <div className="grid grid-cols-3 gap-3">
                {childStats.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="bg-gray-50 rounded-2xl p-3 text-center">
                      <div className="w-7 h-7 rounded-full mx-auto mb-1.5 flex items-center justify-center" style={{ backgroundColor: `${s.color}25` }}>
                        <Icon className="w-3.5 h-3.5" style={{ color: s.color }} fill={s.color} />
                      </div>
                      <p className="font-bold text-sm text-[#494949]">{s.value}</p>
                      <p className="text-[10px] text-[#494949]/55 leading-tight">{s.label}</p>
                    </div>
                  );
                })}
              </div>

              {childData.accessibilityMode && (
                <div className="mt-3 flex items-center gap-2 bg-[#d7fdc7] rounded-xl px-3 py-2">
                  <span className="text-sm">♿</span>
                  <span className="text-xs font-semibold text-[#2d7a3d]">Modo OpenDyslexic ativado</span>
                </div>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 space-y-4"
            >
              <p className="text-sm font-bold text-[#494949]">Editar perfil do aprendiz</p>

              {/* Avatar picker */}
              <div>
                <label className="text-xs font-semibold text-[#494949]/70 block mb-2">Avatar</label>
                <div className="flex flex-wrap gap-2">
                  {avatarOptions.map((av) => (
                    <button
                      key={av}
                      onClick={() => setDraft({ ...draft, avatar: av })}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-2xl transition-all ${
                        draft.avatar === av
                          ? "bg-[#ffde59] ring-2 ring-[#ffde59] scale-110 shadow"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fields */}
              {[
                { label: "Nome", key: "name", type: "text", placeholder: "Nome da criança" },
                { label: "Idade", key: "age", type: "number", placeholder: "Idade" },
                { label: "Série", key: "grade", type: "text", placeholder: "Ex: 1º ano" },
                { label: "Escola", key: "school", type: "text", placeholder: "Nome da escola" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-xs font-semibold text-[#494949]/70 block mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    value={draft[field.key as keyof typeof draft] as string}
                    onChange={(e) => setDraft({ ...draft, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#494949] focus:outline-none focus:border-[#ff6b9a] transition-colors"
                  />
                </div>
              ))}

              {/* Accessibility toggle */}
              <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-[#494949]">Modo OpenDyslexic</p>
                  <p className="text-xs text-[#494949]/55">Fonte para facilitar leitura</p>
                </div>
                <button
                  onClick={() => setDraft({ ...draft, accessibilityMode: !draft.accessibilityMode })}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    draft.accessibilityMode ? "bg-[#41b8d5]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${
                      draft.accessibilityMode ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Save / Cancel */}
              <div className="flex gap-3">
                <button
                  onClick={cancelChildEdits}
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 rounded-xl py-2.5 text-sm font-bold text-[#494949] hover:bg-gray-50 transition-colors"
                >
                  <X className="w-4 h-4" /> Cancelar
                </button>
                <button
                  onClick={saveChildEdits}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff6b9a] to-[#ffb3cc] rounded-xl py-2.5 text-sm font-bold text-white shadow-md"
                >
                  <Save className="w-4 h-4" /> Salvar
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Parent info */}
      <div className="max-w-md mx-auto px-6 mt-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-md p-5"
        >
          <h3 className="font-bold text-[#494949] text-sm mb-4">Meus dados</h3>
          <div className="space-y-3">
            {[
              { icon: Mail, label: parentData.email, color: "#ff6b9a" },
              { icon: Phone, label: parentData.phone, color: "#41b8d5" },
              { icon: MapPin, label: parentData.city, color: "#b197fc" },
              { icon: User, label: `Membro desde ${parentData.since}`, color: "#ffde59" },
            ].map(({ icon: Icon, label, color }, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <span className="text-sm text-[#494949]">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Menu */}
      <div className="max-w-md mx-auto px-6 mt-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-md overflow-hidden"
        >
          {[
            { label: "Configurações", icon: Settings, color: "#41b8d5" },
            { label: "Privacidade e segurança", icon: Shield, color: "#b197fc" },
          ].map((item, i, arr) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                  i !== arr.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                    <Icon className="w-4.5 h-4.5" style={{ color: item.color }} />
                  </div>
                  <span className="font-semibold text-sm text-[#494949]">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </button>
            );
          })}
        </motion.div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onLogout}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-white border-2 border-[#ff6b9a]/30 rounded-2xl py-3.5 text-sm font-bold text-[#ff6b9a] hover:bg-[#ff6b9a]/5 transition-colors shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          Sair da conta
        </motion.button>
      </div>
    </div>
  );
}
