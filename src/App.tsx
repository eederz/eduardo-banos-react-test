import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./components/Auth/Login";
import ProductTable from "./components/Products/ ProductTable";
import ProductDetail from "./components/Products/ProductDetail";
import NotFound from "./pages/NotFound";
import Header from "./components/Layout/Header";
import Users from "./pages/ChangePassword";
import CreateProduct from "./pages/CreateProduct";
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductTable />} />
          <Route path="/products/create" element={<CreateProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/user" element={<Users />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
