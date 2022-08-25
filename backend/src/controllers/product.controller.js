const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const changeId = require('../utils/keyModify');
const { productService, imageService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  const img = {
    name: req.file.filename,
    type: req.file.mimetype,
    path: req.file.path,
  };
  console.log(req.file);
  const idImg = await imageService.createImage(img);
  const product = await productService.createProduct(req.body, idImg);
  res.status(httpStatus.CREATED).send(product);
});

const getProduct = catchAsync(async (req, res) => {
  const product = await productService.getProduct(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'product not found');
  }
  res.send(product);
});

const updateProduct = catchAsync(async (req, res) => {
  const data = req.body;
  const file = req.files;
  req.body.slide_image = [null, null, null, null];
  if (file.slide_image0) data.slide_image[0] = file.slide_image0[0].filename;
  if (file.slide_image1) data.slide_image[1] = file.slide_image1[0].filename;
  if (file.slide_image2) data.slide_image[2] = file.slide_image2[0].filename;
  if (file.slide_image3) data.slide_image[3] = file.slide_image3[0].filename;
  if (file.main_image) data.main_image = file.main_image.filename;
  console.log(data);
  const product = await productService.updateProduct(req.params.productId, req.body);
  res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.params.productId);
  res.status(httpStatus.NO_CONTENT).send();
});
const list = catchAsync(async (req, res) => {
  const { page, ...exprs } = req.query;
  const limit = 6;
  const skip = (req.query.page - 1) * limit || 0;

  const products = await productService.list(limit, skip, exprs);
  changeId(products[0].data);
  res.send(products);
});

module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  list,
};
