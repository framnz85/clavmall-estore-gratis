import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import AdminNav from "../../../components/navigation/AdminNav";
import OrderTable from "../../../components/admin/OrderTable";
import Alerts from "../../../components/common/Alerts";

import { getAdminOrders } from "../../../functions/order";
import { storeOrders } from "../../../reducers/orderSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  useEffect(() => {
    document.title = "Orders | " + estoreSet.name;
    loadAdminOrders();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadAdminOrders = () => {
    if (localStorage.getItem("orders")) {
      dispatch(storeOrders(JSON.parse(localStorage.getItem("orders"))));
      execAdminOrders();
    } else {
      setLoading(true);
      execAdminOrders();
    }
  };

  const execAdminOrders = () => {
    getAdminOrders(estoreSet._id, user.token).then((res) => {
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
          <AdminNav />
        </div>

        <div className="col-md-10 bg-white mt-3 mb-5">
          <h4 style={{ margin: "20px 0" }}>Dashboard</h4>

          <Alerts />

          <OrderTable loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
