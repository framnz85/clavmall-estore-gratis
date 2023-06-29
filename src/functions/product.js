import axios from "axios";

export const getRandomProducts = async (estoreid, count) =>
  await axios.get(
    process.env.REACT_APP_API + "/gratis/products/random/" + count,
    {
      headers: {
        estoreid,
      },
    }
  );

export const getSingleProduct = async (estoreid, slug) =>
  await axios.get(process.env.REACT_APP_API + "/gratis/get-product/" + slug, {
    headers: {
      estoreid,
    },
  });

export const getAdminProducts = async (
  estoreid,
  authToken,
  sortkey,
  sort,
  currentPage,
  pageSize,
  searchQuery,
  category
) =>
  await axios.post(
    process.env.REACT_APP_API + "/gratis/get-admin-products",
    {
      sortkey,
      sort,
      currentPage,
      pageSize,
      searchQuery,
      category,
    },
    {
      headers: {
        authToken,
        estoreid,
      },
    }
  );

export const uploadFileImage = async (image, estore, authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_CLAVMALL_IMG}/estore_functions/estoregratis/?estoreId=${estore._id}`,
    { image },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const removeFileImage = async (public_id, estore, authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_CLAVMALL_IMG}/estore_functions/estoregratis/removeimage.php?estoreId=${estore._id}`,
    { public_id },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const addProduct = async (estoreid, values, authToken) =>
  await axios.post(process.env.REACT_APP_API + "/gratis/add-product", values, {
    headers: {
      authToken,
      estoreid,
    },
  });

export const handleProductUpdate = async (
  estoreid,
  prodid,
  values,
  authToken
) =>
  await axios.put(
    process.env.REACT_APP_API + "/gratis/update-product/" + prodid,
    values,
    {
      headers: {
        authToken,
        estoreid,
      },
    }
  );
