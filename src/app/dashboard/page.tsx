// src/app/dashboard/page.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PrivateRoute from "@/components/PrivateRoute";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  if (loading || !user) {
    return <p className="text-center mt-10">Carregando...</p>;
  }

  return (
   <PrivateRoute>
     <div className="p-4">
      <h1 className="text-xl font-bold">Bem-vindo, {user.displayName}</h1>
      {/* Conteúdo do dashboard aqui */}
    </div>
   </PrivateRoute>
  );
}
