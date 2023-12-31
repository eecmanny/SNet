const { Reaction, Thought, User } = require('../models');

module.exports = {
// Get all Thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      const thoughtObj = {
        thoughts,
      };
      res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
      };
    },


    // Get a single thought
    async getSingleThought(req, res) {
      try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
        // when using "-__v" it's excluding the etra mongdb data and returning clean/ un-altered data
          .select('-__v');
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' })
        }
  
        res.json({
          thought,
          // grade: await grade(req.params.thoughtId),
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
  // Create a thought and push the created thought's _id to the associated user's thoughts array field

async createThought(req, res) {
  try {
    const thought = await Thought.create(req.body);
    res.json(thought);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},

  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        //Find student id
        { _id: req.params.thoughtId },
        // req.body become the new value for student id
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No course with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No course with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: thought } });
      res.json({ message: 'thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //     // Delete a thought
  // async deleteThought(req, res) {
  //   try {
  //     const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

  //     if (!thought) {
  //       res.status(404).json({ message: 'No course with that ID' });
  //     }

  //     await Thought.deleteMany({ _id: { $in: thought.reaction } });
  //     res.json({ message: 'thought and reaction deleted!' });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },



};

