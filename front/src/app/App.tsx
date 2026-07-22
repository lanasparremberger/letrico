import { useState } from "react";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { LevelNodeVertical } from "./components/LevelNodeVertical";
import { TopStats } from "./components/TopStats";
import { BottomNav } from "./components/BottomNav";
import { MapPath } from "./components/MapPath";
import { MascotSelector } from "./components/MascotSelector";
import { RankingScreen } from "./components/screens/RankingScreen";
import { TrophiesScreen } from "./components/screens/TrophiesScreen";
import { ProfileScreen } from "./components/screens/ProfileScreen";
import { LoginScreen } from "./components/screens/LoginScreen";
import { ParentBottomNav } from "./components/parent/ParentBottomNav";
import { ParentHome } from "./components/parent/ParentHome";
import { ParentStats } from "./components/parent/ParentStats";
import { ParentForum } from "./components/parent/ParentForum";
import { ParentNotifications } from "./components/parent/ParentNotifications";
import { ParentProfile } from "./components/parent/ParentProfile";
import { SpecialistApp } from "./components/specialist/SpecialistApp";
import { AdminApp } from "./components/admin/AdminApp";
import logoLetrico from "../imports/loucuras_do_tcc__1_-removebg-preview.png";

const levelsByMascot = {
  speech: [
    { name: "Sons Iniciais", color: "#ffde59" }, { name: "Vogais A-E-I", color: "#ffe990" },
    { name: "Vogais O-U", color: "#ffde59" }, { name: "Sons de Animais", color: "#ffe990" },
    { name: "Repetir Palavras", color: "#ffde59" }, { name: "Sílabas Simples", color: "#ffe990" },
    { name: "Sons das Letras", color: "#ffde59" }, { name: "Consoantes B-C-D", color: "#ffe990" },
    { name: "Consoantes F-G-H", color: "#ffde59" }, { name: "Rimas Divertidas", color: "#ffe990" },
    { name: "Palavras Curtas", color: "#ffde59" }, { name: "Separar Sílabas", color: "#ffe990" },
    { name: "Sons Finais", color: "#ffde59" }, { name: "Frases Simples", color: "#ffe990" },
    { name: "História Falada", color: "#ffde59" },
  ],
  reading: Array(15).fill(null).map((_, i) => ({
    name: ["Conhecer Vogais","Letras do Nome","Ligar Imagens","Alfabeto A-M","Alfabeto N-Z","Palavras Simples","Completar Palavras","Famílias Silábicas","Ler Frases","Cores e Formas","Números 1-10","Leitura Guiada","Pequenos Textos","Interpretação","História Completa"][i],
    color: "#b197fc",
  })),
  writing: [
    { name: "Traçar Letras", color: "#41b8d5" }, { name: "Vogais Maiúsculas", color: "#6ec6ff" },
    { name: "Vogais Minúsculas", color: "#41b8d5" }, { name: "Consoantes M-P", color: "#6ec6ff" },
    { name: "Montar Sílabas", color: "#41b8d5" }, { name: "Escrever Nome", color: "#6ec6ff" },
    { name: "Palavras BA-BE-BI", color: "#41b8d5" }, { name: "Palavras CA-CO-CU", color: "#6ec6ff" },
    { name: "Escrever Palavras", color: "#41b8d5" }, { name: "Letra Cursiva", color: "#6ec6ff" },
    { name: "Formar Frases", color: "#41b8d5" }, { name: "Pontuar Textos", color: "#6ec6ff" },
    { name: "Escrever História", color: "#41b8d5" }, { name: "Ditado Visual", color: "#6ec6ff" },
    { name: "Texto Livre", color: "#41b8d5" },
  ],
};

const getLevelPosition = (index: number, containerWidth: number) => {
  const centerX = containerWidth / 2;
  const startY = 180;
  const gap = 140;
  const patterns = [
    { x: centerX, y: startY }, { x: centerX - 100, y: startY + gap }, { x: centerX + 100, y: startY + gap },
    { x: centerX, y: startY + gap * 2 }, { x: centerX, y: startY + gap * 3 },
    { x: centerX - 100, y: startY + gap * 4 }, { x: centerX + 100, y: startY + gap * 4 },
    { x: centerX, y: startY + gap * 5 }, { x: centerX, y: startY + gap * 6 }, { x: centerX, y: startY + gap * 7 },
  ];
  return patterns[index] || { x: centerX, y: startY + gap * index };
};

type AppMode = "login" | "child" | "parent" | "specialist" | "admin";
type ChildTab = "home" | "ranking" | "trophies" | "profile";
type ParentTab = "home" | "stats" | "forum" | "notifications" | "profile";

