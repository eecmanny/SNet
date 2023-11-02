const { Schema, Types , model} = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
      min_length: 1,
      // default: 'Unnamed reaction',
    },
    username: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: function (timestamp) {
        // Define a getter function to format the timestamp on query
        return new Date(timestamp).toLocaleString(); 
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
