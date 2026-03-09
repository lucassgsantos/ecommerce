'use client'

import Link from 'next/link'
import { useCart } from '../components/CartContext'
import { Cart } from '../components/Cart'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCart()

  return (
    <div className="max-w-[720px] mx-auto">
      <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] mb-8">Carrinho</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[#6e6e73] mb-6">Seu carrinho está vazio.</p>
          <Link
            href="/"
            className="inline-block bg-[#0071e3] text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-[#0077ed] transition-colors"
          >
            Explorar Produtos
          </Link>
        </div>
      ) : (
        <>
          <Cart items={items} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} />
          <div className="mt-8 flex justify-end">
            <Link
              href="/checkout"
              className="bg-[#0071e3] text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-[#0077ed] transition-colors"
            >
              Finalizar Compra
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
