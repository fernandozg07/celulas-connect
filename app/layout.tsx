import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Células Saudáveis - Viva o Ide de Jesus',
  description: 'Plataforma completa para gestão e conexão de células saudáveis. Conecte, gerencie e fortaleça sua comunidade espiritual.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}