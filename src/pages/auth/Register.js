import React, { useState, useEffect } from "react";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { createEstore } from "../../functions/estore";
import { getAllCountries } from "../../functions/auth";
import { estoreDet } from "../../reducers/estoreSlice";
import { loginUser } from "../../reducers/userSlice";
import { createNewUser } from "../../functions/user";

const Register = ({ from = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const refid = searchParams.get("refid");

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  const estoreSet = useSelector((state) => state.estoreSet);

  useEffect(() => {
    loadAllCountries();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadAllCountries = () => {
    getAllCountries().then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        setCountries(res.data);
      }
    });
  };

  const onFinish = (values) => {
    setLoading(false);
    if (estoreSet && estoreSet._id && from === "header") {
      handleCreateUser(estoreSet, { ...values, role: "customer" });
    } else {
      createEstore(values).then((res) => {
        if (res.data.err) {
          toast.error(res.data.err);
        } else {
          handleCreateUser(
            res.data,
            refid
              ? { ...values, role: "admin", refid }
              : { ...values, role: "admin" }
          );
          dispatch(estoreDet(res.data));
          localStorage.setItem("estore", JSON.stringify(res.data));
        }
        setLoading(false);
      });
    }
  };

  const handleCreateUser = (estore, values) => {
    createNewUser(estore._id, values).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        delete res.data.user.password;
        delete res.data.user.showPass;
        localStorage.setItem("userToken", res.data.token);
        dispatch(
          loginUser({
            ...res.data.user,
            token: res.data.token,
          })
        );
        navigate(`/${estore.slug}`);
      }
    });
  };

  return (
    <div className="not-found-container" style={{ marginTop: -80 }}>
      <div className="not-found-content">
        {estoreSet && estoreSet._id && from === "header" ? (
          <h3>Register</h3>
        ) : (
          <h3>Create A Store</h3>
        )}
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            name: "",
            owner: "",
            email: "",
            password: "",
            repassword: "",
          }}
          onFinish={onFinish}
        >
          {from !== "header" && (
            <Form.Item
              name="name"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your Store Name",
                  whitespace: true,
                },
                {
                  min: 3,
                  max: 40,
                  message: "Store Name must be 3 to 40 characters only",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Store Name"
                disabled={loading}
              />
            </Form.Item>
          )}
          <Form.Item
            name="owner"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your Full Name",
                whitespace: true,
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
            hasFeedback
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
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
              {
                min: 8,
                message: "Password must be at least 8 characters",
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
          <Form.Item
            name="repassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
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
              placeholder="Confirm Password"
              disabled={loading}
            />
          </Form.Item>
          {from !== "header" && (
            <Form.Item
              name="country"
              rules={[
                {
                  required: true,
                  message: "Please select a Country",
                },
              ]}
            >
              <Select
                options={countries.map((cou) => {
                  return { label: cou.name, value: cou._id };
                })}
                placeholder="Select Country"
              />
            </Form.Item>
          )}
          {refid && (
            <>
              <div>Referred by: {refid}</div>
              <br />
            </>
          )}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={loading}
            >
              Register
            </Button>
            <br />
            <br />
            {estoreSet && estoreSet._id && from === "header" ? (
              <>
                <Link to={`/${estoreSet.slug}/auth`}>Login now!</Link>
                <br />
                Or
                <br />
                <Link to="/?register=1">Create Your Own Store</Link>
              </>
            ) : (
              <>
                Or <Link to="/">Login now!</Link>
              </>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
