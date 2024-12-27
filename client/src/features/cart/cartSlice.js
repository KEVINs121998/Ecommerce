import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.items.find(item => item.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    decreaseQuantity: (state, action) => {
      const existingProduct = state.items.find(item => item.id === action.payload);
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity--;
        } else {
          state.items = state.items.filter(item => item.id !== action.payload);
        }
      }
    },
    loadCartFromServer: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, loadCartFromServer } = cartSlice.actions;
export default cartSlice.reducer;
