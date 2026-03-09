export function ProductCardSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="aspect-square bg-[#f5f5f7] rounded-2xl mb-3" />
            <div className="space-y-2">
                <div className="h-3.5 bg-[#f5f5f7] rounded w-2/3" />
                <div className="h-3.5 bg-[#f5f5f7] rounded w-1/3" />
                <div className="h-3 bg-[#f5f5f7] rounded w-1/4" />
            </div>
        </div>
    )
}

export function ProductGridSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
            {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    )
}

export function OrderSkeleton() {
    return (
        <div className="py-6 animate-pulse">
            <div className="flex justify-between">
                <div className="space-y-2">
                    <div className="h-3 bg-[#f5f5f7] rounded w-20" />
                    <div className="h-4 bg-[#f5f5f7] rounded w-32" />
                </div>
                <div className="h-4 bg-[#f5f5f7] rounded w-24" />
            </div>
        </div>
    )
}

export function OrderListSkeleton() {
    return (
        <div className="divide-y divide-[#d2d2d7]/30">
            {Array.from({ length: 3 }).map((_, i) => (
                <OrderSkeleton key={i} />
            ))}
        </div>
    )
}

export function ProductDetailsSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="h-4 bg-[#f5f5f7] rounded w-24 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="aspect-square bg-[#f5f5f7] rounded-2xl" />
                <div className="space-y-4 pt-4">
                    <div className="h-3 bg-[#f5f5f7] rounded w-20" />
                    <div className="h-7 bg-[#f5f5f7] rounded w-3/4" />
                    <div className="h-4 bg-[#f5f5f7] rounded w-full" />
                    <div className="h-4 bg-[#f5f5f7] rounded w-2/3" />
                    <div className="h-8 bg-[#f5f5f7] rounded w-32 mt-6" />
                    <div className="h-12 bg-[#f5f5f7] rounded-full w-full mt-6" />
                </div>
            </div>
        </div>
    )
}
