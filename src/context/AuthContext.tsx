// src/context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth"; 
import { auth } from "../lib/firebase";

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>; 
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {}, 
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    setLoading(true); 
    try {
      await signOut(auth); 
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw error; 
    } finally {
      setLoading(false); 
    }
  };

  const value = {
    user,
    loading,
    logout: handleLogout, 
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}