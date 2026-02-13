'use client'

import { useEffect, useState } from 'react'
import { ProductCard } from './components/ProductCard'
import { Product } from '@/types'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find((item: any) => item.productId === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        productId: product.id,
        quantity: 1,
        product,
      })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('storage'))
  }

  if (loading) {
    return <div className="text-center py-12">Carregando produtos...</div>
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Nossos Produtos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  )
}
