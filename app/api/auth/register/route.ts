import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const registerSchema = z.object({
    name: z.string().min(2, 'Nome deve ter ao menos 2 caracteres').max(100),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter ao menos 6 caracteres').max(100),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const validated = registerSchema.parse(body)

        const existingUser = await prisma.user.findUnique({
            where: { email: validated.email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'Este email já está cadastrado' },
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(validated.password, 10)

        const user = await prisma.user.create({
            data: {
                name: validated.name,
                email: validated.email,
                password: hashedPassword,
            },
        })

        return NextResponse.json(
            { id: user.id, name: user.name, email: user.email },
            { status: 201 }
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Dados inválidos', details: error.errors },
                { status: 400 }
            )
        }
        return NextResponse.json(
            { error: 'Falha ao criar conta' },
            { status: 500 }
        )
    }
}
