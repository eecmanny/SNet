const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  //.put is the dominant fuction being run. Then the updateuser is the callback which wwill be run after the .put
  .put(updateUser)
  .delete(deleteUser);

//Trying these

// /api/user
router.route('/').get(getUser).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/user/:userId/friends
router.route('/:userId/friends').post(addFriend);

// /api/user/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(removeFriend);


module.exports = router;
