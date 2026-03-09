'use client'

import { useState, useMemo } from 'react'
import { Product } from '@/types'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
    products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')

    const categories = useMemo(() => {
        const cats = new Set(products.map((p) => p.category))
        return ['all', ...Array.from(cats).sort()]
    }, [products])

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch =
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.description.toLowerCase().includes(search.toLowerCase())
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
            return matchesSearch && matchesCategory
        })
    }, [products, search, selectedCategory])

    return (
        <div>
            {/* Filtros */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <input
                    type="text"
                    placeholder="Buscar"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-[#f5f5f7] rounded-lg text-sm border-0 placeholder:text-[#86868b] transition-shadow"
                />
                <div className="flex gap-2 flex-wrap">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${selectedCategory === cat
                                    ? 'bg-[#1d1d1f] text-white'
                                    : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]'
                                }`}
                        >
                            {cat === 'all' ? 'Todos' : cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-[#6e6e73] text-base">Nenhum produto encontrado.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}
