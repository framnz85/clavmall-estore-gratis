import axios from "axios";

export const getAllUsers = async (estoreid, authToken) =>
  await axios.get(process.env.REACT_APP_API + "/gratis/all-users", {
    headers: {
      authToken,
      estoreid,
    },
  });

export const getUserDetails = async (estoreid, authToken) =>
  await axios.get(process.env.REACT_APP_API + "/gratis/user-details", {
    headers: {
      authToken,
      estoreid,
    },
  });

export const createNewUser = async (estoreid, values) =>
  await axios.post(process.env.REACT_APP_API + "/gratis/user-create", values, {
    headers: {
      estoreid,
    },
  });

export const updateUserDetails = async (estoreid, values, authToken) =>
  await axios.put(process.env.REACT_APP_API + "/gratis/user-update", values, {
    headers: {
      authToken,
      estoreid,
    },
  });

export const verifyUserEmail = async (estoreid, values, authToken) =>
  await axios.put(process.env.REACT_APP_API + "/gratis/user-verify", values, {
    headers: {
      authToken,
      estoreid,
    },
  });

export const changePassword = async (estoreid, values, authToken) =>
  await axios.put(
    process.env.REACT_APP_API + "/gratis/change-password",
    values,
    {
      headers: {
        authToken,
        estoreid,
      },
    }
  );

export const forgotPassword = async (estoreid, values) =>
  await axios.put(
    process.env.REACT_APP_API + "/gratis/forgot-password",
    values,
    {
      headers: {
        estoreid,
      },
    }
  );

export const removeUser = async (estoreid, userid, authToken) =>
  await axios.delete(
    process.env.REACT_APP_API + "/gratis/user-delete/" + userid,
    {
      headers: {
        authToken,
        estoreid,
      },
    }
  );
