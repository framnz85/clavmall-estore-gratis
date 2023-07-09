import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApartmentOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";

import AdminNav from "../../../components/navigation/AdminNav";
import CategoryList from "../../../components/admin/CategoryList";
import Alerts from "../../../components/common/Alerts";
import Limits from "../../../components/common/Limits";

import { getCategories, addCategory } from "../../../functions/category";
import {
  storeCategories,
  addStoreCategory,
} from "../../../reducers/categorySlice";
import { updateEstore } from "../../../functions/estore";
import { estoreDet } from "../../../reducers/estoreSlice";

const initialValues = {
  name: "",
};

const CategoryCreate = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const categories = useSelector((state) => state.categories);
  const estoreSet = useSelector((state) => state.estoreSet);

  useEffect(() => {
    document.title = "Categories | " + estoreSet.name;
    loadCategories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadCategories = () => {
    if (localStorage.getItem("categories")) {
      dispatch(storeCategories(JSON.parse(localStorage.getItem("categories"))));
    } else {
      setLoading(true);
      getCategories(estoreSet._id).then((res) => {
        if (res.data.err) {
          toast.error(res.data.err);
        } else {
          dispatch(storeCategories(res.data));
          localStorage.setItem("categories", JSON.stringify(res.data));
        }
        setLoading(false);
      });
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    addCategory(estoreSet._id, values, user.token).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        dispatch(addStoreCategory(res.data));
        localStorage.setItem(
          "categories",
          JSON.stringify([...categories, res.data])
        );
        form.setFieldsValue(initialValues);
        updateEstore(
          estoreSet._id,
          { categoryChange: parseInt(estoreSet.categoryChange) + 1 },
          user.token
        ).then((res) => {
          if (res.data.err) {
            toast.error(res.data.err);
          } else {
            dispatch(estoreDet(res.data));
            localStorage.setItem("estore", JSON.stringify(res.data));
          }
        });
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

          <CategoryList />

          {categories.length > 0 && <Limits type="category" />}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
