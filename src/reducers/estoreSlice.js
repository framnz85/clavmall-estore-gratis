import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

if (localStorage.getItem("estore")) {
  initialState = JSON.parse(localStorage.getItem("estore"));
}

export const estoreSlice = createSlice({
  name: "estoreSet",
  initialState,
  reducers: {
    estoreDet: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { estoreDet } = estoreSlice.actions;

export default estoreSlice.reducer;
