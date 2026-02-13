'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Product } from '@/types'

export default function ProductDetails({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products?id=${params.id}`)
      const data = await response.json()
      setProduct(data)
    } catch (error) {
      console.error('Failed to fetch product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!product) return

    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find((item: any) => item.productId === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({
        productId: product.id,
        quantity,
        product,
      })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('storage'))
    alert('Produto adicionado ao carrinho!')
  }

  if (loading) return <div className="text-center py-12">Carregando...</div>
  if (!product) return <div className="text-center py-12">Produto não encontrado</div>

  return (
    <div>
      <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Voltar
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <span className="text-gray-400">No Image</span>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="mb-6">
            <p className="text-gray-500 mb-2">Categoria: {product.category}</p>
            <p className="text-gray-500 mb-4">Stock: {product.stock}</p>
            <p className="text-4xl font-bold text-blue-600 mb-6">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {product.stock > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-semibold">Quantidade:</label>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                  className="border rounded px-3 py-2 w-24"
                />
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ) : (
            <p className="text-red-600 font-semibold">Produto fora de estoque</p>
          )}
        </div>
      </div>
    </div>
  )
}
