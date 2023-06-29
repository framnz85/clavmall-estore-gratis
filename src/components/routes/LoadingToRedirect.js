import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../../reducers/userSlice";
import { emptyCart } from "../../reducers/cartSlice";

const LoadingToRedirect = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  const estoreSet = useSelector((state) => state.estoreSet);

  useEffect(() => {
    const logout = () => {
      localStorage.clear();
      dispatch(logoutUser());
      dispatch(emptyCart());
      localStorage.setItem("estore", JSON.stringify(estoreSet));
      navigate(`/${estoreSet.slug}/auth`);
    };

    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && logout();

    return () => clearInterval(interval);
  }, [count, navigate, dispatch, estoreSet]);

  return (
    <div className="container p-5 text-center text-danger">
      <p>Redirecting you to the login page in {count} seconds...</p>
    </div>
  );
};

export default LoadingToRedirect;
