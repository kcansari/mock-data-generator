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

export interface Order {
  id: string;
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
  orderDate: Date;
  totalAmount: number;
} 