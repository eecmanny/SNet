const { ObjectId } = require('mongoose').Types;
const { Reaction, Thought, User } = require('../models');

// Aggregate function to get the number of users overall
//When the agreegate is empty it finds all and give a numeric value
const userCount = async () => {
  const numberOfUsers = await User.aggregate()
    .count('userCount');
  return numberOfUsers;
}

// // Aggregate function for getting the overall thought using $avg
// const thought = async (userId) =>
//   user.aggregate([
//     // only include the given user by using $match
//     { $match: { _id: new ObjectId(userId) } },
//     {
//       $unwind: '$assignments',
//     },
//     {
//       $group: {
//         _id: new ObjectId(userId),
//         overallThought: { $avg: '$assignments.score' },
//       },
//     },
//   ]);

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();

      // const userObj = {
      //   users,
      //   username: [User],
      //   email: [User],
      //   userCount: await userCount(),
      //   thoughts: [Thought],
      //   friends: [User]
      // };

      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        // when using "-__v" it's excluding the etra mongdb data and returning clean/ un-altered data
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json({
        user,
        // thought: await thought(req.params.userId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single user
  async updateSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        // when using "-__v" it's excluding the extra mongodb data and returning clean/ un-altered data
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json({
        user,
        thought: await thought(req.params.userId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user and remove them from the course
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      // const course = await Course.findOneAndUpdate(
      //   { users: req.params.userId },
      //   { $pull: { users: req.params.userId } },
      //   { new: true }
      // );

      // if (!thought) {
      //   return res.status(404).json({
      //     message: 'user deleted, but no thought found',
      //   });
      // }

      res.json({ message: 'user successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Post a user's friend and join that friend to the user
async postSingleFriend(req, res) {
  try {
    console.log(req.params.userId, "userId");
    console.log(req.params.friendId, "friendId");

    // Create the friend using the data in the request body
    const friend = await User.create(req.body);

    // Find the user by their ID and update their 'friends' array to include the new friend
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      //500 error said I need username and password????
      { email: req.body.email},
      {username: req.body.username},
      { $push: { friends: friend._id } }, // Assuming 'friends' is an array in your User model
      { runValidators: true, new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No User with that ID' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
},


  // delete a users's friend
  async deleteSingleFriend(req, res) {
    try {
      const thought = await User.findOneAndUpdate({ _id: req.params.friendId }
        , { $pull: { firend: req.params.friendId } },
        { runValidators: true, new: true })
        .select('-__v');

      res.json(thought);


    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

};


