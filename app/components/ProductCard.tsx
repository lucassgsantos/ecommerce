'use client'

import Link from 'next/link'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="border rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
      <div className="bg-gray-200 h-48 flex items-center justify-center text-gray-400">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <span>No Image</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-blue-600">
            R$ {product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">Stock: {product.stock}</span>
        </div>
        <div className="flex gap-2">
          <Link href={`/product/${product.id}`} className="flex-1">
            <button className="w-full bg-gray-100 hover:bg-gray-200 py-2 rounded">
              Ver Detalhes
            </button>
          </Link>
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-50"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  )
}
