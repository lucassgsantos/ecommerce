import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Prisma } from '@prisma/client'

const orderItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive('Quantidade deve ser positiva'),
})

const createOrderSchema = z.object({
  customerName: z.string().min(1, 'Nome é obrigatório').max(200),
  customerEmail: z.string().email('Email inválido'),
  customerPhone: z.string().min(8, 'Telefone inválido').max(20),
  customerAddress: z.string().min(5, 'Endereço é obrigatório').max(500),
  items: z.array(orderItemSchema).min(1, 'Pedido deve ter pelo menos um item'),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Você precisa estar logado para fazer um pedido' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validated = createOrderSchema.parse(body)

    const userId = parseInt(session.user.id as string)

    const order = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const productIds = validated.items.map((item) => item.productId)
      const products = await tx.product.findMany({
        where: { id: { in: productIds } },
      })

      if (products.length !== productIds.length) {
        throw new Error('Um ou mais produtos não encontrados')
      }

      const productMap = new Map(products.map((p: { id: number; name: string; price: number; stock: number }) => [p.id, p]))

      for (const item of validated.items) {
        const product = productMap.get(item.productId)!
        if (product.stock < item.quantity) {
          throw new Error(`Estoque insuficiente para "${product.name}". Disponível: ${product.stock}`)
        }
      }

      let total = 0
      const orderItems = validated.items.map((item) => {
        const product = productMap.get(item.productId)!
        const itemTotal = product.price * item.quantity
        total += itemTotal
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        }
      })

      for (const item of validated.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        })
      }

      return tx.order.create({
        data: {
          customerName: validated.customerName,
          customerEmail: validated.customerEmail,
          customerPhone: validated.customerPhone,
          customerAddress: validated.customerAddress,
          total,
          userId,
          items: { create: orderItems },
        },
        include: {
          items: {
            include: { product: true },
          },
        },
      })
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Falha ao criar pedido' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Você precisa estar logado' },
        { status: 401 }
      )
    }

    const userId = parseInt(session.user.id as string)

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao buscar pedidos' }, { status: 500 })
  }
}
