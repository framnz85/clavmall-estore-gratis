import { createSlice } from "@reduxjs/toolkit";

import getUnique from "../components/common/getUnique";

let initialState = [];

if (localStorage.getItem("categories")) {
  initialState = JSON.parse(localStorage.getItem("categories"));
}

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    storeCategories: (state, action) => {
      return getUnique(state, action.payload);
    },
    addStoreCategory: (state, action) => {
      return [...state, action.payload];
    },
    updateStoreCategory: (state, action) => {
      return action.payload;
    },
    removeStoreCategory: (state, action) => {
      return action.payload;
    },
  },
});

export const {
  storeCategories,
  addStoreCategory,
  updateStoreCategory,
  removeStoreCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