export default function App() {
  const [appMode, setAppMode] = useState<AppMode>("login");
  const [childTab, setChildTab] = useState<ChildTab>("home");
  const [parentTab, setParentTab] = useState<ParentTab>("home");
  const [activeMascot, setActiveMascot] = useState<"speech" | "reading" | "writing">("speech");

  const [userProgress] = useState({
    userName: "Gael",
    speech: { currentLevel: 5, completedLevels: [1, 2, 3, 4] as number[], stars: { 1: 3, 2: 2, 3: 3, 4: 1 } as Record<number,number> },
    reading: { currentLevel: 3, completedLevels: [1, 2] as number[], stars: { 1: 3, 2: 2 } as Record<number,number> },
    writing: { currentLevel: 2, completedLevels: [1] as number[], stars: { 1: 3 } as Record<number,number> },
    badges: 3, timeToday: 15,
  });

  const containerWidth = 400;
  const currentMascotProgress = userProgress[activeMascot];
  const currentLevels = levelsByMascot[activeMascot];

  const getLevelStatus = (n: number) => {
    if (currentMascotProgress.completedLevels.includes(n)) return "completed";
    if (n === currentMascotProgress.currentLevel) return "current";
    return "locked";
  };

  const positions = currentLevels.map((_, i) => getLevelPosition(i, containerWidth));
  const bgGradients = {
    speech: "from-[#fffdf7] via-[#ffde59]/10 to-[#ffe990]/10",
    reading: "from-[#fffdf7] via-[#b197fc]/10 to-[#b197fc]/5",
    writing: "from-[#fffdf7] via-[#41b8d5]/10 to-[#6ec6ff]/10",
  };

  const handleLogout = () => {
    setAppMode("login");
    setChildTab("home");
    setParentTab("home");
  };

  // ── Login ──────────────────────────────────────────────────────────────
  if (appMode === "login") return <LoginScreen onLogin={setAppMode} />;

  // ── Specialist ─────────────────────────────────────────────────────────
  if (appMode === "specialist") return <SpecialistApp onLogout={handleLogout} />;

  // ── Admin ──────────────────────────────────────────────────────────────
  if (appMode === "admin") return <AdminApp onLogout={handleLogout} />;

  // ── Parent ─────────────────────────────────────────────────────────────
  if (appMode === "parent") {
    return (
      <div>
        {parentTab === "home" && <ParentHome onNavigate={setParentTab} />}
        {parentTab === "stats" && <ParentStats />}
        {parentTab === "forum" && <ParentForum />}
        {parentTab === "notifications" && <ParentNotifications />}
        {parentTab === "profile" && <ParentProfile onLogout={handleLogout} />}
        <ParentBottomNav activeTab={parentTab} onTabChange={setParentTab} notificationCount={3} />
      </div>
    );
  }

  // ── Child ──────────────────────────────────────────────────────────────
  if (childTab === "ranking") return (
    <><RankingScreen /><BottomNav activeTab={childTab} onTabChange={setChildTab} /></>
  );
  if (childTab === "trophies") return (
    <><TrophiesScreen /><BottomNav activeTab={childTab} onTabChange={setChildTab} /></>
  );
  if (childTab === "profile") return (
    <>
      <ProfileScreen />
      <BottomNav activeTab={childTab} onTabChange={setChildTab} />
      <button
        onClick={handleLogout}
        className="fixed bottom-24 right-4 bg-white border border-gray-200 rounded-full px-3 py-2 text-xs font-bold text-[#494949]/60 shadow-md z-50 flex items-center gap-1.5"
      >
        <FontAwesomeIcon icon={faRightFromBracket} className="w-3 h-3" />
        Trocar usuário
      </button>
    </>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-b ${bgGradients[activeMascot]} overflow-auto pb-24 transition-colors duration-500`}>
      <div className="max-w-md mx-auto px-6 pt-6 pb-2 flex items-center justify-between">
        <img src={logoLetrico} alt="Letrico" className="h-20 object-contain" />
        <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs text-[#494949]/40 font-medium hover:text-[#494949]/60">
          <FontAwesomeIcon icon={faRightFromBracket} className="w-3 h-3" /> Trocar
        </button>
      </div>

      <div className="max-w-md mx-auto px-6 pt-2 pb-4">
        <TopStats userName={userProgress.userName} badges={userProgress.badges} timeToday={userProgress.timeToday} />
      </div>

      <div className="max-w-md mx-auto px-6 py-4 space-y-3">
        <MascotSelector
          activeMascot={activeMascot}
          onSelectMascot={setActiveMascot}
          progress={{
            speech: userProgress.speech.completedLevels.length,
            reading: userProgress.reading.completedLevels.length,
            writing: userProgress.writing.completedLevels.length,
          }}
        />
        <motion.div key={activeMascot} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className="text-sm font-bold text-[#494949]">
            {activeMascot === "speech" && "🗣️ Jornada da Fala"}
            {activeMascot === "reading" && "📖 Jornada da Leitura"}
            {activeMascot === "writing" && "✍️ Jornada da Escrita"}
          </p>
          <p className="text-xs text-[#494949]/70">
            {currentMascotProgress.completedLevels.length} de 15 fases completadas
          </p>
        </motion.div>
      </div>

      <div className="max-w-md mx-auto px-6">
        <motion.div
          key={activeMascot}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="relative mx-auto"
          style={{ width: `${containerWidth}px`, minHeight: `${currentLevels.length * 140 + 200}px` }}
        >
          <MapPath positions={positions} completedUntil={currentMascotProgress.completedLevels.length} />
          {currentLevels.map((lc, i) => {
            const n = i + 1;
            return (
              <LevelNodeVertical
                key={`${activeMascot}-${n}`}
                level={n}
                status={getLevelStatus(n)}
                stars={currentMascotProgress.stars[n] || 0}
                color={lc.color}
                position={getLevelPosition(i, containerWidth)}
                type={activeMascot}
                name={lc.name}
                onClick={() => {}}
              />
            );
          })}
          <div className="absolute top-20 -left-8 text-4xl opacity-20 animate-bounce">☁️</div>
          <div className="absolute top-60 -right-8 text-3xl opacity-20 animate-bounce" style={{ animationDelay: "1s" }}>⭐</div>
          <div className="absolute bottom-40 -left-6 text-3xl opacity-20 animate-bounce" style={{ animationDelay: "2s" }}>🌈</div>
        </motion.div>

        <div className="flex flex-col items-center gap-3 mt-12 mb-8">
          <div className="text-5xl animate-bounce">🎉</div>
          <p className="text-lg font-bold text-[#494949]">Continue aprendendo!</p>
        </div>
      </div>

      <BottomNav activeTab={childTab} onTabChange={setChildTab} />
    </div>
  );
}
