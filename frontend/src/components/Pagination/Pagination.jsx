import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = (total) => {
  const limit = 6;
  const totalPages = Math.ceil(total / limit);
  (
    <div className="paginate">
      { totalPages.array.forEach((i) => {
        return <Link to="a">{i}</Link>;
      })}
    </div>
  );
};
export default Pagination;
