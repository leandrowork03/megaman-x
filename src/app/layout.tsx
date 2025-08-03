// src/app/layout.tsx
import './globals.css'
import { AuthProvider } from '../context/AuthContext'
import { LayoutWrapper } from '@/components/LayoutWrapper'
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}
