import axios from "axios";

export const getEstore = async (slug) =>
  await axios.get(process.env.REACT_APP_API + "/gratis/estore/" + slug);

export const getEstoreCounters = async (estoreid) =>
  await axios.get(
    process.env.REACT_APP_API + "/gratis/estore-counters/" + estoreid
  );

export const updateEstore = async (estoreid, values, authToken) =>
  await axios.post(
    process.env.REACT_APP_API + "/gratis/estore-update",
    values,
    {
      headers: {
        authToken,
        estoreid,
      },
    }
  );

export const createEstore = async (values) =>
  await axios.post(process.env.REACT_APP_API + "/gratis/estore-create", values);
