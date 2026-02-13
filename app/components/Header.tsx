'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Header() {
  const [cartCount, setCartCount] = useState(0)

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
        <nav className="flex gap-6 items-center">
          <Link href="/" className="hover:text-gray-300">
            Produtos
          </Link>
          <Link href="/orders" className="hover:text-gray-300">
            Pedidos
          </Link>
          <Link href="/cart" className="relative">
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
