"use client";

export default function VideoBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/videos/bg.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>
    </div>
  );
}
