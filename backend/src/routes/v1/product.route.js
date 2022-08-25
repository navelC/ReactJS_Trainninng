const express = require('express');
const validate = require('../../middlewares/validate');
const upload = require('../../middlewares/storage');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router
  .route('/')
  .post(upload.single('image'), validate(productValidation.createProduct), productController.createProduct)
  .get(productController.list);

router
  .route('/:productId')
  .get(validate(productValidation.getProduct), productController.getProduct)
  .patch(
    upload.fields([
      {
        name: 'slide_image0',
      },
      {
        name: 'slide_image1',
      },
      {
        name: 'slide_image2',
      },
      {
        name: 'slide_image3',
      },
      {
        name: 'main_image',
      },
    ]),
    validate(productValidation.updateProduct),
    productController.updateProduct
  )
  .delete(validate(productValidation.deleteProduct), productController.deleteProduct);

module.exports = router;
