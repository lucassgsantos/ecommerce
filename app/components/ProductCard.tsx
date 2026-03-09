'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { useCart } from './CartContext'
import { useToast } from './Toast'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const handleAddToCart = () => {
    addToCart(product)
    showToast(`${product.name} adicionado ao carrinho`)
  }

  return (
    <div className="group">
      <Link href={`/product/${product.id}`}>
        <div className="aspect-square bg-[#f5f5f7] rounded-2xl overflow-hidden mb-3 relative">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#86868b] text-sm">
              Sem imagem
            </div>
          )}
        </div>
      </Link>
      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <Link href={`/product/${product.id}`}>
            <h3 className="text-sm font-medium text-[#1d1d1f] hover:opacity-70 transition-opacity">
              {product.name}
            </h3>
          </Link>
        </div>
        <p className="text-sm text-[#6e6e73]">
          R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-xs text-[#86868b]">{product.category}</p>
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="mt-2 text-xs text-[#0071e3] hover:opacity-70 transition-opacity disabled:text-[#86868b] disabled:opacity-50"
        >
          {product.stock === 0 ? 'Esgotado' : 'Adicionar ao carrinho'}
        </button>
      </div>
    </div>
  )
}
