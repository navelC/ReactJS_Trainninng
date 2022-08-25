const { Brand } = require('../models');

const list = async () => {
  const data = await Brand.find();
  return data;
};
const listByCategory = async (name) => {
  const query = { category: name };
  console.log(query);
  const data = await Brand.find(query);
  return data;
};
module.exports = {
  list,
  listByCategory,
};
