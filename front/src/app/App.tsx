import { useState } from "react";
import { motion } from "motion/react";
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
import logoLetrico from "../imports/loucuras_do_tcc__1_-removebg-preview.png";

// Level configuration por mascote - 15 fases cada
const levelsByMascot = {
  speech: [
    { name: "Sons Iniciais", color: "#ffde59" },
    { name: "Vogais A-E-I", color: "#ffe990" },
    { name: "Vogais O-U", color: "#ffde59" },
    { name: "Sons de Animais", color: "#ffe990" },
    { name: "Repetir Palavras", color: "#ffde59" },
    { name: "Sílabas Simples", color: "#ffe990" },
    { name: "Sons das Letras", color: "#ffde59" },
    { name: "Consoantes B-C-D", color: "#ffe990" },
    { name: "Consoantes F-G-H", color: "#ffde59" },
    { name: "Rimas Divertidas", color: "#ffe990" },
    { name: "Palavras Curtas", color: "#ffde59" },
    { name: "Separar Sílabas", color: "#ffe990" },
    { name: "Sons Finais", color: "#ffde59" },
    { name: "Frases Simples", color: "#ffe990" },
    { name: "História Falada", color: "#ffde59" },
  ],
  reading: [
    { name: "Conhecer Vogais", color: "#b197fc" },
    { name: "Letras do Nome", color: "#b197fc" },
    { name: "Ligar Imagens", color: "#b197fc" },
    { name: "Alfabeto A-M", color: "#b197fc" },
    { name: "Alfabeto N-Z", color: "#b197fc" },
    { name: "Palavras Simples", color: "#b197fc" },
    { name: "Completar Palavras", color: "#b197fc" },
    { name: "Famílias Silábicas", color: "#b197fc" },
    { name: "Ler Frases", color: "#b197fc" },
    { name: "Cores e Formas", color: "#b197fc" },
    { name: "Números 1-10", color: "#b197fc" },
    { name: "Leitura Guiada", color: "#b197fc" },
    { name: "Pequenos Textos", color: "#b197fc" },
    { name: "Interpretação", color: "#b197fc" },
    { name: "História Completa", color: "#b197fc" },
  ],
  writing: [
    { name: "Traçar Letras", color: "#41b8d5" },
    { name: "Vogais Maiúsculas", color: "#6ec6ff" },
    { name: "Vogais Minúsculas", color: "#41b8d5" },
    { name: "Consoantes M-P", color: "#6ec6ff" },
    { name: "Montar Sílabas", color: "#41b8d5" },
    { name: "Escrever Nome", color: "#6ec6ff" },
    { name: "Palavras BA-BE-BI", color: "#41b8d5" },
    { name: "Palavras CA-CO-CU", color: "#6ec6ff" },
    { name: "Escrever Palavras", color: "#41b8d5" },
    { name: "Letra Cursiva", color: "#6ec6ff" },
    { name: "Formar Frases", color: "#41b8d5" },
    { name: "Pontuar Textos", color: "#6ec6ff" },
    { name: "Escrever História", color: "#41b8d5" },
    { name: "Ditado Visual", color: "#6ec6ff" },
    { name: "Texto Livre", color: "#41b8d5" },
  ],
};

const getLevelPosition = (index: number, containerWidth: number) => {
  const centerX = containerWidth / 2;
  const startY = 180;
  const verticalGap = 140;
  const patterns = [
    { x: centerX, y: startY },
    { x: centerX - 100, y: startY + verticalGap },
    { x: centerX + 100, y: startY + verticalGap },
    { x: centerX, y: startY + verticalGap * 2 },
    { x: centerX, y: startY + verticalGap * 3 },
    { x: centerX - 100, y: startY + verticalGap * 4 },
    { x: centerX + 100, y: startY + verticalGap * 4 },
    { x: centerX, y: startY + verticalGap * 5 },
    { x: centerX, y: startY + verticalGap * 6 },
    { x: centerX, y: startY + verticalGap * 7 },
  ];
  return patterns[index] || { x: centerX, y: startY + verticalGap * index };
};

type AppMode = "login" | "child" | "parent";
type ChildTab = "home" | "ranking" | "trophies" | "profile";
type ParentTab = "home" | "stats" | "forum" | "notifications" | "profile";

