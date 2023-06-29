import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import NumberFormat from "react-number-format";
import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";

import ImageShow from "../common/ImageShow";

const ProductCard = ({
  product,
  priceShow,
  shop,
  addCart = false,
  loadFromCart = false,
}) => {
  const { title, slug, price, images } = product;
  let variantDesc = "";

  const estoreSet = useSelector((state) => state.estoreSet);

  return (
    <Link to={`/${estoreSet.slug}/product/${slug}`} key={product._id}>
      <Card.Grid
        style={{
          width: isMobile && !addCart ? "50%" : shop ? "20%" : "16.66%",
          height: priceShow && !addCart ? "323px" : "210px",
          textAlign: "center",
          backgroundColor: "#fff",
          cursor: "pointer",
          margin: "0",
          border: "3px solid #efefef",
          padding: isMobile ? "10px" : "15px",
        }}
      >
        <ImageShow
          alt={title}
          imgid={images && images.length > 0 ? images[0].url : ""}
          style={{
            width: loadFromCart ? "135px" : "150px",
            height: loadFromCart ? "135px" : "150px",
          }}
          type="/thumb"
        />
        <br />
        <div align={priceShow && !addCart ? "left" : "center"}>
          <span style={{ color: "#333" }}>
            {title.length > 16 ? title.slice(0, 16) + "..." : title}
          </span>
          <br />
          <span style={{ color: "#999" }}>
            {priceShow && !addCart
              ? variantDesc.length > 16
                ? variantDesc.slice(0, 16) + "..."
                : variantDesc
              : ""}
          </span>
          {priceShow && !addCart && (
            <>
              <hr />
              <div style={{ color: "#ff8c00" }}>
                <div style={{ clear: "both" }}>
                  <NumberFormat
                    value={Number(price).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={estoreSet.country.currency}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </Card.Grid>
    </Link>
  );
};

export default ProductCard;
