const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  postSingleFriend,
  deleteSingleFriend,
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

// // /api/user/:userId/friends
// router.route('/:userId/friends').post(postSingleFriend);  // Add a friend to a user's list

// BSC helped this route work 
// // /api/user/:userId/friends/:friendId
// router.route('/:userId/friends/:friendId').post(postSingleFriend).delete(deleteSingleFriend);  // Remove a friend from a user's list


// /api/user/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(postSingleFriend);  // Remove a friend from a user's list


// /api/user/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(deleteSingleFriend);  // Remove a friend from a user's list

// // /api/user/:userId/friends/:friendId
// router.route('/:userId/friends/:friendId').delete(deleteSingleFriend);  // Remove a friend from a user's list

module.exports = router;