import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    loginUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    logoutUser: (state, action) => {
      return {};
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
