import type { Metadata } from 'next'
import { Header } from './components/Header'
import './globals.css'

export const metadata: Metadata = {
  title: 'ShopHub - E-commerce',
  description: 'Sua loja online favorita',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-900 text-white mt-16 py-8">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p>&copy; 2026 ShopHub. Todos os direitos reservados.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
