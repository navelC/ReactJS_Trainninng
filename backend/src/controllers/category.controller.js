const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');
const changeId = require('../utils/keyModify');

const list = catchAsync(async (req, res) => {
  const categories = await categoryService.list();
  changeId(categories);
  res.send(categories);
});

module.exports = {
  list,
};
