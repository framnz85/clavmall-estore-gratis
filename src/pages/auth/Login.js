import React, { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player/vimeo";
import { isMobile } from "react-device-detect";

import { getUserToken } from "../../functions/auth";
import { getUserDetails } from "../../functions/user";
import { loginUser } from "../../reducers/userSlice";
import { estoreDet } from "../../reducers/estoreSlice";

const Login = ({ from = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const refid = searchParams.get("refid");

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
    <>
      <div
        className="not-found-container"
        style={{ marginTop: isMobile ? (from === "header" ? -30 : 80) : -80 }}
      >
        {!isMobile && from !== "header" && (
          <div
            className="not-found-content"
            style={{
              marginRight: 15,
              border: "1px solid #dedede",
              padding: "21px",
            }}
          >
            <div
              align="center"
              style={{
                color: "#880808",
                fontSize: 24,
                width: 650,
                marginBottom: 10,
              }}
            >
              "Transform Your Mini or Sari-sari Store Into Online
              <br />
              w/ A Free AI Powered Ecommerce Platform"
            </div>
            <ReactPlayer
              url={`https://vimeo.com/844215746`}
              playing={true}
              width="650px"
              controls={true}
            />
            <Button
              type="primary"
              className="login-form-button"
              style={{
                marginTop: 30,
                marginLeft: 3,
                width: 640,
                fontSize: 20,
                height: 50,
              }}
              onClick={() =>
                navigate(
                  `/?register=1${
                    refid && refid !== null ? "&refid=" + refid : ""
                  }`
                )
              }
            >
              Register Here. FREE for Life!
            </Button>
          </div>
        )}
        <div
          className="not-found-content"
          style={{ height: isMobile ? "auto" : 565, width: 340 }}
        >
          {estoreSet && estoreSet._id && from === "header" ? (
            <>
              <h3>Login</h3>
              <br />
              <br />
            </>
          ) : (
            <>
              {isMobile && (
                <>
                  <div
                    align="center"
                    style={{
                      color: "#880808",
                      fontSize: 12,
                      width: 280,
                      marginBottom: 10,
                    }}
                  >
                    "Transform Your Mini or Sari-sari Store Into Online
                    <br />
                    w/ A Free AI Powered Ecommerce Platform"
                  </div>
                  <ReactPlayer
                    url={`https://vimeo.com/844215746`}
                    playing={true}
                    width="280px"
                    height="180px"
                    controls={true}
                  />
                  <br />
                  <Button
                    type="primary"
                    className="login-form-button"
                    style={{
                      width: 280,
                      fontSize: 20,
                      height: 50,
                    }}
                    onClick={() =>
                      navigate(
                        `/?register=1${
                          refid && refid !== null ? "&refid=" + refid : ""
                        }`
                      )
                    }
                  >
                    Register Here. FREE for Life!
                  </Button>
                  <br />
                  <br />
                </>
              )}
              <h5>or Login to Admin below</h5>
              <br />
            </>
          )}
          <Form
            name="normal_login"
            style={{
              width: isMobile ? (from === "header" ? 280 : "100%") : 280,
              padding: "0 10px",
            }}
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
                  <Link
                    to={`/?register=1${
                      refid && refid !== null ? "&refid=" + refid : ""
                    }`}
                  >
                    Create Your Own Store
                  </Link>
                </>
              ) : (
                <>
                  <br />
                  Or{" "}
                  <Link
                    to={`/?register=1${
                      refid && refid !== null ? "&refid=" + refid : ""
                    }`}
                  >
                    Create Your Own Store NOW!
                  </Link>
                </>
              )}
            </Form.Item>
          </Form>
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default Login;
