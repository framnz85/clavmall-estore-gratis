import React from "react";
import { Pagination } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import AdminProdCard from "../cards/AdminProdCard";

const ProdShowCards = ({ values, setValues, loading }) => {
  const { products, itemsCount, pageSize, currentPage } = values;

  const handleRemove = () => {
    //
  };

  return (
    <div>
      {loading && (
        <div align="center">
          <LoadingOutlined />
          <br />
        </div>
      )}
      <div style={{ clear: "both" }} />
      {products.map((product) => (
        <div key={product._id}>
          <AdminProdCard
            product={product}
            handleRemove={handleRemove}
            canEdit={true}
          />
        </div>
      ))}
      <div className="text-center pt-3 pb-5">
        <Pagination
          onChange={(page, pageSize) =>
            setValues({ ...values, currentPage: page, pageSize })
          }
          current={currentPage}
          pageSize={pageSize}
          total={itemsCount}
          style={{ float: "right" }}
        />
      </div>
      <br />
      <br />
    </div>
  );
};

export default ProdShowCards;
