'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useCart } from '../components/CartContext'
import { useToast } from '../components/Toast'

export default function CheckoutPage() {
  const router = useRouter()
  const { data: session, status: sessionStatus } = useSession()
  const { items, total, clearCart } = useCart()
  const { showToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
  })

  if (sessionStatus === 'loading') {
    return (
      <div className="max-w-[720px] mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-[#f5f5f7] rounded w-32" />
          <div className="h-64 bg-[#f5f5f7] rounded-2xl" />
        </div>
      </div>
    )
  }

  if (sessionStatus === 'unauthenticated') {
    return (
      <div className="text-center py-20">
        <p className="text-[#6e6e73] mb-6">Faça login para finalizar sua compra.</p>
        <Link
          href="/login"
          className="inline-block bg-[#0071e3] text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-[#0077ed] transition-colors"
        >
          Entrar
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    router.push('/cart')
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        }),
      })

      if (response.ok) {
        const order = await response.json()
        clearCart()
        showToast('Pedido realizado com sucesso!')
        router.push(`/order-confirmation/${order.id}`)
      } else {
        const error = await response.json()
        showToast(error.error || 'Erro ao processar pedido', 'error')
      }
    } catch (error) {
      showToast('Erro de conexão', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-[720px] mx-auto">
      <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-5 mb-10">
        <div>
          <label className="block text-xs font-medium text-[#6e6e73] mb-1.5 uppercase tracking-wider">
            Nome Completo
          </label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-[#f5f5f7] rounded-xl text-sm border-0"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#6e6e73] mb-1.5 uppercase tracking-wider">Email</label>
          <input
            type="email"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-[#f5f5f7] rounded-xl text-sm border-0"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#6e6e73] mb-1.5 uppercase tracking-wider">Telefone</label>
          <input
            type="tel"
            name="customerPhone"
            value={formData.customerPhone}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-[#f5f5f7] rounded-xl text-sm border-0"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#6e6e73] mb-1.5 uppercase tracking-wider">
            Endereço de Entrega
          </label>
          <input
            type="text"
            name="customerAddress"
            value={formData.customerAddress}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-[#f5f5f7] rounded-xl text-sm border-0"
          />
        </div>

        <div className="border-t border-[#d2d2d7]/40 pt-6 mt-8">
          <div className="flex justify-between mb-4">
            {items.map((item) => (
              <div key={item.productId} />
            ))}
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-[#6e6e73]">Total</span>
            <span className="text-xl font-semibold">
              R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0071e3] text-white text-sm font-medium py-3.5 rounded-full hover:bg-[#0077ed] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processando...' : 'Confirmar Pedido'}
          </button>
        </div>
      </form>
    </div>
  )
}
