const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  addFriend,
  removeFriend,
  updateSingleUser,
  deleteUser,
} = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
  .route('/:userId')
  .get(getSingleUser)  // Get a single user
  .put(updateSingleUser)  // Update a single user
  .delete(deleteUser);  // Delete a single user

// /api/user
router.route('/').get(getUsers).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).delete(updateSingleUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/user/:userId/friends
router.route('/:userId/friends').post(addFriend);  // Add a friend to a user's list

// // /api/user/:userId/friends/:friendId
// router.route('/:userId/friends/:friendId').delete(removeFriend);  // Remove a friend from a user's list

module.exports = router;