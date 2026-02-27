import type { IProduct } from "./ProductInterface";

export type ICartItems = {
  id: number;
  product: IProduct;
  quantity: number;
};

export interface ICartStore {
  cartItems: ICartItems[];
  totalPrice: number;
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getTotalPrice: () => void;
  updateQuantity: (itemId: number, quantity: number) => void;
}
