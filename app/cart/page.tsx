'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Cart } from '../components/Cart'
import { CartItem } from '@/types'

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    loadCart()
    window.addEventListener('storage', loadCart)
    return () => window.removeEventListener('storage', loadCart)
  }, [])

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setItems(cart)
  }

  const handleRemove = (productId: number) => {
    const updatedCart = items.filter((item) => item.productId !== productId)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    setItems(updatedCart)
  }

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemove(productId)
      return
    }

    const updatedCart = items.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    )
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    setItems(updatedCart)
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Seu Carrinho</h1>

      {items.length > 0 ? (
        <div className="max-w-2xl mx-auto">
          <Cart items={items} onRemove={handleRemove} onUpdateQuantity={handleUpdateQuantity} />
          <Link href="/checkout">
            <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg">
              Ir para Checkout
            </button>
          </Link>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Seu carrinho está vazio</p>
          <Link href="/">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
              Continuar Comprando
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}
