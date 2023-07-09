import React, { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player/vimeo";

import { getUserToken } from "../../functions/auth";
import { getUserDetails } from "../../functions/user";
import { loginUser } from "../../reducers/userSlice";
import { estoreDet } from "../../reducers/estoreSlice";

const Login = ({ from = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const estoreSet = useSelector((state) => state.estoreSet);

  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    getUserToken(estoreSet._id, values).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        handleUserDetails(res.data);
      }
      setLoading(false);
    });
  };

  const handleUserDetails = (token) => {
    getUserDetails(estoreSet._id, token).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        localStorage.setItem("userToken", token);
        dispatch(
          loginUser({
            ...res.data,
            token,
          })
        );
        if (res.data && res.data.estoreid) {
          localStorage.setItem("estore", JSON.stringify(res.data.estoreid));
          dispatch(estoreDet(res.data.estoreid));
          if (from === "header") {
            navigate(`/${estoreSet.slug}`);
          }
        }
      }
    });
  };
  return (
    <div className="not-found-container" style={{ marginTop: -80 }}>
      {estoreSet && estoreSet._id && from !== "header" && (
        <div
          className="not-found-content"
          style={{
            marginRight: 15,
            border: "1px solid #dedede",
            padding: "21px",
          }}
        >
          <ReactPlayer
            url={`https://vimeo.com/841616427`}
            width="650px"
            controls={true}
          />
        </div>
      )}
      <div className="not-found-content">
        {estoreSet && estoreSet._id && from === "header" ? (
          <h3>Login</h3>
        ) : (
          <h3>Login To Admin</h3>
        )}
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            email: "",
            password: "",
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your valid Email Address!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email Address"
              disabled={loading}
            />
          </Form.Item>
          <Form.Item
            name="password"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              disabled={loading}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              className="login-form-remember"
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            {estoreSet && estoreSet._id && from === "header" ? (
              <Link
                className="login-form-forgot"
                to={`/${estoreSet.slug}/auth/?forgot=1`}
              >
                Forgot password
              </Link>
            ) : (
              <Link className="login-form-forgot" to="/?forgot=1">
                Forgot password
              </Link>
            )}
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={loading}
            >
              Log in
            </Button>
            <br />
            <br />
            {estoreSet && estoreSet._id && from === "header" ? (
              <>
                <Link to={`/${estoreSet.slug}/auth/?register=1`}>
                  Register An Account
                </Link>
                <br />
                Or
                <br />
                <Link to="/?register=1">Create Your Own Store</Link>
              </>
            ) : (
              <>
                Or <Link to="/?register=1">Create Your Own Store NOW!</Link>
              </>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
