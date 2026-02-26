import { Link } from "react-router";
import { FetchingProducts } from "./FetchingProducts";
import { Plus, ShoppingCart } from "lucide-react";

export const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/*      Products  Header  and navigation         */}
        <div className="flex justify-between items-center mb-8">
          <header>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Product Catalog
            </h1>
            <p className="text-gray-600">
              Discover our collection of quality products
            </p>
          </header>
          <div className="flex gap-x-2">
            <Link
              to="/dashboard"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              <Plus />
              Add Product
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
        </div>

        {/*      Products List           */}

        <FetchingProducts />
      </div>
    </div>
  );
};
