import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";

import SummaryProducts from "../components/checkout/SummaryProducts";
import SummaryCompute from "../components/checkout/SummaryCompute";
import CheckoutDetails from "../components/checkout/CheckoutDetails";

const cartInitials = {
  subtotal: 0,
  delfee: 0,
  grandTotal: 0,
  paymentOption: "",
  delAddress: "",
};

const Checkout = () => {
  const [delivery, setDelivery] = useState(cartInitials);

  const estoreSet = useSelector((state) => state.estoreSet);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    document.title = "Checkout at " + estoreSet.name;
    calculateCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

    setDelivery({ ...delivery, subtotal, delfee, grandTotal });
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div
          className={
            isMobile ? "col-md-7 p-3 bg-white" : "col-md-7 p-3 mr-3 bg-white"
          }
        >
          <h4>Delivery Details</h4>
          <hr />
          <CheckoutDetails delivery={delivery} />
        </div>
        <div className="col-md-4 p-3 bg-white">
          <h4>Order Summary</h4>
          <hr />

          <SummaryProducts products={cart} />
          <hr />

          <SummaryCompute cartCalculation={delivery} />
          <br />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
