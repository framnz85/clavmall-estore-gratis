import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import UserNav from "../../components/navigation/UserNav";
import OrderTable from "../../components/user/OrderTable";
import Alerts from "../../components/common/Alerts";

import { getUserOrders } from "../../functions/order";
import { storeOrders, addMyOrders } from "../../reducers/orderSlice";

const UserOrder = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  useEffect(() => {
    document.title = "My Orders | " + estoreSet.name;
    loadUserOrders();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadUserOrders = () => {
    if (localStorage.getItem("orders")) {
      const localOrders = JSON.parse(localStorage.getItem("orders"));
      const myOrders = localOrders.filter(
        (ord) => ord.orderedBy._id === user._id
      );
      dispatch(addMyOrders(myOrders));
      execUserOrders();
    } else {
      setLoading(true);
      execUserOrders();
    }
  };

  const execUserOrders = () => {
    getUserOrders(estoreSet._id, user.token).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        dispatch(storeOrders(res.data));
        localStorage.setItem("orders", JSON.stringify(res.data));
      }
      setLoading(false);
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-m-2">
          <UserNav />
        </div>

        <div className="col-md-10 bg-white mt-3 mb-5">
          <h4 style={{ margin: "20px 0" }}>Your Orders</h4>

          <Alerts />

          <OrderTable loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default UserOrder;
