//src/app/game/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { bosses as initialBosses } from "@/data/bosses";
import { verificarSigma } from "@/utils/sigmaUnlock";


export interface Boss {
  name: string;
  weakness: string;
  power: string;
  defeated: boolean;
  hp: number;
  pic: string;
}

const sigmaData = {
  name: "Sigma",
  hp: 250,
  maxHp: 250,
  power: "Chaos Spear",
  weakness: "Electric Spark",
  pic: "/images/sig.jpg",
};

const powerColors: Record<string, string> = {
  "Fire Wave": "bg-orange-600 hover:bg-orange-700 border-orange-800",
  "Shotgun Ice": "bg-cyan-500 hover:bg-cyan-600 border-cyan-700",
  "Electric Spark": "bg-yellow-400 hover:bg-yellow-500 border-yellow-600 text-black",
  "Rolling Shield": "bg-green-600 hover:bg-green-700 border-green-800",
  "Chameleon Sting": "bg-lime-500 hover:bg-lime-600 border-lime-700 text-black",
  "Storm Tornado": "bg-purple-600 hover:bg-purple-700 border-purple-800",
  "Boomerang Cutter": "bg-pink-500 hover:bg-pink-600 border-pink-700",
  "Homing Torpedo": "bg-blue-400 hover:bg-blue-500 border-blue-600",
  "Buster": "bg-blue-600 hover:bg-blue-700 border-blue-800",
  "Chaos Spear": "bg-red-900 hover:bg-red-800 border-yellow-500",
};



function BarraVida({ actual, max }: { actual: number; max: number }) {
  const percentual = (actual / max) * 100;
  const fillColor = percentual > 30 ? "#00FF00" : "#FF0000";

  return (
    <div
      className=" w-[150px] h-[20px] bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-500"
      style={{
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.8)",
      }}
    >
      <div
        className="h-full transition-all duration-300 ease-linear"
        style={{
          width: `${percentual}%`,
          backgroundColor: fillColor,
          boxShadow: `0 0 3px ${fillColor}, 0 0 6px ${fillColor}`,
        }}
      />
    </div>
  );
}

