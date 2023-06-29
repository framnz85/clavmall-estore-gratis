import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { getPayments } from "../../functions/payment";
import { saveCartOrder } from "../../functions/order";
import { emptyCart } from "../../reducers/cartSlice";

const { TextArea } = Input;

const CheckoutDetails = ({ delivery }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  useEffect(() => {
    form.setFieldsValue({ fullName: user.name });
    loadPayments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadPayments = () => {
    setLoading(true);
    getPayments(estoreSet._id, user.token).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        setPayments(res.data);
      }
      setLoading(false);
    });
  };

  const onFinish = (values) => {
    saveCartOrder(
      estoreSet._id,
      { ...values, delfee: delivery.delfee },
      user.token
    ).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        dispatch(emptyCart());
        localStorage.removeItem("cart");
        navigate(`/${estoreSet.slug}/user/order/${res.data._id}`);
      }
    });
  };

  return (
    <>
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        style={{ width: "100%" }}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Form.Item
          name="fullName"
          rules={[
            {
              required: true,
              message: "Please input your name",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Full Name"
            disabled={loading}
          />
        </Form.Item>
        <Form.Item
          name="delAddress"
          rules={[
            {
              required: true,
              message: "Please input your Delivery Address",
            },
          ]}
        >
          <TextArea rows={4} placeholder="Delivery Address" />
        </Form.Item>
        <Form.Item
          name="paymentOption"
          rules={[
            {
              required: true,
              message: "Please select a Payment Option",
            },
          ]}
        >
          <Select
            options={payments.map((pay) => {
              return { label: pay.bankName, value: pay._id };
            })}
            placeholder="Select Payment"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="login-form-button"
            style={{ width: 200 }}
            disabled={loading}
          >
            Checkout Order
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CheckoutDetails;
