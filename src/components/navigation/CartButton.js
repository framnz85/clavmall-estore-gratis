import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Badge, Button } from "antd";

import { CheckOutlined } from "@ant-design/icons";
import { RiHomeSmile2Line } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";

const CartButton = ({ handleCartOrder, cartCalculation }) => {
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
  }, [activeTabs]);

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
              color={estoreSet.headerColor}
              onClick={() => setActiveTabs("home")}
            />
          </div>
          <div style={tabStyle.buyTab}>
            <Button
              type="primary"
              size="medium"
              onClick={handleCartOrder}
              style={{ width: 190 }}
              disabled={!cart.length}
            >
              <CheckOutlined /> Proceed to Checkout
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
                color={estoreSet.headerColor}
                onClick={() => setActiveTabs("cart")}
              />
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartButton;
