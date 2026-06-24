import { useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import logoLetrico from "../../../imports/loucuras_do_tcc__1_-removebg-preview.png";

interface LoginScreenProps {
  onLogin: (type: "child" | "parent") => void;
}

type UserType = "child" | "parent";

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [selectedType, setSelectedType] = useState<UserType | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"select" | "form">("select");

  const handleContinue = () => {
    if (!selectedType) return;
    if (step === "select") {
      setStep("form");
    } else {
      onLogin(selectedType);
    }
  };

  const userTypes = [
    {
      id: "child" as UserType,
      emoji: "🧒",
      label: "Aprendiz",
      desc: "Sou uma criança aqui para aprender!",
      color: "#ffde59",
      gradient: "from-[#ffde59] to-[#ffe990]",
      ring: "ring-[#ffde59]",
    },
    {
      id: "parent" as UserType,
      emoji: "👨‍👩‍👧",
      label: "Responsável",
      desc: "Acompanho o desenvolvimento do meu filho",
      color: "#ff6b9a",
      gradient: "from-[#ff6b9a] to-[#ffb3cc]",
      ring: "ring-[#ff6b9a]",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffdf7] via-[#d7fdc7]/20 to-[#6ce5e8]/10 flex flex-col">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#ffde59]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-64 h-64 bg-[#ff6b9a]/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-1/3 w-72 h-72 bg-[#6ce5e8]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-10 max-w-md mx-auto w-full">
        {/* Logo */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <img src={logoLetrico} alt="Letrico" className="h-28 object-contain" />
          <p className="text-center text-[#494949]/70 text-sm mt-2 font-medium">
            Aprender brincando é a melhor aventura
          </p>
        </motion.div>

        {step === "select" ? (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-4"
          >
            <h2 className="text-xl font-bold text-[#494949] text-center mb-6">
              Quem está entrando?
            </h2>

            {userTypes.map((type, i) => (
              <motion.button
                key={type.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedType(type.id)}
                className={`w-full rounded-3xl p-5 flex items-center gap-4 border-3 transition-all duration-200 shadow-lg ${
                  selectedType === type.id
                    ? `bg-gradient-to-r ${type.gradient} ring-4 ${type.ring} ring-offset-2 shadow-xl scale-[1.02]`
                    : "bg-white border-transparent hover:shadow-xl hover:scale-[1.01]"
                }`}
                style={{ border: selectedType === type.id ? "none" : "2px solid #e5e7eb" }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-inner flex-shrink-0"
                  style={{
                    backgroundColor: selectedType === type.id ? "rgba(255,255,255,0.4)" : `${type.color}20`,
                  }}
                >
                  {type.emoji}
                </div>
                <div className="text-left flex-1">
                  <p className={`font-bold text-lg ${selectedType === type.id ? "text-white" : "text-[#494949]"}`}>
                    {type.label}
                  </p>
                  <p className={`text-sm ${selectedType === type.id ? "text-white/85" : "text-[#494949]/60"}`}>
                    {type.desc}
                  </p>
                </div>
                {selectedType === type.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 bg-white/40 rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </motion.button>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={handleContinue}
              disabled={!selectedType}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all mt-4 ${
                selectedType
                  ? "bg-gradient-to-r from-[#41b8d5] to-[#6ec6ff] text-white shadow-xl hover:shadow-2xl hover:scale-[1.02]"
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
                className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-[#494949] hover:bg-gray-50"
              >
                ←
              </button>
              <div className="flex items-center gap-2">
                <span className="text-xl">
                  {selectedType === "child" ? "🧒" : "👨‍👩‍👧"}
                </span>
                <span className="font-bold text-[#494949]">
                  Entrar como {selectedType === "child" ? "Aprendiz" : "Responsável"}
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#494949]">
                {selectedType === "child" ? "Nome de usuário" : "E-mail"}
              </label>
              <input
                type={selectedType === "child" ? "text" : "email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={selectedType === "child" ? "ex: gael123" : "email@exemplo.com"}
                className="w-full bg-white border-2 border-gray-200 rounded-2xl px-4 py-3.5 text-[#494949] placeholder-gray-400 focus:outline-none focus:border-[#41b8d5] transition-colors shadow-sm"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#494949]">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border-2 border-gray-200 rounded-2xl px-4 py-3.5 text-[#494949] placeholder-gray-400 focus:outline-none focus:border-[#41b8d5] transition-colors shadow-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#494949]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {selectedType === "parent" && (
              <div className="text-right">
                <button className="text-sm text-[#41b8d5] font-semibold hover:underline">
                  Esqueci minha senha
                </button>
              </div>
            )}

            <motion.button
              onClick={handleContinue}
              className="w-full py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-[#41b8d5] to-[#6ec6ff] text-white shadow-xl hover:shadow-2xl mt-2"
              whileTap={{ scale: 0.97 }}
            >
              Entrar
            </motion.button>

            <p className="text-center text-sm text-[#494949]/60 mt-2">
              Não tem conta?{" "}
              <button className="font-bold text-[#ff6b9a] hover:underline">
                Cadastre-se
              </button>
            </p>
          </motion.div>
        )}

        {/* Mascots decoration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-6 mt-10 text-4xl"
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
