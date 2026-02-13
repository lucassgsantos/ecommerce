# ShopHub - E-commerce Full Stack

Projeto de e-commerce full stack moderno com Next.js 14, TypeScript, PostgreSQL e Prisma.

## Tecnologias

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Gerenciamento de estado**: localStorage (carrinho)

## Pré-requisitos

- Node.js 18+
- PostgreSQL instalado e rodando
- npm ou yarn

## Instalação

1. Clone o repositório
```bash
cd ecommerce-project
```

2. Instale as dependências
```bash
npm install
```

3. Configure o arquivo .env
```bash
cp .env.example .env.local
```
Edite `.env.local` e adicione a URL do seu banco PostgreSQL:
```
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce"
```

4. Configure o banco de dados
```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. Popule com dados de exemplo (opcional)
```bash
npx ts-node seed.ts
```

6. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## Estrutura do Projeto

```
ecommerce-project/
├── app/
│   ├── api/               # API Routes (backend)
│   │   ├── products/
│   │   └── orders/
│   ├── components/        # Componentes React reutilizáveis
│   ├── (routes)/          # Páginas da aplicação
│   │   ├── page.tsx       # Home
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── orders/
│   │   ├── product/[id]/
│   │   └── order-confirmation/[id]/
│   ├── layout.tsx         # Layout raiz
│   └── globals.css        # Estilos globais
├── lib/                   # Utilitários
│   └── prisma.ts          # Cliente Prisma
├── prisma/
│   └── schema.prisma      # Schema do banco
├── types/
│   └── index.ts           # Tipos TypeScript
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## Funcionalidades

✅ Listagem de produtos
✅ Detalhes do produto
✅ Carrinho de compras (localStorage)
✅ Checkout com dados do cliente
✅ Criação de pedidos
✅ Listagem de pedidos
✅ Confirmação de pedido
✅ API REST completa
✅ Banco de dados relacional
✅ TypeScript em todo o projeto

## Comandos

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Inicia servidor de produção
npm run lint         # Lint do código
npx prisma studio   # Abre interface do Prisma
npx prisma migrate dev  # Cria nova migração
```

## Endpoints da API

### Produtos
- `GET /api/products` - Lista todos os produtos
- `GET /api/products?id=1` - Busca um produto específico
- `POST /api/products` - Cria novo produto

### Pedidos
- `GET /api/orders` - Lista todos os pedidos
- `GET /api/orders?id=1` - Busca um pedido específico
- `POST /api/orders` - Cria novo pedido

## Notas

- O carrinho é armazenado em localStorage (cliente)
- Sem sistema de autenticação (como requisitado)
- Dados de exemplo devem ser inseridos via Prisma Studio ou API
- Todos os códigos estão sem comentários (conforme solicitado)

## Próximas melhorias

- Sistema de autenticação (JWT/OAuth)
- Integração com gateway de pagamento
- Upload de imagens para produtos
- Sistema de avaliações e comentários
- Busca e filtros avançados
- Testes automatizados
