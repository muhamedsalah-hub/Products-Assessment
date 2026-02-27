import { useCartStore } from "@/core/store/cartStore";
import { ArrowLeft, MoveLeft } from "lucide-react";
import { Link } from "react-router";
import { useEffect } from "react";
import { CartItems } from "./CartItems";

export const CartPage = () => {
  const { clearCart, getTotalPrice, cartItems, totalPrice } = useCartStore();

  useEffect(() => {
    getTotalPrice();
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <svg
            className="w-24 h-24 mx-auto text-gray-300 mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Add some products to get started
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="mx-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/*                Cart Header                 */}
        <div
          className="flex justify-between
         items-center"
        >
          <header>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Cart Items
            </h1>
            <p className="text-gray-600">
              Number of Cart Items : {cartItems.length}
            </p>
            <p className="text-gray-600">
              Total price : {totalPrice.toFixed(2)} $
            </p>
          </header>
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium  transition-colors duration-200"
          >
            <MoveLeft className="w-5 h-5 mr-2" />
            Back to Shopping
          </Link>
        </div>

        {/*                Cart Items List                 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <CartItems key={item.product.id} item={item} />
            ))}
          </div>
        </div>

        {/*                Cart Footer                 */}
        <div className="bg-gray-50 mt-5 border-gray-200">
          <button
            onClick={clearCart}
            className="cursor-pointer text-white rounded-md px-4 py-2 bg-red-600 hover:bg-red-700 font-medium text-sm transition-colors duration-200"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};
