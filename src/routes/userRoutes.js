const { Router } = require('express');
const router = Router();
const auth = require('../../middelware/auth');

const {
  postUser,
  postAuth,
  getUserData,
  //  deleteProduct,
  updateUser,
} = require('../controllers/userController');

// @route  Get api/products
router.route('/').post(postUser);
router.route('/auth').post(postAuth);
////Get
router.route('/auth/user').get(auth, getUserData);
////Delete
//router.route('/:id').delete(deleteProduct);
////update
router.route('/:id').put(auth, updateUser);

module.exports = router;
