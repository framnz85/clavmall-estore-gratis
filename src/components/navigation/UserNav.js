import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Select } from "antd";
import {
  MenuUnfoldOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { isMobile } from "react-device-detect";

import { logoutUser } from "../../reducers/userSlice";
import { emptyCart } from "../../reducers/cartSlice";
import { removeStoreCategory } from "../../reducers/categorySlice";
import { removeOrder } from "../../reducers/orderSlice";
import { removeStorePayment } from "../../reducers/paymentSlice";
import { removeStoreProducts } from "../../reducers/productSlice";

const UserNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
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

  const userNav =
    user && user.role === "admin"
      ? [
          {
            key: "1",
            href: `/${estoreSet.slug}/user/order`,
            icon: <MenuUnfoldOutlined />,
            label: "Orders",
          },
          {
            key: "2",
            href: `/${estoreSet.slug}/user/account`,
            icon: <SafetyCertificateOutlined />,
            label: "Account",
          },
          {
            key: "3",
            href: `/${estoreSet.slug}/admin/dashboard`,
            icon: <UserOutlined />,
            label: "Admin",
          },
        ]
      : [
          {
            key: "1",
            href: `/${estoreSet.slug}/user/order`,
            icon: <MenuUnfoldOutlined />,
            label: "Orders",
          },
          {
            key: "2",
            href: `/${estoreSet.slug}/user/account`,
            icon: <SafetyCertificateOutlined />,
            label: "Account",
          },
        ];

  const userNavMob = [
    ...userNav,
    { key: "4", href: "logout", icon: <LogoutOutlined />, label: "Logout" },
  ];

  return (
    <nav>
      {!isMobile && (
        <ul
          className="nav flex-column"
          style={{ padding: "10px 20px 10px 5px" }}
        >
          {userNav.map((nav) => (
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
        <div style={{ width: window.innerWidth - 39 }}>
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
            options={userNavMob.map((nav) => {
              return { label: nav.label, value: nav.href };
            })}
            style={{ margin: "15px 10px 0 10px", width: "100%" }}
          />
        </div>
      )}
    </nav>
  );
};

export default UserNav;
