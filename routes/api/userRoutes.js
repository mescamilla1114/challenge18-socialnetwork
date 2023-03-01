const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addfriend,
  removefriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:usersId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:usersId/friends/:friendsId
router.route('/:userId/friends/:friendsId').post(addfriend).delete(removefriend);;

module.exports = router;
