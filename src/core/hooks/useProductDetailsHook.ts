import { useState } from "react";
import { useParams } from "react-router";
import { getRequest } from "../services/fetchInstance";
import type { IProduct } from "../Interfaces/ProductInterface";
import { Environment } from "../services/environment";

export const useProductDetails = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [product, setProduct] = useState<IProduct | null>(null);
  const { productId } = useParams();

  const fetchProduct = async () => {
    setLoading(true);
    const { data, success, errorMsg } = await getRequest<IProduct>(
      `${Environment.baseUrl}/products/${productId}`,
    );
    if (success) {
      setProduct(data as IProduct);
      setLoading(false);
    } else {
      setError(errorMsg || "Failed to fetch product details");
      setLoading(false);
    }
  };
  

  return {
    loading,
    error,
    product,
    fetchProduct,
    productId,
  };
};
