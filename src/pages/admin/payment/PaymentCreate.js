import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { UserOutlined, BankOutlined, NumberOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";

import AdminNav from "../../../components/navigation/AdminNav";
import PaymentList from "../../../components/admin/PaymentList";
import Alerts from "../../../components/common/Alerts";

import { getPayments, addPayment } from "../../../functions/payment";

const { TextArea } = Input;

const initialValues = {
  bankName: "",
  accName: "",
  accNumber: "",
  accDetails: "",
};

const PaymentCreate = () => {
  const [form] = Form.useForm();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  useEffect(() => {
    loadPayments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadPayments = () => {
    getPayments(estoreSet._id, user.token).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        setPayments(res.data);
      }
    });
  };

  const onFinish = async (values) => {
    setLoading(true);
    addPayment(estoreSet._id, values, user.token).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        form.setFieldsValue(initialValues);
        setPayments([...payments, res.data]);
        setLoading(false);
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
          <h4 style={{ margin: "20px 0" }}>Payment</h4>
          <hr />

          <Alerts />

          <Form
            form={form}
            name="normal_login"
            className="login-form"
            style={{ width: "100%" }}
            initialValues={initialValues}
            onFinish={onFinish}
          >
            <Form.Item
              name="bankName"
              rules={[
                {
                  required: true,
                  message: "Please input a Bank Name",
                },
              ]}
            >
              <Input
                prefix={<BankOutlined className="site-form-item-icon" />}
                placeholder="Bank Name"
                disabled={loading}
              />
            </Form.Item>
            <Form.Item
              name="accName"
              rules={[
                {
                  required: true,
                  message: "Please input your Account Name!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Account Name"
                disabled={loading}
              />
            </Form.Item>
            <Form.Item
              name="accNumber"
              rules={[
                {
                  required: true,
                  message: "Please input your Account Number!",
                },
              ]}
            >
              <Input
                prefix={<NumberOutlined className="site-form-item-icon" />}
                placeholder="Account Number"
                disabled={loading}
              />
            </Form.Item>
            <Form.Item
              name="accDetails"
              rules={[
                {
                  required: true,
                  message: "Please input your Account Details!",
                },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Account Details"
                disabled={loading}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: 200 }}
                disabled={loading}
              >
                + Add Payment
              </Button>
            </Form.Item>
          </Form>

          <h4 style={{ margin: "20px 0" }}>My Payments</h4>
          <hr />

          <PaymentList payments={payments} setPayments={setPayments} />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default PaymentCreate;
