import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import Register from "./Register";
import Login from "./Login";

const Auth = ({ setSlug = () => "", from = "" }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const register = searchParams.get("register");

  useEffect(() => {
    if (slug) {
      setSlug(slug);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>{register === "1" ? <Register from={from} /> : <Login from={from} />}</>
  );
};

export default Auth;
