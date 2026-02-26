import { useContext, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { IAuth } from "../Interfaces/useAuthInterface";
import { postRequest } from "../services/fetchInstance";
import { Environment } from "../services/environment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import {
  UserContext,
  type IUserContext,
} from "../contexts/UserContextProvider";

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { handleUserInfo } = useContext(UserContext) as IUserContext;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IAuth>();

  const onSubmit: SubmitHandler<IAuth> = async (formData) => {
    if (isValid) {
      setLoading(true);
      const { success, data, errorMsg } = await postRequest<
        IAuth,
        { token: string }
      >(`${Environment.baseUrl}/auth/login`, formData);

      if (success) {
        localStorage.setItem("token", data?.token as string);
        handleUserInfo();
        toast.success("User Logged in successfully");
        setLoading(false);
        navigate("/");
      } else {
        console.log(errorMsg);
        toast.error(`Invalid username or password`);
        setLoading(false);
      }
    }
  };

  return { loading, register, handleSubmit, onSubmit, errors };
};
