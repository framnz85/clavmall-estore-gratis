import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ApartmentOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";

import AdminNav from "../../../components/navigation/AdminNav";
import Alerts from "../../../components/common/Alerts";

import { getCategory, updateCategory } from "../../../functions/category";

const initialValues = {
  name: "",
};

const CategoryUpdate = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const { slug } = useParams();

  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  useEffect(() => {
    loadPayment();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadPayment = () => {
    getCategory(slug, estoreSet._id, user.token).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        form.setFieldsValue(res.data);
      }
    });
  };

  const onFinish = async (values) => {
    setLoading(true);
    updateCategory(slug, estoreSet._id, values, user.token).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        toast.success("Cateogry has been successfully updated");
        navigate(`/${estoreSet.lug}/admin/category`);
      }
      setLoading(false);
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-m-2">
          <AdminNav />
        </div>
        <div className="col-md-10 bg-white mt-3 mb-5">
          <h4 style={{ margin: "20px 0" }}>Category Update</h4>
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
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input a Category Name",
                },
              ]}
            >
              <Input
                prefix={<ApartmentOutlined className="site-form-item-icon" />}
                placeholder="Category Name"
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
                Update Category
              </Button>
              <Button
                type="default"
                className="login-form-button"
                style={{ width: 200, marginLeft: 10 }}
                onClick={() => navigate(`/${estoreSet.slug}/admin/category`)}
              >
                Back to Category
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

export default CategoryUpdate;
