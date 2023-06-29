import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "antd";

import AdminNav from "../../../components/navigation/AdminNav";
import DetailsTable from "../../../components/admin/DetailsTable";
import OrderModal from "../../../components/modal/OrderModal";
import Alerts from "../../../components/common/Alerts";

import { getUserOrder } from "../../../functions/order";

const OrderDetails = () => {
  const { orderid } = useParams();

  const [order, setOrder] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

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
          <AdminNav />
        </div>

        <div className="col-md-10 bg-white mt-3 mb-5">
          <h4 style={{ margin: "20px 0" }}>Order Details</h4>

          <Alerts />

          <DetailsTable order={order} />
          <Button
            className="btn btn-sm btn-block btn-outline-primary"
            onClick={() => setIsModalVisible(true)}
            id="non-printable"
            style={{ marginTop: 3 }}
          >
            Update Status
          </Button>
          <br />
          <OrderModal
            order={order}
            setOrder={setOrder}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
