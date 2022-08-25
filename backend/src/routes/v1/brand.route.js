const express = require('express');

const router = express.Router();
const brandController = require('../../controllers/brand.controller');

router.route('/').get(brandController.list);
router.route('/:category').get(brandController.listByCategory);

module.exports = router;
