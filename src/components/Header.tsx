"use client";

import { useAuth } from "@/context/AuthContext";
import { LogoutButton } from "./LogoutButton";

export function Header() {
  const { user, loading } = useAuth();

  return (
    <header className="p-4 flex justify-between items-center bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Meu App</h1>

   
      {!loading && user && <LogoutButton />}
    </header>
  );
}
