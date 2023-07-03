import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AccountBookOutlined,
  PlusSquareOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import AdminNav from "../../../components/navigation/AdminNav";
import UploadImage from "../../../components/common/UploadImage";
import Alerts from "../../../components/common/Alerts";

import { getCategories } from "../../../functions/category";
import { uploadFileImage, addProduct } from "../../../functions/product";
import { storeCategories } from "../../../reducers/categorySlice";
import { estoreDet } from "../../../reducers/estoreSlice";
import { updateEstore } from "../../../functions/estore";

const CreateProduct = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const categories = useSelector((state) => state.categories);
  const estoreSet = useSelector((state) => state.estoreSet);

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Create Product | " + estoreSet.name;
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
    let result;
    let allUploadedFiles = [];

    setLoading(true);

    for (let i = 0; i < images.length; i++) {
      result = await uploadFileImage(images[i].url, estoreSet, user.token);
      allUploadedFiles.push(result.data);
    }

    addProduct(
      estoreSet._id,
      { ...values, images: allUploadedFiles },
      user.token
    ).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        toast.success("Product successfully created");
        navigate(`/${estoreSet.slug}/admin/products`);
        updateEstore(
          estoreSet._id,
          { productChange: parseInt(estoreSet.productChange) + 1 },
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

  const computeFinalPrice = () => {
    const values = form.getFieldValue();
    const supplierPrice = values.supplierPrice || 0;
    const markup = values.markup || 0;

    const multiplier = parseFloat(markup) / 100 + 1;
    const price = parseFloat(supplierPrice) * multiplier;

    form.setFieldsValue({ price: price.toFixed(2) });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-m-2">
          <AdminNav />
        </div>

        <div className="col-md-10 bg-white mt-3 mb-5">
          <h4 style={{ margin: "20px 0" }}>Product Create</h4>
          <hr />
          <Alerts />
          <br />
          <UploadImage images={images} setImages={setImages} />
          <br />
          <br />

          <Form
            form={form}
            name="normal_login"
            className="login-form"
            style={{ width: "100%" }}
            initialValues={{}}
            onFinish={onFinish}
          >
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input a Product Name",
                },
              ]}
            >
              <Input
                prefix={<AccountBookOutlined className="site-form-item-icon" />}
                placeholder="Product Name"
                disabled={loading}
              />
            </Form.Item>
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input Product Description!",
                },
              ]}
            >
              <Input
                prefix={
                  <UnorderedListOutlined className="site-form-item-icon" />
                }
                placeholder="Description"
                disabled={loading}
              />
            </Form.Item>
            <Form.Item
              name="supplierPrice"
              rules={[
                {
                  required: true,
                  message: "Please input the Supplier Price!",
                },
              ]}
            >
              <Input
                prefix={<PlusSquareOutlined className="site-form-item-icon" />}
                placeholder="Supplier Price"
                disabled={loading}
                onChange={() => computeFinalPrice()}
              />
            </Form.Item>
            <Form.Item
              name="markup"
              rules={[
                {
                  required: true,
                  message: "Please input the Mark-up!",
                },
              ]}
            >
              <Input
                prefix={<PlusSquareOutlined className="site-form-item-icon" />}
                placeholder="Mark-up (%)"
                disabled={loading}
                onChange={() => computeFinalPrice()}
              />
            </Form.Item>
            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input the Final Price!",
                },
              ]}
            >
              <Input
                prefix={<PlusSquareOutlined className="site-form-item-icon" />}
                placeholder="Final Price"
                disabled={loading}
              />
            </Form.Item>
            <Form.Item
              name="category"
              rules={[
                {
                  required: true,
                  message: "Please select a Category",
                },
              ]}
            >
              <Select
                options={categories.map((cat) => {
                  return { label: cat.name, value: cat._id };
                })}
                placeholder="Select Category"
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
                + Add Product
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
