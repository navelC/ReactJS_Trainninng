const catchAsync = require('../utils/catchAsync');
const { brandService } = require('../services');
const changeId = require('../utils/keyModify');

const list = catchAsync(async (req, res) => {
  const brands = await brandService.list();
  changeId(brands);
  res.send(brands);
});
const listByCategory = catchAsync(async (req, res) => {
  const brands = await brandService.listByCategory(req.params.category);
  changeId(brands);
  res.send(brands);
});
module.exports = {
  list,
  listByCategory,
};
