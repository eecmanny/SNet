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

  // Add an assignment to a user
  async addFriend(req, res) {
    console.log('You are adding an assignment');
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove assignment from a user
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { fiends: { friendId: req.params.assignmentId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
