import type { Metadata } from 'next'
import { Providers } from './components/Providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'ShopHub - E-commerce',
  description: 'Sua loja online favorita com os melhores produtos e preços',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
