import { describe, it, expect, beforeEach } from 'vitest'

interface Product {
    id: number
    name: string
    price: number
    stock: number
    description: string
    image: string
    category: string
    createdAt: Date
    updatedAt: Date
}

interface CartItem {
    productId: number
    quantity: number
    product: Product
}

function createProduct(overrides: Partial<Product> = {}): Product {
    return {
        id: 1,
        name: 'Produto Teste',
        price: 99.99,
        stock: 10,
        description: 'Descrição teste',
        image: '',
        category: 'Teste',
        createdAt: new Date(),
        updatedAt: new Date(),
        ...overrides,
    }
}

function addToCart(items: CartItem[], product: Product, quantity = 1): CartItem[] {
    const existing = items.find((item) => item.productId === product.id)
    if (existing) {
        return items.map((item) =>
            item.productId === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
        )
    }
    return [...items, { productId: product.id, quantity, product }]
}

function removeFromCart(items: CartItem[], productId: number): CartItem[] {
    return items.filter((item) => item.productId !== productId)
}

function updateQuantity(items: CartItem[], productId: number, quantity: number): CartItem[] {
    if (quantity <= 0) return removeFromCart(items, productId)
    return items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
    )
}

function getTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
}

function getItemCount(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.quantity, 0)
}

describe('Lógica do Carrinho', () => {
    let items: CartItem[]
    const productA = createProduct({ id: 1, name: 'Produto A', price: 100 })
    const productB = createProduct({ id: 2, name: 'Produto B', price: 50 })

    beforeEach(() => {
        items = []
    })

    describe('addToCart', () => {
        it('deve adicionar produto ao carrinho vazio', () => {
            items = addToCart(items, productA)
            expect(items).toHaveLength(1)
            expect(items[0].quantity).toBe(1)
        })

        it('deve incrementar quantidade quando produto já existe', () => {
            items = addToCart(items, productA)
            items = addToCart(items, productA)
            expect(items).toHaveLength(1)
            expect(items[0].quantity).toBe(2)
        })

        it('deve adicionar com quantidade customizada', () => {
            items = addToCart(items, productA, 5)
            expect(items[0].quantity).toBe(5)
        })

        it('deve manter produtos distintos separados', () => {
            items = addToCart(items, productA)
            items = addToCart(items, productB)
            expect(items).toHaveLength(2)
        })

        it('deve incrementar quantidade com valor customizado', () => {
            items = addToCart(items, productA, 2)
            items = addToCart(items, productA, 3)
            expect(items[0].quantity).toBe(5)
        })
    })

    describe('removeFromCart', () => {
        it('deve remover produto existente', () => {
            items = addToCart(items, productA)
            items = addToCart(items, productB)
            items = removeFromCart(items, 1)
            expect(items).toHaveLength(1)
            expect(items[0].productId).toBe(2)
        })

        it('não deve alterar carrinho quando produto não existe', () => {
            items = addToCart(items, productA)
            items = removeFromCart(items, 999)
            expect(items).toHaveLength(1)
        })

        it('deve resultar em carrinho vazio ao remover único item', () => {
            items = addToCart(items, productA)
            items = removeFromCart(items, 1)
            expect(items).toHaveLength(0)
        })
    })

    describe('updateQuantity', () => {
        it('deve atualizar quantidade', () => {
            items = addToCart(items, productA)
            items = updateQuantity(items, 1, 10)
            expect(items[0].quantity).toBe(10)
        })

        it('deve remover produto quando quantidade é 0', () => {
            items = addToCart(items, productA)
            items = updateQuantity(items, 1, 0)
            expect(items).toHaveLength(0)
        })

        it('deve remover produto quando quantidade é negativa', () => {
            items = addToCart(items, productA)
            items = updateQuantity(items, 1, -1)
            expect(items).toHaveLength(0)
        })

        it('não deve alterar outros produtos', () => {
            items = addToCart(items, productA, 2)
            items = addToCart(items, productB, 3)
            items = updateQuantity(items, 1, 5)
            expect(items[0].quantity).toBe(5)
            expect(items[1].quantity).toBe(3)
        })
    })

    describe('getTotal', () => {
        it('deve retornar 0 para carrinho vazio', () => {
            expect(getTotal(items)).toBe(0)
        })

        it('deve calcular total para um item', () => {
            items = addToCart(items, productA, 2)
            expect(getTotal(items)).toBe(200)
        })

        it('deve calcular total para múltiplos itens', () => {
            items = addToCart(items, productA, 2)
            items = addToCart(items, productB, 3)
            expect(getTotal(items)).toBe(350)
        })
    })

    describe('getItemCount', () => {
        it('deve retornar 0 para carrinho vazio', () => {
            expect(getItemCount(items)).toBe(0)
        })

        it('deve contar quantidades totais', () => {
            items = addToCart(items, productA, 2)
            items = addToCart(items, productB, 3)
            expect(getItemCount(items)).toBe(5)
        })
    })
})
