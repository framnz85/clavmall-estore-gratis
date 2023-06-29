import axios from "axios";

export const getPayment = async (payid, estoreid, authToken) =>
  await axios.get(process.env.REACT_APP_API + "/gratis/get-payment/" + payid, {
    headers: {
      authToken,
      estoreid,
    },
  });

export const getPayments = async (estoreid, authToken) =>
  await axios.get(process.env.REACT_APP_API + "/gratis/get-payments", {
    headers: {
      authToken,
      estoreid,
    },
  });

export const addPayment = async (estoreid, values, authToken) =>
  await axios.post(process.env.REACT_APP_API + "/gratis/add-payment", values, {
    headers: {
      authToken,
      estoreid,
    },
  });

export const updatePayment = async (payid, estoreid, values, authToken) =>
  await axios.put(
    process.env.REACT_APP_API + "/gratis/update-payment/" + payid,
    values,
    {
      headers: {
        authToken,
        estoreid,
      },
    }
  );

export const deletePayment = async (payid, estoreid, authToken) =>
  await axios.delete(
    process.env.REACT_APP_API + "/gratis/remove-payment/" + payid,
    {
      headers: {
        authToken,
        estoreid,
      },
    }
  );
