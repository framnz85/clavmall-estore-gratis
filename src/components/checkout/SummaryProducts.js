import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";

const ProductTable = ({ products }) => {
  const [order, setOrder] = useState({});

  const estoreSet = useSelector((state) => state.estoreSet);

  useEffect(() => {
    if (localStorage.getItem("order")) {
      setOrder(JSON.parse(localStorage.getItem("order")));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {order._id && (
        <div style={{ color: "red", fontSize: 12, padding: "0 0 5px 15px" }}>
          Editing Order Code {order.orderCode}
        </div>
      )}
      <table>
        <tbody>
          {products &&
            products.map((p, i) => {
              const product = p.product ? p.product : p;
              return (
                <tr key={i}>
                  <td
                    className="col"
                    style={{
                      width: "500px",
                      paddingBottom: "10px",
                      fontSize: 12,
                    }}
                  >
                    {product.title}(
                    <NumberFormat
                      value={Number(product.price).toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={estoreSet.country.currency}
                    />
                  </td>
                  <td
                    className="col"
                    style={{
                      width: "200px",
                      paddingBottom: "10px",
                      fontSize: 12,
                    }}
                  >
                    x {p.count}
                  </td>
                  <td
                    className="col"
                    style={{
                      width: "200px",
                      paddingBottom: "10px",
                      fontSize: 12,
                    }}
                  >
                    <NumberFormat
                      value={Number(product.price * p.count).toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={estoreSet.country.currency}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default ProductTable;
