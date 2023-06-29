import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { isMobile } from "react-device-detect";

const { Search } = Input;

const SearchHead = () => {
  const navigate = useNavigate();

  const estoreSet = useSelector((state) => state.estoreSet);

  const [searchTxt, setSearchTxt] = useState("");

  const handleChange = (e) => {
    setSearchTxt(e.target.value);
  };

  const handleSubmit = (value) => {
    navigate(`/${estoreSet.slug}/shop?text=${value}`);
  };

  return (
    <Search
      className="bg-secondary"
      placeholder="Search"
      value={searchTxt}
      onChange={handleChange}
      onSearch={(value) => handleSubmit(value)}
      style={{ width: isMobile ? window.innerWidth - 72 : "300px" }}
    />
  );
};

export default SearchHead;
