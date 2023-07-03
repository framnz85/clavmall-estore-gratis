import { createSlice } from "@reduxjs/toolkit";

import getUnique from "../components/common/getUnique";

let initialState = [];

if (localStorage.getItem("payments")) {
  initialState = JSON.parse(localStorage.getItem("payments"));
}

export const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    storePayments: (state, action) => {
      return getUnique(state, action.payload);
    },
    addStorePayment: (state, action) => {
      return [...state, action.payload];
    },
    updateStorePayment: (state, action) => {
      return action.payload;
    },
    removeStorePayment: (state, action) => {
      return action.payload;
    },
  },
});

export const {
  storePayments,
  addStorePayment,
  updateStorePayment,
  removeStorePayment,
} = paymentSlice.actions;

export default paymentSlice.reducer;
