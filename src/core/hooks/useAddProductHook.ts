import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";

import type { IForm } from "../Interfaces/AddProductInterface";
import { useState } from "react";
import { postRequest } from "../services/fetchInstance";
import { Environment } from "../services/environment";
import { toast } from "react-toastify";

export const useAddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = async (formData) => {
    if (isValid) {
      setLoading(true);
      const { success } = await postRequest<IForm>(
        `${Environment.baseUrl}/products`,
        formData,
      );
      if (success) {
        toast.success("Product Added Successfully");
        setLoading(false);
        reset({
          title: "",
          category: "",
          description: "",
          price: 0,
          image: "",
        });
      } else {
        toast.error("Something went wrong");
        setLoading(false);
      }
    }
  };

  return {
    navigate,
    onSubmit,
    loading,
    register,
    handleSubmit,
    errors,
  };
};
