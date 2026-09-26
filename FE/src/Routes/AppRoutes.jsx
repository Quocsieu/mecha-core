import { CartProvider } from "../Context/CartContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import ProductDetail from "../Pages/ProductDetail/ProductDetail";
import Cart from "../Pages/Cart/Cart";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import NotFound from "../Pages/NotFound/NotFound";
import Profile from "../Pages/Profile/Profile";
import Checkout from "../Pages/Checkout/Checkout";
import OrderSuccess from "../Pages/OrderSuccess/OrderSuccess";
import Dashboard from "../Pages/Admin/Dashboard/Dashboard";
import ProtectedAdminRoute from "../Components/ProtectedAdminRoute";
import AdminProducts from "../Pages/Admin/Products/Products";
import ProductForm from "../Pages/Admin/Products/ProductForm";
import Users from "../Pages/Admin/Users/Users";
import Orders from "../Pages/Admin/Orders/Orders";
import { AuthProvider } from "../Context/AuthContext";
import AdminLayout from "../Layout/AdminLayout";

function AppRoutes() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<ProductDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <AdminLayout />
                  </ProtectedAdminRoute>
                }
              >
                <Route index element={<Dashboard />} />

                <Route path="products" element={<AdminProducts />} />

                <Route path="products/add" element={<ProductForm />} />

                <Route path="products/edit/:id" element={<ProductForm />} />

                <Route path="users" element={<Users />} />

                <Route path="orders" element={<Orders />} />
              </Route>
              <Route
                path="/admin/products"
                element={
                  <ProtectedAdminRoute>
                    <AdminProducts />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/products/add"
                element={
                  <ProtectedAdminRoute>
                    <ProductForm />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/products/edit/:id"
                element={
                  <ProtectedAdminRoute>
                    <ProductForm />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedAdminRoute>
                    <Users />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedAdminRoute>
                    <Orders />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/products/add"
                element={
                  <ProtectedAdminRoute>
                    <ProductForm />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/products/edit/:id"
                element={
                  <ProtectedAdminRoute>
                    <ProductForm />
                  </ProtectedAdminRoute>
                }
              />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default AppRoutes;
