import axios from "axios";

export const getUserToken = async (estoreid, values) =>
  await axios.post(process.env.REACT_APP_API + "/gratis/auth-login", values, {
    headers: {
      estoreid,
    },
  });

export const checkEmailExist = async (estoreid, values) =>
  await axios.post(
    process.env.REACT_APP_API + "/gratis/check-email-exist",
    values,
    {
      headers: {
        estoreid,
      },
    }
  );

export const getAllCountries = async () =>
  await axios.get(process.env.REACT_APP_API + "/gratis/get-countries");
