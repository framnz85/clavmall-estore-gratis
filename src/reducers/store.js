import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import estoreSlice from "./estoreSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    estoreSet: estoreSlice,
    products: productSlice,
    cart: cartSlice,
  },
});
