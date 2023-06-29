import axios from "axios";

export const getCategory = async (slug, estoreid, authToken) =>
  await axios.get(process.env.REACT_APP_API + "/gratis/get-category/" + slug, {
    headers: {
      authToken,
      estoreid,
    },
  });

export const getCategories = async (estoreid) =>
  await axios.get(process.env.REACT_APP_API + "/gratis/get-categories", {
    headers: {
      estoreid,
    },
  });

export const addCategory = async (estoreid, values, authToken) =>
  await axios.post(process.env.REACT_APP_API + "/gratis/add-category", values, {
    headers: {
      authToken,
      estoreid,
    },
  });

export const updateCategory = async (slug, estoreid, values, authToken) =>
  await axios.put(
    process.env.REACT_APP_API + "/gratis/update-category/" + slug,
    values,
    {
      headers: {
        authToken,
        estoreid,
      },
    }
  );

export const deleteCategory = async (catid, estoreid, authToken) =>
  await axios.delete(
    process.env.REACT_APP_API + "/gratis/remove-category/" + catid,
    {
      headers: {
        authToken,
        estoreid,
      },
    }
  );
