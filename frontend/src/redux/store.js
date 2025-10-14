import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import adminOrdersReducer from "./slices/adminOrderSlice";
import adminProductReducer from "./slices/adminProductSlice";
import adminReducer from "./slices/adminSlice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";
import orderReducer from "./slices/orderSlice";
import productReducer from "./slices/productsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
    admin: adminReducer,
    adminProducts: adminProductReducer,
    adminOrders: adminOrdersReducer,
  },
});

export default store;
