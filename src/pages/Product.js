import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import SingleProduct from "../components/product/SingleProduct";
import LoadingCard from "../components/cards/LoadingCard";
import ProductCard from "../components/cards/ProductCard";

import { getRandomProducts, getSingleProduct } from "../functions/product";
import { storeProducts } from "../reducers/productSlice";

const initialState = {
  images: [],
  title: "",
};

const Product = () => {
  const { prodslug } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(initialState);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const products = useSelector((state) => state.products);
  const estoreSet = useSelector((state) => state.estoreSet);

  useEffect(() => {
    loadProducts(1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  useEffect(() => {
    window.scrollTo(0, 0);
    loadSingleProduct();
  }, [prodslug]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadSingleProduct = () => {
    const singleProduct = products.find((product) => product.slug === prodslug);
    if (singleProduct) {
      document.title = singleProduct.title;
      setProduct(singleProduct);
    } else {
      getSingleProduct(estoreSet._id, prodslug).then((res) => {
        if (res.data.err) {
          toast.error(res.data.err);
        } else {
          const singleProduct = res.data && res.data[0];
          document.title = singleProduct.title;
          setProduct({ ...initialState, ...singleProduct });
        }
      });
    }
  };

  return (
    <div style={{ paddingBottom: 30 }}>
      <div className="container bg-white mt-3 p-4">
        <div className="row pt-4">
          <SingleProduct product={product} />
        </div>
      </div>
      <div className="container">
        <hr />
        <h5>Products you may also like</h5>
        <hr />
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

export default Product;
