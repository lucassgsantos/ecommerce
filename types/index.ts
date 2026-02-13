export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  stock: number
  category: string
  createdAt: Date
  updatedAt: Date
}

export interface CartItem {
  productId: number
  quantity: number
  product: Product
}

export interface Order {
  id: number
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  total: number
  status: string
  createdAt: Date
  items: OrderItem[]
}

export interface OrderItem {
  id: number
  quantity: number
  price: number
  productId: number
  product: Product
}

export interface CheckoutData {
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  items: CartItem[]
}
