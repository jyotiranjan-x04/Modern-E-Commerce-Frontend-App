export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  variants: ProductVariant[];
  stock: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  rating: number;
  reviews: number;
  brand: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price?: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: ProductVariant;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface BillingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}