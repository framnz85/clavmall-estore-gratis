import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import { Button } from "antd";
import { LoginOutlined, FormOutlined, CheckOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import CartProductTable from "../components/checkout/CartProductTable";
import SummaryProducts from "../components/checkout/SummaryProducts";
import SummaryCompute from "../components/checkout/SummaryCompute";
import CartButton from "../components/navigation/CartButton";
import Alerts from "../components/common/Alerts";

import { updateCart } from "../functions/order";

const cartInitials = {
  subtotal: 0,
  delfee: 0,
  grandTotal: 0,
};

const Cart = () => {
  const navigate = useNavigate();

  const [cartCalculation, setCartCalculation] = useState(cartInitials);

  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    document.title = "Fill Cart at " + estoreSet.name;
    calculateCart();
  }, [cart]); // eslint-disable-line react-hooks/exhaustive-deps

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const calculateCart = () => {
    let { delfee = 0 } = estoreSet;

    const subtotal = getTotal();
    let grandTotal = subtotal;

    if (delfee > 0) {
      grandTotal = grandTotal + parseInt(delfee);
    }

    setCartCalculation({ subtotal, delfee, grandTotal });
  };

  const handleCartOrder = () => {
    if (user._id) {
      updateCart(estoreSet._id, cart, user.token).then((res) => {
        if (res.data.err) {
          toast.error(res.data.err);
        } else {
          navigate(`/${estoreSet.slug}/checkout`);
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div
          className={
            isMobile ? "col-md-7 p-3 bg-white" : "col-md-7 p-3 mr-3 bg-white"
          }
        >
          <h4>Cart ({cart && cart.length})</h4>
          <hr />
          <Alerts />
          <CartProductTable cart={cart} />
        </div>
        <div className="col-md-4 p-3 bg-white">
          <h4>Order Summary</h4>
          <hr />

          <SummaryProducts products={cart} />
          <hr />

          <SummaryCompute cartCalculation={cartCalculation} />
          <br />

          <Button
            onClick={handleCartOrder}
            type="primary"
            size="large"
            style={{ width: "100%" }}
            disabled={!cart.length}
          >
            <CheckOutlined />
            Proceed to Checkout
          </Button>

          {!user.token && (
            <>
              <Link
                to={{
                  pathname: `/${estoreSet.slug}/login`,
                  state: { from: "cart" },
                }}
              >
                <Button
                  type="secondary"
                  size="large"
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <LoginOutlined />
                  Login to Checkout
                </Button>
              </Link>
              <Link
                to={{
                  pathname: `/${estoreSet.slug}/register`,
                  state: { from: "cart" },
                }}
              >
                <Button
                  type="secondary"
                  size="large"
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <FormOutlined />
                  Register to Checkout
                </Button>
              </Link>
            </>
          )}
          <CartButton
            handleCartOrder={handleCartOrder}
            cartCalculation={cartCalculation}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
