'use client'

import { CartItem } from '@/types'

interface CartProps {
  items: CartItem[]
  onRemove: (productId: number) => void
  onUpdateQuantity: (productId: number, quantity: number) => void
}

export function Cart({ items, onRemove, onUpdateQuantity }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  if (items.length === 0) {
    return <div className="text-center py-8 text-gray-500">Carrinho vazio</div>
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.productId} className="border rounded-lg p-4 flex justify-between items-center">
          <div className="flex-1">
            <h3 className="font-semibold">{item.product.name}</h3>
            <p className="text-gray-600">R$ {item.product.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
              className="px-2 py-1 border rounded"
            >
              -
            </button>
            <span className="px-4">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
              className="px-2 py-1 border rounded"
            >
              +
            </button>
          </div>
          <div className="text-right ml-4">
            <p className="font-semibold">R$ {(item.product.price * item.quantity).toFixed(2)}</p>
            <button
              onClick={() => onRemove(item.productId)}
              className="text-red-600 text-sm hover:underline"
            >
              Remover
            </button>
          </div>
        </div>
      ))}
      <div className="border-t pt-4 text-right">
        <p className="text-2xl font-bold">Total: R$ {total.toFixed(2)}</p>
      </div>
    </div>
  )
}
