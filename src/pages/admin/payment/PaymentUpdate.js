import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UserOutlined, BankOutlined, NumberOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";

import AdminNav from "../../../components/navigation/AdminNav";
import Alerts from "../../../components/common/Alerts";

import { getPayment, updatePayment } from "../../../functions/payment";

const { TextArea } = Input;

const initialValues = {
  bankName: "",
  accName: "",
  accNumber: "",
  accDetails: "",
};

const PaymentCreate = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const { payid } = useParams();

  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  useEffect(() => {
    loadPayment();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadPayment = () => {
    getPayment(payid, estoreSet._id, user.token).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        form.setFieldsValue(res.data);
      }
    });
  };

  const onFinish = async (values) => {
    setLoading(true);
    updatePayment(payid, estoreSet._id, values, user.token).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        toast.success("Payment has been successfully updated");
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
          <h4 style={{ margin: "20px 0" }}>Payment Update</h4>
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
                Update Payment
              </Button>
              <Button
                type="default"
                className="login-form-button"
                style={{ width: 200, marginLeft: 10 }}
                onClick={() => navigate(`/${estoreSet.slug}/admin/payment`)}
              >
                Back to Payment
              </Button>
            </Form.Item>
          </Form>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default PaymentCreate;
