'use client'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import { CartProvider } from './CartContext'
import { ToastProvider } from './Toast'
import { Header } from './Header'
import Link from 'next/link'

export function Providers({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <CartProvider>
                <ToastProvider>
                    <Header />
                    <main className="max-w-[1200px] mx-auto px-6 py-12 flex-1 w-full">
                        {children}
                    </main>
                    <Footer />
                </ToastProvider>
            </CartProvider>
        </SessionProvider>
    )
}

function Footer() {
    return (
        <footer className="border-t border-[#d2d2d7]/40 mt-20">
            <div className="max-w-[1200px] mx-auto px-6 py-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-xs text-[#6e6e73]">
                        Copyright © 2026 ShopHub. Todos os direitos reservados.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/" className="text-xs text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">
                            Produtos
                        </Link>
                        <Link href="/orders" className="text-xs text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">
                            Pedidos
                        </Link>
                        <Link href="/cart" className="text-xs text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">
                            Carrinho
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
