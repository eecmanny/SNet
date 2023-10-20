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
      maxlength: 280,
      minlength: 1,
      // default: 'Unnamed reaction',
    },
    username: {
      type: Number,
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
      virtuals: true,
    },
    id: false,
  }
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
