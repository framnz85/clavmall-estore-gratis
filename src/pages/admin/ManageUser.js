import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  CaretRightOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Popconfirm } from "antd";
import { Link } from "react-router-dom";

import AdminNav from "../../components/navigation/AdminNav";
import Alerts from "../../components/common/Alerts";

import { getAllUsers, removeUser } from "../../functions/user";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  useEffect(() => {
    document.title = "Users | " + estoreSet.name;
    loadAllUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadAllUsers = () => {
    setLoading(true);
    getAllUsers(estoreSet._id, user.token).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        setUsers(res.data);
      }
      setLoading(false);
    });
  };

  const handleDeleteUser = (userid) => {
    removeUser(estoreSet._id, userid, user.token).then(() => {
      const remainingUser = users.filter((user) => user._id !== userid);
      setUsers(remainingUser);
    });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-m-2">
          <AdminNav />
        </div>

        <div className="col-md-10 bg-white mt-3 mb-5">
          <h4 style={{ margin: "20px 0" }}>Manage Users</h4>
          <hr />

          {loading && (
            <div align="center">
              <LoadingOutlined />
              <br />
            </div>
          )}

          <Alerts />

          {users &&
            users.map((user) => (
              <div
                key={user._id}
                className="alert alert-success"
                style={{ backgroundColor: estoreSet.carouselColor }}
              >
                Name: {user.name} <CaretRightOutlined /> Email: {user.email}{" "}
                <CaretRightOutlined /> Password: {user.showPass}{" "}
                <CaretRightOutlined /> Role: {user.role}
                {user.role !== "admin" && (
                  <Popconfirm
                    className="btn btn-sm float-right"
                    value={user}
                    title="Are you sure to delete this user?"
                    onConfirm={() => handleDeleteUser(user._id)}
                    onCancel={() => ""}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined className="text-danger" />
                  </Popconfirm>
                )}
              </div>
            ))}

          {users.length > 1 && (
            <div style={{ marginBottom: 50 }}>
              <br />
              You can only upload a maximum of {estoreSet.categoryLimit}{" "}
              categories for this account,{" "}
              <Link to={`/${estoreSet.slug}/admin/upgrade`}>
                Increase Limit NOW
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
