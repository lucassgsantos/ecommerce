'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Order } from '@/types'

export default function OrderConfirmation({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setOrder(data)
        else setError('Pedido não encontrado')
      })
      .catch(() => setError('Erro ao carregar pedido'))
      .finally(() => setLoading(false))
  }, [params.id])

  if (loading) {
    return (
      <div className="max-w-[600px] mx-auto animate-pulse space-y-6">
        <div className="h-32 bg-[#f5f5f7] rounded-2xl" />
        <div className="h-48 bg-[#f5f5f7] rounded-2xl" />
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="text-center py-20">
        <p className="text-[#6e6e73] mb-6">{error || 'Pedido não encontrado'}</p>
        <Link href="/orders" className="text-sm text-[#0071e3] hover:opacity-70 transition-opacity">
          ← Voltar aos pedidos
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-[600px] mx-auto">
      <div className="text-center mb-10">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-[#1d1d1f]">Pedido Confirmado</h1>
        <p className="text-sm text-[#6e6e73] mt-1">Obrigado pela sua compra.</p>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-xs font-medium text-[#6e6e73] uppercase tracking-wider mb-3">Detalhes</h2>
          <div className="bg-[#f5f5f7] rounded-2xl p-5 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#6e6e73]">Pedido</span>
              <span className="font-medium">#{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6e6e73]">Data</span>
              <span className="font-medium">{new Date(order.createdAt).toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6e6e73]">Status</span>
              <span className="font-medium capitalize">{order.status}</span>
            </div>
            <div className="flex justify-between border-t border-[#d2d2d7]/40 pt-2 mt-2">
              <span className="text-[#6e6e73]">Total</span>
              <span className="font-semibold text-lg">R$ {order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-medium text-[#6e6e73] uppercase tracking-wider mb-3">Entrega</h2>
          <div className="bg-[#f5f5f7] rounded-2xl p-5 text-sm space-y-1 text-[#1d1d1f]">
            <p>{order.customerName}</p>
            <p className="text-[#6e6e73]">{order.customerEmail}</p>
            <p className="text-[#6e6e73]">{order.customerPhone}</p>
            <p className="text-[#6e6e73]">{order.customerAddress}</p>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-medium text-[#6e6e73] uppercase tracking-wider mb-3">Itens</h2>
          <div className="divide-y divide-[#d2d2d7]/40">
            {order.items.map((item) => (
              <div key={item.id} className="py-3 flex justify-between text-sm">
                <div>
                  <p className="font-medium text-[#1d1d1f]">{item.product.name}</p>
                  <p className="text-[#86868b] text-xs">{item.quantity} × R$ {item.price.toFixed(2)}</p>
                </div>
                <p className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex gap-3">
        <Link
          href="/"
          className="flex-1 text-center bg-[#0071e3] text-white text-sm font-medium py-3 rounded-full hover:bg-[#0077ed] transition-colors"
        >
          Continuar Comprando
        </Link>
        <Link
          href="/orders"
          className="flex-1 text-center bg-[#f5f5f7] text-[#1d1d1f] text-sm font-medium py-3 rounded-full hover:bg-[#e8e8ed] transition-colors"
        >
          Meus Pedidos
        </Link>
      </div>
    </div>
  )
}
