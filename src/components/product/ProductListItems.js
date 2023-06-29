import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";

const ProductListItems = ({ product }) => {
  const { price, category, subcats, parent, quantity, sold } = product;

  const estoreSet = useSelector((state) => state.estoreSet);

  return (
    <ul className="list-group">
      <li className="list-group-item">
        <h4>Price</h4>
        <span
          className="label label-default label-pill pull-xs-right"
          style={{ color: "#ff8c00", fontSize: "22px" }}
        >
          <NumberFormat
            value={Number(price).toFixed(2)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={
              estoreSet && estoreSet.country && estoreSet.country.currency
            }
            style={{ margin: 0 }}
          />
        </span>
      </li>
      {category && (
        <li className="list-group-item">
          Category
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {category.name}
          </Link>
        </li>
      )}
      {subcats && (
        <li className="list-group-item">
          Sub Category
          {subcats.map((sub) => (
            <Link
              key={Math.floor(Math.random() * 999999) + (sub && sub._id)}
              to={`/subcats/${sub && sub.slug}`}
              className="label label-default label-pill pull-xs-right"
            >
              {sub && sub.name}
            </Link>
          ))}
        </li>
      )}
      {parent && (
        <li className="list-group-item">
          Parent / Brand
          <Link
            to={`/parent/${parent.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {parent.name}
          </Link>
        </li>
      )}
      <li className="list-group-item">
        Available
        <span className="label label-default label-pill pull-xs-right">
          {quantity && quantity.toFixed(2)}
        </span>
      </li>
      <li className="list-group-item">
        Sold
        <span className="label label-default label-pill pull-xs-right">
          {sold && sold.toFixed(2)}
        </span>
      </li>
    </ul>
  );
};

export default ProductListItems;
