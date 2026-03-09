'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import { useCart } from '../../components/CartContext'
import { useToast } from '../../components/Toast'
import { ProductDetailsSkeleton } from '../../components/Skeleton'

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setProduct(data))
      .finally(() => setLoading(false))
  }, [params.id])

  if (loading) return <ProductDetailsSkeleton />

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-[#6e6e73] mb-6">Produto não encontrado.</p>
        <Link
          href="/"
          className="text-sm text-[#0071e3] hover:opacity-70 transition-opacity"
        >
          ← Voltar aos produtos
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    showToast(`${product.name} adicionado ao carrinho`)
  }

  return (
    <div>
      <Link
        href="/"
        className="text-sm text-[#0071e3] hover:opacity-70 transition-opacity inline-block mb-8"
      >
        ← Produtos
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square bg-[#f5f5f7] rounded-2xl overflow-hidden relative">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#86868b]">
              Sem imagem
            </div>
          )}
        </div>

        <div className="pt-2">
          <p className="text-xs text-[#6e6e73] uppercase tracking-wider mb-2">{product.category}</p>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] mb-3">{product.name}</h1>
          <p className="text-[#6e6e73] text-base leading-relaxed mb-6">{product.description}</p>

          <p className="text-2xl font-semibold text-[#1d1d1f] mb-1">
            R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-[#86868b] mb-8">
            {product.stock > 0 ? `${product.stock} em estoque` : 'Esgotado'}
          </p>

          {product.stock > 0 && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full bg-[#f5f5f7] flex items-center justify-center text-sm hover:bg-[#e8e8ed] transition-colors"
                >
                  −
                </button>
                <span className="text-sm font-medium w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-8 h-8 rounded-full bg-[#f5f5f7] flex items-center justify-center text-sm hover:bg-[#e8e8ed] transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-[#0071e3] text-white text-sm font-medium py-3.5 rounded-full hover:bg-[#0077ed] transition-colors"
              >
                Adicionar ao Carrinho
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
