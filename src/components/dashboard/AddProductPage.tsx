import { useAddProduct } from "@/core/hooks/useAddProductHook";
import { useProducts } from "@/core/hooks/useProductsHook";
import { Ban, Loader, MoveLeft, ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router";

export const AddProductPage = () => {
  const {
    navigate,
    onSubmit,
    loading,
    errors,
    handleSubmit,
    register,
  } = useAddProduct();
  const { fetchProducts, categories } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/*      Form navigation             */}
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
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

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/*                 Form Header            */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Create New Product
            </h1>
            <p className="text-gray-600">
              Fill in the details to add a new product to the catalog
            </p>
          </div>

          {/*                     Form Inputs                  */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Title
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                {...register("title", { required: "Title is required" })}
                className={`w-full px-4 py-3 border ${
                  errors.title
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                } rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200`}
                placeholder="Enter product title"
              />
              {errors.title && (
                <p className="mt-2 text-md text-red-600 flex items-center gap-1">
                  <Ban />
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                rows={4}
                className={`w-full px-4 py-3 border ${
                  errors.description
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                } rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200 resize-none`}
                placeholder="Enter product description"
              />
              {errors.description && (
                <p className="mt-2 text-md text-red-600 flex items-center gap-1">
                  <Ban />
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  $
                </span>
                <input
                  type="number"
                  min={0}
                  id="price"
                  {...register("price", {
                    required: "Price is Required",
                    min: {
                      value: 0,
                      message: "Price should be a positive number",
                    },
                  })}
                  className={`w-full pl-8 pr-4 py-3 border ${
                    errors.price
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200`}
                  placeholder="0.00"
                />
              </div>
              {errors.price && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <Ban />
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <select
                  id="category"
                  {...register("category", {
                    required: "Category is Required",
                  })}
                  className={`flex-1 px-4 py-3 border ${
                    errors.category
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200`}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.category && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <Ban />
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="image_url"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="image_url"
                {...register("image", { required: "Image is required" })}
                className={`w-full px-4 py-3 border ${
                  errors.image
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                } rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <Ban />
                  {errors.image.message}
                </p>
              )}
            </div>

              {/*      Submission button          */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                disabled={loading}
                type="submit"
                className="flex-1 cursor-pointer px-6 py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className={"animate-spin"} />
                    Creating...
                  </>
                ) : (
                  <>Create Product</>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="cursor-pointer px-6 py-4 bg-gray-100 text-gray-800 font-medium text-lg rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
