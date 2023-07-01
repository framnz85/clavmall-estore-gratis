import React from "react";
import { BrowserView } from "react-device-detect";
import { Link } from "react-router-dom";
import { Badge } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  UserOutlined,
  UserAddOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";

import SearchHead from "./SearchHead";
import Categories from "./Categories";

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  const menuStyle = {
    mainContainer: {
      backgroundColor: "#009A57",
      height: "56px",
      position: "fixed",
      zIndex: 2,
      width: "100%",
      top: 0,
    },
    leftStyle: {
      color: "#ffffff",
      backgroundColor: "#009A57",
      borderBottom: `1px solid "#009A57"`,
    },
    headerStyle: {
      color: "#ffffff",
      borderBottom: `1px solid "#009A57"`,
    },
    searchStyle: {
      width: "300px",
    },
    rightStyle: {
      color: "#ffffff",
      backgroundColor: "#009A57",
      borderBottom: `1px solid "#009A57"`,
    },
  };

  return (
    <div
      className="d-flex justify-content-between"
      style={menuStyle.mainContainer}
    >
      <BrowserView className="d-flex flex-row">
        {estoreSet && estoreSet._id && <Categories />}
        <div className="p-3 mr-3">
          <Link to={`/${estoreSet.slug}`} style={menuStyle.headerStyle}>
            <HomeOutlined /> Home
          </Link>
        </div>
        <div className="p-3 mr-3">
          <Link to={`/${estoreSet.slug}/shop`} style={menuStyle.headerStyle}>
            <ShoppingOutlined /> Shop
          </Link>
        </div>
        <div className="p-3 mr-3">
          <Link to={`/${estoreSet.slug}/cart`} style={menuStyle.headerStyle}>
            <ShoppingCartOutlined />{" "}
            <Badge
              count={
                cart &&
                cart.map((p) => parseInt(p.count)).reduce((a, b) => a + b, 0)
              }
              offset={[11, 0]}
            >
              <span style={menuStyle.headerStyle}>Cart</span>
            </Badge>
          </Link>
        </div>
      </BrowserView>
      <div className="d-flex justify-content-end">
        {isMobile && estoreSet && estoreSet._id && <Categories />}
        <div className="mr-3" style={{ padding: "13px" }}>
          <SearchHead />
        </div>

        {user.token && (
          <>
            <BrowserView className="p-3 mr-3">
              <Link
                to={
                  user && user.role === "admin"
                    ? `/${estoreSet.slug}/admin/dashboard`
                    : user && user.role === "customer"
                    ? `/${estoreSet.slug}/user/order`
                    : ""
                }
                style={menuStyle.headerStyle}
              >
                <UserOutlined />{" "}
                {user.name || (user.email && user.email.split("@")[0])}
              </Link>
            </BrowserView>
          </>
        )}

        {!user.token && (
          <>
            <BrowserView className="p-3 mr-3">
              <Link
                to={`/${estoreSet.slug}/auth`}
                style={menuStyle.headerStyle}
              >
                <LoginOutlined /> Login
              </Link>
            </BrowserView>
            <BrowserView className="p-3 mr-3">
              <Link
                to={`/${estoreSet.slug}/auth/?register=1`}
                style={menuStyle.headerStyle}
              >
                <UserAddOutlined /> Register
              </Link>
            </BrowserView>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
