import type { ReactNode } from "react";
import { Navigate } from "react-router";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  if (localStorage.getItem("token") != undefined) {
    return children;
  }
  return <Navigate to={"/login"}/>;
};
