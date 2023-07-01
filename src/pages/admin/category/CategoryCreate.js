import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ApartmentOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import AdminNav from "../../../components/navigation/AdminNav";
import CategoryList from "../../../components/admin/CategoryList";
import Alerts from "../../../components/common/Alerts";

import { getCategories, addCategory } from "../../../functions/category";

const initialValues = {
  name: "",
};

const CategoryCreate = () => {
  const [form] = Form.useForm();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  useEffect(() => {
    loadCategories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadCategories = () => {
    setLoading(true);
    getCategories(estoreSet._id).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        setCategories(res.data);
      }
      setLoading(false);
    });
  };

  const onFinish = async (values) => {
    setLoading(true);
    addCategory(estoreSet._id, values, user.token).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        form.setFieldsValue(initialValues);
        setCategories([...categories, res.data]);
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
          <h4 style={{ margin: "20px 0" }}>Category</h4>
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
                + Add Category
              </Button>
            </Form.Item>
          </Form>

          <h4 style={{ margin: "20px 0" }}>My Categories</h4>
          <hr />

          <CategoryList categories={categories} setCategories={setCategories} />

          {categories.length > 0 && (
            <div style={{ marginBottom: 50 }}>
              You can only upload a maximum of {estoreSet.categoryLimit}{" "}
              categories for this account,{" "}
              <Link to={`/${estoreSet.slug}/admin/upgrade`}>
                Increase Limit NOW
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
