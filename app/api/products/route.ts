import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
      })
      return NextResponse.json(product)
    }

    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        image: body.image,
        stock: body.stock,
        category: body.category,
      },
    })
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
