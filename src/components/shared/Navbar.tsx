import {
  UserContext,
  type IUserContext,
} from "@/core/contexts/UserContextProvider";
import { LogIn, ShoppingBag, User } from "lucide-react";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { toast } from "react-toastify";

export const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user, deleteUserInfo, handleUserInfo } = useContext(
    UserContext,
  ) as IUserContext;

  useEffect(() => {
    if (token) {
      handleUserInfo();
    }
  },[]);

  return (
    <div>
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-blue-600" size={30} />
              <span className="text-xl font-bold text-gray-900">
                E-Commerce
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                <User />
                <div className="text-md flex">
                  <p className="text-gray-600 ">Welcome,</p>
                  <p className="font-bold  text-gray-900">{user.name}</p>
                </div>
              </div>

              {token ? (
                <button
                  onClick={() => {
                    deleteUserInfo();
                    toast.success("User logged out successfully");
                    navigate("/");
                  }}
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  <LogIn />
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      {<Outlet />}
    </div>
  );
};
