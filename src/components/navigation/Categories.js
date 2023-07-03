import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  MenuOutlined,
  RightOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { isMobile } from "react-device-detect";
import { toast } from "react-toastify";

import { getCategories } from "../../functions/category";
import { storeCategories } from "../../reducers/categorySlice";

const initialCat = {
  page: 1,
  pageCount: 10,
  totalPages: 0,
};

const Categories = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(isMobile ? false : true);
  const [catPage, setCatPage] = useState(initialCat);

  const categories = useSelector((state) => state.categories);
  const estoreSet = useSelector((state) => state.estoreSet);

  useEffect(() => {
    loadCategories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadCategories = () => {
    if (!localStorage.getItem("categories")) {
      getCategories(estoreSet._id).then((res) => {
        if (res.data.err) {
          toast.error(res.data.err);
        } else {
          dispatch(storeCategories(res.data));
          localStorage.setItem("categories", JSON.stringify(res.data));
          setCatPage({
            ...catPage,
            totalPages: parseInt(res.data.length / catPage.pageCount) + 1,
          });
        }
      });
    }
  };

  return (
    <nav>
      <ul className="menu">
        <li className="main-menu">
          <div
            className="menuicon"
            style={{ padding: isMobile ? "5px 0 5px 10px" : "5px 15px" }}
            onClick={() => setShowMenu(!showMenu)}
          >
            <MenuOutlined />
          </div>
          {showMenu && (
            <ul
              className="submenu"
              style={{ minWidth: isMobile ? "180px" : "240px" }}
            >
              <li>
                <div
                  style={{ textAlign: "center", padding: 0 }}
                  onClick={() => {
                    if (catPage.page > 1)
                      setCatPage({ ...catPage, page: catPage.page - 1 });
                  }}
                >
                  <CaretUpOutlined
                    style={{
                      color: catPage.page === 1 ? "#cccccc" : "#333333",
                    }}
                  />
                </div>
              </li>
              {categories &&
                [...categories]
                  .sort((a, b) => a.name - b.name)
                  .slice(
                    (catPage.page - 1) * catPage.pageCount,
                    catPage.page * catPage.pageCount
                  )
                  .map((cat) => {
                    return (
                      <li key={cat._id}>
                        <div
                          onClick={() =>
                            navigate(`/${estoreSet.slug}/shop/${cat.slug}`)
                          }
                        >
                          {cat.name}{" "}
                          <RightOutlined
                            style={{
                              fontSize: "9px",
                              float: "right",
                              color: "#bbbbbb",
                            }}
                          />
                        </div>
                      </li>
                    );
                  })}
              <li>
                <div
                  style={{ textAlign: "center", padding: 0 }}
                  onClick={() => {
                    if (catPage.page < catPage.totalPages)
                      setCatPage({ ...catPage, page: catPage.page + 1 });
                  }}
                >
                  <CaretDownOutlined
                    style={{
                      color:
                        catPage.page === catPage.totalPages
                          ? "#cccccc"
                          : "#333333",
                    }}
                  />
                </div>
              </li>
              <li>
                <div
                  style={{ textAlign: "center", padding: 0, marginBottom: 5 }}
                  onClick={() => setShowMenu(false)}
                >
                  Close (x)
                </div>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Categories;
