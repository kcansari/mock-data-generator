export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  dateOfBirth: Date;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  products: OrderItem[];
  orderDate: Date;
  totalAmount: number;
} 