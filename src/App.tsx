import { BrowserRouter, Route, Routes } from "react-router";
import { lazy } from "react";
import "./App.css";

import { ProductsPage } from "./components/app/Products/ProductsPage";
import { Navbar } from "./components/shared/Navbar";
import { NotFound } from "./components/shared/NotFound";
import { ToastContainer } from "react-toastify";
import { UserContextProvider } from "./core/contexts/UserContextProvider";
import { ProtectedRoute } from "./core/guard/ProtectedRoute";
import { LoggedInProtectedRoute } from "./core/guard/LoggedInProtectedRoute";


const CartComponent = lazy(() =>
  import("./components/app/Cart/CartPage").then((module) => ({
    default: module.CartPage,
  })),
);
const AddProductComponent = lazy(() =>
  import("./components/dashboard/AddProductPage").then((module) => ({
    default: module.AddProductPage,
  })),
);
const LoginComponent = lazy(() =>
  import("./components/Auth/LoginPage").then((module) => ({
    default: module.LoginPage,
  })),
);
const SignupComponent = lazy(() =>
  import("./components/Auth/SignupPage").then((module) => ({
    default: module.SignUp,
  })),
);

const ProductDetailsComponent = lazy(() =>
  import("./components/app/ProductDetails/ProductDetails").then((module) => ({
    default: module.ProductDetails,
  })),
);


function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<ProductsPage />} />
            <Route
              path="/signup"
              element={
                <LoggedInProtectedRoute>
                  <SignupComponent />
                </LoggedInProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <LoggedInProtectedRoute>
                  <LoginComponent />
                </LoggedInProtectedRoute>
              }
            />
            <Route path="/product/:productId" element={<ProductDetailsComponent />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartComponent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AddProductComponent />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <ToastContainer position="top-center" autoClose={2000} />
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
