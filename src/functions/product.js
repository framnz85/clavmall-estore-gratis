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

export const getInitProducts = async (estoreid, authToken) =>
  await axios.get(process.env.REACT_APP_API + "/gratis/init-product", {
    headers: {
      authToken,
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

export const checkImageUser = async (
  public_id,
  estoreid,
  defaultestore,
  authToken
) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/gratis/check-image-user/${public_id}/${defaultestore}`,
    {
      headers: {
        authToken,
        estoreid,
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

export const getSearchedProducts = async (estoreid, values) =>
  await axios.post(
    process.env.REACT_APP_API + "/gratis/search-product",
    values,
    {
      headers: {
        estoreid,
      },
    }
  );

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

export const deleteProduct = async (estoreid, prodid, authToken) =>
  await axios.delete(
    process.env.REACT_APP_API + "/gratis/delete-product/" + prodid,
    {
      headers: {
        authToken,
        estoreid,
      },
    }
  );
