"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion"; 
import { useAuth } from "@/context/AuthContext";
import { LogoutButton } from "./LogoutButton";

export function Header() {
  const { user, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  
  const menuVariants: Variants = { 
    hidden: { x: "100%" },
    visible: { x: "0%", transition: { type: "tween", duration: 0.3, ease: "easeOut" } },
    exit: { x: "100%", transition: { type: "tween", duration: 0.3, ease: "easeIn" } }, 
  };

  const itemVariants: Variants = { 
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative w-full p-4 flex items-center justify-between bg-gradient-to-b from-gray-900 to-black text-white shadow-xl-blue border-b-4 border-blue-700 overflow-hidden z-20">
      <div className="container mx-auto flex items-center justify-between flex-wrap gap-4">

        <Link href="/" className="flex items-center gap-3 text-white no-underline group z-30">
          <Image
            src="/images/x-pixel.png" 
            alt="Mega Man X Logo"
            width={50}
            height={50}
            className="filter drop-shadow-[0_0_5px_rgba(0,180,255,0.8)] transition-transform duration-300 group-hover:scale-110"
          />
          <h1 className="text-3xl font-extrabold uppercase tracking-wider text-blue-400 text-shadow-blue transition-colors duration-300 group-hover:text-blue-200">
            Maverick Hunter
          </h1>
        </Link>

        <button
          className="md:hidden flex flex-col justify-around w-8 h-8 bg-transparent border-none cursor-pointer p-0 z-30"
          onClick={toggleMenu}
          aria-label="Abrir menu de navegação"
        >
          <motion.span
            className="block h-[3px] w-full bg-blue-400 rounded transition-all duration-300 transform"
            animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          ></motion.span>
          <motion.span
            className="block h-[3px] w-full bg-blue-400 rounded transition-all duration-300 transform"
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
          ></motion.span>
          <motion.span
            className="block h-[3px] w-full bg-blue-400 rounded transition-all duration-300 transform"
            animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          ></motion.span>
        </button>

        <nav className="hidden md:flex flex-grow justify-end">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-lg font-semibold uppercase">
            <li>
              <Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-shadow-hover-yellow">
                Início
              </Link>
            </li>
            <li>
              <Link href="/game" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-shadow-hover-yellow">
                Jogar
              </Link>
            </li>
            <li>
              <Link href="/historia" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-shadow-hover-yellow">
                História
              </Link>
            </li>
            {!loading && user ? (
              <li>
                <LogoutButton />
              </li>
            ) : (
              <>
                <li>
                  <Link href="/login" className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-shadow-hover-green">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-shadow-hover-green">
                    Cadastro
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-700 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-light-trail" />
        <div className="absolute bottom-[-5px] left-0 w-full h-[5px] bg-cyan-400 opacity-20 blur-sm animate-pulse-slow" />
      </div>

      {/* Menu Hambúrguer (Mobile) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-20 md:hidden"
              onClick={toggleMenu}
            ></motion.div>

            {/* O Menu em si */}
            <motion.nav
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              className="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-gradient-to-b from-gray-900 to-black text-white p-8 shadow-lg z-30 flex flex-col items-start pt-20 border-l-4 border-blue-700"
            >
              <ul className="flex flex-col gap-6 text-2xl font-bold uppercase w-full">
                <motion.li variants={itemVariants} onClick={toggleMenu}>
                  <Link href="/" className="block py-2 text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-shadow-hover-yellow">
                    Início
                  </Link>
                </motion.li>
                <motion.li variants={itemVariants} onClick={toggleMenu}>
                  <Link href="/game" className="block py-2 text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-shadow-hover-yellow">
                    Jogar
                  </Link>
                </motion.li>
                <motion.li variants={itemVariants} onClick={toggleMenu}>
                  <Link href="/historia" className="block py-2 text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-shadow-hover-yellow">
                    História
                  </Link>
                </motion.li>
                {!loading && user ? (
                  <motion.li variants={itemVariants}>
                    <LogoutButton onLogout={toggleMenu} /> 
                  </motion.li>
                ) : (
                  <>
                    <motion.li variants={itemVariants} onClick={toggleMenu}>
                      <Link href="/login" className="block py-2 text-gray-300 hover:text-green-400 transition-colors duration-200 text-shadow-hover-green">
                        Login
                      </Link>
                    </motion.li>
                    <motion.li variants={itemVariants} onClick={toggleMenu}>
                      <Link href="/register" className="block py-2 text-gray-300 hover:text-green-400 transition-colors duration-200 text-shadow-hover-green">
                        Cadastro
                      </Link>
                    </motion.li>
                  </>
                )}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}