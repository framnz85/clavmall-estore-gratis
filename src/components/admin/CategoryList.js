import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { toast } from "react-toastify";

import TableHeader from "../common/TableHeader";
import TableBody from "../common/TableBody";

import { deleteCategory } from "../../functions/category";

const CategoryList = ({ categories, setCategories }) => {
  const user = useSelector((state) => state.user);
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
        setCategories(categories.filter((cat) => cat._id !== category._id));
        toast.error(`${category.name} has been deleted!`);
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
