const { Reaction, Thought, User } = require('../models');
  // Get all Thoughts reactions
  module.exports = {
//   async getSingleReactions(req, res) {
//     try {
//       const reaction = await Reaction.findOne({ _id: req.params.thoughtId })
//         .select('-__v');

//       if (!reaction) {
//         return res.status(404).json({ message: 'No thought with that ID' });
//       }
//       res.json(reaction);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },

    // Post a Thought's reaction
    async postSingleReaction(req, res) {
      try {
        const reaction = await Reaction.create( req.body );
  
        const thought =
        await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reaction: reaction._id } },
            { runValidators: true, new: true }
            );
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }

        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    async DeleteSingleReaction(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }
            , { $pull: { reaction: req.params.reactionId } },
            { runValidators: true, new: true })
            .select('-__v');

            res.json(thought);


        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
};