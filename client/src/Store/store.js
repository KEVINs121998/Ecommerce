import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice"; // Import auth reducer

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer, 
  },
});

export default store;
