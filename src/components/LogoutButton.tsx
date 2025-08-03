// src/components/LogoutButton.tsx

import React from 'react';
import { useAuth } from '@/context/AuthContext';

interface LogoutButtonProps {
  onLogout?: () => void;
}

// 2. Use a interface nas props do componente
export function LogoutButton({ onLogout }: LogoutButtonProps) {
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="block py-2 text-gray-300 hover:text-red-500 transition-colors duration-200 text-shadow-hover-red uppercase font-bold"
    >
      {isLoggingOut ? "Saindo..." : "Sair"}
    </button>
  );
}