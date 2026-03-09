'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
    id: number
    message: string
    type: ToastType
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

let nextId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = useCallback((message: string, type: ToastType = 'success') => {
        const id = nextId++
        setToasts((prev) => [...prev, { id, message, type }])

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, 2500)
    }, [])

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className="bg-[#1d1d1f] text-white px-5 py-3 rounded-full shadow-2xl toast-enter text-sm font-medium whitespace-nowrap"
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast deve ser usado dentro de um ToastProvider')
    }
    return context
}
