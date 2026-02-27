import { create } from "zustand";
import type { ICartStore } from "../Interfaces/CartInterface";
import type { IProduct } from "../Interfaces/ProductInterface";
import { persist } from "zustand/middleware";

export const useCartStore = create<ICartStore>()(
  persist(
    (set) => ({
      cartItems: [],
      totalPrice: 0,
      addToCart: (product: IProduct): void => {
        set((state) => {
          const isFound = state.cartItems.some((item) => {
            return item.product.id == product.id;
          });

          const newCartItems = state.cartItems.map((item) => {
            if (item.product.id == product.id) {
              item.quantity++;
            }
            return item;
          });

          if (isFound) return { cartItems: newCartItems };
          else
            return {
              cartItems: [
                ...state.cartItems,
                { product, quantity: 1, id: product.id },
              ],
            };
        });
      },
      removeFromCart: (itemId: number): void => {
        set((state) => {
          const newItems = state.cartItems.filter((item) => item.id !== itemId);

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
          const total = state.cartItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0,
          );
          return { totalPrice: total };
        });
      },
      updateQuantity: (itemId: number, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              cartItems: state.cartItems.filter((item) => item.id !== itemId),
            };
          }
          const newItems = state.cartItems.map((item) => {
            if (item.id == itemId) {
              return { ...item, quantity };
            }
            return item;
          });
          return { cartItems: newItems };
        });
      },
    }),
    {
      name: "cartItems",
    },
  ),
);
