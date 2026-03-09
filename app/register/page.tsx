'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        setError('')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem.')
            setLoading(false)
            return
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || 'Erro ao criar conta.')
                return
            }

            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            })

            if (result?.error) {
                router.push('/login')
            } else {
                router.push('/')
                router.refresh()
            }
        } catch {
            setError('Erro ao criar conta.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold tracking-tight text-[#1d1d1f]">Criar Conta</h1>
                    <p className="text-sm text-[#6e6e73] mt-1">Junte-se ao ShopHub.</p>
                </div>

                {error && (
                    <p className="text-sm text-red-500 text-center mb-4">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Nome"
                        className="w-full px-4 py-3 bg-[#f5f5f7] rounded-xl text-sm border-0"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Email"
                        className="w-full px-4 py-3 bg-[#f5f5f7] rounded-xl text-sm border-0"
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        minLength={6}
                        placeholder="Senha"
                        className="w-full px-4 py-3 bg-[#f5f5f7] rounded-xl text-sm border-0"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        minLength={6}
                        placeholder="Confirmar Senha"
                        className="w-full px-4 py-3 bg-[#f5f5f7] rounded-xl text-sm border-0"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#0071e3] text-white text-sm font-medium py-3 rounded-full hover:bg-[#0077ed] transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Criando conta...' : 'Criar Conta'}
                    </button>
                </form>

                <p className="text-center text-xs text-[#86868b] mt-6">
                    Já tem conta?{' '}
                    <Link href="/login" className="text-[#0071e3] hover:opacity-70">Fazer login</Link>
                </p>
            </div>
        </div>
    )
}
