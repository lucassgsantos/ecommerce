'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Header() {
  const [cartCount, setCartCount] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartCount(cart.length)

    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCartCount(updatedCart.length)
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          ShopHub
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5"
        >
          <span className="w-6 h-0.5 bg-white rounded"></span>
          <span className="w-6 h-0.5 bg-white rounded"></span>
          <span className="w-6 h-0.5 bg-white rounded"></span>
        </button>
        <nav className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-4 md:gap-6 items-center absolute md:static top-16 left-0 right-0 bg-gray-900 md:bg-transparent p-4 md:p-0 z-50`}>
          <Link href="/" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>
            Produtos
          </Link>
          <Link href="/orders" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>
            Pedidos
          </Link>
          <Link href="/cart" className="relative" onClick={() => setMenuOpen(false)}>
            <span className="text-lg">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
