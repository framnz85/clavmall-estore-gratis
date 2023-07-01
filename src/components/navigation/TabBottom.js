import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Badge } from "antd";

import {
  RiHomeSmile2Line,
  RiHomeSmile2Fill,
  RiUser5Fill,
} from "react-icons/ri";
import {
  AiFillShopping,
  AiOutlineShopping,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RiUser5Line } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";

const TabBottom = () => {
  const navigate = useNavigate();

  const [activeTabs, setActiveTabs] = useState("Francis");

  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const estoreSet = useSelector((state) => state.estoreSet);

  useEffect(() => {
    switch (activeTabs) {
      case "home":
        navigate(`/${estoreSet.slug}`);
        break;
      case "shop":
        navigate(`/${estoreSet.slug}/shop`);
        break;
      case "cart":
        navigate(`/${estoreSet.slug}/cart`);
        break;
      case "login":
        navigate(`/${estoreSet.slug}/auth`);
        break;
      case "user":
        navigate(`/${estoreSet.slug}/user/order`);
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
    },
    bottomNav: {
      width: window.innerWidth,
      height: "50px",
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
  };

  return (
    <div style={tabStyle.containier}>
      {isMobile && (
        <div style={tabStyle.bottomNav}>
          <div style={tabStyle.bnTab}>
            {activeTabs === "home" ? (
              <RiHomeSmile2Fill
                size="35"
                color={estoreSet.headerColor}
                onClick={() => setActiveTabs("home")}
              />
            ) : (
              <RiHomeSmile2Line
                size="35"
                color={estoreSet.headerColor}
                onClick={() => setActiveTabs("home")}
              />
            )}
          </div>
          <div style={tabStyle.bnTab}>
            {activeTabs === "shop" ? (
              <AiFillShopping
                size="35"
                color={estoreSet.headerColor}
                onClick={() => setActiveTabs("shop")}
              />
            ) : (
              <AiOutlineShopping
                size="35"
                color={estoreSet.headerColor}
                onClick={() => setActiveTabs("shop")}
              />
            )}
          </div>
          <div style={tabStyle.bnTab}>
            {activeTabs === "cart" ? (
              <Badge
                count={
                  cart &&
                  cart.map((p) => parseInt(p.count)).reduce((a, b) => a + b, 0)
                }
                offset={[0, 0]}
              >
                <FaShoppingCart
                  size="35"
                  color={estoreSet.headerColor}
                  onClick={() => setActiveTabs("cart")}
                />
              </Badge>
            ) : (
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
            )}
          </div>
          {user.token && (
            <div style={tabStyle.bnTab}>
              {activeTabs === "user" ? (
                <RiUser5Fill
                  size="35"
                  color={estoreSet.headerColor}
                  onClick={() => setActiveTabs("user")}
                />
              ) : (
                <RiUser5Line
                  size="35"
                  color={estoreSet.headerColor}
                  onClick={() => setActiveTabs("user")}
                />
              )}
            </div>
          )}
          {!user.token && (
            <div style={tabStyle.bnTab}>
              {activeTabs === "login" ? (
                <RiUser5Fill
                  size="35"
                  color={estoreSet.headerColor}
                  onClick={() => setActiveTabs("login")}
                />
              ) : (
                <RiUser5Line
                  size="35"
                  color={estoreSet.headerColor}
                  onClick={() => setActiveTabs("login")}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TabBottom;
