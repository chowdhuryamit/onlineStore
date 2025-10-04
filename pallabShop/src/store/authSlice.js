import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
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
      const itemExists = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (!itemExists) {
        state.cart.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { login, logout, addToCart, removeFromCart, clearCart, setCart } =
  authSlice.actions;
export default authSlice.reducer;
