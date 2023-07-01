import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

import ImageShow from "../common/ImageShow";

const AllProductsCard = ({ product, handleRemove, canEdit }) => {
  const { _id, title, slug, price, images, activate } = product;

  const estoreSet = useSelector((state) => state.estoreSet);

  return (
    <div className="row alert alert-light">
      <div className="col-m-2">
        <Link
          to={
            canEdit
              ? `/${estoreSet.slug}/admin/product/${slug}`
              : `/${estoreSet.slug}/product/${slug}`
          }
          target="_blank"
        >
          <ImageShow
            alt={title}
            imgid={images && images.length > 0 ? images[0].url : ""}
            style={{ height: "150px", width: "150px", objectFit: "cover" }}
            type="/thumb"
          />
        </Link>
      </div>
      <div className="col mt-3">
        <div style={{ float: "right", fontSize: "16px" }}>
          {canEdit ? (
            <>
              <Link to={`/${estoreSet.slug}/product/${slug}`} target="_blank">
                <EyeOutlined className="text-secondary" />
              </Link>{" "}
              <Link
                to={`/${estoreSet.slug}/admin/product/${slug}`}
                target="_blank"
              >
                <EditOutlined className="text-secondary" />
              </Link>{" "}
              <Popconfirm
                title="Delete this product?"
                description="Are you sure to delete this product?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => handleRemove({ prodid: _id, title })}
              >
                <DeleteOutlined style={{ color: "red" }} />
              </Popconfirm>
            </>
          ) : (
            <>
              <DeleteOutlined
                className="text-danger"
                onClick={() => handleRemove(_id)}
              />
            </>
          )}
        </div>
        <h6>
          <Link
            to={
              canEdit
                ? `/${estoreSet.slug}/admin/product/${slug}`
                : `/${estoreSet.slug}/product/${slug}`
            }
            style={{ color: "#333333" }}
            target="_blank"
          >
            {title}
          </Link>
        </h6>
        <hr />
        <b>Price:</b> &#8369;{price.toFixed(2)} <b>Active:</b>{" "}
        <span style={{ fontSize: "12px", color: activate ? "green" : "red" }}>
          {activate ? "On" : "Off"}
        </span>
      </div>
    </div>
  );
};

export default AllProductsCard;
