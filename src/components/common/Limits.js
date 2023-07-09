import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ForDomain from "../../images/fordomain.jpg";

const Limits = ({ type }) => {
  const navigate = useNavigate();

  const estoreSet = useSelector((state) => state.estoreSet);

  const contentStyle = {
    height: "40px",
    lineHeight: "40px",
    textAlign: "center",
    fontSize: 12,
    backgroundImage: `url(${ForDomain})`,
    color: "#666",
    cursor: "pointer",
    marginBottom: 50,
  };

  return (
    <div
      style={contentStyle}
      onClick={() => navigate(`/${estoreSet.slug}/admin/upgrade`)}
    >
      {type === "category" && (
        <>
          You can only upload a maximum of {estoreSet.categoryLimit} categories
          for this account. Click Here to increase Limits NOW!
        </>
      )}
      {type === "payment" && <>You can only add up to 5 payment options.</>}
      {type === "product" && (
        <>
          You can only upload a maximum of {estoreSet.productLimit} products for
          this account. Click Here to increase Limits NOW!
        </>
      )}
      {type === "user" && (
        <>
          You can only have a maximum of {estoreSet.userLimit} customers for
          this account. Click Here to increase Limits NOW!
        </>
      )}
    </div>
  );
};

export default Limits;
