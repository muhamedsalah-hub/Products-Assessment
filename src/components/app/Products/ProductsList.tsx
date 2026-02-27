import type { IProduct } from "@/core/Interfaces/ProductInterface";
import { useCartStore } from "@/core/store/cartStore";
import { Link } from "react-router";

export const ProductsList = ({ product }: { product: IProduct }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div
      key={product.id}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="h-48 bg-gray-200">
        <img
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          loading="lazy"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
            {product.category}
          </span>
        </div>

        <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {product.title}
        </h2>

        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>

          <Link
            to={`/product/${product.id}`}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            View Details
          </Link>
        </div>

        <div className="text-center my-5 w-full">
          <button
            onClick={() => {
              addToCart(product);
            }}
            className="w-full px-4 cursor-pointer py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
