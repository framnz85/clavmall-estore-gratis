import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ApartmentOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";

import AdminNav from "../../../components/navigation/AdminNav";
import Alerts from "../../../components/common/Alerts";

import { getCategory, updateCategory } from "../../../functions/category";
import { updateStoreCategory } from "../../../reducers/categorySlice";
import { updateEstore } from "../../../functions/estore";
import { estoreDet } from "../../../reducers/estoreSlice";

const initialValues = {
  name: "",
};

const CategoryUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const { slug } = useParams();

  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const categories = useSelector((state) => state.categories);
  const estoreSet = useSelector((state) => state.estoreSet);

  useEffect(() => {
    loadCategory();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadCategory = () => {
    const checkCategory = categories.find((cat) => cat.slug === slug);
    if (checkCategory) {
      form.setFieldsValue(checkCategory);
    } else {
      getCategory(slug, estoreSet._id, user.token).then((res) => {
        if (res.data.err) {
          toast.error(res.data.err);
        } else {
          form.setFieldsValue(res.data);
        }
      });
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    updateCategory(slug, estoreSet._id, values, user.token).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        const updatedCategories = categories.map((cat) => {
          if (cat.slug === slug) {
            return res.data;
          } else {
            return cat;
          }
        });
        dispatch(updateStoreCategory(updatedCategories));
        localStorage.setItem("categories", JSON.stringify(updatedCategories));
        toast.success("Category has been successfully updated");
        navigate(`/${estoreSet.lug}/admin/category`);
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
