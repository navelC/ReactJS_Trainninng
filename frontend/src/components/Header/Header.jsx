import React from "react";
import { Link } from "react-router-dom";
// import { Get } from "../../api/service";

const Header = () => {
  // Get();
  return (
    <div className="menu">
      <div className="left">
        <img alt="logo" src="/images/logo.png" />
        <div className="title">NCC</div>
      </div>
      <div className="right">
        <Link to="/">Home</Link>
        <Link to="/admin">Quản lý sản phẩm</Link>
      </div>
    </div>
  );
};

export default Header;
