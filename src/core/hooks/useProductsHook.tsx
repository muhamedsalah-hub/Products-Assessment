import { useState } from "react";
import { getRequest } from "../services/fetchInstance";
import { Environment } from "../services/environment";
import type { IProduct } from "../Interfaces/ProductInterface";
import type { ICategories } from "../Interfaces/CategoriesInterface";
import { useNavigate } from "react-router";

export const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>("default");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const params = new URLSearchParams(window.location.search);
  const pageParam = params.get("page") || "1";
  const navigate = useNavigate();

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

    const baseFiltered =
      category === "all"
        ? [...products.slice(0, 10)]
        : products.filter((p) => p.category === category);

    const finalFiltered = [...baseFiltered];
    if (selectedSort === "ASC") finalFiltered.sort(sortASC);
    else if (selectedSort === "DESC") finalFiltered.sort(sortDESC);

    setFilteredProducts(finalFiltered);
  };

  const filterByPrice = (sort: string) => {
    setSelectedSort(sort);

    const baseFiltered =
      selectedCategory === "all"
        ? [...products.slice(0, 10)]
        : products.filter((p) => p.category === selectedCategory);

    const finalFiltered = [...baseFiltered];

    if (sort === "ASC") finalFiltered.sort(sortASC);
    else if (sort === "DESC") finalFiltered.sort(sortDESC);

    setFilteredProducts(finalFiltered);
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
    setFilteredProducts,
    pageParam,
    params,
    navigate,
  };
};
