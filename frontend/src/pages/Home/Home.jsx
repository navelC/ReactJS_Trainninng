import React, { useState, useEffect, useCallback } from "react";
import { debounce } from '@mui/material';
import { useHistory, useLocation } from "react-router-dom";
import { postProduct, getProducts } from "../../api/product.service";
import { getCategory } from "../../api/category.service";
import { Product } from "../../components";
// import { getBrand, getBrandByCategory} from "../../api/brand.service";
import { useLoading, useQuery } from "../../hooks";
import { getBrandByCategory } from "../../api/brand.service";
// import { Popup } from "../../components";
// import { Pagination } from "../../components";

// import { get } from "../../api/service";

function Home(props) {
  const { isHome } = props;
  const [getParams, getQuery] = useQuery();
  const history = useHistory();

  const [state, setState] = useState({ display: "none" });
  const [products, setProducts] = useState();
  const [pages, setPages] = useState(0);
  const [categories, setCategory] = useState();
  const [brands, setBrands] = useState([]);

  // const [brands, setBrand] = useState();
  const [showLoading, hideLoading] = useLoading();
  const location = useLocation();

  async function loadData() {
    showLoading();
    // setProducts(Get);
    const params = getParams();
    const obj = await getProducts(params);
    const category = await getCategory();
    const brand = await getBrandByCategory(category.data[0].name);
    setCategory(category.data);
    setBrands(brand.data);
    setProducts(obj.data[0].data);
    const count = obj.data[0].count[0];
    const limit = 6;
    setPages(Math.ceil(count / limit));
    hideLoading();
  }

  useEffect(() => { loadData(); }, [location]);

  const debounceSearch = useCallback(debounce((nextValue) => {
    const params = getParams();
    params.name = nextValue;
    if (!nextValue) delete params.name;
    const link = `?${getQuery(params)}`;
    history.push(link);
  }, 1000), []);
  function openForm() {
    setState({ ...state, display: "block" });
  }

  return (
    <>
      {!isHome && <Modal />}
      <div className="container">
        <div className="topForm">
          {!isHome && <button type="button" onClick={openForm}>Thêm sản phẩm</button>}
          <Search />
        </div>
        <Product products={products} pages={pages} isHome={isHome} />
      </div>
    </>
  );
  function Hide() {
    setState({ ...state, display: "none" });
  }
  async function Submit(e) {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      category: e.target.category.value,
      brand: e.target.brand.value,
      price: e.target.price.value,
      image: state.image,
    };
    const formData = new FormData();
    Object.entries(data).forEach((key) => {
      formData.append(key[0], key[1]);
    });
    showLoading();
    const res = await postProduct(formData);
    if (res.status === 201) console.log("success");
    hideLoading();
  }
  // const _a = 0;
  function imageChange(e) {
    setState({ ...state, loading: true });
    if (e.target.files && e.target.files[0]) {
      setState({
        ...state,
        loading: false,
        image: e.target.files[0],
        imgObject: URL.createObjectURL(e.target.files[0]),
      });
    } else setState({ ...state, loading: false });
  }
  function ESCclose(evt) {
    if (evt.keyCode === 27) {
      Hide();
    }
  }
  async function inputChange(e) {
    state[e.target.name] = e.target.value;
    if (e.target.name === "category") {
      showLoading();
      const brand = await getBrandByCategory(e.target.value);
      setBrands(brand.data);
      hideLoading();
    }
  }
  function findProduct(e) {
    const { value } = e.target;
    debounceSearch(value);
  }
  function Search() {
    return (
      <div className="search">
        <input name="search" defaultValue={getParams().name} onChange={findProduct} type="text" placeholder="Search..." />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.1404 15.4673L21.852   21.1789C22.3008 21.6276 21.6276 22.3008 21.1789 21.852L15.4673 16.1404C14.0381 17.4114 12.1552 18.1835 10.0918 18.1835C5.6225 18.1835 2 14.5613 2 10.0918C2 5.6225 5.62219 2 10.0918 2C14.561 2 18.1835 5.62219 18.1835 10.0918C18.1835 12.1551 17.4115 14.038 16.1404 15.4673ZM2.95197 10.0918C2.95197 14.0356 6.14824 17.2316 10.0918 17.2316C14.0356 17.2316 17.2316 14.0353 17.2316 10.0918C17.2316 6.14797 14.0353 2.95197 10.0918 2.95197C6.14797 2.95197 2.95197 6.14824 2.95197 10.0918Z" fill="#343747" stroke="#343747" strokeWidth="0.25" />
        </svg>
      </div>
    );
  }
  function Modal() {
    return (
      <div className="modal" style={{ display: state.display }}>
        <div className="inner">
          <div className="content">
            <div className="title">
              Thêm sản phẩm
              <span role="button" disabled={state.loading} onClick={Hide} onKeyDown={ESCclose}>
                <img alt="nothing" src="/images/vector.png" />
              </span>
            </div>
            <form onSubmit={Submit} encType="multipart/form-data">
              <div className="form_group">
                <div>Tên sản Phẩm<span>*</span></div>
                <input onChange={inputChange} required defaultValue={state.name} name="name" type="text" placeholder="Nhập tên sản phẩm" />
              </div>
              <div className="form_group">
                <div>Danh mục sản phẩm<span>*</span></div>
                <select onChange={inputChange} defaultValue={state.category} name="category" required>
                  {categories && categories.map((obj) => {
                    return (<option value={obj.name}>{obj.name}</option>);
                  })}
                </select>
              </div>
              <div className="form_group">
                <div>Hãng sản xuất<span>*</span></div>
                <select onChange={inputChange} value={state.brand} name="brand" required>
                  {brands.length > 0 && brands.map((obj) => {
                    return (<option value={obj.name}>{obj.name}</option>);
                  })}
                  {brands.length === 0 && (<option disable>Không có hãng nào</option>)}
                </select>
              </div>
              <div className="form_group">
                <div>Giá<span>*</span></div>
                <input onChange={inputChange} name="price" defaultValue={state.price} required min="10000" max="1000000000" type="number" placeholder="Nhập tên sản phẩm" />
              </div>
              <div className="form_group">
                <div>Mô tả</div>
                <textarea onChange={inputChange} name="descript" defaultValue={state.descript} rows="4" maxLength="10000" type="text" placeholder="Nhập mô tả" />
              </div>
              <div className="form_group">
                <div className="img_c">Thêm ảnh minh họa<span>*</span></div>
                <img src={state.imgObject} alt="ảnh minh họa" />
                <input name="image" type="file" style={{ opacity: 0 }} onChange={imageChange} />
              </div>
              <div className="button_group">
                <button type="button" onClick={Hide} disabled={state.loading}>Hủy</button>
                <button type="submit">Thêm</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
