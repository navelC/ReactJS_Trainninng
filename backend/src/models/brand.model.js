const mongoose = require('mongoose');

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
const Brand = mongoose.model('brand', brandSchema);

module.exports = Brand;
