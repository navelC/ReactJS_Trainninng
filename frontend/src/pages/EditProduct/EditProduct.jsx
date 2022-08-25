import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getBrandByCategory } from "../../api/brand.service";
import { getCategory } from "../../api/category.service";
import { getProduct, updateProduct } from "../../api/product.service";
import { useLoading } from "../../hooks";

function EditProduct() {
  const [showLoading, hideLoading] = useLoading();

  const history = useHistory();

  const [categories, setCategory] = useState();
  const [product, setProduct] = useState({});
  const [brands, setBrand] = useState({});

  const { id } = useParams();

  const inps = [];
  const imgs = [];
  const btnUpdate = [];
  const btnRemove = [];

  for (let i = 0; i < 5; i += 1) {
    const inp = useRef(null);
    const img = useRef(null);
    const btnU = useRef(null);
    const btnR = useRef(null);
    inps.push(inp);
    imgs.push(img);
    btnUpdate.push(btnU);
    btnRemove.push(btnR);
  }

  async function Submit(e) {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      category: e.target.category.value,
      brand: e.target.brand.value,
      price: e.target.price.value,
    };
    if (e.target.main_image.files && e.target.main_image.files.length > 0) {
      [data.main_image] = e.target.main_image.files;
    }
    if (e.target.slide_image0.files && e.target.slide_image0.files.length > 0) {
      [data.slide_image0] = e.target.slide_image0.files;
    }
    if (e.target.slide_image1.files && e.target.slide_image1.files.length > 0) {
      [data.slide_image1] = e.target.slide_image1.files;
    }
    if (e.target.slide_image2.files && e.target.slide_image2.files.length > 0) {
      [data.slide_image2] = e.target.slide_image2.files;
    }
    if (e.target.slide_image3.files && e.target.slide_image3.files.length > 0) {
      [data.slide_image3] = e.target.slide_image3.files;
    }
    const formData = new FormData();
    Object.entries(data).forEach((key) => {
      formData.append(key[0], key[1]);
    });
    showLoading();
    updateProduct(id, formData);
    hideLoading();
    // showLoading();
    // const res = await postProduct(formData);
    // if (res.status === 201) console.log("success");
    // hideLoading();
  }

  async function loadBrand(category) {
    const brand = await getBrandByCategory(category);
    setBrand(brand.data);
  }
  async function inputChange(e) {
    showLoading();
    loadBrand(e.target.value);
    hideLoading();
  }

  useEffect(async () => {
    showLoading();
    const category = await getCategory();
    const prodct = await getProduct(id);
    console.log(prodct.data[0]);
    setCategory(category.data);
    setProduct(prodct.data[0]);
    loadBrand(prodct.data[0].category);
    hideLoading();
  }, []);

  function createImg(i) {
    showLoading();
    if (inps[i].current.files[0]) {
      const urlImg = URL.createObjectURL(inps[i].current.files[0]);
      imgs[i].current.className = "img";
      imgs[i].current.src = urlImg;
      btnRemove[i].current.className = "show";
      btnUpdate[i].current.className = "show";
    }
    hideLoading();
  }
  function removeImg(i) {
    imgs[i].current.src = "/images/push.png";
    imgs[i].current.className = "add_image";
    btnRemove[i].current.className = "hide";
    btnUpdate[i].current.className = "hide";
  }

  return (
    <div className="container">
      <div className="content">
        <form className="form" onSubmit={Submit} encType="multipart/form-data">
          <div className="left">
            <div className="title">
              Thông tin sản phẩm
            </div>
            <div className="form_group">
              <div>Tên sản Phẩm<span>*</span></div>
              <input onChange={inputChange} required defaultValue={product.name} name="name" type="text" placeholder="Nhập tên sản phẩm" />
            </div>
            <div className="form_group">
              <div>Danh mục sản phẩm<span>*</span></div>
              <select onChange={inputChange} defaultValue={product.category} name="category" required>
                {categories && categories.map((obj) => {
                  if (product.category === obj.name) {
                    return (<option selected value={obj.name}>{obj.name}</option>);
                  }
                  return (<option value={obj.name}>{obj.name}</option>);
                })}
              </select>
            </div>
            <div className="form_group">
              <div>Hãng sản xuất<span>*</span></div>
              <select onChange={inputChange} value={product.brand} name="brand" required>
                {brands.length > 0 && brands.map((obj) => {
                  if (product.brand === obj.name) {
                    return (<option selected value={obj.name}>{obj.name}</option>);
                  }
                  return (<option value={obj.name}>{obj.name}</option>);
                })}
              </select>
            </div>
            <div className="form_group">
              <div>Giá<span>*</span></div>
              <input onChange={inputChange} name="price" defaultValue={product.price} required min="10000" max="1000000000" type="number" placeholder="Nhập tên sản phẩm" />
            </div>
            <div className="form_group">
              <div>Mô tả</div>
              <textarea onChange={inputChange} name="descript" defaultValue={product.descript} rows="4" maxLength="10000" type="text" placeholder="Nhập mô tả" />
            </div>
            <div className="group_button">
              <button className="button" type="button" onClick={() => history.goBack()}>
                Hủy
              </button>
              <button className="button" type="submit">
                Lưu
              </button>
            </div>
          </div>
          <div className="right">
            <div className="form_group">
              <div>Ảnh minh họa<span>*</span></div>
              <div onKeyDown={null} onClick={() => { inps[4].current.click(); }} role="button" tabIndex={0}>
                <img
                  className="main_image"
                  ref={imgs[4]}
                  src={product.image
                    && (process.env.REACT_APP_PUBLIC_SERVER_BASE_URL + product.image[0].name)}
                  alt={product.name}
                />
                <input name="main_image" style={{ opacity: 0 }} type="file" ref={inps[4]} onChange={() => createImg(4)} />
              </div>
            </div>
            <div className="slide_image">
              <div className="title">Ảnh slide</div>
              {product.slide_image && product.slide_image.map((obj, index) => {
                const name = (obj) ? "show" : "hide";
                return (
                  <div className="group">
                    <div>ảnh {index + 1}</div>
                    <div className="image_group">
                      <div onKeyDown={null} onClick={() => { inps[index].current.click(); }} role="button" tabIndex={0}>
                        { obj && (
                          <img className="img" ref={imgs[index]} src={process.env.REACT_APP_PUBLIC_SERVER_BASE_URL + obj} alt="nu" />
                        )}
                        { !obj && (
                          <img ref={imgs[index]} className="add_image" src="/images/push.png" alt="nu" />
                        )}
                      </div>
                      <button type="button" ref={btnUpdate[index]} className={name} onClick={() => { inps[index].current.click(); }}>Cập nhật</button>
                      <button type="button" ref={btnRemove[index]} className={name} onClick={() => { removeImg(index); }}>xóa</button>
                    </div>
                    <input type="file" ref={inps[index]} onChange={() => createImg(index)} name={`slide_image${index}`} />
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EditProduct;
