import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { ProductsPage } from "./components/Products/ProductsPage";
import { ProductDetails } from "./components/ProductDetails/ProductDetails";
import { NotFound } from "./components/shared/NotFound";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
