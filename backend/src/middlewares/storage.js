const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    const nameArr = file.originalname.split('.');
    const ext = nameArr.pop();
    cb(null, `${nameArr.join('.').replace(' ', '_')}_${Date.now()}.${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (!ext.match(/(\.(tif|jpeg|png|apng|apng|gif|jpg|jfif|pjpeg|pjp|svg|webp))$/)) {
      return callback(new Error('Chỉ cho phép định dạng ảnh'));
    }
    callback(null, true);
  },
});
module.exports = upload;
