import { createSlice } from "@reduxjs/toolkit";

import getUnique from "../components/common/getUnique";

let initialState = [];

if (localStorage.getItem("orders")) {
  initialState = JSON.parse(localStorage.getItem("orders"));
}

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    storeOrders: (state, action) => {
      return getUnique(state, action.payload);
    },
    addMyOrders: (state, action) => {
      return action.payload;
    },
    removeOrder: (state, action) => {
      return action.payload;
    },
  },
});

export const { storeOrders, addMyOrders, removeOrder } = orderSlice.actions;

export default orderSlice.reducer;
