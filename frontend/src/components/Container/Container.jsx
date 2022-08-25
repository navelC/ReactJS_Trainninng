import React from "react";

const Container = () => {
  return (
    <div className="container">
      <Search />
      <ProductsFrame />
    </div>
  );
};
function Search() {
  return (
    <div className="search">
      <input type="text" placeholder="Search..." />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.1404 15.4673L21.852 21.1789C22.3008 21.6276 21.6276 22.3008 21.1789 21.852L15.4673 16.1404C14.0381 17.4114 12.1552 18.1835 10.0918 18.1835C5.6225 18.1835 2 14.5613 2 10.0918C2 5.6225 5.62219 2 10.0918 2C14.561 2 18.1835 5.62219 18.1835 10.0918C18.1835 12.1551 17.4115 14.038 16.1404 15.4673ZM2.95197 10.0918C2.95197 14.0356 6.14824 17.2316 10.0918 17.2316C14.0356 17.2316 17.2316 14.0353 17.2316 10.0918C17.2316 6.14797 14.0353 2.95197 10.0918 2.95197C6.14797 2.95197 2.95197 6.14824 2.95197 10.0918Z" fill="#343747" stroke="#343747" strokeWidth="0.25" />
      </svg>
    </div>
  );
}
function ProductsFrame() {
  return (
    <div className="products" />
  );
}
export default Container;
