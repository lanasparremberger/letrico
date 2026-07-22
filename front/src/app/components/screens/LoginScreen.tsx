import { useState } from "react";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye, faEyeSlash, faArrowRight, faChild, faUserTie,
  faStethoscope, faShield,
} from "@fortawesome/free-solid-svg-icons";
import logoLetrico from "../../../imports/loucuras_do_tcc__1_-removebg-preview.png";

type UserType = "child" | "parent" | "specialist" | "admin";

interface LoginScreenProps {
  onLogin: (type: UserType) => void;
}

const userTypes = [
  {
    id: "child" as UserType,
    emoji: "🧒",
    faIcon: faChild,
    label: "Aprendiz",
    desc: "Sou uma criança aqui para aprender!",
    color: "#ffde59",
    gradient: "from-[#ffde59] to-[#ffe990]",
    ring: "#ffde59",
  },
  {
    id: "parent" as UserType,
    emoji: "👨‍👩‍👧",
    faIcon: faUserTie,
    label: "Responsável",
    desc: "Acompanho o desenvolvimento do meu filho",
    color: "#ff6b9a",
    gradient: "from-[#ff6b9a] to-[#ffb3cc]",
    ring: "#ff6b9a",
  },
  {
    id: "specialist" as UserType,
    emoji: "👩‍⚕️",
    faIcon: faStethoscope,
    label: "Especialista",
    desc: "Fonoaudiólogo, pedagogo ou psicopedagogo",
    color: "#41b8d5",
    gradient: "from-[#41b8d5] to-[#6ec6ff]",
    ring: "#41b8d5",
  },
  {
    id: "admin" as UserType,
    emoji: "🛡️",
    faIcon: faShield,
    label: "Administrador",
    desc: "Gestão e moderação da plataforma",
    color: "#494949",
    gradient: "from-[#494949] to-[#6b6b6b]",
    ring: "#494949",
  },
];

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [selectedType, setSelectedType] = useState<UserType | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"select" | "form">("select");

  const selected = userTypes.find(u => u.id === selectedType);

  const handleContinue = () => {
    if (!selectedType) return;
    if (step === "select") setStep("form");
    else onLogin(selectedType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffdf7] via-[#d7fdc7]/20 to-[#6ce5e8]/10 flex flex-col">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#ffde59]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-64 h-64 bg-[#ff6b9a]/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-1/3 w-72 h-72 bg-[#6ce5e8]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center px-5 py-8 max-w-md mx-auto w-full">
        {/* Logo */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <img src={logoLetrico} alt="Letrico" className="h-24 object-contain mx-auto" />
          <p className="text-center text-[#494949]/60 text-sm mt-1 font-medium">
            Aprender brincando é a melhor aventura
          </p>
        </motion.div>

        {step === "select" ? (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-3"
          >
            <h2 className="text-lg font-bold text-[#494949] text-center mb-4">
              Quem está entrando?
            </h2>

            {userTypes.map((type, i) => {
              const isSelected = selectedType === type.id;
              return (
                <motion.button
                  key={type.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setSelectedType(type.id)}
                  className="w-full rounded-2xl p-4 flex items-center gap-3 transition-all duration-200 shadow-md"
                  style={{
                    background: isSelected
                      ? `linear-gradient(135deg, ${type.color}, ${type.color}cc)`
                      : "white",
                    boxShadow: isSelected ? `0 8px 24px ${type.color}40` : undefined,
                    border: isSelected ? "none" : "2px solid #e5e7eb",
                    transform: isSelected ? "scale(1.02)" : "scale(1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: isSelected ? "rgba(255,255,255,0.3)" : `${type.color}20` }}
                  >
                    <FontAwesomeIcon
                      icon={type.faIcon}
                      className="w-5 h-5"
                      style={{ color: isSelected ? "white" : type.color }}
                    />
                  </div>
                  <div className="text-left flex-1">
                    <p className={`font-bold text-base ${isSelected ? "text-white" : "text-[#494949]"}`}>
                      {type.label}
                    </p>
                    <p className={`text-xs leading-snug ${isSelected ? "text-white/80" : "text-[#494949]/55"}`}>
                      {type.desc}
                    </p>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center flex-shrink-0"
                    >
                      <FontAwesomeIcon icon={faArrowRight} className="text-white w-3.5 h-3.5" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              onClick={handleContinue}
              disabled={!selectedType}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all mt-2 ${
                selectedType
                  ? "bg-gradient-to-r from-[#41b8d5] to-[#6ec6ff] text-white shadow-xl hover:shadow-2xl"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              whileTap={selectedType ? { scale: 0.97 } : {}}
            >
              Continuar
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full space-y-4"
          >
            {/* Back + type indicator */}
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => setStep("select")}
                className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-[#494949] hover:bg-gray-50 text-sm"
              >
                ←
              </button>
              {selected && (
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${selected.color}20` }}
                  >
                    <FontAwesomeIcon icon={selected.faIcon} className="w-4 h-4" style={{ color: selected.color }} />
                  </div>
                  <span className="font-bold text-[#494949] text-sm">
                    Entrar como {selected.label}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#494949]/70 block">
                {selectedType === "child" ? "Nome de usuário" : "E-mail"}
              </label>
              <input
                type={selectedType === "child" ? "text" : "email"}
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={selectedType === "child" ? "ex: gael123" : "email@exemplo.com"}
                className="w-full bg-white border-2 border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-[#494949] placeholder-gray-400 focus:outline-none transition-colors shadow-sm"
                style={{ outlineColor: selected?.color }}
                onFocus={e => (e.target.style.borderColor = selected?.color ?? "#41b8d5")}
                onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#494949]/70 block">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border-2 border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-[#494949] placeholder-gray-400 focus:outline-none transition-colors shadow-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#494949]"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="w-4 h-4" />
                </button>
              </div>
            </div>

            {selectedType !== "child" && (
              <div className="text-right">
                <button className="text-xs font-bold hover:underline" style={{ color: selected?.color }}>
                  Esqueci minha senha
                </button>
              </div>
            )}

            <motion.button
              onClick={handleContinue}
              className="w-full py-4 rounded-2xl font-bold text-lg text-white shadow-xl mt-2"
              style={{
                background: selected
                  ? `linear-gradient(135deg, ${selected.color}, ${selected.color}bb)`
                  : "#41b8d5",
              }}
              whileTap={{ scale: 0.97 }}
            >
              Entrar
            </motion.button>

            {selectedType !== "admin" && (
              <p className="text-center text-xs text-[#494949]/60 mt-1">
                Não tem conta?{" "}
                <button className="font-bold text-[#ff6b9a] hover:underline">Cadastre-se</button>
              </p>
            )}
          </motion.div>
        )}

        {/* Mascots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-6 mt-8 text-3xl"
        >
          {["🐶", "🐱", "🐹"].map((m, i) => (
            <motion.span
              key={m}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            >
              {m}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
