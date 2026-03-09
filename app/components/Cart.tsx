'use client'

import Image from 'next/image'
import { CartItem } from '@/types'

interface CartProps {
  items: CartItem[]
  onRemove: (productId: number) => void
  onUpdateQuantity: (productId: number, quantity: number) => void
}

export function Cart({ items, onRemove, onUpdateQuantity }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  if (items.length === 0) {
    return <div className="text-center py-12 text-[#86868b]">Seu carrinho está vazio.</div>
  }

  return (
    <div>
      <div className="divide-y divide-[#d2d2d7]/50">
        {items.map((item) => (
          <div key={item.productId} className="py-6 flex gap-5 items-center">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#f5f5f7] flex-shrink-0 relative">
              {item.product.image ? (
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-[#86868b]">
                  Sem img
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-[#1d1d1f] truncate">{item.product.name}</h3>
              <p className="text-sm text-[#6e6e73] mt-0.5">
                R$ {item.product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                  className="w-7 h-7 rounded-full bg-[#f5f5f7] flex items-center justify-center text-xs hover:bg-[#e8e8ed] transition-colors"
                >
                  −
                </button>
                <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                  className="w-7 h-7 rounded-full bg-[#f5f5f7] flex items-center justify-center text-xs hover:bg-[#e8e8ed] transition-colors"
                >
                  +
                </button>
                <button
                  onClick={() => onRemove(item.productId)}
                  className="text-xs text-[#0071e3] hover:opacity-70 transition-opacity ml-2"
                >
                  Remover
                </button>
              </div>
            </div>
            <p className="text-sm font-medium text-[#1d1d1f] flex-shrink-0">
              R$ {(item.product.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        ))}
      </div>
      <div className="border-t border-[#d2d2d7]/50 pt-6 flex justify-between items-center">
        <span className="text-sm text-[#6e6e73]">Total</span>
        <span className="text-xl font-semibold text-[#1d1d1f]">
          R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  )
}
