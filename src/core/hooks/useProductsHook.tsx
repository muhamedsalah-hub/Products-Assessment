import { useState } from "react";
import { getRequest } from "../services/fetchInstance";
import { Environment } from "../services/environment";
import type { IProduct } from "../Interfaces/ProductInterface";
import type { ICategories } from "../Interfaces/CategoriesInterface";

export const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState<number>(1);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>("default");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchProducts = async () => {
    setLoading(true);
    const { success, data, errorMsg } = await getRequest<IProduct[]>(
      `${Environment.baseUrl}/products`,
    );
    if (success) {
      setProducts(data);
      setFilteredProducts(data.slice(0, 10));
      setCategories(
        [...new Set(data.map((product) => product.category))].map(
          (category) => {
            return { id: Math.random(), name: category };
          },
        ),
      );
      setLoading(false);
    } else {
      setError(errorMsg || "Failed to fetch products");
      setLoading(false);
    }
  };

  const sortDESC = (a: IProduct, b: IProduct) => b.price - a.price;
  const sortASC = (a: IProduct, b: IProduct) => a.price - b.price;

  const filterByCategory = (category: string) => {
    setSelectedCategory(category);

    let baseFiltered;
    if (category === "all") {
      baseFiltered = getPaginatedProducts(page);
    } else {
      baseFiltered = products.filter((p) => p.category === category);
    }

    const finalFiltered = [...baseFiltered];
    if (selectedSort === "ASC") finalFiltered.sort(sortASC);
    else if (selectedSort === "DESC") finalFiltered.sort(sortDESC);

    setFilteredProducts(finalFiltered);
  };

  const filterByPrice = (sort: string) => {
    setSelectedSort(sort);

    let baseFiltered;
    if (selectedCategory === "all") {
      baseFiltered = getPaginatedProducts(page);
    } else {
      baseFiltered = products.filter((p) => p.category === selectedCategory);
    }

    const finalFiltered = [...baseFiltered];

    if (sort === "ASC") finalFiltered.sort(sortASC);
    else if (sort === "DESC") finalFiltered.sort(sortDESC);

    setFilteredProducts(finalFiltered);
  };

  const setPaginatedProducts = (page: number) => {
    const start = (page - 1) * 10;
    const end = start + 10;
    setFilteredProducts([...products.slice(start, end)]);
  };
  const getPaginatedProducts = (page: number) => {
    const start = (page - 1) * 10;
    const end = start + 10;
    return products.slice(start, end);
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    filteredProducts,
    selectedCategory,
    filterByCategory,
    categories,
    selectedSort,
    filterByPrice,
    setPaginatedProducts,
    page,
    setPage,
  };
};
