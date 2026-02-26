import type { IProduct } from "./ProductInterface";

export interface ICartStore {
  cartItems: IProduct[];
  totalPrice: number;
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => void;
}
