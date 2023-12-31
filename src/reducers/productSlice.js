import { createSlice } from "@reduxjs/toolkit";

import getUnique from "../components/common/getUnique";

let initialState = [];

if (localStorage.getItem("products")) {
  initialState = JSON.parse(localStorage.getItem("products"));
}

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    storeProducts: (state, action) => {
      return getUnique(state, action.payload);
    },
    removeStoreProducts: (state, action) => {
      return action.payload;
    },
  },
});

export const { storeProducts, removeStoreProducts } = productSlice.actions;

export default productSlice.reducer;
