import { useEffect } from "react";
import { useProducts } from "../../core/hooks/useProductsHook";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ProductsList } from "./ProductsList";
import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const FetchingProducts = () => {
  const params = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const pageParam = params.get("page") || "1";

  const {
    loading,
    error,
    fetchProducts,
    filteredProducts,
    selectedCategory,
    filterByCategory,
    categories,
    selectedSort,
    filterByPrice,
    products,
    setFilteredProducts,
  } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">No products found.</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div>
      {/*         Filters and Sorting            */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filter by Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => filterByCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label
            htmlFor="sort"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Sort by Price
          </label>
          <select
            id="sort"
            value={selectedSort}
            onChange={(e) => filterByPrice(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option className="text-gray-500" value="default">
              Default
            </option>
            <option value="ASC">Price: Low to High</option>
            <option value="DESC">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/*         Products List            */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-5">
        {filteredProducts.map((product) => (
          <ProductsList key={product.id} product={product} />
        ))}
      </div>

      {/*         Pagination            */}
      {filteredProducts.length >= 10 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <ChevronLeft size={22} strokeWidth={2} />
            </PaginationItem>
            {Array.from({ length: products.length / 10 }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  className="cursor-pointer"
                  isActive={pageParam == (index + 1).toString()}
                  onClick={() => {
                    params.set("page", (index + 1).toString());
                    setFilteredProducts(
                      products.slice(index * 10, (index + 1) * 10),
                    );
                    navigate(`?${params.toString()}`);
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <ChevronRight size={22} strokeWidth={2}/>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
