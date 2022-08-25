const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

const price = (value, helpers) => {
  if (value < 10000 || value > 1000000000) {
    return helpers.message('price must in range 10000 - 1000000000');
  }
  return value;
};

const descript = (value, helpers) => {
  if (descript && descript.length > 500) {
    return helpers.message('descript must contains less than 501 character');
  }
  return value;
};

const file = (value, helpers) => {
  if (!value.name.match(/(\.(jpeg|png|apng|apng|gif|jpg|jfif|pjpeg|pjp|svg|webp))$/)) {
    return helpers.message('file must be image');
  }
  return value;
};

module.exports = {
  objectId,
  password,
  price,
  descript,
  file,
};
