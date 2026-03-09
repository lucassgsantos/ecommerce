# ShopHub

E-commerce fullstack construído com Next.js 14, TypeScript, Prisma e Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Prisma](https://img.shields.io/badge/Prisma-5-2D3748) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38BDF8)

## Stack

- **Next.js 14** com App Router e Server Components
- **TypeScript** com tipagem estrita
- **Prisma** como ORM (SQLite em dev)
- **Tailwind CSS** para estilização
- **NextAuth.js** para autenticação (Credentials + JWT)
- **Zod** para validação de dados
- **Vitest** para testes

## Funcionalidades

- Catálogo de produtos com busca e filtros por categoria
- Carrinho de compras persistente (localStorage)
- Checkout com validação server-side
- Autenticação com registro e login
- Histórico de pedidos por usuário
- Validação de estoque e preço no servidor
- Interface responsiva inspirada no design da Apple

## Rodando localmente

```bash
git clone https://github.com/lucassgsantos/ecommerce.git
cd ecommerce
npm install
cp .env.example .env
npx prisma migrate dev
npm run prisma:seed
npm run dev
```

Acesse `http://localhost:3000`

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a build de produção |
| `npm run test` | Roda os testes |
| `npm run prisma:seed` | Popula o banco com dados de exemplo |
| `npm run prisma:studio` | Abre o Prisma Studio |

## Estrutura

```
app/
├── api/                → API routes (products, orders, auth)
├── components/         → Componentes reutilizáveis
├── cart/               → Página do carrinho
├── checkout/           → Página de checkout
├── login/              → Página de login
├── register/           → Página de registro
├── orders/             → Histórico de pedidos
├── product/[id]/       → Detalhes do produto
└── order-confirmation/ → Confirmação de pedido
prisma/
├── schema.prisma       → Schema do banco
└── seed.ts             → Dados iniciais
__tests__/              → Testes unitários
```

## Testes

```bash
npm run test
```

39 testes cobrindo validação de dados (Zod) e lógica do carrinho.