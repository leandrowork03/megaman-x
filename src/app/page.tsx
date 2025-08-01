// src/app/page.tsx (ou src/components/Home.tsx)
'use client'

import { useEffect, useState, useRef } from 'react'
import { Header } from '@/components/Header'
export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const videoElement = videoRef.current;

    if (showIntro && videoElement) {
      videoElement.oncanplaythrough = () => {
        setVideoLoaded(true);
        videoElement.play().catch(error => {
          console.error("Erro ao tentar autoplay (após oncanplaythrough):", error);
          handleVideoComplete();
        });
      };

      videoElement.onerror = (e) => {
        console.error("Erro de carregamento de vídeo:", e);
        handleVideoComplete();
      };

      videoElement.load();
    }
  }, [showIntro]);

  const handleVideoComplete = () => {
    setShowIntro(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  const skipIntro = () => {
    handleVideoComplete();
  }

  return (
    <div>
      {showIntro ? (
     
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 p-4">
          {!videoLoaded && (
            <div className="text-white text-lg animate-pulse mb-4">Carregando introdução...</div>
          )}

          <video
            ref={videoRef}
            src="/videos/intro.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoComplete}
           
            className={`
              transition-opacity duration-500 z-50
              max-w-full max-h-full w-auto h-auto object-contain
              lg:w-screen lg:h-screen lg:object-cover
              ${videoLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            preload="auto"
          />

          <button
            onClick={skipIntro}
           
            className={`
              mt-4 bg-white text-black px-4 py-2 rounded-lg z-[51] opacity-75 hover:opacity-100 transition-opacity
              lg:absolute lg:bottom-10 lg:right-10
            `}
          >
            Pular Introdução
          </button>
        </div>
      ) : (
        <main
          className="relative z-10 p-10 text-white min-h-screen
                     bg-cover bg-fixed"
          style={{ backgroundImage: 'url("/images/zx.jpg")' }}
        >
          <Header/>
          <h1 className="text-4xl font-bold">Bem-vindo ao Mundo de Mega Man X</h1>
          <p className="mt-4">Site tributo feito por Leandro</p>
        </main>
      )}
    </div>
  )
}

