import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";

import { ProductDetails } from "./components/app/ProductDetails/ProductDetails";
import { NotFound } from "./components/shared/NotFound";
import { CartPage } from "./components/app/Cart/CartPage";
import { ProductsPage } from "./components/app/Products/ProductsPage";
import { AddProductPage } from "./components/dashboard/AddProductPage";
import { ToastContainer } from "react-toastify";
import { UserContextProvider } from "./core/contexts/UserContextProvider";
import { LoginPage } from "./components/Auth/LoginPage";
import { ProtectedRoute } from "./core/guard/ProtectedRoute";
import { Navbar } from "./components/shared/Navbar";
import { SignUp } from "./components/Auth/SignupPage";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<ProductsPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AddProductPage />
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
