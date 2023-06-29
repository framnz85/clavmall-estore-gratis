import React from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({ children }) => {
  const user = useSelector((state) => state.user);

  return user && user._id ? <>{children}</> : <LoadingToRedirect />;
};

export default UserRoute;
