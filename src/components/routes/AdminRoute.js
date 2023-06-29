import React from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.user);

  return user && user.role === "admin" ? (
    <>{children}</>
  ) : (
    <LoadingToRedirect />
  );
};

export default AdminRoute;
