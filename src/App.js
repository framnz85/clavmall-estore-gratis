import React, { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import NoStore from "./pages/NoStore";
import Header from "./components/navigation/Header";
import AdminRoute from "./components/routes/AdminRoute";
import UserRoute from "./components/routes/UserRoute";
import NoUserRoute from "./components/routes/NoUserRoute";
import TabBottom from "./components/navigation/TabBottom";
import ChatComponent from "./chat/ChatComponent";

import { getEstore } from "./functions/estore";
import { getUserDetails } from "./functions/user";
import { loginUser, logoutUser } from "./reducers/userSlice";
import { estoreDet } from "./reducers/estoreSlice";
import { emptyCart } from "./reducers/cartSlice";

import "react-toastify/dist/ReactToastify.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "bootstrap-material-design/dist/css/bootstrap-material-design.min.css";

const Auth = lazy(() => import("./pages/auth/Auth"));
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Product = lazy(() => import("./pages/Product"));
const Dashboard = lazy(() => import("./pages/admin/dashboard/Dashboard"));
const AdminOrderDetails = lazy(() =>
  import("./pages/admin/dashboard/OrderDetails")
);

const UserOrder = lazy(() => import("./pages/user/UserOrder"));
const UserAccount = lazy(() => import("./pages/user/UserAccount"));
const OrderDetails = lazy(() => import("./pages/user/OrderDetails"));

const CategoryCreate = lazy(() =>
  import("./pages/admin/category/CategoryCreate")
);
const CategoryUpdate = lazy(() =>
  import("./pages/admin/category/CategoryUpdate")
);
const CreateProduct = lazy(() => import("./pages/admin/product/CreateProduct"));
const UpdateProduct = lazy(() => import("./pages/admin/product/UpdateProduct"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const PaymentCreate = lazy(() => import("./pages/admin/payment/PaymentCreate"));
const PaymentUpdate = lazy(() => import("./pages/admin/payment/PaymentUpdate"));
const ManageUser = lazy(() => import("./pages/admin/ManageUser"));
const ManageHome = lazy(() => import("./pages/admin/ManageHome"));

const App = () => {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("userToken");
  const estoreLocal = localStorage.getItem("estore")
    ? JSON.parse(localStorage.getItem("estore"))
    : {};

  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const [slug, setSlug] = useState("");
  const [estore, setEstore] = useState({});

  useEffect(() => {
    if (slug) {
      loadEstore();
    } else if (estoreLocal && estoreLocal._id) {
      setEstore(estoreLocal);
    }
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadEstore = () => {
    getEstore(slug).then((res) => {
      if (res.data && res.data.err) {
        toast.error(res.data.err);
      } else {
        if (res.data) {
          setEstore(res.data);
          dispatch(estoreDet(res.data));
          localStorage.setItem("estore", JSON.stringify(res.data));
        }
      }
    });
  };

  useEffect(() => {
    if (userToken) {
      handleUserDetails(userToken);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUserDetails = (token) => {
    getUserDetails(estoreLocal._id, token).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        if (
          res.data &&
          res.data.estoreid &&
          res.data.estoreid._id === estoreLocal._id
        ) {
          dispatch(
            loginUser({
              ...res.data,
              token,
            })
          );
        } else {
          localStorage.clear();
          dispatch(logoutUser());
          dispatch(emptyCart());
          localStorage.removeItem("cart");
        }
      }
    });
  };

  return (
    <>
      <div id="non-printable" style={{ height: 56 }}>
        <Header />
      </div>
      <Suspense>
        <Routes>
          <Route
            exact
            path="/"
            element={user && user._id ? <NoStore /> : <Auth />}
          />
          <Route
            exact
            path="/:slug"
            element={
              <NoUserRoute setSlug={setSlug} estore={estore}>
                <Home />
              </NoUserRoute>
            }
          />
          <Route
            exact
            path="/:slug/shop"
            element={
              <NoUserRoute setSlug={setSlug} estore={estore}>
                <Shop />
              </NoUserRoute>
            }
          />
          <Route
            exact
            path="/:slug/shop/:catSlug"
            element={
              <NoUserRoute setSlug={setSlug} estore={estore}>
                <Shop />
              </NoUserRoute>
            }
          />
          <Route
            exact
            path="/:slug/cart"
            element={
              <NoUserRoute setSlug={setSlug} estore={estore}>
                <Cart />
              </NoUserRoute>
            }
          />
          <Route
            exact
            path="/:slug/product/:prodslug"
            element={
              <NoUserRoute setSlug={setSlug} estore={estore}>
                <Product />
              </NoUserRoute>
            }
          />
          <Route
            exact
            path="/:slug/auth"
            element={<Auth setSlug={setSlug} from="header" />}
          />
          <Route
            exact
            path="/:slug/checkout"
            element={
              <UserRoute>
                {cart && cart.length > 0 ? (
                  <Checkout setSlug={setSlug} estore={estore} />
                ) : (
                  <Home setSlug={setSlug} estore={estore} />
                )}
              </UserRoute>
            }
          />
          <Route
            exact
            path="/:slug/user/order"
            element={
              <UserRoute>
                <UserOrder setSlug={setSlug} estore={estore} />
              </UserRoute>
            }
          />
          <Route
            exact
            path="/:slug/user/order/:orderid"
            element={
              <UserRoute>
                <OrderDetails setSlug={setSlug} estore={estore} />
              </UserRoute>
            }
          />
          <Route
            exact
            path="/:slug/user/account"
            element={
              <UserRoute>
                <UserAccount setSlug={setSlug} estore={estore} />
              </UserRoute>
            }
          />
          <Route
            exact
            path="/:slug/admin/dashboard"
            element={
              <AdminRoute>
                <Dashboard setSlug={setSlug} estore={estore} />
              </AdminRoute>
            }
          />
          <Route
            exact
            path="/:slug/admin/dashboard/:orderid"
            element={
              <AdminRoute>
                <AdminOrderDetails setSlug={setSlug} estore={estore} />
              </AdminRoute>
            }
          />
          <Route
            exact
            path="/:slug/admin/category"
            element={
              <AdminRoute>
                <CategoryCreate setSlug={setSlug} estore={estore} />
              </AdminRoute>
            }
          />
          <Route
            exact
            path="/:slug/admin/category/:slug"
            element={
              <AdminRoute>
                <CategoryUpdate setSlug={setSlug} estore={estore} />
              </AdminRoute>
            }
          />
          <Route
            exact
            path="/:slug/admin/product"
            element={
              <AdminRoute>
                <CreateProduct setSlug={setSlug} estore={estore} />
              </AdminRoute>
            }
          />
          <Route
            exact
            path="/:slug/admin/product/:slug"
            element={
              <AdminRoute>
                <UpdateProduct setSlug={setSlug} estore={estore} />
              </AdminRoute>
            }
          />
          <Route
            exact
            path="/:slug/admin/products"
            element={
              <AdminRoute>
                <AllProducts setSlug={setSlug} estore={estore} />
              </AdminRoute>
            }
          />
          <Route
            exact
            path="/:slug/admin/payment"
            element={
              <AdminRoute>
                <PaymentCreate setSlug={setSlug} estore={estore} />
              </AdminRoute>
            }
          />
          <Route
            exact
            path="/:slug/admin/payment/:payid"
            element={
              <AdminRoute>
                <PaymentUpdate setSlug={setSlug} estore={estore} />
              </AdminRoute>
            }
          />
          <Route
            exact
            path="/:slug/admin/manageuser"
            element={
              <AdminRoute>
                <ManageUser setSlug={setSlug} estore={estore} />
              </AdminRoute>
            }
          />
          <Route
            exact
            path="/:slug/admin/managehome"
            element={
              <AdminRoute>
                <ManageHome setSlug={setSlug} estore={estore} />
              </AdminRoute>
            }
          />
        </Routes>
      </Suspense>
      <TabBottom />
      <ToastContainer />
      <ChatComponent />
    </>
  );
};

export default App;
