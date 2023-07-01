import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Badge, Button } from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { RiHomeSmile2Line } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";

const BuyButton = ({ handleAddToCart }) => {
  const navigate = useNavigate();

  const [activeTabs, setActiveTabs] = useState("Francis");

  const cart = useSelector((state) => state.cart);
  const estoreSet = useSelector((state) => state.estoreSet);

  useEffect(() => {
    switch (activeTabs) {
      case "home":
        navigate(`/${estoreSet.slug}`);
        break;
      case "cart":
        navigate(`/${estoreSet.slug}/cart`);
        break;
      default:
        break;
    }
  }, [activeTabs]); // eslint-disable-line react-hooks/exhaustive-deps

  const tabStyle = {
    containier: {
      padding: 0,
      margin: 0,
      boxSizing: "border-box",
      position: "fixed",
      bottom: 0,
      backgroundColor: "#fff",
      zIndex: 1,
    },
    bottomNav: {
      width: window.innerWidth,
      height: "56px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderTop: "1px solid rgb(230, 230, 230)",
    },
    bnTab: {
      width: "25%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    buyTab: {
      width: "50%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  return (
    <div style={tabStyle.containier}>
      {isMobile && (
        <div style={tabStyle.bottomNav}>
          <div style={tabStyle.bnTab}>
            <RiHomeSmile2Line
              size="35"
              color="#009A57"
              onClick={() => setActiveTabs("home")}
            />
          </div>
          <div style={tabStyle.buyTab}>
            <Button
              type="primary"
              size="medium"
              onClick={handleAddToCart}
              style={{ width: 190 }}
            >
              <PlusOutlined /> Add to Cart
            </Button>
          </div>
          <div style={tabStyle.bnTab}>
            <Badge
              count={
                cart &&
                cart.map((p) => parseInt(p.count)).reduce((a, b) => a + b, 0)
              }
              offset={[0, 0]}
            >
              <AiOutlineShoppingCart
                size="35"
                color="#009A57"
                onClick={() => setActiveTabs("cart")}
              />
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyButton;
