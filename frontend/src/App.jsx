import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import AdminLayout from "./components/admin/AdminLayout";
import EditProduct from "./components/admin/EditProduct";
import OrderManagement from "./components/admin/OrderManagement";
import ProductManagement from "./components/admin/ProductManagement";
import UserManagement from "./components/admin/UserManagement";
import Checkout from "./components/cart/Checkout";
import UserLayout from "./components/layout/UserLayout";
import ProductDetails from "./components/products/ProductDetails";
import AdminHomePage from "./pages/AdminHomePage";
import CollectionPage from "./pages/CollectionPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyOrderPage from "./pages/MyOrderPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

import { Provider } from "react-redux";
import ProtectedRoute from "./components/common/ProtectedRoute";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />

        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="collections/:collection"
              element={<CollectionPage />}
            />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<Checkout />} />
            <Route
              path="order-confirmation"
              element={<OrderConfirmationPage />}
            />
            <Route path="order/:id" element={<OrderDetailsPage />} />
            <Route path="/my-orders" element={<MyOrderPage />} />
          </Route>
          {/* Admin layout */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/:id/edit" element={<EditProduct />} />
            <Route path="orders" element={<OrderManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
