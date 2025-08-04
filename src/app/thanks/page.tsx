//src/app/thanks/page.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoHome } from "react-icons/io5";
import PrivateRoute from "@/components/PrivateRoute";
import VideoBackground from "@/components/VideoBackground";
import { FaPlay, FaPause, FaVolumeUp } from "react-icons/fa";

function capitalizeFirstLetter(string: string | null | undefined): string {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Thanks() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  if (loading || !user) return <p className="text-center mt-10">Carregando...</p>;

  const capitalizedDisplayName = capitalizeFirstLetter(user.displayName);

  return (
    <PrivateRoute>
      <VideoBackground />
      <audio ref={audioRef}>
        <source src="/audio/sm.mp3" type="audio/mpeg" />
        Seu navegador não suporta áudio.
      </audio>

      {/* Removido `h-screen` para permitir que o conteúdo defina a altura total. 
          `min-h-screen` garante altura mínima e `py-8` adiciona padding vertical. */}
      <div className="relative flex items-center justify-center min-h-screen py-8 px-4">
        <div
          // `p-4` para mobile, `md:p-10` para desktop.
          className="max-w-4xl flex flex-col md:flex-row bg-black/70 text-white p-4 md:p-10 rounded-4xl justify-center items-center gap-6 md:gap-10 z-10 relative"
        >
          {/* Bordas animadas aqui */}
          <div className="absolute -inset-1 rounded-4xl border-4 border-transparent pointer-events-none animated-border z-[-1]" />

          {/* `w-full` em mobile, `sm:max-w-md` a partir de `sm` para controlar largura. */}
          <div className="w-full sm:max-w-md text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-bold mb-4">
              {/* Ajuste fino do tamanho do nome para `text-4xl` em mobile, `sm:text-5xl` em sm e `md:text-6xl` em md */}
              <strong className="text-4xl sm:text-5xl md:text-6xl">{capitalizedDisplayName}</strong> Muito obrigado pela visita!
            </h1>
            <p className="text-base leading-relaxed mb-4 md:text-lg">
              Eu realmente fico feliz que você tenha vindo até aqui.
              Sua visita significa muito para mim, e espero que encontre aqui inspiração, aprendizado e boas experiências.
              Sempre que precisar, este espaço estará aberto para você voltar, explorar e crescer junto comigo.
              Valeu de coração!
            </p>

            <p className="italic text-yellow-400 text-sm mt-4 md:text-base">
              “Mesmo quando o mundo diz que é impossível, lute como um Maverick Hunter: nunca desista dos seus sonhos.”
            </p>

            <div className="flex flex-col md:flex-row items-center gap-4 mt-6 justify-between">
              <div className="bg-blue-800/80 p-6 rounded-3xl flex flex-col items-center gap-4 shadow-xl border border-blue-500/40 max-w-sm">
                <h1 className="font-extrabold text-xl text-blue-300 drop-shadow-md text-center">
                  Dê o play na música tema desse projeto
                </h1>

                <button
                  onClick={toggleAudio}
                  className="bg-gradient-to-r from-blue-700 to-purple-700 hover:brightness-125 text-white p-4 rounded-full shadow-lg transition"
                >
                  {isPlaying ? <FaPause size={28} /> : <FaPlay size={28} />}
                </button>

                <div className="flex items-center gap-3 w-full px-4">
                  <FaVolumeUp className="text-yellow-300" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full accent-yellow-400"
                  />
                </div>
              </div>

              <div className="flex justify-center items-center">
                <a href="/" className="text-white bg-black/90 w-20 h-20 justify-center rounded-full flex flex-col items-center mt-10">
                  <IoHome size={30} />
                  voltar
                </a>
              </div>
            </div>
          </div>

          <img
            src="/images/me.jpeg"
            alt="eu"
            className="w-40 h-auto sm:w-52 sm:h-72 md:w-80 md:h-auto rounded-4xl object-cover hidden md:block"
          />
        </div>
      </div>

      <style jsx>{`
        .animated-border {
          border: 3px solid transparent;
          border-radius: 2rem;
          background: linear-gradient(120deg, transparent, #00f0ff, transparent);
          background-size: 300% 300%;
          animation: borderLight 3s linear infinite;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          -webkit-mask-composite: destination-out;
        }

        @keyframes borderLight {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 300% 50%;
          }
        }
      `}</style>
    </PrivateRoute>
  );
}