import { useProductDetails } from "@/core/hooks/useProductDetailsHook";
import { useCartStore } from "@/core/store/cartStore";
import { MoveLeft, ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router";
import { CardSkeleton } from "../../shared/CardSkeleton";

export const ProductDetails = () => {
  const { product, loading, error, fetchProduct } =
    useProductDetails();
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen text-center bg-gray-50">
        <div className="max-w-7xl h-full flex justify-center items-center my-5 mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CardSkeleton width="max-w-2xl" height="h-[30rem] block" layout="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 " />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Product not found
        </h1>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/*     ProductDetails Header and navigation       */}
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium  transition-colors duration-200"
          >
            <MoveLeft className="w-5 h-5 mr-2" />
            Back to Products
          </Link>
          <Link
            to="/cart"
            className="relative inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-200"
          >
            <div className="flex gap-1 items-center">
              <ShoppingCart />
              <span>Cart</span>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/*         Left column             */}
            <div className=" aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                width={300}
                height={300}
                className="w-full h-full object-contain"
              />
            </div>

            {/*         Right column             */}
            <div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                  {product.category}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <button
                onClick={() => addToCart(product)}
                className="w-full px-4 cursor-pointer py-3 text-lg bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
