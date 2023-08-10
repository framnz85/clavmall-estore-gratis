import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined, BankOutlined, NumberOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";

import AdminNav from "../../../components/navigation/AdminNav";
import PaymentList from "../../../components/admin/PaymentList";
import Alerts from "../../../components/common/Alerts";
import Limits from "../../../components/common/Limits";

import { getPayments, addPayment } from "../../../functions/payment";
import { storePayments, addStorePayment } from "../../../reducers/paymentSlice";
import { updateEstore } from "../../../functions/estore";
import { estoreDet } from "../../../reducers/estoreSlice";

const { TextArea } = Input;

const initialValues = {
  bankName: "",
  accName: "",
  accNumber: "",
  accDetails: "",
};

const PaymentCreate = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const payments = useSelector((state) => state.payments);
  const estoreSet = useSelector((state) => state.estoreSet);

  useEffect(() => {
    document.title = "Payments | " + estoreSet.name;
    loadPayments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadPayments = () => {
    if (localStorage.getItem("payments")) {
      dispatch(storePayments(JSON.parse(localStorage.getItem("payments"))));
    } else {
      setLoading(true);
      getPayments(estoreSet._id, user.token).then((res) => {
        if (res.data.err) {
          toast.error(res.data.err);
        } else {
          dispatch(storePayments(res.data));
          localStorage.setItem("payments", JSON.stringify(res.data));
        }
        setLoading(false);
      });
    }
  };

  const onFinish = async (values) => {
    if (user && user.role === "admin" && user.emailConfirm) {
      setLoading(true);
      addPayment(estoreSet._id, values, user.token).then((res) => {
        if (res.data.err) {
          toast.error(res.data.err);
        } else {
          dispatch(addStorePayment(res.data));
          localStorage.setItem(
            "payments",
            JSON.stringify([...payments, res.data])
          );
          form.setFieldsValue(initialValues);
          updateEstore(
            estoreSet._id,
            { paymentChange: parseInt(estoreSet.paymentChange) + 1 },
            user.token
          ).then((res) => {
            if (res.data.err) {
              toast.error(res.data.err);
            } else {
              dispatch(estoreDet(res.data));
              localStorage.setItem("estore", JSON.stringify(res.data));
            }
          });
        }
        setLoading(false);
      });
    } else {
      toast.error(
        "Sorry, you can only add payment options once you verified your email address"
      );
    }
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

          <PaymentList />

          {payments.length > 0 && <Limits type="payment" />}
        </div>
      </div>
    </div>
  );
};

export default PaymentCreate;
