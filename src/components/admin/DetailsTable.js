import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";

import ImageShow from "../../components/common/ImageShow";

const DetailsTable = ({ order }) => {
  const estoreSet = useSelector((state) => state.estoreSet);

  const statusColor = [
    { status: "Not Processed", color: "darkred" },
    { status: "Waiting Payment", color: "red" },
    { status: "Processing", color: "blue" },
    { status: "Delivering", color: "darkorange" },
    { status: "Cancelled", color: "" },
    { status: "Completed", color: "green" },
  ];
  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <div style={{ width: "50%", float: "left" }}>
          <b>Order Code:</b> {order.orderCode}
          <br />
          <b>Ordered By:</b>{" "}
          {order && order.orderedBy && order.orderedBy.name
            ? order.orderedBy.name
            : ""}
          <br />
          <b>Status:</b>{" "}
          {order && order.orderStatus ? (
            <span
              style={{
                color: statusColor.find((s) => s.status === order.orderStatus)
                  .color,
              }}
            >
              {order.orderStatus}
            </span>
          ) : (
            ""
          )}
        </div>
        <div style={{ width: "50%", float: "right" }}>
          <b>Delivery Address:</b> {order && order.delAddress}
          <br />
          <b>Payment:</b> {order.paymentOption && order.paymentOption.bankName}
          <br />
          <b>Additional Instructions:</b>{" "}
          {order && order.orderedBy && order.orderedBy.addInstruct}
        </div>
        <div style={{ clear: "both" }}></div>
      </div>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.products &&
            order.products.map((p, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <Link
                      to={`/${estoreSet.slug}/product/${p.product.slug}`}
                      style={{ color: "#000" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ImageShow
                        alt={p.product.title}
                        imgid={
                          p.product.images && p.product.images.length > 0
                            ? p.product.images[0].url
                            : ""
                        }
                        style={{
                          width: "50px",
                          height: "50px",
                        }}
                        type="/thumb"
                      />
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/${estoreSet.slug}/product/${p.product.slug}`}
                      style={{ color: "#000" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {p.product && p.product.title ? p.product.title : ""}
                    </Link>
                  </td>
                  <td>
                    <NumberFormat
                      value={p.price.toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₱"}
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {p.count ? p.count : ""}
                  </td>
                  <td>
                    <NumberFormat
                      value={(p.price * p.count).toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₱"}
                    />
                  </td>
                </tr>
              );
            })}
          <tr>
            <td colSpan={4}></td>
            <td>Sub Total</td>
            <td>
              <NumberFormat
                value={order.cartTotal && order.cartTotal.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₱"}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={4}></td>
            <td>Delivery Fee</td>
            <td>
              <NumberFormat
                value={order.delfee && order.delfee.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₱"}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={4}></td>
            <td>Service Fee</td>
            <td>
              <NumberFormat
                value={order.servefee && order.servefee.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₱"}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={4}></td>
            <td>Discount</td>
            <td>
              -{" "}
              <NumberFormat
                value={order.discount && order.discount.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₱"}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={4}></td>
            <td>
              <b>Grand Total</b>
            </td>
            <td>
              <b>
                <NumberFormat
                  value={order.grandTotal && order.grandTotal.toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₱"}
                />
              </b>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default DetailsTable;
