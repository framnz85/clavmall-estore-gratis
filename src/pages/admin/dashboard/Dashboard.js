import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import AdminNav from "../../../components/navigation/AdminNav";
import OrderTable from "../../../components/admin/OrderTable";
import Alerts from "../../../components/common/Alerts";

import { getAdminOrders } from "../../../functions/order";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  useEffect(() => {
    document.title = "My Orders | " + estoreSet.name;
    loadAdminOrders();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadAdminOrders = () => {
    setLoading(true);
    getAdminOrders(estoreSet._id, user.token).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        setOrders(res.data);
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

          <OrderTable orders={orders} setOrders={setOrders} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
