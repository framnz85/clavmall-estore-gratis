import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Tooltip, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import ImagesShow from "../common/ImagesShow";
import ProductListItems from "./ProductListItems";
import AddToCart from "../modal/AddToCart";
import BuyButton from "../navigation/BuyButton";

import { storeToCart } from "../../reducers/cartSlice";
import { updateCart } from "../../functions/order";

const SingleProduct = ({ product }) => {
  const { _id, images, title } = product;
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  const [addToCart, setAddToCart] = useState(false);

  const handleAddToCart = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    const existProduct = cart.filter((product) => product._id === _id);
    if (existProduct[0]) {
      cart = cart.map((product) =>
        product._id === _id
          ? { ...product, count: parseFloat(product.count) + 1 }
          : product
      );
    } else {
      cart.push({
        ...product,
        count: 1,
      });
    }
    if (user._id) {
      dispatch(storeToCart(cart));
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart(estoreSet._id, cart, user.token);
    } else {
      dispatch(storeToCart(cart));
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    setAddToCart(true);
  };

  return (
    <>
      <div className="col-md-6">
        <ImagesShow imgArray={images} prodName={title} />
      </div>
      <div className="col-md-6">
        <h3 className="pt-3 pl-3 m-0">{title}</h3>
        <Card>
          <ProductListItems product={product} />

          <Tooltip title={"Click to add"}>
            {product.quantity < 1 ? (
              <div
                align="center"
                style={{
                  width: "100%",
                  border: "1px solid #999",
                  padding: "5px",
                  color: "#999",
                }}
              >
                {product.quantity < 1 ? "Out of stock" : ""}
              </div>
            ) : (
              <Button
                type="primary"
                size="large"
                onClick={handleAddToCart}
                style={{ width: "100%" }}
              >
                <PlusOutlined /> Add to Cart
              </Button>
            )}
          </Tooltip>
        </Card>
      </div>
      <AddToCart
        product={product}
        addToCart={addToCart}
        setAddToCart={setAddToCart}
      />
      <BuyButton handleAddToCart={handleAddToCart} />
    </>
  );
};

export default SingleProduct;
