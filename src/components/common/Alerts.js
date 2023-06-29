import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Alerts = () => {
  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  return (
    <>
      {user && user.role === "admin" && !user.emailConfirm && (
        <div
          align="center"
          style={{
            border: "1px solid red",
            padding: 10,
            color: "red",
            marginTop: 15,
          }}
        >
          Your Email Address needs to be verified before you can fully use your
          website. Go to your{" "}
          <Link
            to={`/${estoreSet.slug}/user/account`}
            style={{ textDecoration: "underline", color: "red" }}
          >
            Profile Account
          </Link>
          .
        </div>
      )}
      <br />
    </>
  );
};

export default Alerts;
