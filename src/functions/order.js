import axios from "axios";

export const getUserOrder = async (estoreid, orderid, authToken) =>
  await axios.get(process.env.REACT_APP_API + "/gratis/user-order/" + orderid, {
    headers: {
      authToken,
      estoreid,
    },
  });

export const getUserOrders = async (estoreid, authToken) =>
  await axios.get(process.env.REACT_APP_API + "/gratis/user-orders", {
    headers: {
      authToken,
      estoreid,
    },
  });

export const getAdminOrders = async (estoreid, authToken) =>
  await axios.get(process.env.REACT_APP_API + "/gratis/admin-orders", {
    headers: {
      authToken,
      estoreid,
    },
  });

export const updateCart = async (estoreid, cart, authToken) =>
  await axios.post(
    process.env.REACT_APP_API + "/gratis/update-cart",
    { cart },
    {
      headers: {
        authToken,
        estoreid,
      },
    }
  );

export const saveCartOrder = async (estoreid, values, authToken) =>
  await axios.post(
    process.env.REACT_APP_API + "/gratis/save-cart-order",
    values,
    {
      headers: {
        authToken,
        estoreid,
      },
    }
  );

export const changeOrderStatus = async (estoreid, values, authToken) =>
  await axios.put(
    process.env.REACT_APP_API + "/gratis/update-order-status",
    values,
    {
      headers: {
        authToken,
        estoreid,
      },
    }
  );

export const deleteOrder = async (estoreid, orderid, authToken) =>
  await axios.delete(
    process.env.REACT_APP_API + "/gratis/delete-order/" + orderid,
    {
      headers: {
        authToken,
        estoreid,
      },
    }
  );
