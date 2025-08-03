"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideHeader = pathname === "/thanks";

  return (
    <>
      {!hideHeader && <Header />}
      {children}
    </>
  );
}
