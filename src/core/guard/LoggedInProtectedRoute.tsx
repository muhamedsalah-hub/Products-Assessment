import type { ReactNode } from "react";
import { Navigate } from "react-router";

export const LoggedInProtectedRoute = ({ children }: { children: ReactNode }) => {
  if (localStorage.getItem("token") != undefined) {
    return <Navigate to={"/"} />;
  }
  return children;
};
