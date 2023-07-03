import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { toast } from "react-toastify";

import TableHeader from "../common/TableHeader";
import TableBody from "../common/TableBody";

import { deleteCategory } from "../../functions/category";
import { removeStoreCategory } from "../../reducers/categorySlice";
import { updateEstore } from "../../functions/estore";
import { estoreDet } from "../../reducers/estoreSlice";

const CategoryList = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const categories = useSelector((state) => state.categories);
  const estoreSet = useSelector((state) => state.estoreSet);

  const columns = [
    {
      key: "name",
      path: "name",
      label: "Category Name",
      content: (category) => category.name,
    },
    {
      key: "action",
      content: (category) => {
        return (
          <div style={{ width: 50 }}>
            <Link to={`/${estoreSet.slug}/admin/category/${category.slug}`}>
              <EditOutlined className="text-secondary mr-2" />
            </Link>
            <Popconfirm
              title="Delete this category?"
              description="Are you sure to delete this category?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleDelete(category)}
            >
              <DeleteOutlined style={{ color: "red" }} />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const handleDelete = (category) => {
    deleteCategory(category._id, estoreSet._id, user.token).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        const categoryRemaining = categories.filter(
          (cat) => cat._id !== category._id
        );
        dispatch(removeStoreCategory(categoryRemaining));
        localStorage.setItem("categories", JSON.stringify(categoryRemaining));
        toast.error(`${category.name} has been deleted!`);
        updateEstore(
          estoreSet._id,
          { categoryChange: parseInt(estoreSet.categoryChange) + 1 },
          user.token
        ).then((res) => {
          if (res.data.err) {
            toast.error(res.data.err);
          } else {
            dispatch(estoreDet(res.data));
            localStorage.setItem("estore", JSON.stringify(res.data));
          }
        });
      }
    });
  };

  return (
    <div>
      <table className="table">
        <TableHeader columns={columns} />
        <TableBody columns={columns} data={categories} />
      </table>
      <br />
    </div>
  );
};

export default CategoryList;
