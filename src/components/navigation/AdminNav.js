import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Select } from "antd";
import {
  MenuUnfoldOutlined,
  SafetyCertificateOutlined,
  DropboxOutlined,
  CodepenOutlined,
  CreditCardOutlined,
  TeamOutlined,
  ControlOutlined,
  UserOutlined,
  ToolOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { isMobile } from "react-device-detect";

import { logoutUser } from "../../reducers/userSlice";
import { emptyCart } from "../../reducers/cartSlice";
import { removeStoreCategory } from "../../reducers/categorySlice";
import { removeOrder } from "../../reducers/orderSlice";
import { removeStorePayment } from "../../reducers/paymentSlice";
import { removeStoreProducts } from "../../reducers/productSlice";

const AdminNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const estoreSet = useSelector((state) => state.estoreSet);

  const textColor = {
    color: estoreSet.headerColor ? estoreSet.headerColor : "#009a57",
  };

  const logout = () => {
    localStorage.clear();
    dispatch(logoutUser());
    dispatch(emptyCart());
    dispatch(removeStoreCategory([]));
    dispatch(removeOrder([]));
    dispatch(removeStorePayment([]));
    dispatch(removeStoreProducts([]));
    localStorage.setItem("estore", JSON.stringify(estoreSet));
    toast.success("Successfully logged out!");
    navigate(`/${estoreSet.slug}/auth`);
  };

  const adminNav = [
    {
      key: "1",
      href: `/${estoreSet.slug}/admin/dashboard`,
      icon: <MenuUnfoldOutlined />,
      label: "Dashboard",
    },
    {
      key: "2",
      href: `/${estoreSet.slug}/admin/category`,
      icon: <SafetyCertificateOutlined />,
      label: "Category",
    },
    {
      key: "5",
      href: `/${estoreSet.slug}/admin/product`,
      icon: <DropboxOutlined />,
      label: "Product",
    },
    {
      key: "6",
      href: `/${estoreSet.slug}/admin/products`,
      icon: <CodepenOutlined />,
      label: "Products",
    },
    {
      key: "8",
      href: `/${estoreSet.slug}/admin/payment`,
      icon: <CreditCardOutlined />,
      label: "Payments",
    },
    {
      key: "10",
      href: `/${estoreSet.slug}/admin/manageuser`,
      icon: <TeamOutlined />,
      label: "Users",
    },
    {
      key: "11",
      href: `/${estoreSet.slug}/admin/setting`,
      icon: <ControlOutlined />,
      label: "Settings",
    },
    {
      key: "12",
      href: `/${estoreSet.slug}/user/order`,
      icon: <UserOutlined />,
      label: "Personal",
    },
    {
      key: "13",
      href: `/${estoreSet.slug}/admin/upgrade`,
      icon: <ToolOutlined />,
      label: "Upgrades",
    },
    {
      key: "15",
      href: `/${estoreSet.slug}/admin/guide`,
      icon: <QuestionCircleOutlined />,
      label: "Guide",
    },
  ];

  const adminNavMob = [
    ...adminNav,
    { key: "16", href: "logout", icon: <LogoutOutlined />, label: "Logout" },
  ];

  return (
    <nav>
      {!isMobile && (
        <ul
          className="nav flex-column"
          style={{ padding: "10px 20px 10px 5px" }}
        >
          {adminNav.map((nav) => (
            <li className="nav-item" key={nav.key}>
              <Link to={nav.href} className="nav-link" style={textColor}>
                {nav.icon} {nav.label}
              </Link>
            </li>
          ))}
          <li className="nav-item" onClick={logout}>
            <div
              className="nav-link"
              style={{ ...textColor, cursor: "pointer" }}
            >
              <LogoutOutlined /> Logout
            </div>
          </li>
        </ul>
      )}

      {isMobile && (
        <div style={{ width: window.innerWidth - 25 }}>
          <Select
            showSearch
            placeholder="Menu Select"
            optionFilterProp="children"
            onChange={(value) =>
              value === "logout" ? logout() : navigate(value)
            }
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={adminNavMob.map((nav) => {
              return { label: nav.label, value: nav.href };
            })}
            style={{ margin: "15px 10px 0 10px", width: "100%" }}
          />
        </div>
      )}
    </nav>
  );
};

export default AdminNav;