export default function GameScreen() {
  const [bossList, setBossList] = useState<
    (Boss & { maxHp: number })[] // O tipo do estado é Boss COM maxHp
  >(
    initialBosses.map((b: Boss) => ({ ...b, maxHp: b.hp })) // <-- **CORREÇÃO AQUI: (b: Boss)**
  );

  const playerMaxHp = 100;
  const [playerHp, setPlayerHp] = useState(playerMaxHp);
  const [playerPowers, setPlayerPowers] = useState<string[]>(["Buster", "Fire Wave"]);

  const [currentBossIndex, setCurrentBossIndex] = useState<number | null>(null);
  const [bossHp, setBossHp] = useState(0);
  const [bossMaxHp, setBossMaxHp] = useState(0);
  const [showVictoryVideo, setShowVictoryVideo] = useState(false);

  const [sigmaFight, setSigmaFight] = useState(false);
  const [sigmaHp, setSigmaHp] = useState(sigmaData.hp);
  const [sigmaMaxHp] = useState(sigmaData.maxHp);
  const [sigmaDefeated, setSigmaDefeated] = useState(false);

  const [turn, setTurn] = useState<"player" | "boss" | null>(null);
  const [battleMessage, setBattleMessage] = useState("");

  const [sigmaLiberado, setSigmaLiberado] = useState(false);

  const [videoMuted, setVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.volume = 0.3;
      backgroundAudioRef.current.play().catch(e => console.log("Áudio de fundo não pôde tocar automaticamente:", e));
    }
    return () => {
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    console.log("Boss list:", bossList);
    console.log("Sigma liberado?", sigmaLiberado);
  }, [bossList, sigmaLiberado]);

  useEffect(() => {
    if (turn === "boss" && currentBossIndex !== null && !sigmaFight) {
      const timeout = setTimeout(() => {
        if (playerHp > 0) {
            atacarBoss();
        }
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [turn, currentBossIndex, sigmaFight, playerHp]);

  useEffect(() => {
    if (turn === "boss" && sigmaFight) {
      const timeout = setTimeout(() => {
        if (playerHp > 0) {
            atacarSigma();
        }
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [turn, sigmaFight, playerHp]);

  function iniciarLuta(index: number) {
    if (bossList[index].defeated || sigmaFight || turn !== null) return;
    setCurrentBossIndex(index);
    setBossHp(bossList[index].hp);
    setBossMaxHp(bossList[index].hp);
    setTurn("player");
    setBattleMessage(`Você iniciou a luta contra ${bossList[index].name}!`);
  }

  function iniciarLutaSigma() {
    if (!sigmaLiberado || sigmaDefeated || turn !== null) return;
    setSigmaFight(true);
    setSigmaHp(sigmaData.hp);
    setPlayerHp(playerMaxHp);
    setTurn("player");
    setBattleMessage(`Você iniciou a luta contra Sigma! Prepare-se!`);
  }

  function finalizarLutaSigma(vitoria: boolean) {
    if (vitoria) {
      setBattleMessage("Você derrotou Sigma! Parabéns, você salvou o mundo!");
      setSigmaDefeated(true);
      setShowVictoryVideo(true);
      setVideoMuted(true);
    } else {
      setBattleMessage("Você foi derrotado por Sigma... Tente novamente.");
    }
    setPlayerHp(playerMaxHp);
    setSigmaHp(sigmaData.hp);
    setTurn(null);
    setSigmaFight(false);
  }

  function handleVideoEnded() {
    setShowVictoryVideo(false);
  }

  function toggleVideoSound() {
    setVideoMuted((prev) => !prev);
  }

  function skipVideo() {
    setShowVictoryVideo(false);
  }

  function atacarPlayer(weapon: string) {
    if (turn !== "player") return;

    if (sigmaFight) {
      let damage = 0;
      let msg = "";

      if (weapon === "Buster") {
        damage = 15;
        msg = `Você atacou Sigma com Buster causando ${damage} de dano.`;
      } else {
        if (weapon === sigmaData.weakness) {
          damage = 50;
          msg = `Ataque especial ${weapon} é eficaz contra Sigma! Dano crítico: ${damage}.`;
        } else {
          damage = 5;
          msg = `Ataque especial ${weapon} não é tão eficaz contra Sigma. Dano: ${damage}.`;
        }
      }

      const novoHpSigma = Math.max(sigmaHp - damage, 0);
      setSigmaHp(novoHpSigma);
      setBattleMessage(msg);

      if (novoHpSigma <= 0) {
        setTimeout(() => finalizarLutaSigma(true), 1000);
      } else {
        setTurn("boss");
      }
    } else {
      if (currentBossIndex === null) return;

      const boss = bossList[currentBossIndex];
      let damage = 0;
      let msg = "";

      if (weapon === "Buster") {
        damage = 6;
        msg = `Você atacou com Buster causando ${damage} de dano.`;
      } else {
        if (weapon === boss.weakness) {
          damage = 23;
          msg = `Ataque especial ${weapon} é eficaz! Dano crítico: ${damage}.`;
        } else {
          damage = 1;
          msg = `Ataque especial ${weapon} não é eficaz. Causou apenas ${damage} de dano.`;
        }
      }

      const newBossHp = Math.max(bossHp - damage, 0);
      setBossHp(newBossHp);
      setBattleMessage(msg);

      if (newBossHp <= 0) {
        setTimeout(() => finalizarLuta(true), 1000);
      } else {
        setTurn("boss");
      }
    }
  }

  function atacarBoss() {
    if (turn !== "boss" || currentBossIndex === null || sigmaFight) return;

    const damage = Math.floor(Math.random() * 16);
    const newPlayerHp = Math.max(playerHp - damage, 0);
    setPlayerHp(newPlayerHp);
    setBattleMessage(
      `O ${bossList[currentBossIndex].name} atacou e causou ${damage} de dano em você.`
    );

    if (newPlayerHp <= 0) {
      setTimeout(() => finalizarLuta(false), 1000);
    } else {
      setTurn("player");
    }
  }

  function atacarSigma() {
    if (turn !== "boss" || !sigmaFight) return;

    const damage = 20;
    const newPlayerHp = Math.max(playerHp - damage, 0);
    setPlayerHp(newPlayerHp);
    setBattleMessage(`Sigma atacou e causou ${damage} de dano em você.`);

    if (newPlayerHp <= 0) {
      setTimeout(() => finalizarLutaSigma(false), 1000);
    } else {
      setTurn("player");
    }
  }

  function finalizarLuta(vitoria: boolean) {
    if (vitoria && currentBossIndex !== null) {
      const boss = bossList[currentBossIndex];

      const novaLista = bossList.map((b, i) =>
        i === currentBossIndex ? { ...b, defeated: true, hp: 0 } : b
      );
      setBossList(novaLista);

      if (!playerPowers.includes(boss.power) && boss.power !== "Buster") {
        setPlayerPowers((prevPowers) => [...prevPowers, boss.power]);
      }

      setBattleMessage(`Você derrotou ${boss.name} e ganhou o poder ${boss.power}!`);
      setPlayerHp(playerMaxHp);

      if (verificarSigma(novaLista)) {
        console.log("Todos chefes derrotados! Sigma liberado!");
        setSigmaLiberado(true);
      }
    } else {
      setBattleMessage("Você foi derrotado! Tente novamente.");
      setPlayerHp(playerMaxHp);
    }

    setCurrentBossIndex(null);
    setBossHp(0);
    setTurn(null);
  }

  function restartGame() {
    setBossList(initialBosses.map((b: Boss) => ({ ...b, maxHp: b.hp, defeated: false }))); // <-- **CORREÇÃO AQUI: (b: Boss)**
    setPlayerHp(playerMaxHp);
    setPlayerPowers(["Buster", "Fire Wave"]);
    setCurrentBossIndex(null);
    setBossHp(0);
    setBossMaxHp(0);
    setSigmaFight(false);
    setSigmaHp(sigmaData.hp);
    setSigmaDefeated(false);
    setSigmaLiberado(false);
    setTurn(null);
    setBattleMessage("");
    setShowVictoryVideo(false);
    setVideoMuted(true);

    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.currentTime = 0;
      backgroundAudioRef.current.play().catch(e => console.log("Áudio de fundo não pôde tocar automaticamente:", e));
    }
  }

  return (
    <div className="min-h-screen h-screen bg-gray-950 text-white font-mono flex flex-col items-center justify-center p-2 sm:p-4 relative overflow-hidden">
      <audio ref={backgroundAudioRef} src="/sounds/game-background-music.mp3" loop />

      <div className="relative w-full max-w-screen-lg mx-auto bg-gradient-to-br from-gray-900 to-black p-4 sm:p-6 rounded-xl border-4 border-blue-800 shadow-[0_0_20px_rgba(0,0,255,0.7)] flex flex-col flex-grow flex-shrink overflow-y-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-4 text-yellow-400 uppercase tracking-wider border-b-2 border-yellow-600 pb-2 shadow-text">
          Mega Man X - Boss Rush
        </h1>

        <div className="bg-gray-800 p-3 rounded-lg border-2 border-green-500 shadow-md mb-4 min-h-[60px] flex items-center justify-center text-center text-base sm:text-lg font-bold text-green-300">
          {battleMessage || "Selecione um chefe para iniciar a batalha!"}
        </div>

        {(currentBossIndex !== null || sigmaFight) && (
          <div className="flex flex-col sm:flex-row items-center justify-around gap-4 mb-4 p-4 bg-gray-800 rounded-lg border-2 border-red-700 shadow-lg">
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/images/x.jpg"
                alt="Mega Man X"
                width={90}
                height={90}
                className="rounded-full border-3 border-blue-500 shadow-lg"
              />
              <p className="text-xl font-bold text-blue-400 uppercase">
                Mega Man X
              </p>
              <BarraVida actual={playerHp} max={playerMaxHp} />
              <p className="text-sm text-white-300">
                HP: {playerHp} / {playerMaxHp}
              </p>
            </div>

            <div className="text-4xl font-extrabold text-red-600 animate-pulse">
              VS
            </div>

            <div className="flex flex-col items-center gap-2">
              <Image
                src={
                  sigmaFight
                    ? sigmaData.pic
                    : bossList[currentBossIndex!]?.pic
                }
                alt={
                  sigmaFight
                    ? sigmaData.name
                    : bossList[currentBossIndex!]?.name
                }
                width={90}
                height={90}
                className="rounded-full border-3 border-red-500 shadow-lg"
              />
              <p className="text-xl font-bold text-red-400 uppercase">
                {sigmaFight
                  ? sigmaData.name
                  : bossList[currentBossIndex!]?.name}
              </p>
              <BarraVida
                actual={sigmaFight ? sigmaHp : bossHp}
                max={sigmaFight ? sigmaMaxHp : bossMaxHp}
              />
              <p className="text-sm text-white-300">
                HP: {sigmaFight ? sigmaHp : bossHp} /{" "}
                {sigmaFight ? sigmaMaxHp : bossMaxHp}
              </p>
            </div>
          </div>
        )}

        {turn === "player" && (
          <div className="bg-gray-800 p-4 rounded-lg border-2 border-purple-700 shadow-lg mb-4">
            <h3 className="text-xl font-bold text-purple-300 mb-3">
              Escolha seu ataque:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {["Buster", ...playerPowers.filter(p => p !== "Buster")].map((power) => (
                <button
                  key={power}
                  onClick={() => atacarPlayer(power)}
                  className={`text-white font-bold py-2 px-4 rounded-lg active:translate-y-1 transition-all duration-200 shadow-md text-base uppercase border-b-3 ${
                    powerColors[power] || "bg-gray-600 hover:bg-gray-700 border-gray-800"
                  }`}
                >
                  {power}
                </button>
              ))}
            </div>
          </div>
        )}

        {!sigmaFight && currentBossIndex === null && (
          <div className="bg-gray-800 p-4 rounded-lg border-2 border-green-700 shadow-lg mb-4 flex-grow overflow-y-auto">
            <h3 className="text-xl font-bold text-green-300 mb-3">
              Chefes Disponíveis:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {bossList.map((boss, index) => (
                <button
                  key={boss.name}
                  onClick={() => iniciarLuta(index)}
                  disabled={boss.defeated || turn !== null}
                  className={`relative p-3 rounded-lg border-3 text-center transition-all duration-200 flex flex-col items-center justify-center
                    ${
                      boss.defeated
                        ? "bg-gray-700 border-gray-500 text-gray-400 opacity-60 cursor-not-allowed"
                        : "bg-blue-800 border-blue-600 hover:bg-blue-700 active:translate-y-1 shadow-sm"
                    }
                    ${turn !== null ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  <img
                    src={boss.pic || "/images/sig.jpg"}
                    alt={boss.name}
                    width={60}
                    height={60}
                    className="mb-1 rounded-full border-1 border-white object-cover"
                  />
                  <span className="text-base font-bold">
                    {boss.name}
                    {boss.defeated && <span className="block text-xs">(Derrotado)</span>}
                  </span>
                  {boss.defeated && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg">
                      <span className="text-red-500 text-xl font-bold transform rotate-[-20deg]">DEFEATED</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {sigmaLiberado && !sigmaDefeated && !sigmaFight && (
          <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center animate-fade-in p-4">
            <div className="bg-red-950 border-4 border-yellow-500 rounded-lg p-6 shadow-xl-red text-center relative max-w-sm w-full animate-scale-in">
              <Image
                src={sigmaData.pic}
                alt={sigmaData.name}
                width={100}
                height={100}
                className="mx-auto mb-4 rounded-full border-3 border-red-700 shadow-lg"
              />

              <h3 className="text-3xl font-extrabold text-yellow-300 mb-3 uppercase animate-pulse-fast">
                ALERTA! SIGMA LIBERADO!
              </h3>
              <p className="text-lg text-red-200 mb-6">
                O desafio final aguarda! Você está pronto(a) para a batalha mais difícil?
              </p>
              <button
                onClick={iniciarLutaSigma}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg border-b-3 border-red-800 active:translate-y-1 transition-all duration-200 shadow-lg text-xl uppercase"
              >
                ENFRENTAR SIGMA!
              </button>
            </div>
          </div>
        )}

        {(playerHp <= 0 || sigmaDefeated) && !showVictoryVideo && (
            <div className="text-center mt-4 bg-black/70 p-4 rounded-lg border-3 border-yellow-500 shadow-xl">
                <p className={`text-3xl font-extrabold ${sigmaDefeated ? 'text-green-400' : 'text-red-500'} animate-bounce`}>
                    {sigmaDefeated ? "VITÓRIA!" : "GAME OVER!"}
                </p>
                <p className="text-base mt-3">
                    {sigmaDefeated ? "Você derrotou Sigma e salvou o mundo!" : "Tente novamente, Maverick Hunter!"}
                </p>
                <button
                    onClick={restartGame}
                    className="mt-4 bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg border-b-3 border-blue-900 active:translate-y-1 transition-all duration-200 text-base"
                >
                    Reiniciar Jogo
                </button>
            </div>
        )}
      </div>

      {showVictoryVideo && (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999] p-2">
          <video
            ref={videoRef}
            src="/videos/ed.mp4"
            autoPlay
            muted={videoMuted}
            onEnded={handleVideoEnded}
            className="w-full h-auto max-w-3xl max-h-[70vh] rounded-xl border-6 border-yellow-400 shadow-2xl"
            controls={false}
          />
          <div className="mt-4 flex gap-3">
            <button
              onClick={toggleVideoSound}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-5 rounded-lg border-b-3 border-gray-900 active:translate-y-1 transition-all duration-200 text-base uppercase"
            >
              {videoMuted ? "Ativar Som" : "Desativar Som"}
            </button>
            <button
              onClick={skipVideo}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-lg border-b-3 border-red-800 active:translate-y-1 transition-all duration-200 text-base uppercase"
            >
              Pular Final
            </button>
          </div>
        </div>
      )}
    </div>
  );
}