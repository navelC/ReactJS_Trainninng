const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');

const createProduct = async (body, imgId) => {
  const data = { ...body, id_image: imgId };
  const product = await Product.create(data);
  return product;
};
const getProductById = async (id) => {
  return Product.findById(id);
};
const getProduct = async (id) => {
  const objId = mongoose.Types.ObjectId(id);
  return Product.aggregate([
    {
      $match: {
        _id: objId,
      },
    },
    {
      $lookup: {
        from: 'images',
        localField: 'id_image',
        foreignField: '_id',
        as: 'image',
      },
    },
  ]);
};
const updateProduct = async (id, body) => {
  const product = await getProductById(id);
  Object.assign(product, body);
  return product.save();
};
const deleteProductById = async (id) => {
  const product = await getProductById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'product not found');
  }
  await product.remove();
  return product;
};
const list = async (limit, skip, exprs) => {
  const query = [
    {
      $match: {},
    },
    {
      $addFields: {
        idImg: {
          $toObjectId: '$id_image',
        },
      },
    },
    {
      $facet: {
        stage1: [
          {
            $group: {
              _id: null,
              count: {
                $count: {},
              },
            },
          },
        ],
        stage2: [
          {
            $lookup: {
              from: 'images',
              localField: 'idImg',
              foreignField: '_id',
              as: 'image',
            },
          },
          { $skip: skip },
          { $limit: limit },
        ],
      },
    },
    {
      $project: {
        count: '$stage1.count',
        data: '$stage2',
      },
    },
  ];
  const { name, ...exp } = exprs;
  if (name) query[0].$match.name = { $regex: name };
  // if (name) query[0].$match.name = `/${name}/`;
  if (!(Object.keys(exprs).length === 0)) {
    Object.entries(exp).forEach(([key, val]) => {
      query[0].$match[key] = `${val}`;
    });
  }
  const products = await Product.aggregate(query);
  if (!products) {
    throw new ApiError(httpStatus.NOT_FOUND, 'product not found');
  }
  return products;
};

const count = async () => {
  const total = await Product.countDocuments();
  return total;
};

module.exports = {
  createProduct,
  updateProduct,
  getProduct,
  deleteProductById,
  list,
  count,
};
