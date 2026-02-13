import { prisma } from './lib/prisma'

async function main() {
  await prisma.product.deleteMany()

  await prisma.product.createMany({
    data: [
      {
        name: 'Laptop Pro',
        description: 'Laptop de alta performance para trabalho e desenvolvimento',
        price: 1299.99,
        image: 'https://via.placeholder.com/300x300?text=Laptop+Pro',
        stock: 15,
        category: 'Eletrônicos',
      },
      {
        name: 'Smartphone X',
        description: 'Smartphone com câmera de 108MP e bateria de 5000mAh',
        price: 899.99,
        image: 'https://via.placeholder.com/300x300?text=Smartphone+X',
        stock: 32,
        category: 'Eletrônicos',
      },
      {
        name: 'Fone Bluetooth',
        description: 'Fone sem fio com cancelamento de ruído ativo',
        price: 199.99,
        image: 'https://via.placeholder.com/300x300?text=Fone+Bluetooth',
        stock: 50,
        category: 'Acessórios',
      },
      {
        name: 'Tablet 10"',
        description: 'Tablet com tela AMOLED e processador de última geração',
        price: 699.99,
        image: 'https://via.placeholder.com/300x300?text=Tablet+10',
        stock: 20,
        category: 'Eletrônicos',
      },
      {
        name: 'Câmera Digital',
        description: 'Câmera DSLR profissional com lente 24-70mm',
        price: 1499.99,
        image: 'https://via.placeholder.com/300x300?text=Camera+Digital',
        stock: 8,
        category: 'Fotografia',
      },
      {
        name: 'Smart Watch',
        description: 'Relógio inteligente com monitoramento de saúde',
        price: 299.99,
        image: 'https://via.placeholder.com/300x300?text=Smart+Watch',
        stock: 25,
        category: 'Acessórios',
      },
      {
        name: 'Monitor 4K',
        description: 'Monitor 32" 4K com HDR e 144Hz',
        price: 799.99,
        image: 'https://via.placeholder.com/300x300?text=Monitor+4K',
        stock: 12,
        category: 'Eletrônicos',
      },
      {
        name: 'Teclado Mecânico',
        description: 'Teclado RGB com switches mecânicos custom',
        price: 249.99,
        image: 'https://via.placeholder.com/300x300?text=Teclado+Mecanico',
        stock: 40,
        category: 'Periféricos',
      },
    ],
  })

  console.log('✅ Banco de dados populado com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
