const { Router } = require('express');
const router = Router();
const auth = require('../../middelware/auth');

const {
  postUser,
  postAuth,
  getUserData,
  //  deleteProduct,
  //  updateProduct,
} = require('../controllers/userController');

// @route  Get api/products
router.route('/').post(postUser);
router.route('/auth').post(postAuth);
////Get
router.route('/auth/user').get(getUserData);
////Delete
//router.route('/:id').delete(deleteProduct);
////update
//router.route('/:id').put(updateProduct);

module.exports = router;
