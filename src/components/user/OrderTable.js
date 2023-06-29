import React from "react";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { Popconfirm } from "antd";
import { toast } from "react-toastify";
import {
  UnorderedListOutlined,
  LoadingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { isMobile } from "react-device-detect";

import TableHeader from "../common/TableHeader";
import TableBody from "../common/TableBody";

import { deleteOrder } from "../../functions/order";

const OrderTable = ({ orders, setOrders, loading }) => {
  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  const handleDelete = (order) => {
    deleteOrder(estoreSet._id, order._id, user.token).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        setOrders(orders.filter((ord) => ord._id !== order._id));
        toast.error(`Order Code ${order.orderCode} was successfully deleted`);
      }
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

  const columns = [
    {
      key: "createdAt",
      path: "createdAt",
      label: "Date Created",
      content: (order) => new Date(order.createdAt).toLocaleDateString(),
    },
    {
      key: "_id",
      path: "_id",
      label: "Order Code",
      content: (order) => order.orderCode,
    },
    {
      key: "orderedBy.name",
      path: "orderedBy.name",
      label: "Ordered By",
      content: (order) => order.orderedBy && order.orderedBy.name,
    },
    {
      key: "grandTotal",
      path: "grandTotal",
      label: "Grand Total",
      content: (order) => (
        <NumberFormat
          value={(order.cartTotal + order.delfee).toFixed(2)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₱"}
        />
      ),
    },
    {
      key: "orderStatus",
      path: "orderStatus",
      label: "Status",
      content: (order) =>
        order && order.orderStatus ? (
          <span
            style={{
              color: statusColor.find((s) => s.status === order.orderStatus)
                .color,
            }}
          >
            {order.orderStatus}
          </span>
        ) : (
          ""
        ),
    },
    {
      key: "paymentOption",
      path: "paymentOption",
      label: "Payment",
      content: (order) => order.paymentOption && order.paymentOption.bankName,
    },
    {
      key: "action",
      content: (order) => {
        return (
          <div
            align="left"
            style={{
              width: isMobile ? "100%" : 40,
              fontSize: isMobile ? 20 : 14,
            }}
          >
            <Link to={`/${estoreSet.slug}/user/order/${order._id}`}>
              <UnorderedListOutlined />
            </Link>
            {(order.orderStatus === "Not Processed" ||
              order.orderStatus === "Cancelled") && (
              <Popconfirm
                title="Delete this order?"
                description="Are you sure to delete this order?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => handleDelete(order)}
              >
                <DeleteOutlined style={{ color: "red", marginLeft: 5 }} />
              </Popconfirm>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {loading && (
        <div align="center">
          <LoadingOutlined />
          <br />
        </div>
      )}
      <table className="table">
        <TableHeader columns={columns} />
        <TableBody columns={columns} data={orders} />
      </table>
    </div>
  );
};

export default OrderTable;
