import { describe, it, expect } from 'vitest'
import { z } from 'zod'

const createProductSchema = z.object({
    name: z.string().min(1).max(200),
    description: z.string().min(1).max(1000),
    price: z.number().positive(),
    image: z.string().url().optional().default(''),
    stock: z.number().int().min(0),
    category: z.string().min(1).max(100),
})

const orderItemSchema = z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().positive(),
})

const createOrderSchema = z.object({
    customerName: z.string().min(1).max(200),
    customerEmail: z.string().email(),
    customerPhone: z.string().min(8).max(20),
    customerAddress: z.string().min(5).max(500),
    items: z.array(orderItemSchema).min(1),
})

const registerSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(6).max(100),
})

describe('Validação de Produto', () => {
    it('deve aceitar produto válido', () => {
        const result = createProductSchema.safeParse({
            name: 'Laptop Pro',
            description: 'Um laptop de alta performance',
            price: 1299.99,
            image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
            stock: 15,
            category: 'Eletrônicos',
        })
        expect(result.success).toBe(true)
    })

    it('deve aceitar produto sem campo imagem', () => {
        const schema = z.object({
            name: z.string().min(1).max(200),
            description: z.string().min(1).max(1000),
            price: z.number().positive(),
            image: z.string().optional().default(''),
            stock: z.number().int().min(0),
            category: z.string().min(1).max(100),
        })

        const result = schema.safeParse({
            name: 'Mouse Sem Fio',
            description: 'Mouse ergonômico',
            price: 49.99,
            stock: 100,
            category: 'Periféricos',
        })
        expect(result.success).toBe(true)
        if (result.success) expect(result.data.image).toBe('')
    })

    it('deve rejeitar produto sem nome', () => {
        const result = createProductSchema.safeParse({
            name: '',
            description: 'Descrição',
            price: 10,
            stock: 5,
            category: 'Teste',
        })
        expect(result.success).toBe(false)
    })

    it('deve rejeitar preço negativo', () => {
        const result = createProductSchema.safeParse({
            name: 'Produto',
            description: 'Descrição',
            price: -10,
            stock: 5,
            category: 'Teste',
        })
        expect(result.success).toBe(false)
    })

    it('deve rejeitar preço zero', () => {
        const result = createProductSchema.safeParse({
            name: 'Produto',
            description: 'Descrição',
            price: 0,
            stock: 5,
            category: 'Teste',
        })
        expect(result.success).toBe(false)
    })

    it('deve rejeitar estoque negativo', () => {
        const result = createProductSchema.safeParse({
            name: 'Produto',
            description: 'Descrição',
            price: 10,
            stock: -1,
            category: 'Teste',
        })
        expect(result.success).toBe(false)
    })

    it('deve rejeitar URL de imagem inválida', () => {
        const result = createProductSchema.safeParse({
            name: 'Produto',
            description: 'Descrição',
            price: 10,
            image: 'nao-e-uma-url',
            stock: 5,
            category: 'Teste',
        })
        expect(result.success).toBe(false)
    })

    it('deve rejeitar nome maior que 200 caracteres', () => {
        const result = createProductSchema.safeParse({
            name: 'A'.repeat(201),
            description: 'Descrição',
            price: 10,
            stock: 5,
            category: 'Teste',
        })
        expect(result.success).toBe(false)
    })
})

describe('Validação de Pedido', () => {
    const validOrder = {
        customerName: 'João Silva',
        customerEmail: 'joao@email.com',
        customerPhone: '11999999999',
        customerAddress: 'Rua Teste, 123 - São Paulo/SP',
        items: [
            { productId: 1, quantity: 2 },
            { productId: 3, quantity: 1 },
        ],
    }

    it('deve aceitar pedido válido', () => {
        expect(createOrderSchema.safeParse(validOrder).success).toBe(true)
    })

    it('deve rejeitar pedido sem itens', () => {
        expect(createOrderSchema.safeParse({ ...validOrder, items: [] }).success).toBe(false)
    })

    it('deve rejeitar email inválido', () => {
        expect(createOrderSchema.safeParse({ ...validOrder, customerEmail: 'nao-e-email' }).success).toBe(false)
    })

    it('deve rejeitar telefone curto', () => {
        expect(createOrderSchema.safeParse({ ...validOrder, customerPhone: '123' }).success).toBe(false)
    })

    it('deve rejeitar endereço curto', () => {
        expect(createOrderSchema.safeParse({ ...validOrder, customerAddress: 'Rua' }).success).toBe(false)
    })

    it('deve rejeitar quantidade zero', () => {
        expect(createOrderSchema.safeParse({ ...validOrder, items: [{ productId: 1, quantity: 0 }] }).success).toBe(false)
    })

    it('deve rejeitar productId negativo', () => {
        expect(createOrderSchema.safeParse({ ...validOrder, items: [{ productId: -1, quantity: 1 }] }).success).toBe(false)
    })

    it('deve aceitar múltiplos itens', () => {
        const order = {
            ...validOrder,
            items: [
                { productId: 1, quantity: 1 },
                { productId: 2, quantity: 3 },
                { productId: 5, quantity: 2 },
            ],
        }
        expect(createOrderSchema.safeParse(order).success).toBe(true)
    })

    it('deve rejeitar nome vazio', () => {
        expect(createOrderSchema.safeParse({ ...validOrder, customerName: '' }).success).toBe(false)
    })
})

describe('Validação de Registro', () => {
    it('deve aceitar registro válido', () => {
        expect(registerSchema.safeParse({ name: 'João Silva', email: 'joao@email.com', password: '123456' }).success).toBe(true)
    })

    it('deve rejeitar nome com 1 caractere', () => {
        expect(registerSchema.safeParse({ name: 'J', email: 'joao@email.com', password: '123456' }).success).toBe(false)
    })

    it('deve rejeitar email inválido', () => {
        expect(registerSchema.safeParse({ name: 'João', email: 'nao-e-email', password: '123456' }).success).toBe(false)
    })

    it('deve rejeitar senha curta', () => {
        expect(registerSchema.safeParse({ name: 'João', email: 'joao@email.com', password: '123' }).success).toBe(false)
    })

    it('deve aceitar senha com 6 caracteres', () => {
        expect(registerSchema.safeParse({ name: 'João', email: 'joao@email.com', password: '123456' }).success).toBe(true)
    })
})
