'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { auth } from '@/lib/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'

export default function Home() {
  const router = useRouter()

  const [showIntro, setShowIntro] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [showAuthModal, setShowAuthModal] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const [ref1, inView1] = useInView({ triggerOnce: false, threshold: 0.3 })
  const [ref2, inView2] = useInView({ triggerOnce: false, threshold: 0.3 })
  const [ref3, inView3] = useInView({ triggerOnce: false, threshold: 0.3 })
  const [ref4, inView4] = useInView({ triggerOnce: false, threshold: 0.3 }) // Não utilizado, mas mantido

  
  const [footerRef, footerInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  
  const linkedinUrl = "linkedin.com/in/leandro-santos-front-end/";
  const whatsappNumber = "5551982126888";
  const emailAddress = "leandrotrabalho03@gmail.com"; 

  useEffect(() => {
    const video = videoRef.current
    if (showIntro && video) {
      video.oncanplaythrough = () => {
        setVideoLoaded(true)
        video.play().catch(err => {
          console.error("Autoplay erro:", err)
          handleVideoComplete()
        })
      }
      video.onerror = (e) => {
        console.error("Erro ao carregar vídeo:", e)
        handleVideoComplete()
      }
      video.load()
    }
  }, [showIntro])

  useEffect(() => {
    console.log("useEffect de autenticação da Home executado.");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("onAuthStateChanged (Home): currentUser =", currentUser ? currentUser.email : "null");

      const shouldShowModal = !showIntro && !currentUser;

      console.log(`Condições do modal (Home):
        !showIntro: ${!showIntro}
        !currentUser: ${!currentUser}
        shouldShowModal: ${shouldShowModal}`);

      setShowAuthModal(shouldShowModal);
    });

    return () => unsubscribe();
  }, [showIntro]);

  useEffect(() => {
    console.log("Estado de showAuthModal na Home:", showAuthModal);
  }, [showAuthModal]);

  const handleVideoComplete = () => {
    setShowIntro(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const skipIntro = () => handleVideoComplete()

  const handleLoginRedirect = () => {
    setShowAuthModal(false);
    router.push("/register");
  };

  const handleCadastrarDepois = () => {
    setShowAuthModal(false);
  };

  return (
    <div>
      {showIntro ? (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 p-4">
          {!videoLoaded && (
            <div className="text-white text-lg animate-pulse mb-4">
              Carregando introdução...
            </div>
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
            className="mt-4 bg-white text-black px-4 py-2 rounded-lg z-[51] opacity-75 hover:opacity-100 transition-opacity lg:absolute lg:bottom-10 lg:right-10"
          >
            Pular Introdução
          </button>
        </div>
      ) : (
        <main
          className="relative z-10 text-white min-h-screen bg-cover bg-fixed"
          style={{ backgroundImage: 'url("/images/zx.jpg")' }}
        >
          <motion.section
            ref={ref1}
            initial={{ opacity: 0, y: 100 }}
            animate={inView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="container mx-auto px-4 py-10"
          >


            <a href="/game">
              <div className="flex flex-col lg:flex-row bg-black/90 p-6 gap-6 rounded-xl">
                
                <Image
                  src="/images/game.jpg"
                  alt="X e Zero em combate" 
                  width={400}
                  height={300}
                  className="w-full max-w-xs md:max-w-sm lg:max-w-md object-contain"
                />
                <div>
                  <h2 className="text-2xl pb-4">venha jogar!</h2>
                  <p className="text-lg leading-relaxed">
                    Um Jogo divertido no estilo Boss-Rush baseado na famosa franquia da Capcom embarque nessa aventura com o Megaman X que esta lutando para salvar o mundo!
                  </p>
                  <p>E também luta pela convivencia passifica entre humanos e maquinas</p>
                </div>
              </div>
            </a>
          </motion.section>

          <motion.section
            ref={ref2}
            initial={{ opacity: 0, y: 100 }}
            animate={inView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="container mx-auto px-4 py-10"
          >
            <a href="/register">
              <div className="flex flex-col lg:flex-row bg-black/90 p-6 gap-6 rounded-xl">
                <Image
                  src="/images/login.jpg"
                  alt="Mega Man X na tela de login" 
                   width={400}
                  height={300}
                  className="w-full max-w-xs md:max-w-sm lg:max-w-md object-contain"
                />
                <div>
                  <h2 className="text-2xl pb-4">Faça já o seu registro</h2>
                  <p className="text-lg leading-relaxed">
                    Deixei uma menssagem especial para você que se registrou venha ver!
                  </p>
                </div>
              </div>
            </a>
          </motion.section>

          <motion.section
            ref={ref3}
            initial={{ opacity: 0, y: 100 }}
            animate={inView3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="container mx-auto px-4 py-10"
          >
            <a href="/historia">
              <div className="flex flex-col lg:flex-row bg-black/90 p-6 gap-6 rounded-xl">
               
                <Image
                  src="/images/mgzr.jpg"
                  alt="Zero pronto para o ataque" 
                  width={400}
                  height={300}
                  className="w-full max-w-xs md:max-w-sm lg:max-w-md object-contain"
                />
                <div>
                  <h2 className="text-2xl pb-4">Veja a história</h2>
                  <p className="text-lg leading-relaxed">
                    Venha conhecer a Fantastica história de Megaman X
                  </p>
                </div>
              </div>
            </a>
          </motion.section>
        </main>
      )}

      {showAuthModal && (
        <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center animate-fade-in p-4">
          <div className="bg-gradient-to-br from-gray-800 to-black border-4 border-blue-600 rounded-lg p-6 shadow-xl-blue text-center relative max-w-sm w-full animate-scale-in">
            <Image
              src="/images/x-pixel.png"
              alt="Mega Man X Pixel" 
              width={80}
              height={80}
              className="mx-auto mb-4 border-2"
            />
            <h3 className="text-3xl font-extrabold text-blue-300 mb-3 uppercase">
              Bem-vindo, Maverick Hunter!
            </h3>
            <p className="text-lg text-gray-200 mb-6">
              Para uma experiência completa, que tal se cadastrar agora ou fazer o login?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleLoginRedirect}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg border-b-3 border-green-800 active:translate-y-1 transition-all duration-200 shadow-md text-xl uppercase"
              >
                uma experiência completa
              </button>
              <button
                onClick={handleCadastrarDepois}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg border-b-3 border-gray-800 active:translate-y-1 transition-all duration-200 shadow-md text-xl uppercase"
              >
                Fazer depois
              </button>
            </div>
          </div>
        </div>
      )}

      {!showIntro && (
        <motion.footer
          ref={footerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={footerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gradient-to-t from-blue-950 to-black text-gray-300 p-8 pt-12 relative overflow-hidden border-t-4 border-blue-700 shadow-[0_-5px_20px_rgba(0,0,255,0.5)]"
        >
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 relative z-10">

            <div className="flex flex-col items-center md:items-start text-center md:text-left mb-6 md:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/images/x-pixel.png"
                  alt="Mega Man X Logo"
                  width={60}
                  height={60}
                  className="filter drop-shadow-[0_0_5px_rgba(0,180,255,0.8)]"
                />
                <span className="text-4xl font-extrabold text-blue-400 uppercase tracking-widest text-shadow-blue">
                  Mega Man X
                </span>
              </div>
              <p className="text-sm max-w-xs leading-relaxed text-gray-400">
                Uma homenagem à lendária série Mega Man X. Explore a história, jogue o Boss Rush e torne-se um Maverick Hunter!
              </p>
            </div>

            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-yellow-400 mb-4 border-b-2 border-yellow-600 pb-1 inline-block">
                Navegação
              </h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-shadow-hover-blue">Início</a></li>
                <li><a href="/game" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-shadow-hover-blue">Jogar</a></li>
                <li><a href="/historia" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-shadow-hover-blue">A História</a></li>
                <li><a href="/login" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-shadow-hover-blue">Login</a></li>
                <li><a href="/register" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-shadow-hover-blue">Cadastro</a></li>
              </ul>
            </div>

            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-yellow-400 mb-4 border-b-2 border-yellow-600 pb-1 inline-block">
                Conecte-se
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href={`mailto:leandrotrabalho03@gmail.com`} className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-shadow-hover-blue flex items-center justify-center md:justify-start gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                    {emailAddress}
                  </a>
                </li>
                <li>
                  <a href="https://github.com/leandrowork03" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-shadow-hover-blue flex items-center justify-center md:justify-start gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.83 9.504.475.087.68-.206.68-.456 0-.227-.008-.887-.015-1.743-2.793.608-3.387-1.39-3.387-1.39-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.006.07 1.532 1.03 1.532 1.03.89 1.528 2.345 1.088 2.91.829.091-.645.352-1.088.636-1.338-2.22-.253-4.555-1.119-4.555-4.943 0-1.09.39-1.984 1.03-2.675-.104-.253-.448-1.265.09-2.645 0 0 .84-.27 2.75 1.025.798-.222 1.649-.333 2.5-.333.852 0 1.703.111 2.5.333 1.91-1.295 2.75-1.025 2.75-1.025.538 1.38.194 2.392.09 2.645.64.691 1.028 1.585 1.028 2.675 0 3.832-2.338 4.687-4.566 4.935.359.308.678.915.678 1.846 0 1.334-.013 2.41-.013 2.742 0 .252.204.547.686.453C19.146 20.198 22 16.442 22 12.017 22 6.484 17.523 2 12 2Z" clipRule="evenodd" /></svg>
                    GitHub
                  </a>
                </li>
               
                <li>
                  <a href="linkedin.com/in/leandro-santos-front-end/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-shadow-hover-blue flex items-center justify-center md:justify-start gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                    </svg>
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href={`https://wa.me/51982126888`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-shadow-hover-blue flex items-center justify-center md:justify-start gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M.057 24L1.75 17.25C.7 15.6.2 13.65.2 11.6C.2 5.2 5.4 0 11.8 0c3.25 0 6.3 1.3 8.6 3.6 2.3 2.3 3.6 5.3 3.6 8.6 0 6.4-5.2 11.6-11.6 11.6-2.05 0-4-.5-5.65-1.5L.057 24zm6.6-4.9c.45.6 1.1.9 1.8 1.1.7.2 1.4.3 2.1.3 5.4 0 9.8-4.4 9.8-9.8S17.2 2.2 11.8 2.2 2 6.6 2 12c0 1.9.5 3.7 1.4 5.2l-.7 2.7 2.7-.7zM17.4 14.8c-.2-.1-.9-.5-.9-1.1s.3-.7.4-1c.1-.2.2-.5.3-.6.1-.2.2-.4.4-.5.2-.2.4-.2.6-.2.2 0 .4.1.6.2.2.1.9.4 1.1 1.1s.2 1.3-.1 1.7c-.2.4-.5.4-.7.5-.2.1-.4.2-.6.2-.2 0-.4-.1-.6-.2-.2-.1-.9-.5-.9-1.1zM11.8 4.2c-4.2 0-7.6 3.4-7.6 7.6 0 1.5.4 2.9 1.1 4.2l-.6 2.4 2.4-.6c1.2.7 2.6 1.1 4.1 1.1 4.2 0 7.6-3.4 7.6-7.6s-3.4-7.6-7.6-7.6zM17.4 14.8c-.2-.1-.9-.5-.9-1.1s.3-.7.4-1c.1-.2.2-.5.3-.6.1-.2.2-.4.4-.5.2-.2.4-.2.6-.2.2 0 .4.1.6.2.2.1.9.4 1.1 1.1s.2 1.3-.1 1.7c-.2.4-.5.4-.7.5-.2.1-.4.2-.6.2-.2 0-.4-.1-.6-.2-.2-.1-.9-.5-.9-1.1zM11.8 4.2c-4.2 0-7.6 3.4-7.6 7.6 0 1.5.4 2.9 1.1 4.2l-.6 2.4 2.4-.6c1.2.7 2.6 1.1 4.1 1.1 4.2 0 7.6-3.4 7.6-7.6s-3.4-7.6-7.6-7.6zM17.4 14.8c-.2-.1-.9-.5-.9-1.1s.3-.7.4-1c.1-.2.2-.5.3-.6.1-.2.2-.4.4-.5.2-.2.4-.2.6-.2.2 0 .4.1.6.2.2.1.9.4 1.1 1.1s.2 1.3-.1 1.7c-.2.4-.5.4-.7.5-.2.1-.4.2-.6.2-.2 0-.4-.1-.6-.2-.2-.1-.9-.5-.9-1.1zM11.8 4.2c-4.2 0-7.6 3.4-7.6 7.6 0 1.5.4 2.9 1.1 4.2l-.6 2.4 2.4-.6c1.2.7 2.6 1.1 4.1 1.1 4.2 0 7.6-3.4 7.6-7.6s-3.4-7.6-7.6-7.6z"/>
                    </svg>
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-800 pt-6 mt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Mega Man X Fan Project. Todos os direitos reservados à Capcom.</p>
            <p className="mt-1">Feito com carinho por Leandro Santos de fã para fã.</p>
          </div>

          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[length:20px_20px] [background-image:linear-gradient(to_right,rgba(0,180,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,180,255,0.1)_1px,transparent_1px)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.05)_0%,transparent_70%)] animate-pulse-slow"></div>
          </div>
        </motion.footer>
      )}
    </div>
  )
}