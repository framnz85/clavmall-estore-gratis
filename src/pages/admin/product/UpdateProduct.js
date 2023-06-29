import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  AccountBookOutlined,
  PlusSquareOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import AdminNav from "../../../components/navigation/AdminNav";
import UploadImage from "../../../components/common/UploadImage";
import Alerts from "../../../components/common/Alerts";

import { getCategories } from "../../../functions/category";
import {
  getSingleProduct,
  handleProductUpdate,
} from "../../../functions/product";

const UpdateProduct = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { slug } = useParams();

  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  const [categories, setCategories] = useState([]);
  const [prodid, setProdid] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
    loadProduct();
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

  const loadProduct = () => {
    getSingleProduct(estoreSet._id, slug).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        form.setFieldsValue({
          title: res.data[0].title,
          description: res.data[0].description,
          supplierPrice: res.data[0].supplierPrice,
          markup: res.data[0].markup,
          price: res.data[0].price,
          category: res.data[0].category._id,
        });
        setImages(res.data[0].images);
        setProdid(res.data[0]._id);
      }
      setLoading(false);
    });
  };

  const onFinish = async (values) => {
    setLoading(true);
    handleProductUpdate(
      estoreSet._id,
      prodid,
      { ...values, images },
      user.token
    ).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        toast.success("Product successfully updated");
        navigate(`/${estoreSet.slug}/admin/products`);
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
          <h4 style={{ margin: "20px 0" }}>Product Update</h4>
          <hr />

          <Alerts />
          <br />
          <UploadImage
            images={images}
            setImages={setImages}
            edit={true}
            prodid={prodid}
          />
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
                Update Product
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
