import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: true,
  cart: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
    },
    logout: (state, action) => {
      state.status = false;
    },
    addToCart: (state, action) => {
      const itemExists = state.cart.find((item) => item._id === action.payload._id);
      if (!itemExists) {
        state.cart.push(action.payload);
      } 
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { login, logout, addToCart, removeFromCart,clearCart } = authSlice.actions;
export default authSlice.reducer;
