import { create } from "zustand";
import type { ICartStore } from "../Interfaces/CartInterface";
import type { IProduct } from "../Interfaces/ProductInterface";

export const useCartStore = create<ICartStore>((set) => ({
  cartItems: [],
  totalPrice: 0,
  addToCart: (product: IProduct, quantity: number = 1): void => {
    set((state) => {
      return { cartItems: [...state.cartItems, { ...product, quantity }] };
    });
  },
  removeFromCart: (productId: string): void => {
    set((state) => {
      const newItems = state.cartItems.filter(
        (item) => item.id.toString() !== productId,
      );

      return { cartItems: newItems };
    });
  },
  clearCart: (): void => {
    set(() => {
      return { cartItems: [] };
    });
  },
  getTotalPrice: () => {
    set((state) => {
      const total = state.cartItems.reduce((sum, item) => sum + item.price, 0);
      return { totalPrice: total };
    });
  },
}));
