const { Router } = require('express');
const auth = require('../../middelware/auth');
const router = Router();
const path = require('path');
const express = require('express');
const multer = require('multer');

const upload = require('../../middelware/uploads');

const {
  getProduct,
  getAprouct,
  createProduct,
  deleteProduct,
  updateProduct,
  UpdateImage,
} = require('../controllers/productController');

// @route  Get api/products
router.route('/').get(getProduct);
router.route('/:id').get(getAprouct);
//Post
router.route('/').post(auth, createProduct);
//Delete
router.route('/:id').delete(auth, deleteProduct);
//update
router.route('/:id').put(auth, updateProduct);
//UploadImage
router.route('/upload').post(auth, UpdateImage);

module.exports = router;
