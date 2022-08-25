import React, { useEffect, useRef, useState } from "react";
// import queryString from 'query-string';
import { Link, useHistory } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import { getCategory } from "../../api/category.service";
import { getBrand, getBrandByCategory } from "../../api/brand.service";
import { useLoading, useQuery } from "../../hooks";

const Category = () => {
  // const count = [true, true];
  const history = useHistory();

  const [showLoading, hideLoading] = useLoading();

  const [getParams, getQuery] = useQuery();

  const [categories, setCategory] = useState();
  const [brands, setBrand] = useState();

  const cateBtn = useRef();
  const cateItem = useRef();
  const brandBtn = useRef();
  const brandItem = useRef();
  // const [params] = useSearchParams();
  // console.log(params.get())
  // const [queryParams, setQueryParams] = useState({});
  useEffect(async () => {
    showLoading();
    // setProducts(Get);
    const category = await getCategory();
    setCategory(category.data);
    const brand = await getBrand();
    setBrand(brand.data);
    hideLoading();
  }, []);
  function expandCategory() {
    if (cateItem.current.className === "show") {
      cateBtn.current.style.transform = "rotate(0deg)";
      cateItem.current.className = "hide";
    } else {
      cateBtn.current.style.transform = "rotate(90deg)";
      cateItem.current.className = "show";
    }
  }
  function expandBrand() {
    if (brandItem.current.className === "show") {
      brandBtn.current.style.transform = "rotate(0deg)";
      brandItem.current.className = "hide";
    } else {
      brandBtn.current.style.transform = "rotate(90deg)";
      brandItem.current.className = "show";
    }
  }
  async function categoryClick(name) {
    const params = getParams();
    params.category = name;
    delete params.brand;
    delete params.page;
    const link = `?${getQuery(params)}`;
    showLoading();
    // setProducts(Get);
    const brand = await getBrandByCategory(name);
    setBrand(brand.data);
    hideLoading();
    history.push(link);
  }
  async function unChoose(key) {
    const params = getParams();
    delete params[key];
    delete params.page;
    const link = `?${getQuery(params)}`;
    if (key === "category") {
      showLoading();
      const brand = await getBrand();
      setBrand(brand.data);
      hideLoading();
    }
    history.push(link);
  }
  return (
    <div className="category">
      <div className="content">
        <div className="title" onKeyDown={null} id="category" onClick={expandCategory} role="button" tabIndex={0}>
          Danh mục <span id="span1" ref={cateBtn} style={{ backgroundImage: "url('/images/triangle.png')" }} />
        </div>
        <ul id="ul1" ref={cateItem} className="show">
          <li onKeyDown={null} role="menuitem" onClick={() => unChoose("category")}>Tất cả</li>
          {categories && categories.map((obj) => {
            return (
              <li onKeyDown={null} role="menuitem" onClick={() => categoryClick(obj.name)}>{obj.name}</li>
            );
          })}
        </ul>
        <div className="break" />
        <div className="title" onKeyDown={null} id="brand" onClick={expandBrand} role="button" tabIndex={0}>
          Hãng <span ref={brandBtn} id="span2" style={{ backgroundImage: "url('/images/triangle.png')" }} />
        </div>
        <ul id="ul2" ref={brandItem} className="show">
          <li onKeyDown={null} role="menuitem" onClick={() => unChoose("brand")}>Tất cả</li>
          {brands && brands.map((obs) => {
            const params = getParams();
            params.brand = obs.name;
            delete params.page;
            const link = `?${getQuery(params)}`;
            return (
              <li><Link to={link}>{obs.name}</Link></li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Category;
