import React, { useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import ForgotModal from "../../components/modal/ForgotModal";

import { checkEmailExist } from "../../functions/auth";

const Forgot = () => {
  const estoreSet = useSelector((state) => state.estoreSet);

  const [email, setEmail] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    checkEmailExist(estoreSet._id, values).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        if (res.data.ok) {
          setEmail(values.email);
          setIsModalVisible(true);
        }
      }
      setLoading(false);
    });
  };
  return (
    <>
      <div className="not-found-container" style={{ marginTop: -80 }}>
        <div className="not-found-content">
          <h3>Forgot Password</h3>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              email: "",
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your existing Email Address!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email Address"
                disabled={loading}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                disabled={loading}
              >
                Proceed
              </Button>
            </Form.Item>
          </Form>
        </div>
        <ForgotModal
          email={email}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </div>
    </>
  );
};

export default Forgot;
