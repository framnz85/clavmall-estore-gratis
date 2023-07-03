import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import AdminProdCard from "../cards/AdminProdCard";

import {
  deleteProduct,
  checkImageUser,
  removeFileImage,
} from "../../functions/product";
import { updateEstore } from "../../functions/estore";
import { estoreDet } from "../../reducers/estoreSlice";

const ProdShowCards = ({ values, setValues, loading }) => {
  const dispatch = useDispatch();

  const { products, itemsCount, pageSize, currentPage } = values;

  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  const handleRemove = (product) => {
    deleteProduct(estoreSet._id, product.prodid, user.token).then(
      async (res) => {
        if (res.data.err) {
          toast.error(res.data.err);
        } else {
          setValues({
            ...values,
            products: products.filter((prod) => prod._id !== product.prodid),
          });
          for (let i = 0; i < product.images.length; i++) {
            await checkImageUser(
              product.images[i].public_id,
              estoreSet._id,
              process.env.REACT_APP_ESTORE_DEFAULT_ID,
              user.token
            ).then(async (res) => {
              if (res.data)
                await removeFileImage(
                  product.images[i].public_id,
                  estoreSet._id,
                  user.token
                );
            });
          }
          updateEstore(
            estoreSet._id,
            { productChange: parseInt(estoreSet.productChange) + 1 },
            user.token
          ).then((res) => {
            if (res.data.err) {
              toast.error(res.data.err);
            } else {
              dispatch(estoreDet(res.data));
              localStorage.setItem("estore", JSON.stringify(res.data));
            }
          });
          toast.error(`${product.title} has been deleted!`);
        }
      }
    );
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
