import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ShoppingCartOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";

import ImageShow from "../common/ImageShow";

import { updateCart } from "../../functions/order";
import { storeToCart } from "../../reducers/cartSlice";

const AddToCart = ({ product, addToCart, setAddToCart }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);
  const cart = useSelector((state) => state.cart);

  const [cartProd, setCartProd] = useState({});

  useEffect(() => {
    const prod = cart.filter((prod) => prod._id === product._id);
    if (prod[0]) {
      setCartProd(prod[0]);
    }
    if (estoreSet.status !== "active" && user.role === "admin") {
      toast.warning(
        "NOTE: Your website is no longer active but since you are an admin you can still do ordering. However, your customer cannot order if your website is not active."
      );
    }
  }, [cart]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleQuantityChange = (value, product) => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((prod, i) => {
      if (prod._id === cartProd._id) {
        cart[i].count = value;
      }
      return cart;
    });
    if (user._id) {
      dispatch(storeToCart(cart));
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart(estoreSet._id, cart, user.token);
    } else {
      dispatch(storeToCart(cart));
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
    objectFit: "cover",
  };

  return (
    <Modal
      title={
        estoreSet.status === "active" ? (
          <span style={{ color: "green" }}>Successfully Added To Cart</span>
        ) : (
          <span style={{ color: "red" }}>"Store Inactive"</span>
        )
      }
      centered
      visible={addToCart}
      onOk={() => ""}
      onCancel={() => setAddToCart(false)}
      footer={[
        <Button
          key="1"
          onClick={() => {
            setAddToCart(false);
          }}
          className="text-center btn btn-primary btn-raised"
          style={{ marginRight: 5 }}
        >
          <ShoppingOutlined /> Continue
        </Button>,
        <Link key="2" to={`/${estoreSet.slug}/cart`}>
          <Button
            onClick={() => {
              setAddToCart(false);
            }}
            className="text-center btn btn-default btn-raised"
          >
            <ShoppingCartOutlined /> Go To Cart
          </Button>
        </Link>,
      ]}
    >
      {estoreSet.status === "active" || user.role === "admin" ? (
        <div>
          <div className="row p-2 pl-4">
            {cartProd.images && cartProd.images[0] && (
              <>
                <div style={{ float: "left", width: "30%" }}>
                  <ImageShow
                    alt={cartProd.title}
                    imgid={
                      cartProd.images && cartProd.images.length > 0
                        ? cartProd.images[0].url
                        : ""
                    }
                    style={imageStyle}
                    type="/thumb"
                  />
                </div>
                <div style={{ float: "left", width: "70%", paddingTop: 10 }}>
                  <div className="text-left">
                    {cartProd.title && cartProd.title.length > 28
                      ? cartProd.title.slice(0, 28)
                      : cartProd.title}
                  </div>
                  <div style={{ clear: "both", marginTop: 3 }}>
                    <NumberFormat
                      value={Number(cartProd.price).toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={estoreSet.country.currency}
                    />
                  </div>
                  <div
                    className="d-flex justify-content-start"
                    style={{ marginTop: 3 }}
                  >
                    <div style={{ marginRight: 10 }}>Qty.</div>
                    <div>
                      <MinusSquareOutlined
                        style={{
                          fontSize: 18,
                          color: "red",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleQuantityChange(
                            parseFloat(cartProd.count) > 0
                              ? parseFloat(cartProd.count) - 1
                              : 0,
                            product
                          )
                        }
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="text-center"
                        value={cartProd.count ? cartProd.count : ""}
                        onChange={(e) =>
                          handleQuantityChange(e.target.value, product)
                        }
                        style={{ border: "none", width: 40 }}
                      />
                    </div>
                    <div>
                      <PlusSquareOutlined
                        style={{
                          fontSize: 18,
                          color: "green",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleQuantityChange(
                            parseFloat(cartProd.count ? cartProd.count : 0) + 1,
                            product
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div align="center" style={{ color: "red" }}>
          This store is not active as of the moment. Contact administrator.
        </div>
      )}
    </Modal>
  );
};

export default AddToCart;
