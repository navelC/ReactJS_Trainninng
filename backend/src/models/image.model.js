const mongoose = require('mongoose');

const imageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
    },
    path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
