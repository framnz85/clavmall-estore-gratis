import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import { toast } from "react-toastify";

import InputSelect from "../common/InputSelect";
import { changeOrderStatus } from "../../functions/order";

const OrderModal = ({ order, setOrder, isModalVisible, setIsModalVisible }) => {
  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus(order.orderStatus);
  }, [order.orderStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleStatusSubmit = () => {
    changeOrderStatus(
      estoreSet._id,
      {
        orderid: order._id,
        orderStatus: status,
        orderedBy: order.orderedBy._id,
      },
      user.token
    ).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        toast.success("Status for this order has been successfully updated!");
        setOrder({
          ...order,
          orderStatus: status,
        });
      }
      setIsModalVisible(false);
    });
  };

  const statusColor = [
    { status: "Not Processed", color: "darkred" },
    { status: "Waiting Payment", color: "red" },
    { status: "Processing", color: "blue" },
    { status: "Delivering", color: "darkorange" },
    { status: "Cancelled", color: "" },
    { status: "Completed", color: "green" },
  ];

  return (
    <Modal
      title="Change Status"
      visible={isModalVisible}
      onOk={handleStatusSubmit}
      onCancel={() => setIsModalVisible(false)}
      okText="Change"
    >
      <InputSelect
        inputProperty={{
          label: "Select Status",
          value: status,
          onChange: handleChangeStatus,
          options:
            order.orderStatus === "Completed"
              ? [{ key: "Completed", value: "Completed", text: "Completed" }]
              : statusColor.map((stat) => {
                  return {
                    ...stat,
                    key: stat.status,
                    value: stat.status,
                    text: stat.status,
                  };
                }),
          show: true,
        }}
      />
    </Modal>
  );
};

export default OrderModal;
