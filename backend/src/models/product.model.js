const mongoose = require('mongoose');

const objId = mongoose.Types.ObjectId;
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      require: true,
    },
    brand: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    id_image: {
      type: objId,
      require: true,
    },
    slide_image: {
      type: Array,
      default: [undefined, undefined, undefined, undefined],
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
