import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LockOutlined, BarcodeOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { toast } from "react-toastify";

import { forgotPassword } from "../../functions/user";

const ForgotModal = ({ email, isModalVisible, setIsModalVisible }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const estoreSet = useSelector((state) => state.estoreSet);

  const [code, setCode] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initCode = setVerifyCode();
    setCode(initCode);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpdateUser = (values) => {
    if (values.code === code.decrypt) {
      setLoading(true);
      forgotPassword(estoreSet._id, { ...values, email }).then((res) => {
        if (res.data.err) {
          toast.error(res.data.err);
        } else {
          toast.success(
            "You have successfully recovered your account. Login now using your new password!"
          );
          setIsModalVisible(false);
          if (estoreSet._id) {
            navigate(`/${estoreSet.slug}/auth`);
          } else {
            navigate("/");
          }
        }
        setLoading(false);
      });
    } else {
      toast.error(
        "Sorry, verification code is invalid. Please send a new verification code. "
      );
    }
  };

  const makeid = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  const setVerifyCode = () => {
    const myCipher = cipher("GUsAj3nEfhdtwttFbMEt0l00ZdXWWdRk");
    const code = makeid(8);
    return { decrypt: code, encrypt: myCipher(code) };
  };

  const cipher = (salt) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code) =>
      textToChars(salt).reduce((a, b) => a ^ b, code);

    return (text) =>
      text
        .split("")
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join("");
  };

  return (
    <Modal
      title="Verify Email"
      visible={isModalVisible}
      onOk={() => ""}
      closable={false}
      footer={null}
    >
      <Form
        form={form}
        name="update_account"
        className="login-form"
        style={{ width: "100%" }}
        initialValues={{}}
        onFinish={handleUpdateUser}
      >
        <Form.Item
          name="code"
          rules={[
            {
              required: true,
              message: "Please input your Verification Code!",
            },
          ]}
        >
          <Input
            prefix={<BarcodeOutlined className="site-form-item-icon" />}
            placeholder="Verification Code"
            disabled={loading}
          />
        </Form.Item>
        <Form.Item
          name="newpassword"
          rules={[
            {
              required: true,
              message: "Please input your New Password!",
            },
            {
              min: 8,
              message: "Password must be at least 8 characters",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="New Password"
            disabled={loading}
          />
        </Form.Item>
        <Form.Item
          name="repassword"
          dependencies={["newpassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your New Password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newpassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm New Password"
            disabled={loading}
          />
        </Form.Item>
        <div align="center">
          <a
            href={`../../verify2.html?email=${email}&cvc=${code.encrypt}`}
            target="_blank"
            rel="noreferrer"
          >
            Send Verification Code
          </a>
        </div>
        <br />
        <div align="center">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: 200 }}
              disabled={loading}
            >
              Submit Verification
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ForgotModal;
