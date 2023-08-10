import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined, BarcodeOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { updateUserDetails, verifyUserEmail } from "../../functions/user";
import { loginUser } from "../../reducers/userSlice";

const VerifyEmail = ({ isModalVisible, setIsModalVisible }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  const [loading, setLoading] = useState(false);

  const handleUpdateUser = (values) => {
    verifyUserEmail(estoreSet._id, values, user.token).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        toast.success("You have successfully verified your account");
        dispatch(loginUser(res.data));
        setIsModalVisible(false);
        navigate(`/${estoreSet.slug}/admin/training`);
      }
    });
  };

  const sendVerification = () => {
    const code = setVerifyCode();

    updateUserDetails(
      estoreSet._id,
      { verifyCode: code.decrypt },
      user.token
    ).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        const names = user && user.name ? user.name.split(" ") : "";
        window.open(
          `../../verify.html?email=${user.email}&name=${
            names[0] ? names[0] : ""
          }&cvc=${code.encrypt}`,
          "_blank"
        );
      }
      setLoading(false);
    });
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
      onCancel={() => setIsModalVisible(false)}
      footer={null}
    >
      <Form
        form={form}
        name="update_account"
        className="login-form"
        style={{ width: "100%" }}
        initialValues={user}
        onFinish={handleUpdateUser}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email Address!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email Address"
            disabled={true}
          />
        </Form.Item>
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
        <div
          align="center"
          onClick={sendVerification}
          style={{ cursor: "pointer", color: "#0E86D4" }}
        >
          Send Verification Code
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

export default VerifyEmail;
