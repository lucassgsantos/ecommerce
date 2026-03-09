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

        const product = await prisma.product.findUnique({
            where: { id },
        })

        if (!product) {
            return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 })
        }

        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json({ error: 'Falha ao buscar produto' }, { status: 500 })
    }
}
