'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useCart } from './CartContext'

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/60 sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 h-12 flex justify-between items-center">
        <Link href="/" className="text-sm font-semibold tracking-tight text-[#1d1d1f] hover:opacity-70 transition-opacity">
          ShopHub
        </Link>
        <nav className="flex gap-8 items-center">
          <Link href="/" className="text-xs text-[#1d1d1f] hover:opacity-60 transition-opacity">
            Produtos
          </Link>
          <Link href="/orders" className="text-xs text-[#1d1d1f] hover:opacity-60 transition-opacity">
            Pedidos
          </Link>
          <CartLink />
          <AuthButton />
        </nav>
      </div>
    </header>
  )
}

function CartLink() {
  const { itemCount } = useCart()

  return (
    <Link href="/cart" className="relative text-[#1d1d1f] hover:opacity-60 transition-opacity">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-1.5 -right-2 bg-[#0071e3] text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">
          {itemCount}
        </span>
      )}
    </Link>
  )
}

function AuthButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div className="w-12 h-4 bg-gray-100 rounded animate-pulse" />
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-xs text-[#6e6e73] hidden md:block">
          {session.user.name}
        </span>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="text-xs text-[#0071e3] hover:opacity-70 transition-opacity"
        >
          Sair
        </button>
      </div>
    )
  }

  return (
    <Link href="/login" className="text-xs text-[#0071e3] hover:opacity-70 transition-opacity">
      Entrar
    </Link>
  )
}
