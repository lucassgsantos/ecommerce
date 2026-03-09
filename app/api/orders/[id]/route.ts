import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id)

        if (isNaN(id)) {
            return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
        }

        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        })

        if (!order) {
            return NextResponse.json({ error: 'Pedido não encontrado' }, { status: 404 })
        }

        return NextResponse.json(order)
    } catch (error) {
        return NextResponse.json({ error: 'Falha ao buscar pedido' }, { status: 500 })
    }
}
