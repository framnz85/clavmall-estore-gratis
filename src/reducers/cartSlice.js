import { createSlice } from "@reduxjs/toolkit";

import getUnique from "../components/common/getUnique";

let initialState = [];

if (localStorage.getItem("cart")) {
  initialState = JSON.parse(localStorage.getItem("cart"));
}

const sliceExecute = (state, payload) => {
  const unique = getUnique(state, payload);
  return unique.length > 0
    ? unique.map((uniP) => {
        const newP = payload.filter((payP) => payP._id === uniP._id);
        if (newP[0]) {
          return { ...uniP, count: newP[0].count };
        } else {
          return uniP;
        }
      })
    : [];
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    storeToCart: (state, action) => {
      return sliceExecute(state, action.payload);
    },
    removeFromCart: (state, action) => {
      return action.payload;
    },
    emptyCart: (state, action) => {
      return [];
    },
  },
});

export const { storeToCart, removeFromCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
