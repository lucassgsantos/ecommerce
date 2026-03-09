'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Order } from '@/types'
import { OrderListSkeleton } from '../components/Skeleton'

export default function OrdersPage() {
  const { data: session, status: sessionStatus } = useSession()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      fetchOrders()
    } else if (sessionStatus === 'unauthenticated') {
      setLoading(false)
    }
  }, [sessionStatus])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } finally {
      setLoading(false)
    }
  }

  if (sessionStatus === 'loading' || loading) {
    return (
      <div className="max-w-[720px] mx-auto">
        <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] mb-8">Pedidos</h1>
        <OrderListSkeleton />
      </div>
    )
  }

  if (sessionStatus === 'unauthenticated') {
    return (
      <div className="text-center py-20">
        <p className="text-[#6e6e73] mb-6">Faça login para ver seus pedidos.</p>
        <Link
          href="/login"
          className="inline-block bg-[#0071e3] text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-[#0077ed] transition-colors"
        >
          Entrar
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-[720px] mx-auto">
      <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] mb-8">Pedidos</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[#6e6e73] mb-6">Nenhum pedido encontrado.</p>
          <Link
            href="/"
            className="inline-block bg-[#0071e3] text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-[#0077ed] transition-colors"
          >
            Explorar Produtos
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-[#d2d2d7]/40">
          {orders.map((order) => (
            <Link key={order.id} href={`/order-confirmation/${order.id}`} className="block py-5 group">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
                    Pedido #{order.id}
                  </p>
                  <p className="text-xs text-[#86868b] mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString('pt-BR')} · {order.items.length} item(ns)
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-[#1d1d1f]">
                    R$ {order.total.toFixed(2)}
                  </p>
                  <p className="text-xs text-[#86868b] mt-0.5 capitalize">{order.status}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
