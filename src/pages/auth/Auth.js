import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import Register from "./Register";
import Login from "./Login";
import Forgot from "./Forgot";

const Auth = ({ setSlug = () => "", from = "" }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const register = searchParams.get("register");
  const forgot = searchParams.get("forgot");

  useEffect(() => {
    if (slug) {
      setSlug(slug);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {register === "1" ? (
        <Register from={from} />
      ) : forgot === "1" ? (
        <Forgot from={from} />
      ) : (
        <Login from={from} />
      )}
    </>
  );
};

export default Auth;
