const { Category } = require('../models');

const list = async () => {
  const data = await Category.find().lean();
  return data;
};
module.exports = {
  list,
};
