import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import UserNav from "../../components/navigation/UserNav";
import DetailsTable from "../../components/user/DetailsTable";
import Alerts from "../../components/common/Alerts";

import { getUserOrder } from "../../functions/order";

const OrderDetails = () => {
  const { orderid } = useParams();

  const [order, setOrder] = useState({});

  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  useEffect(() => {
    loadUserOrder();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadUserOrder = () => {
    getUserOrder(estoreSet._id, orderid, user.token).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        setOrder(res.data);
        document.title =
          "Order Code " + res.data.orderCode + " | " + estoreSet.name;
      }
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-m-2">
          <UserNav />
        </div>

        <div className="col-md-10 bg-white mt-3 mb-5">
          <h4 style={{ margin: "20px 0" }}>Order Details</h4>

          <Alerts />

          <DetailsTable order={order} />

          {order.paymentOption && (
            <div className="alert alert-success">
              <h5>Here's the instructions on how to pay your order</h5>
              <p>{order.paymentOption.accDetails}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
