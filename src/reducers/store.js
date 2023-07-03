import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import estoreSlice from "./estoreSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import categorySlice from "./categorySlice";
import paymentSlice from "./paymentSlice";
import orderSlice from "./orderSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    estoreSet: estoreSlice,
    products: productSlice,
    cart: cartSlice,
    categories: categorySlice,
    payments: paymentSlice,
    orders: orderSlice,
  },
});
