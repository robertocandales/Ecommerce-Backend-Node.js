const { Router } = require('express');
const auth = require('../../middelware/auth');
const router = Router();

const {
  getProduct,
  getAprouct,
  createProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/productController');

// @route  Get api/products
router.route('/').get(getProduct);
router.route('/:id').get(getAprouct);
//Post
router.route('/').post(createProduct);
//Delete
router.route('/:id').delete(deleteProduct);
//update
router.route('/:id').put(updateProduct);

module.exports = router;
