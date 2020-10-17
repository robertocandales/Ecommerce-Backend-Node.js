const { Router } = require('express');
const router = Router();
const auth = require('../../middelware/auth');

const {
  postUser,
  postAuth,
  getUserData,
  getAllUsers,
  updateUser,
  deleteUser,
  roleUpdateUser,
} = require('../controllers/userController');

// @route  Get api/products
router.route('/').post(postUser);
// getAllUsers
router.route('/userRegistered').get(auth, getAllUsers);
router.route('/auth').post(postAuth);
////Get
router.route('/auth/user').get(auth, getUserData);
////Delete
router.route('/:id').delete(auth, deleteUser);
////update
router.route('/:id').put(auth, updateUser);
////update user role
router.route('/updateUserRole').put(auth, roleUpdateUser);

module.exports = router;
