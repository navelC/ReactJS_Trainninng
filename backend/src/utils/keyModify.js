const keyModify = (arr) => {
  arr.map((obj) => {
    const o = obj;
    o.id = o._id;
    delete o._id;
    return o.id;
  });
};

module.exports = keyModify;