export default function App() {
  const [appMode, setAppMode] = useState<AppMode>("login");
  const [childTab, setChildTab] = useState<ChildTab>("home");
  const [parentTab, setParentTab] = useState<ParentTab>("home");
  const [activeMascot, setActiveMascot] = useState<"speech" | "reading" | "writing">("speech");

  const [userProgress] = useState({
    userName: "Gael",
    speech: { currentLevel: 5, completedLevels: [1, 2, 3, 4], stars: { 1: 3, 2: 2, 3: 3, 4: 1 } },
    reading: { currentLevel: 3, completedLevels: [1, 2], stars: { 1: 3, 2: 2 } },
    writing: { currentLevel: 2, completedLevels: [1], stars: { 1: 3 } },
    badges: 3,
    timeToday: 15,
  });

  const [containerWidth] = useState(400);
  const currentMascotProgress = userProgress[activeMascot];
  const currentLevels = levelsByMascot[activeMascot];

  const getLevelStatus = (levelNum: number) => {
    if (currentMascotProgress.completedLevels.includes(levelNum)) return "completed";
    if (levelNum === currentMascotProgress.currentLevel) return "current";
    return "locked";
  };

  const positions = currentLevels.map((_, index) => getLevelPosition(index, containerWidth));

  const bgGradients = {
    speech: "from-[#fffdf7] via-[#ffde59]/10 to-[#ffe990]/10",
    reading: "from-[#fffdf7] via-[#b197fc]/10 to-[#b197fc]/5",
    writing: "from-[#fffdf7] via-[#41b8d5]/10 to-[#6ec6ff]/10",
  };

  const handleLogin = (type: "child" | "parent") => {
    setAppMode(type);
  };

  const handleLogout = () => {
    setAppMode("login");
    setChildTab("home");
    setParentTab("home");
  };

  // ── LOGIN ──────────────────────────────────────────────────────────────
  if (appMode === "login") {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // ── PARENT APP ─────────────────────────────────────────────────────────
  if (appMode === "parent") {
    const notificationCount = 3;
    return (
      <div className="relative">
        {parentTab === "home" && <ParentHome onNavigate={setParentTab} />}
        {parentTab === "stats" && <ParentStats />}
        {parentTab === "forum" && <ParentForum />}
        {parentTab === "notifications" && <ParentNotifications />}
        {parentTab === "profile" && <ParentProfile onLogout={handleLogout} />}
        <ParentBottomNav
          activeTab={parentTab}
          onTabChange={setParentTab}
          notificationCount={notificationCount}
        />
      </div>
    );
  }

  // ── CHILD APP ──────────────────────────────────────────────────────────
  if (childTab === "ranking") {
    return (
      <>
        <RankingScreen />
        <BottomNav activeTab={childTab} onTabChange={setChildTab} />
      </>
    );
  }
  if (childTab === "trophies") {
    return (
      <>
        <TrophiesScreen />
        <BottomNav activeTab={childTab} onTabChange={setChildTab} />
      </>
    );
  }
  if (childTab === "profile") {
    return (
      <>
        <ProfileScreen />
        <BottomNav activeTab={childTab} onTabChange={setChildTab} />
        {/* Logout for child */}
        <button
          onClick={handleLogout}
          className="fixed bottom-24 right-4 bg-white border border-gray-200 rounded-full px-4 py-2 text-xs font-bold text-[#494949]/60 shadow-md z-50"
        >
          ← Trocar usuário
        </button>
      </>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b ${bgGradients[activeMascot]} overflow-auto pb-24 transition-colors duration-500`}>
      {/* Logo */}
      <div className="max-w-md mx-auto px-6 pt-6 pb-2 flex justify-between items-center">
        <img src={logoLetrico} alt="Letrico" className="h-20 object-contain" />
        <button
          onClick={handleLogout}
          className="text-xs text-[#494949]/40 font-medium hover:text-[#494949]/60"
        >
          Trocar ↩
        </button>
      </div>

      <div className="max-w-md mx-auto px-6 pt-2 pb-4">
        <TopStats
          userName={userProgress.userName}
          badges={userProgress.badges}
          timeToday={userProgress.timeToday}
        />
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
        <motion.div
          key={activeMascot}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
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
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="relative mx-auto"
          style={{
            width: `${containerWidth}px`,
            minHeight: `${currentLevels.length * 140 + 200}px`,
          }}
        >
          <MapPath
            positions={positions}
            completedUntil={currentMascotProgress.completedLevels.length}
          />
          {currentLevels.map((levelConfig, index) => {
            const levelNum = index + 1;
            const position = getLevelPosition(index, containerWidth);
            return (
              <LevelNodeVertical
                key={`${activeMascot}-${levelNum}`}
                level={levelNum}
                status={getLevelStatus(levelNum)}
                stars={currentMascotProgress.stars[levelNum] || 0}
                color={levelConfig.color}
                position={position}
                type={activeMascot}
                name={levelConfig.name}
                onClick={() => console.log(`Clicked ${activeMascot} level ${levelNum}`)}
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
