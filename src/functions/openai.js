import axios from "axios";

export const getGroceyResponse = async (estoreid, message, openaiAPI) =>
  await axios.post(
    process.env.REACT_APP_API + "/gratis/chat/grocey-response",
    {
      message,
      openaiAPI,
    },
    {
      headers: {
        estoreid,
      },
    }
  );
