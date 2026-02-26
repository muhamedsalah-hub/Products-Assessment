import { jwtDecode, type JwtPayload } from "jwt-decode";
import { createContext, useState } from "react";

type IUser = { name: string };

interface JWTPayload extends JwtPayload {
  user: string;
}

export type IUserContext = {
  user: IUser;
  handleUserInfo: () => void;
  deleteUserInfo: () => void;
};

export const UserContext = createContext<IUserContext | null>(null);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUser>({ name: "" });

  const handleUserInfo = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const payLoad = jwtDecode<JWTPayload>(token);
      setUser({ name: payLoad.user });
    }
  };

  const deleteUserInfo = () => {
    localStorage.clear();
    setUser({ name: "" });
  };

  return (
    <UserContext.Provider value={{ user, deleteUserInfo, handleUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
