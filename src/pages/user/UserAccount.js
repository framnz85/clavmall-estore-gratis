import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import UserNav from "../../components/navigation/UserNav";
import Alerts from "../../components/common/Alerts";
import VerifyEmail from "../../components/modal/VerifyEmail";

import { updateUserDetails, changePassword } from "../../functions/user";
import { loginUser, logoutUser } from "../../reducers/userSlice";
import { emptyCart } from "../../reducers/cartSlice";

const UserAccount = () => {
  const [form1, form2] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  document.title = "My Account | " + estoreSet.name;

  const handleUpdateUser = (values) => {
    setLoading(true);
    updateUserDetails(estoreSet._id, values, user.token).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        toast.success("Your information was successfully updated!");
        dispatch(loginUser(res.data));
        if (user.email !== res.data.email) {
          localStorage.clear();
          dispatch(logoutUser());
          dispatch(emptyCart());
          localStorage.removeItem("cart");
          navigate(`/${estoreSet.slug}/auth`);
        }
      }
      setLoading(false);
    });
  };

  const handleChangePassword = (values) => {
    changePassword(estoreSet._id, values, user.token).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        toast.success("Password has been successfully updated!");
      }
      setLoading(false);
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-m-2">
          <UserNav />
        </div>

        <div className="col-md-10 bg-white mt-3 mb-5">
          <h4 style={{ margin: "20px 0" }}>Account Details</h4>

          <Alerts />

          <Form
            form={form1}
            name="update_account"
            className="login-form"
            style={{ width: "100%" }}
            initialValues={user}
            onFinish={handleUpdateUser}
          >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your Full Name!",
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
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email Address!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email Address"
                disabled={loading}
              />
            </Form.Item>
            {!user.emailConfirm && (
              <Button
                type="danger"
                className="login-form-button mb-3"
                style={{ width: 200 }}
                onClick={() => setIsModalVisible(true)}
                disabled={loading}
              >
                Verify Email
              </Button>
            )}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: 200 }}
                disabled={loading}
              >
                Update Account
              </Button>
            </Form.Item>
          </Form>

          <h4 style={{ margin: "20px 0" }}>Change Password</h4>

          <Form
            form={form2}
            name="update_password"
            className="login-form"
            style={{ width: "100%" }}
            initialValues={{}}
            onFinish={handleChangePassword}
          >
            <Form.Item
              name="oldpassword"
              rules={[
                {
                  required: true,
                  message: "Please input your Old Password!",
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
                placeholder="Old Password"
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
                      new Error(
                        "The new password that you entered do not match!"
                      )
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
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: 200 }}
                disabled={loading}
              >
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <VerifyEmail
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </div>
  );
};

export default UserAccount;
