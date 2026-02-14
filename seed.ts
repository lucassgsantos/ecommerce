import { prisma } from './lib/prisma.ts'

async function main() {
  await prisma.product.deleteMany()

  await prisma.product.createMany({
    data: [
      {
        name: 'Laptop Pro',
        description: 'Laptop de alta performance para trabalho e desenvolvimento',
        price: 1299.99,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
        stock: 15,
        category: 'Eletrônicos',
      },
      {
        name: 'Smartphone X',
        description: 'Smartphone com câmera de 108MP e bateria de 5000mAh',
        price: 899.99,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
        stock: 32,
        category: 'Eletrônicos',
      },
      {
        name: 'Fone Bluetooth',
        description: 'Fone sem fio com cancelamento de ruído ativo',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        stock: 50,
        category: 'Acessórios',
      },
      {
        name: 'Tablet 10"',
        description: 'Tablet com tela AMOLED e processador de última geração',
        price: 699.99,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
        stock: 20,
        category: 'Eletrônicos',
      },
      {
        name: 'Câmera Digital',
        description: 'Câmera DSLR profissional com lente 24-70mm',
        price: 1499.99,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
        stock: 8,
        category: 'Fotografia',
      },
      {
        name: 'Smart Watch',
        description: 'Relógio inteligente com monitoramento de saúde',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        stock: 25,
        category: 'Acessórios',
      },
      {
        name: 'Monitor 4K',
        description: 'Monitor 32" 4K com HDR e 144Hz',
        price: 799.99,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop',
        stock: 12,
        category: 'Eletrônicos',
      },
      {
        name: 'Teclado Mecânico',
        description: 'Teclado RGB com switches mecânicos custom',
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
        stock: 40,
        category: 'Periféricos',
      },
    ],
  })

  console.log('Banco de dados populado com sucesso')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
