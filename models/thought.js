const { Schema, model } = require('mongoose');

//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.


// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
      min_length: 1,

    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (timestamp) {
        // Define a getter function to format the timestamp on query
        return new Date(timestamp).toLocaleString(); 
      },



    },
    username: {
      type: String,
      required: true,
    },

    //This implies that you are creating a reference or relationship between the current document and documents in the 'reaction' collection.
    reaction: [
      {
        type: Schema.Types.ObjectId,
        ref: 'reaction',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reaction.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;

