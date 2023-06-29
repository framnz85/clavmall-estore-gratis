import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import AdminNav from "../../../components/navigation/AdminNav";
import ProdShowCards from "../../../components/admin/ProdShowCards";
import InputSearch from "../../../components/common/InputSearch";
import Alerts from "../../../components/common/Alerts";

import { getAdminProducts } from "../../../functions/product";

const initialState = {
  products: [],
  itemsCount: 0,
  pageSize: 10,
  currentPage: 1,
  sortkey: "createdAt",
  sort: -1,
  category: "",
};

const AllProducts = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  useEffect(() => {
    loadProducts();
  }, [values.currentPage, values.pageSize]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadProducts = () => {
    const { sortkey, sort, currentPage, pageSize, category } = values;
    setLoading(true);
    getAdminProducts(
      estoreSet._id,
      user.token,
      sortkey,
      sort,
      currentPage,
      pageSize,
      keyword,
      category
    ).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
        setLoading(false);
      } else {
        setValues({
          ...values,
          products: res.data.products,
          itemsCount: parseInt(res.data.count),
        });
        setLoading(false);
      }
    });
  };

  const groupSearchSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    loadProducts();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-m-2">
          <AdminNav />
        </div>

        <div className="col-md-10 bg-white mt-3 mb-5">
          <h4 style={{ margin: "20px 0" }}>All Products</h4>

          <Alerts />

          <form onSubmit={groupSearchSubmit}>
            <InputSearch
              keyword={keyword}
              setKeyword={setKeyword}
              placeholder="Search product"
              data={values}
              setData={setValues}
            />
          </form>

          <ProdShowCards
            values={values}
            setValues={setValues}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
