'use client'

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import { Product, CartItem } from '@/types'

interface CartContextType {
    items: CartItem[]
    addToCart: (product: Product, quantity?: number) => void
    removeFromCart: (productId: number) => void
    updateQuantity: (productId: number, quantity: number) => void
    clearCart: () => void
    total: number
    itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])

    useEffect(() => {
        const stored = localStorage.getItem('cart')
        if (stored) {
            try {
                setItems(JSON.parse(stored))
            } catch {
                setItems([])
            }
        }
    }, [])

    const saveCart = useCallback((newItems: CartItem[]) => {
        setItems(newItems)
        localStorage.setItem('cart', JSON.stringify(newItems))
    }, [])

    const addToCart = useCallback((product: Product, quantity = 1) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.productId === product.id)
            let updated: CartItem[]

            if (existing) {
                updated = prev.map((item) =>
                    item.productId === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            } else {
                updated = [...prev, { productId: product.id, quantity, product }]
            }

            localStorage.setItem('cart', JSON.stringify(updated))
            return updated
        })
    }, [])

    const removeFromCart = useCallback((productId: number) => {
        setItems((prev) => {
            const updated = prev.filter((item) => item.productId !== productId)
            localStorage.setItem('cart', JSON.stringify(updated))
            return updated
        })
    }, [])

    const updateQuantity = useCallback((productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }

        setItems((prev) => {
            const updated = prev.map((item) =>
                item.productId === productId ? { ...item, quantity } : item
            )
            localStorage.setItem('cart', JSON.stringify(updated))
            return updated
        })
    }, [removeFromCart])

    const clearCart = useCallback(() => {
        saveCart([])
    }, [saveCart])

    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext.Provider
            value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart deve ser usado dentro de um CartProvider')
    }
    return context
}
