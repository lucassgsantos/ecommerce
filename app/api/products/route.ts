import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createProductSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(200),
  description: z.string().min(1, 'Descrição é obrigatória').max(1000),
  price: z.number().positive('Preço deve ser positivo'),
  image: z.string().url('URL da imagem inválida').optional().default(''),
  stock: z.number().int().min(0, 'Estoque não pode ser negativo'),
  category: z.string().min(1, 'Categoria é obrigatória').max(100),
})

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao buscar produtos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = createProductSchema.parse(body)

    const product = await prisma.product.create({
      data: validated,
    })
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json({ error: 'Falha ao criar produto' }, { status: 500 })
  }
}
