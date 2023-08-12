import React, { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import NoStore from "./pages/NoStore";
import Header from "./components/navigation/Header";
import AdminRoute from "./components/routes/AdminRoute";
import UserRoute from "./components/routes/UserRoute";
import NoUserRoute from "./components/routes/NoUserRoute";
import TabBottom from "./components/navigation/TabBottom";
import ChatComponent from "./chat/ChatComponent";

import { getEstore, getEstoreCounters } from "./functions/estore";
import { getUserDetails, userEndPoint } from "./functions/user";
import { loginUser, logoutUser } from "./reducers/userSlice";
import { estoreDet } from "./reducers/estoreSlice";
import { emptyCart } from "./reducers/cartSlice";
import { removeStoreCategory } from "./reducers/categorySlice";
import { removeStoreProducts } from "./reducers/productSlice";
import { removeStorePayment } from "./reducers/paymentSlice";

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
const AdminSetting = lazy(() => import("./pages/admin/AdminSetting"));
const Upgrade = lazy(() => import("./pages/admin/Upgrades"));
const Guide = lazy(() => import("./pages/admin/guide"));
const Training = lazy(() => import("./pages/admin/guide/training"));

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");
  const estoreLocal = localStorage.getItem("estore")
    ? JSON.parse(localStorage.getItem("estore"))
    : {};

  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const [slug, setSlug] = useState("");
  const [estore, setEstore] = useState({});
  const [notifyChange, setNotifyChange] = useState(0);

  useEffect(() => {
    if (slug) {
      if (slug !== estoreLocal.slug) loadEstore();
    } else if (estoreLocal && estoreLocal._id) {
      setEstore(estoreLocal);
      if (estoreLocal && estoreLocal._id) {
        checkEstoreCounters();
      }
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

  const checkEstoreCounters = () => {
    getEstoreCounters(estoreLocal._id).then((res) => {
      if (res.data && res.data.err) {
        toast.error(res.data.err);
      } else {
        let estoreObj = {};
        if (estoreLocal.categoryChange !== res.data.categoryChange) {
          dispatch(removeStoreCategory([]));
          localStorage.removeItem("categories");
          estoreObj = { ...estoreObj, categoryChange: res.data.categoryChange };
        }
        if (estoreLocal.productChange !== res.data.productChange) {
          dispatch(removeStoreProducts([]));
          localStorage.removeItem("products");
          estoreObj = { ...estoreObj, productChange: res.data.productChange };
        }
        if (estoreLocal.paymentChange !== res.data.paymentChange) {
          dispatch(removeStorePayment([]));
          localStorage.removeItem("payments");
          estoreObj = { ...estoreObj, paymentChange: res.data.paymentChange };
        }
        setEstore({ ...estoreLocal, ...estoreObj });
        dispatch(estoreDet({ ...estoreLocal, ...estoreObj }));
        localStorage.setItem(
          "estore",
          JSON.stringify({ ...estoreLocal, ...estoreObj })
        );
      }
    });
  };

  useEffect(() => {
    if (userToken) {
      handleUserDetails(userToken);
    }
    if (user && user.role === "admin") {
      getServiceWorker();
    }
  }, [user.role]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const getServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      await navigator.serviceWorker.register("./serviceWorker.js");
    }
  };

  const subscribe = async () => {
    if ("serviceWorker" in navigator) {
      let sw = await navigator.serviceWorker.ready;
      try {
        let push = await sw.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.REACT_APP_SERVICE_WORKER_KEY,
        });
        updateUserEndPoint(JSON.stringify(push));
      } catch (e) {
        setNotifyChange(30000);
        toast.error(
          "Sorry I can't mentor you this way. Please make sure you enabled Notification for this site. Go to your Web Browser Setting and Operating System setting and enable the Notification."
        );
        navigate(`/${estore.slug}/admin/guide?videoid=853894520`);
      }
    }
  };

  const updateUserEndPoint = async (pushData) => {
    const endPoint =
      user.endPoint.length > 0 ? user.endPoint.map((point) => point) : [];
    endPoint.push(pushData);
    const values = { ...user, endPoint };

    userEndPoint(estore._id, values, user.token).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        dispatch(loginUser(res.data));
        toast.success(
          "Mentorship sealed. Thank you! I will let you know once I have a scheduled Live Mentorship Event. You should receive a notification from your device."
        );
      }
    });
  };

  const notifyUser = () => {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      toast.error("Browser does not support notifications");
    } else if (Notification.permission !== "granted") {
      toast.success(
        'Please find the "Allow" notification button somewhere in your web browser\'s address bar and click it.'
      );
      navigate(`/${estore.slug}/admin/guide?videoid=853894520`);
      subscribe();
    }
  };

  const checkNotification = () => {
    if ("Notification" in window && "serviceWorker" in navigator) {
      return Notification.permission;
    }
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
            path="/:slug/admin/setting"
            element={
              <AdminRoute>
                <AdminSetting setSlug={setSlug} estore={estore} />
              </AdminRoute>
            }
          />
          <Route
            exact
            path="/:slug/admin/upgrade"
            element={
              <AdminRoute>
                <Upgrade setSlug={setSlug} estore={estore} />
              </AdminRoute>
            }
          />
          <Route
            exact
            path="/:slug/admin/guide"
            element={
              <AdminRoute>
                <Guide setSlug={setSlug} estore={estore} />
              </AdminRoute>
            }
          />
          <Route
            exact
            path="/:slug/admin/training"
            element={
              <AdminRoute>
                <Training setSlug={setSlug} estore={estore} />
              </AdminRoute>
            }
          />
        </Routes>
      </Suspense>
      <TabBottom
        notifyUser={notifyUser}
        checkNotification={checkNotification}
        notifyChange={notifyChange}
      />
      <ToastContainer />
      <ChatComponent />
    </>
  );
};

export default App;
