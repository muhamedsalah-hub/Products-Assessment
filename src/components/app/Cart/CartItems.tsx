import type { ICartItems } from "@/core/Interfaces/CartInterface";
import { useCartStore } from "@/core/store/cartStore";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router";

export const CartItems = ({ item }: { item: ICartItems }) => {
  const { removeFromCart,updateQuantity } = useCartStore();

  return (
    <div
      key={item.id}
      className="p-6 hover:bg-gray-50 transition-colors duration-150"
    >
      <div className="flex gap-6">
        <Link
          to={`/product/${item.id}`}
          className="shrink-0 w-32 h-32 bg-gray-200 rounded-lg overflow-hidden group"
        >
          <img
            src={item.product.image}
            alt={item.product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </Link>

        <div className="flex-1 flex flex-col justify-between">
          {/*             Cart Item                */}
          <div>
            <div className="flex justify-between products-start mb-2">
              <Link
                to={`/product/${item.id}`}
                className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200"
              >
                {item.product.title}
              </Link>
            </div>

            <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded mb-3">
              {item.product.category}
            </span>

            <span className="block my-2 text-3xl font-bold text-gray-900">
              ${item.product.price.toFixed(2)}
            </span>
            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
              {item.product.description}
            </p>
          </div>

          <div className="flex justify-between items-center gap-3">
            {/*                  Products Quantity            */}
            <div className="flex gap-x-2 items-center">
              <span className="text-sm text-gray-600 font-medium">
                Quantity:
              </span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => {
                    updateQuantity(item.id, item.quantity - 1);
                  }}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-150 text-gray-700"
                >
                  <Minus className="w-3 h-3" />
                </button>

                <span className="px-4 py-2 text-gray-900 font-medium">
                  {item.quantity}
                </span>

                <button
                  onClick={() => {
                    updateQuantity(item.id, item.quantity + 1);
                  }}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-150 text-gray-700"
                >
                  <Plus className="w-3 h-3 " />
                </button>
              </div>
            </div>
            <div>
              {/*              Removing a product                  */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="text-xs text-red-600 hover:text-red-700 transition-colors duration-200" />
                <span className="text-red-600 hover:text-red-700">Remove</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
