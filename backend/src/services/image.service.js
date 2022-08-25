const { Image } = require('../models');

const createImage = async (img) => {
  const image = await Image.create(img);
  return image.id;
};
module.exports = {
  createImage,
};
