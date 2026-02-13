'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CartItem } from '@/types'

export default function CheckoutPage() {
  const router = useRouter()
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
  })

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    if (cart.length === 0) {
      router.push('/cart')
      return
    }
    setItems(cart)
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          })),
          total,
        }),
      })

      if (response.ok) {
        const order = await response.json()
        localStorage.removeItem('cart')
        router.push(`/order-confirmation/${order.id}`)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Erro ao processar pedido')
    } finally {
      setLoading(false)
    }
  }

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Nome Completo</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Telefone</label>
              <input
                type="tel"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Endereço de Entrega</label>
              <input
                type="text"
                name="customerAddress"
                value={formData.customerAddress}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-4 py-2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Processando...' : 'Confirmar Pedido'}
            </button>
          </form>
        </div>

        <div className="bg-gray-100 rounded-lg p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span>{item.product.name} x {item.quantity}</span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
