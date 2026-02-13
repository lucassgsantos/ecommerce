'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Order } from '@/types'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-12">Carregando pedidos...</div>

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Meus Pedidos</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Nenhum pedido encontrado</p>
          <Link href="/">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
              Fazer Compras
            </button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-6 hover:shadow-lg transition">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-gray-600 text-sm">ID do Pedido</p>
                  <p className="font-semibold">{order.id}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Data</p>
                  <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString('pt-BR')}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total</p>
                  <p className="font-semibold text-lg">${order.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Status</p>
                  <p className={`font-semibold ${order.status === 'pending' ? 'text-yellow-600' : 'text-green-600'}`}>
                    {order.status}
                  </p>
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="text-gray-700 text-sm">
                  <strong>Cliente:</strong> {order.customerName} ({order.customerEmail})
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Itens:</strong> {order.items.length} item(ns)
                </p>
              </div>
              <Link href={`/order-confirmation/${order.id}`}>
                <button className="mt-4 text-blue-600 hover:underline">
                  Ver Detalhes →
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
