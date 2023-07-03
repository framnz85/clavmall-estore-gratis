import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams, useSearchParams } from "react-router-dom";

import LoadingCard from "../components/cards/LoadingCard";
import ProductCard from "../components/cards/ProductCard";
import Alerts from "../components/common/Alerts";

import { getRandomProducts, getSearchedProducts } from "../functions/product";
import { storeProducts } from "../reducers/productSlice";

const Shop = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const text = searchParams.get("text");
  const { catSlug } = useParams();

  const [page, setPage] = useState(0);
  const [searchProd, setSearchProd] = useState([]);
  const [loading, setLoading] = useState(false);

  const products = useSelector((state) => state.products);
  const estoreSet = useSelector((state) => state.estoreSet);

  useEffect(() => {
    if (estoreSet && estoreSet._id) {
      document.title = "Shop at " + estoreSet.name;
      if (text || catSlug) {
        searchProducts({ text, catSlug }, 1);
      } else {
        loadProducts(1);
      }
    }
  }, [text, catSlug]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (estoreSet && estoreSet._id) {
      setSearchProd(products);
    }
  }, [products]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadProducts = (nextPage) => {
    setPage(nextPage);
    const maxRandNum = nextPage === 1 ? 40 : 40 + nextPage * 30;
    if (products.length < maxRandNum) {
      setLoading(true);
      getRandomProducts(estoreSet._id, nextPage === 1 ? 60 : 30).then((res) => {
        if (res.data.err) {
          toast.error(res.data.err);
          setLoading(false);
        } else {
          dispatch(storeProducts(res.data));
          localStorage.setItem("products", JSON.stringify(res.data));
          setLoading(false);
        }
      });
    }
  };

  const searchProducts = (values, nextPage) => {
    setPage(nextPage);
    setLoading(true);
    getSearchedProducts(estoreSet._id, values).then((res) => {
      setLoading(false);
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        setSearchProd(res.data);
      }
    });
  };

  return (
    <div style={{ paddingBottom: 30 }}>
      <div className="container">
        <hr />
        <h5>Filtering</h5>
        <hr />
        <Alerts />
        {loading ? (
          <div style={{ marginRight: 10 }}>
            <LoadingCard count={page * 30} />
          </div>
        ) : (
          <>
            {estoreSet._id && searchProd.length > 0 ? (
              searchProd.slice(0, page * 30).map((product) => {
                return (
                  <ProductCard
                    product={product}
                    priceShow={true}
                    key={product._id}
                    loadFromCart={false}
                  />
                );
              })
            ) : (
              <div align="center" style={{ marginBottom: 20 }}>
                No result found for the search
              </div>
            )}
          </>
        )}
        {!text && !catSlug && (
          <div style={{ margin: "0 2px" }}>
            <Button block size="large" onClick={() => loadProducts(page + 1)}>
              {loading ? <LoadingOutlined /> : "Load More"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
