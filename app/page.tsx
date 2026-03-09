import { prisma } from '@/lib/prisma'
import { ProductGrid } from './components/ProductGrid'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f]">
          Nossos Produtos
        </h1>
        <p className="text-lg text-[#6e6e73] mt-3">
          Tecnologia que transforma o seu dia a dia.
        </p>
      </div>
      <ProductGrid products={products} />
    </div>
  )
}
