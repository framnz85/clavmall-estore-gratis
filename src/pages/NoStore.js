import React from "react";
import { useSelector } from "react-redux";
import { PoweroffOutlined, ShopOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const NoStore = () => {
  const navigate = useNavigate();
  const estoreSet = useSelector((state) => state.estoreSet);

  return (
    <>
      <div
        className="d-flex justify-content-between"
        style={{
          backgroundColor: "#009A57",
          height: "56px",
          position: "fixed",
          zIndex: 2,
          width: "100%",
          top: 0,
        }}
      ></div>
      <div className="not-found-container" style={{ marginTop: -80 }}>
        <div className="not-found-content">
          <h1
            style={{
              fontSize: "3rem",
              color: "#333",
              marginBottom: "1rem",
            }}
          >
            {estoreSet && estoreSet.slug ? "Welcome!" : "Oops!"}
          </h1>
          <p style={{ fontSize: "1.5rem", color: "#777" }}>
            {estoreSet && estoreSet.slug ? (
              <Button
                type="primary"
                icon={<PoweroffOutlined />}
                size="large"
                onClick={() => (window.location.href = "/" + estoreSet.slug)}
              >
                Proceed to {estoreSet && estoreSet.name} NOW
              </Button>
            ) : (
              <>
                This store may not exist. You can create your own store!
                <br />
                <br />
                <Button
                  type="primary"
                  icon={<ShopOutlined />}
                  size="large"
                  onClick={() => navigate("/?register=1")}
                >
                  Create Own Store
                </Button>
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default NoStore;
