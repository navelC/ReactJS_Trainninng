const Joi = require('joi');
const { objectId, price, descript } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().min(1).required(),
    price: Joi.number().required().custom(price),
    brand: Joi.string().required(),
    category: Joi.string().required(),
    descript: Joi.number().allow().custom(descript),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().required().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().min(1).required(),
      price: Joi.number().required().custom(price),
      brand: Joi.string().required(),
      category: Joi.string().required(),
      descript: Joi.number().allow().custom(descript),
    })
    .min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
