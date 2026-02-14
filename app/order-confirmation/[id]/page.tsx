'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Order } from '@/types'

export default function OrderConfirmation({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrder()
  }, [params.id])

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders?id=${params.id}`)
      const data = await response.json()
      setOrder(data)
    } catch (error) {
      console.error('Failed to fetch order:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-12">Carregando...</div>
  if (!order) return <div className="text-center py-12">Pedido não encontrado</div>

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center mb-8">
        <h1 className="text-4xl font-bold text-green-600 mb-2">Pedido Confirmado!</h1>
        <p className="text-gray-600">Obrigado por sua compra</p>
      </div>

      <div className="bg-white border rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Detalhes do Pedido</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-600 text-sm">ID do Pedido</p>
            <p className="font-semibold">{order.id}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Status</p>
            <p className="font-semibold text-yellow-600">{order.status}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Data</p>
            <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString('pt-BR')}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Total</p>
            <p className="font-semibold text-2xl">R$ {order.total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Informações de Entrega</h2>
        <div className="space-y-2 text-gray-700">
          <p><strong>Nome:</strong> {order.customerName}</p>
          <p><strong>Email:</strong> {order.customerEmail}</p>
          <p><strong>Telefone:</strong> {order.customerPhone}</p>
          <p><strong>Endereço:</strong> {order.customerAddress}</p>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Itens do Pedido</h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between border-b pb-4">
              <div>
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-gray-600 text-sm">Quantidade: {item.quantity}</p>
              </div>
              <p className="font-semibold">R$ {item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      <Link href="/">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg">
          Continuar Comprando
        </button>
      </Link>
    </div>
  )
}
