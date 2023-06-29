import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { toast } from "react-toastify";

import TableHeader from "../common/TableHeader";
import TableBody from "../common/TableBody";

import { deletePayment } from "../../functions/payment";

const PaymentList = ({ payments, setPayments }) => {
  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  const columns = [
    {
      key: "bankName",
      path: "bankName",
      label: "Bank Name",
      content: (payment) => payment.bankName,
    },
    {
      key: "accName",
      path: "accName",
      label: "Account Name",
      content: (payment) => payment.accName,
    },
    {
      key: "accNumber",
      path: "accNumber",
      label: "Account Number",
      content: (payment) => payment.accNumber,
    },
    {
      key: "accDetails",
      path: "accDetails",
      label: "Account Details",
      content: (payment) => payment.accDetails,
    },
    {
      key: "action",
      content: (payment) => {
        return (
          <div style={{ width: 50 }}>
            <Link to={`/${estoreSet.slug}/admin/payment/${payment._id}`}>
              <EditOutlined className="text-secondary mr-2" />
            </Link>
            <Popconfirm
              title="Delete this payment?"
              description="Are you sure to delete this payment?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleDelete(payment)}
            >
              <DeleteOutlined style={{ color: "red" }} />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const handleDelete = (payment) => {
    deletePayment(payment._id, estoreSet._id, user.token).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        toast.error(`${payment.bankName} has been deleted`);
        setPayments(payments.filter((pay) => pay._id !== payment._id));
      }
    });
  };

  return (
    <div>
      <table className="table">
        <TableHeader columns={columns} />
        <TableBody columns={columns} data={payments} />
      </table>
      <br />
    </div>
  );
};

export default PaymentList;
