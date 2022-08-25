import React from 'react';
import {
  Link, useHistory,
} from 'react-router-dom';
import { Pagination } from '@mui/material';
import { useQuery } from "../../hooks";

const Product = (props) => {
  const history = useHistory();

  const { products, pages, isHome } = props;

  const [getParams, getQuery] = useQuery();

  function pageChange(e, value) {
    const params = getParams();
    params.page = value;
    const link = `?${getQuery(params)}`;
    history.push(link);
  }

  function currencyFormat(num) {
    return `$ ${num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
  }

  return (
    <div className="content">
      <div className="inner">
        <div className="products">
          {products && products.map((obj) => {
            return (
              <div className="product">
                <Link to={`/products/${obj.id}`}>
                  <img src={process.env.REACT_APP_PUBLIC_SERVER_BASE_URL + obj.image[0].name} alt="" />
                </Link>
                <div className="info">
                  <div className="name">{obj.name}</div>
                  {isHome && <div className="price">{currencyFormat(obj.price)}</div>}
                  {!isHome && (
                  <div className="group">
                    <Link to={`/admin/edit/${obj.id}`}><div className="button">Cập nhật</div></Link>
                    <div className="button">Xóa</div>
                  </div>
                  )}
                </div>
              </div>
            );
          })}
          {(products && products.length <= 0) && <img style={{ width: "100%" }} src="images/NoProduct.jpg" alt="empty" />}
        </div>
        { (pages >= 2) && <Pagination count={pages} size="large" onChange={pageChange} />}
      </div>
    </div>
  );
};

export default Product;
