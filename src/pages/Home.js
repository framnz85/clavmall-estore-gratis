import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import LoadingCard from "../components/cards/LoadingCard";
import ProductCard from "../components/cards/ProductCard";
import Alerts from "../components/common/Alerts";

import { getRandomProducts } from "../functions/product";
import { storeProducts } from "../reducers/productSlice";

const Home = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  const estoreSet = useSelector((state) => state.estoreSet);

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (estoreSet && estoreSet._id) loadProducts(1);
  }, [estoreSet]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadProducts = (nextPage) => {
    setPage(nextPage);
    const maxRandNum = nextPage === 1 ? 60 : 60 + nextPage * 30;
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

  return (
    <div style={{ paddingBottom: 30 }}>
      <div className="alert alert-success text-danger h3 font-weight-bold text-center p-2 mb-4 mt-4">
        Welcome to {estoreSet.name}
      </div>

      <div className="container">
        <Alerts />
        {loading ? (
          <div style={{ marginRight: 10 }}>
            <LoadingCard count={page * 30} />
          </div>
        ) : (
          <>
            {estoreSet._id &&
              products.length > 0 &&
              products.slice(0, page * 30).map((product) => {
                return (
                  <ProductCard
                    estoreSet={estoreSet}
                    product={product}
                    priceShow={true}
                    key={product._id}
                    loadFromCart={false}
                  />
                );
              })}
          </>
        )}
        <div style={{ margin: "0 2px" }}>
          <Button block size="large" onClick={() => loadProducts(page + 1)}>
            {loading ? <LoadingOutlined /> : "Load More"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
